"use client";

import { useState, type FormEvent } from "react";
import { eventLabels } from "@/data/weddingData";
import { createId, saveRemoteRSVP, saveRSVP } from "@/lib/storage";
import type {
  Attendance,
  GuestCategory,
  GuestSide,
  WeddingEventId,
} from "@/types/wedding";
import styles from "./RSVPForm.module.css";

const attendanceOptions: { value: Attendance; label: string }[] = [
  { value: "yes", label: "Joyfully accepts" },
  { value: "no", label: "Regretfully declines" },
  { value: "maybe", label: "Not sure yet" },
];

const eventOptions: { value: WeddingEventId; label: string }[] = [
  { value: "dowry", label: eventLabels.dowry },
  { value: "church", label: eventLabels.church },
  { value: "reception", label: eventLabels.reception },
];

const allEventIds = eventOptions.map((option) => option.value);

const sideOptions: { value: GuestSide; label: string }[] = [
  { value: "bride", label: "Bride side" },
  { value: "groom", label: "Groom side" },
  { value: "both", label: "Both" },
];

const categoryOptions: { value: GuestCategory; label: string }[] = [
  { value: "family", label: "Family" },
  { value: "friend", label: "Friend" },
  { value: "work", label: "Work" },
  { value: "church", label: "Church" },
  { value: "vip", label: "VIP" },
];

export default function RSVPForm() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [attendance, setAttendance] = useState<Attendance | "">("");
  const [guests, setGuests] = useState(1);
  const [events, setEvents] = useState<WeddingEventId[]>([]);
  const [side, setSide] = useState<GuestSide | "">("");
  const [category, setCategory] = useState<GuestCategory | "">("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [emailNotice, setEmailNotice] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const allEventsSelected = allEventIds.every((id) => events.includes(id));

  const toggleEvent = (id: WeddingEventId) => {
    setEvents((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const toggleWholeDay = () => {
    setEvents(allEventsSelected ? [] : allEventIds);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (!fullName.trim() || !phone.trim()) {
      setError("Please share your name and phone number.");
      return;
    }
    if (!attendance) {
      setError("Please let us know if you will attend.");
      return;
    }
    if (!side || !category) {
      setError("Please select your guest side and category.");
      return;
    }
    setError("");
    setSubmitting(true);
    const entry = {
      id: createId(),
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      attendance,
      guests,
      events,
      side,
      category,
      message: message.trim() || undefined,
      submittedAt: new Date().toISOString(),
    };

    try {
      const result = await saveRemoteRSVP(entry);
      saveRSVP(entry);
      setEmailNotice(
        entry.email && result.emailSent === false
          ? "Your RSVP was saved, but we could not send the confirmation email."
          : ""
      );
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "We could not save your RSVP. Please try again in a moment."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className={styles.success}>
        <span className={styles.successOrnament} aria-hidden="true">
          ❦
        </span>
        <h2 className={styles.successTitle}>Thank you for your RSVP.</h2>
        <p className={styles.successText}>
          We can&rsquo;t wait to celebrate with you.
        </p>
        <hr className="goldRule" />
        <p className={styles.successMeta}>
          30 August 2026 · Jalia Hall, Rusororo
        </p>
        {emailNotice && <p className={styles.successNotice}>{emailNotice}</p>}
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <div className={styles.field}>
          <label className="fieldLabel" htmlFor="rsvp-name">
            Full Name *
          </label>
          <input
            id="rsvp-name"
            className="fieldInput"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your full name"
            autoComplete="name"
            required
          />
        </div>
        <div className={styles.field}>
          <label className="fieldLabel" htmlFor="rsvp-phone">
            Phone Number *
          </label>
          <input
            id="rsvp-phone"
            className="fieldInput"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+250 ..."
            autoComplete="tel"
            required
          />
        </div>
      </div>

      <div className={styles.field}>
        <label className="fieldLabel" htmlFor="rsvp-email">
          Email <span className={styles.optional}>(optional)</span>
        </label>
        <input
          id="rsvp-email"
          className="fieldInput"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
        />
      </div>

      <fieldset className={styles.fieldset}>
        <legend className="fieldLabel">Will you attend? *</legend>
        <div className={styles.pillGroup}>
          {attendanceOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`${styles.pill} ${
                attendance === option.value ? styles.pillActive : ""
              }`}
              onClick={() => setAttendance(option.value)}
              aria-pressed={attendance === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className="fieldLabel" htmlFor="rsvp-guests">
            Number of Guests
          </label>
          <select
            id="rsvp-guests"
            className="fieldInput"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label className="fieldLabel" htmlFor="rsvp-side">
            Guest Side *
          </label>
          <select
            id="rsvp-side"
            className="fieldInput"
            value={side}
            onChange={(e) => setSide(e.target.value as GuestSide)}
            required
          >
            <option value="" disabled>
              Select a side
            </option>
            {sideOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <fieldset className={styles.fieldset}>
        <legend className="fieldLabel">Which events will you attend?</legend>
        <div className={styles.pillGroup}>
          <button
            type="button"
            className={`${styles.pill} ${
              allEventsSelected ? styles.pillActive : ""
            }`}
            onClick={toggleWholeDay}
            aria-pressed={allEventsSelected}
          >
            Whole Day
          </button>
          {eventOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`${styles.pill} ${
                events.includes(option.value) ? styles.pillActive : ""
              }`}
              onClick={() => toggleEvent(option.value)}
              aria-pressed={events.includes(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className={styles.field}>
        <label className="fieldLabel" htmlFor="rsvp-category">
          Guest Category *
        </label>
        <select
          id="rsvp-category"
          className="fieldInput"
          value={category}
          onChange={(e) => setCategory(e.target.value as GuestCategory)}
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          {categoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label className="fieldLabel" htmlFor="rsvp-message">
          Message to the Couple <span className={styles.optional}>(optional)</span>
        </label>
        <textarea
          id="rsvp-message"
          className="fieldInput"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="A few words for Chance & Elysee..."
          rows={4}
        />
      </div>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        className={`btn btnGold ${styles.submit}`}
        disabled={submitting}
      >
        {submitting ? "Sending..." : "Send RSVP"}
      </button>
    </form>
  );
}
