import { NextResponse } from "next/server";
import { sendRSVPConfirmationEmail } from "@/lib/email";
import { appendRSVPToSheet, getRSVPsFromSheet } from "@/lib/googleSheets";
import type {
  Attendance,
  GuestCategory,
  GuestSide,
  RSVPEntry,
  WeddingEventId,
} from "@/types/wedding";

export const runtime = "nodejs";

const attendanceValues: Attendance[] = ["yes", "no", "maybe"];
const eventValues: WeddingEventId[] = ["dowry", "church", "reception"];
const sideValues: GuestSide[] = ["bride", "groom", "both"];
const categoryValues: GuestCategory[] = ["family", "friend", "work", "church", "vip"];

function isOneOf<T extends string>(value: unknown, allowed: T[]): value is T {
  return typeof value === "string" && allowed.includes(value as T);
}

function getClientErrorMessage(error: unknown, fallback: string): string {
  if (!(error instanceof Error)) return fallback;
  const message = error.message;

  if (message.includes("Missing ")) {
    return "The RSVP Google Sheet is not configured yet.";
  }
  if (message.includes("Requested entity was not found")) {
    return "The configured Google Sheet or RSVP tab could not be found.";
  }
  if (message.includes("The caller does not have permission")) {
    return "The Google Sheet has not been shared with the service account.";
  }
  if (message.includes("Google Sheets API has not been used")) {
    return "The Google Sheets API is not enabled for this service account project.";
  }
  if (message.includes("invalid_grant") || message.includes("Invalid JWT")) {
    return "The Google service account credentials are invalid.";
  }

  return fallback;
}

function isRSVPEntry(value: unknown): value is RSVPEntry {
  if (!value || typeof value !== "object") return false;
  const entry = value as Partial<RSVPEntry>;

  return (
    typeof entry.id === "string" &&
    typeof entry.fullName === "string" &&
    typeof entry.phone === "string" &&
    (typeof entry.email === "undefined" || typeof entry.email === "string") &&
    isOneOf(entry.attendance, attendanceValues) &&
    typeof entry.guests === "number" &&
    Array.isArray(entry.events) &&
    entry.events.every((event) => isOneOf(event, eventValues)) &&
    isOneOf(entry.side, sideValues) &&
    isOneOf(entry.category, categoryValues) &&
    (typeof entry.message === "undefined" || typeof entry.message === "string") &&
    typeof entry.submittedAt === "string"
  );
}

export async function GET() {
  try {
    const rsvps = await getRSVPsFromSheet();
    return NextResponse.json({ rsvps });
  } catch (error) {
    console.error("Failed to read RSVPs from Google Sheets", error);
    return NextResponse.json(
      {
        error: getClientErrorMessage(
          error,
          "Could not load RSVPs from Google Sheets."
        ),
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as unknown;
    if (!isRSVPEntry(body)) {
      return NextResponse.json({ error: "Invalid RSVP data." }, { status: 400 });
    }

    await appendRSVPToSheet(body);
    try {
      const emailSent = await sendRSVPConfirmationEmail(body);
      return NextResponse.json({ ok: true, emailSent });
    } catch (emailError) {
      console.error("Failed to send RSVP confirmation email", emailError);
      return NextResponse.json({
        ok: true,
        emailSent: false,
        emailError:
          emailError instanceof Error
            ? emailError.message
            : "Confirmation email failed.",
      });
    }
  } catch (error) {
    console.error("Failed to save RSVP to Google Sheets", error);
    return NextResponse.json(
      {
        error: getClientErrorMessage(
          error,
          "Could not save RSVP to Google Sheets."
        ),
      },
      { status: 500 }
    );
  }
}
