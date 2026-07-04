export type Attendance = "yes" | "no" | "maybe";

export type GuestSide = "bride" | "groom" | "both";

export type GuestCategory = "family" | "friend" | "work" | "church" | "vip";

export type WeddingEventId = "dowry" | "church" | "reception";

export interface RSVPEntry {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  attendance: Attendance;
  guests: number;
  events: WeddingEventId[];
  side: GuestSide;
  category: GuestCategory;
  message?: string;
  submittedAt: string;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

export interface ScheduleEvent {
  id: WeddingEventId;
  number: string;
  title: string;
  time: string;
  venue: string;
  description: string;
}
