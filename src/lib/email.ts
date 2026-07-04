import tls from "node:tls";
import { eventLabels, weddingData } from "@/data/weddingData";
import type { RSVPEntry } from "@/types/wedding";

const RESEND_API_URL = "https://api.resend.com/emails";
const DEFAULT_GMAIL_USER = "ccelyse1@gmail.com";

const attendanceLabels: Record<RSVPEntry["attendance"], string> = {
  yes: "Joyfully accepts",
  no: "Regretfully declines",
  maybe: "Not sure yet",
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getEventsLabel(entry: RSVPEntry): string {
  if (entry.events.length === 0) return "No event selected";
  return entry.events.map((event) => eventLabels[event]).join(", ");
}

function buildConfirmationHtml(entry: RSVPEntry): string {
  const contacts = weddingData.rsvpContacts
    .map(
      (contact) => `
        <td style="width:50%;padding:0 14px;text-align:center;vertical-align:top;">
          <p style="margin:0 0 14px;color:#8A571A;font:11px Arial,sans-serif;letter-spacing:0.35em;text-transform:uppercase;">
            ${escapeHtml(contact.name)}
          </p>
          ${contact.phones
            .map(
              (phone) => `
                <p style="margin:0 0 10px;color:#8c8378;font:16px Georgia,'Times New Roman',serif;letter-spacing:0.08em;">
                  ${escapeHtml(phone)}
                </p>
              `
            )
            .join("")}
        </td>
      `
    )
    .join("");

  return `
    <div style="margin:0;padding:58px 18px;background:#FDFAF3;color:#221505;font-family:Georgia,'Times New Roman',serif;">
      <div style="max-width:720px;margin:0 auto;">
        <div style="border:1px solid rgba(138,87,26,0.34);padding:48px;background:#fffdf8;box-shadow:0 30px 70px rgba(52,36,15,0.12);">
          <div style="border:1px solid rgba(138,87,26,0.2);padding:8px;">
            <div style="border:1px solid rgba(138,87,26,0.45);padding:76px 28px;text-align:center;">
              <p style="margin:0 0 28px;color:#8A571A;font-size:24px;line-height:1;">❦</p>
              <h1 style="margin:0;color:#221505;font-size:42px;line-height:1.16;font-weight:400;letter-spacing:0;">
                Thank you for your RSVP.
              </h1>
              <p style="margin:24px 0 0;color:#8A571A;font-size:18px;line-height:1.5;font-style:italic;">
                We can’t wait to celebrate with you.
              </p>
              <div style="width:72px;height:1px;background:#C08A4E;margin:36px auto 28px;"></div>
              <p style="margin:0;color:#8c8378;font:11px Arial,sans-serif;letter-spacing:0.38em;text-transform:uppercase;">
                ${escapeHtml(weddingData.date.display)} · ${escapeHtml(weddingData.venue.name)}, ${escapeHtml(weddingData.venue.area)}
              </p>
            </div>
          </div>
        </div>

        <table style="width:100%;border-collapse:collapse;margin:42px auto 0;max-width:560px;">
          <tr>
            <td colspan="2" style="padding:0 0 24px;text-align:center;color:#8c8378;font-size:17px;font-style:italic;">
              Prefer to RSVP by phone?
            </td>
          </tr>
          <tr>
            ${contacts}
          </tr>
        </table>

        <div style="max-width:560px;margin:38px auto 0;border-top:1px solid rgba(138,87,26,0.22);padding-top:24px;">
          <table style="width:100%;border-collapse:collapse;color:#6f5a42;font:14px Arial,sans-serif;">
            <tr>
              <td style="padding:8px 0;color:#8A571A;letter-spacing:0.18em;text-transform:uppercase;">Name</td>
              <td style="padding:8px 0;text-align:right;">${escapeHtml(entry.fullName)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#8A571A;letter-spacing:0.18em;text-transform:uppercase;">Attendance</td>
              <td style="padding:8px 0;text-align:right;">${escapeHtml(attendanceLabels[entry.attendance])}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#8A571A;letter-spacing:0.18em;text-transform:uppercase;">Guests</td>
              <td style="padding:8px 0;text-align:right;">${entry.guests}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#8A571A;letter-spacing:0.18em;text-transform:uppercase;">Events</td>
              <td style="padding:8px 0;text-align:right;">${escapeHtml(getEventsLabel(entry))}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  `;
}

function buildConfirmationText(entry: RSVPEntry): string {
  const contacts = weddingData.rsvpContacts
    .map((contact) => `${contact.name}: ${contact.phones.join(" / ")}`)
    .join("\n");

  return [
    `Thank you, ${entry.fullName}.`,
    "",
    `We have received your RSVP for ${weddingData.couple.partnerOne} & ${weddingData.couple.partnerTwo}'s wedding.`,
    "",
    `Attendance: ${attendanceLabels[entry.attendance]}`,
    `Guests: ${entry.guests}`,
    `Events: ${getEventsLabel(entry)}`,
    `Date: ${weddingData.date.display}`,
    `Venue: ${weddingData.venue.name}, ${weddingData.venue.area}`,
    "",
    "If anything changes, please contact us by phone:",
    contacts,
  ].join("\n");
}

function encodeHeader(value: string): string {
  return /[^\x20-\x7E]/.test(value)
    ? `=?UTF-8?B?${Buffer.from(value).toString("base64")}?=`
    : value;
}

function dotStuff(value: string): string {
  return value.replace(/\r?\n/g, "\r\n").replace(/^\./gm, "..");
}

function buildMimeMessage({
  from,
  to,
  replyTo,
  subject,
  text,
  html,
}: {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
}): string {
  const boundary = `ce-rsvp-${Date.now().toString(36)}`;
  const headers = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${encodeHeader(subject)}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ];

  if (replyTo) headers.splice(2, 0, `Reply-To: ${replyTo}`);

  return [
    ...headers,
    "",
    `--${boundary}`,
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: 8bit",
    "",
    text,
    "",
    `--${boundary}`,
    "Content-Type: text/html; charset=UTF-8",
    "Content-Transfer-Encoding: 8bit",
    "",
    html,
    "",
    `--${boundary}--`,
    "",
  ].join("\r\n");
}

