import { createSign } from "node:crypto";
import { eventLabels } from "@/data/weddingData";
import type { RSVPEntry, WeddingEventId } from "@/types/wedding";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const SHEETS_API_BASE = "https://sheets.googleapis.com/v4/spreadsheets";

const RSVP_HEADERS = [
  "Submitted At",
  "ID",
  "Full Name",
  "Phone",
  "Email",
  "Attendance",
  "Guests",
  "Event IDs",
  "Events",
  "Side",
  "Category",
  "Message",
];

function base64Url(input: string | Buffer): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

function getPrivateKey(): string {
  return getRequiredEnv("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY")
    .trim()
    .replace(/,$/, "")
    .replace(/^["']|["']$/g, "")
    .replace(/\\n/g, "\n");
}

async function getAccessToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = base64Url(
    JSON.stringify({
      iss: getRequiredEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL"),
      scope: SHEETS_SCOPE,
      aud: TOKEN_URL,
      exp: now + 3600,
      iat: now,
    })
  );
  const unsignedToken = `${header}.${payload}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsignedToken);
  signer.end();
  const signature = base64Url(signer.sign(getPrivateKey()));

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsignedToken}.${signature}`,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Google auth failed: ${details}`);
  }

  const data = (await response.json()) as { access_token?: string };
  if (!data.access_token) throw new Error("Google auth did not return a token");
  return data.access_token;
}

function getSheetConfig() {
  return {
    spreadsheetId: getRequiredEnv("GOOGLE_SHEETS_SPREADSHEET_ID"),
    sheetName: process.env.GOOGLE_SHEETS_RSVP_SHEET_NAME || "RSVPs",
  };
}

function encodeRange(sheetName: string, range: string): string {
  return encodeURIComponent(`'${sheetName}'!${range}`);
}

async function sheetsRequest<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const token = await getAccessToken();
  const response = await fetch(`${SHEETS_API_BASE}/${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Google Sheets request failed: ${details}`);
  }

  return (await response.json()) as T;
}

async function ensureRSVPHeaders(): Promise<void> {
  const { spreadsheetId, sheetName } = getSheetConfig();
  const range = encodeRange(sheetName, "A1:L1");
  const data = await sheetsRequest<{ values?: string[][] }>(
    `${spreadsheetId}/values/${range}`
  );
  const firstRow = data.values?.[0] ?? [];
  const hasHeaders = RSVP_HEADERS.every((header, index) => firstRow[index] === header);

  if (hasHeaders) return;

  await sheetsRequest(
    `${spreadsheetId}/values/${range}?valueInputOption=RAW`,
    {
      method: "PUT",
      body: JSON.stringify({ values: [RSVP_HEADERS] }),
    }
  );
}

function entryToRow(entry: RSVPEntry): string[] {
  return [
    entry.submittedAt,
    entry.id,
    entry.fullName,
    entry.phone,
    entry.email ?? "",
    entry.attendance,
    String(entry.guests),
    entry.events.join(","),
    entry.events.map((event) => eventLabels[event]).join(", "),
    entry.side,
    entry.category,
    entry.message ?? "",
  ];
}

function rowToEntry(row: string[]): RSVPEntry | null {
  const [
    submittedAt,
    id,
    fullName,
    phone,
    email,
    attendance,
    guests,
    eventIds,
    ,
    side,
    category,
    message,
  ] = row;

  if (!id || !fullName || !phone || !submittedAt) return null;

  return {
    id,
    fullName,
    phone,
    email: email || undefined,
    attendance: attendance as RSVPEntry["attendance"],
    guests: Number(guests) || 1,
    events: eventIds
      ? (eventIds.split(",").filter(Boolean) as WeddingEventId[])
      : [],
    side: side as RSVPEntry["side"],
    category: category as RSVPEntry["category"],
    message: message || undefined,
    submittedAt,
  };
}

export async function appendRSVPToSheet(entry: RSVPEntry): Promise<void> {
  const { spreadsheetId, sheetName } = getSheetConfig();
  await ensureRSVPHeaders();
  await sheetsRequest(
    `${spreadsheetId}/values/${encodeRange(
      sheetName,
      "A:L"
    )}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: "POST",
      body: JSON.stringify({ values: [entryToRow(entry)] }),
    }
  );
}

export async function getRSVPsFromSheet(): Promise<RSVPEntry[]> {
  const { spreadsheetId, sheetName } = getSheetConfig();
  const data = await sheetsRequest<{ values?: string[][] }>(
    `${spreadsheetId}/values/${encodeRange(sheetName, "A2:L")}`
  );

  return (data.values ?? [])
    .map(rowToEntry)
    .filter((entry): entry is RSVPEntry => Boolean(entry))
    .reverse();
}
