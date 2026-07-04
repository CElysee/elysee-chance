import type { GuestbookEntry, RSVPEntry } from "@/types/wedding";

const RSVP_KEY = "ce-wedding-rsvps";
const GUESTBOOK_KEY = "ce-wedding-guestbook";

function read<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

function write<T>(key: string, items: T[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(items));
}

export function createId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function getRSVPs(): RSVPEntry[] {
  return read<RSVPEntry>(RSVP_KEY);
}

export function saveRSVP(entry: RSVPEntry): void {
  write(RSVP_KEY, [entry, ...getRSVPs()]);
}

export async function getRemoteRSVPs(): Promise<RSVPEntry[]> {
  const response = await fetch("/api/rsvps");
  if (!response.ok) {
    const data = (await response.json().catch(() => ({}))) as { error?: string };
    throw new Error(data.error || "Could not load RSVPs.");
  }
  const data = (await response.json()) as { rsvps?: RSVPEntry[] };
  return data.rsvps ?? [];
}

export async function saveRemoteRSVP(
  entry: RSVPEntry
): Promise<{ emailSent?: boolean; emailError?: string }> {
  const response = await fetch("/api/rsvps", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry),
  });

  const data = (await response.json().catch(() => ({}))) as {
    error?: string;
    emailSent?: boolean;
    emailError?: string;
  };

  if (!response.ok) {
    throw new Error(data.error || "Could not save RSVP.");
  }

  return {
    emailSent: data.emailSent,
    emailError: data.emailError,
  };
}

export function getGuestbookEntries(): GuestbookEntry[] {
  return read<GuestbookEntry>(GUESTBOOK_KEY);
}

export function saveGuestbookEntry(entry: GuestbookEntry): void {
  write(GUESTBOOK_KEY, [entry, ...getGuestbookEntries()]);
}