async function sendSmtpCommand(
  socket: tls.TLSSocket,
  command: string,
  expectedCodes: string[]
): Promise<string> {
  socket.write(`${command}\r\n`);
  return readSmtpResponse(socket, expectedCodes);
}

function readSmtpResponse(
  socket: tls.TLSSocket,
  expectedCodes: string[]
): Promise<string> {
  return new Promise((resolve, reject) => {
    let buffer = "";

    const cleanup = () => {
      socket.off("data", onData);
      socket.off("error", onError);
    };

    const onError = (error: Error) => {
      cleanup();
      reject(error);
    };

    const onData = (chunk: Buffer) => {
      buffer += chunk.toString("utf8");
      const lines = buffer.split(/\r?\n/).filter(Boolean);
      const lastLine = lines.at(-1);

      if (!lastLine || !/^\d{3} /.test(lastLine)) return;

      cleanup();
      const code = lastLine.slice(0, 3);
      if (expectedCodes.includes(code)) {
        resolve(buffer);
      } else {
        reject(new Error(`SMTP command failed: ${buffer.trim()}`));
      }
    };

    socket.on("data", onData);
    socket.on("error", onError);
  });
}

function connectToGmailSmtp(): Promise<tls.TLSSocket> {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(
      465,
      "smtp.gmail.com",
      { servername: "smtp.gmail.com" },
      () => resolve(socket)
    );
    socket.once("error", reject);
  });
}

async function sendWithGmailSmtp({
  from,
  to,
  replyTo,
  subject,
  html,
  text,
}: {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
}): Promise<void> {
  const user = process.env.GMAIL_SMTP_USER || DEFAULT_GMAIL_USER;
  const password = process.env.GMAIL_SMTP_APP_PASSWORD;
  if (!password) {
    throw new Error("Missing GMAIL_SMTP_APP_PASSWORD");
  }

  const socket = await connectToGmailSmtp();
  try {
    await readSmtpResponse(socket, ["220"]);
    await sendSmtpCommand(socket, "EHLO elysee-chance.local", ["250"]);
    await sendSmtpCommand(socket, "AUTH LOGIN", ["334"]);
    await sendSmtpCommand(
      socket,
      Buffer.from(user).toString("base64"),
      ["334"]
    );
    await sendSmtpCommand(
      socket,
      Buffer.from(password).toString("base64"),
      ["235"]
    );
    await sendSmtpCommand(socket, `MAIL FROM:<${user}>`, ["250"]);
    await sendSmtpCommand(socket, `RCPT TO:<${to}>`, ["250", "251"]);
    await sendSmtpCommand(socket, "DATA", ["354"]);
    socket.write(
      `${dotStuff(
        buildMimeMessage({ from, to, replyTo, subject, text, html })
      )}\r\n.\r\n`
    );
    await readSmtpResponse(socket, ["250"]);
    await sendSmtpCommand(socket, "QUIT", ["221"]);
  } finally {
    socket.end();
  }
}

async function sendWithResend({
  from,
  to,
  replyTo,
  subject,
  html,
  text,
}: {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("Missing RESEND_API_KEY");

  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: replyTo,
      subject,
      html,
      text,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Confirmation email failed: ${details}`);
  }
}

export async function sendRSVPConfirmationEmail(
  entry: RSVPEntry
): Promise<boolean> {
  if (!entry.email) return false;

  const gmailUser = process.env.GMAIL_SMTP_USER || DEFAULT_GMAIL_USER;
  const from = process.env.RSVP_EMAIL_FROM || `Chance & Elysee <${gmailUser}>`;
  const replyTo = process.env.RSVP_EMAIL_REPLY_TO || gmailUser;
  const subject = `RSVP confirmation for ${weddingData.couple.partnerOne} & ${weddingData.couple.partnerTwo}`;
  const html = buildConfirmationHtml(entry);
  const text = buildConfirmationText(entry);

  if (process.env.GMAIL_SMTP_APP_PASSWORD) {
    await sendWithGmailSmtp({
      from,
      to: entry.email,
      replyTo,
      subject,
      html,
      text,
    });
    return true;
  }

  if (!process.env.RESEND_API_KEY) {
    console.warn("RSVP confirmation email skipped: email is not configured.");
    return false;
  }

  await sendWithResend({
    from,
    to: entry.email,
    replyTo,
    subject,
    html,
    text,
  });
  return true;
}
