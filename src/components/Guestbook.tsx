"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  createId,
  getGuestbookEntries,
  saveGuestbookEntry,
} from "@/lib/storage";
import type { GuestbookEntry } from "@/types/wedding";
import styles from "./Guestbook.module.css";

export default function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [thanks, setThanks] = useState(false);

  useEffect(() => {
    setEntries(getGuestbookEntries());
    setLoaded(true);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError("Please add your name and a message.");
      return;
    }
    setError("");
    const entry: GuestbookEntry = {
      id: createId(),
      name: name.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };
    saveGuestbookEntry(entry);
    setEntries((prev) => [entry, ...prev]);
    setName("");
    setMessage("");
    setThanks(true);
    window.setTimeout(() => setThanks(false), 4000);
  };

  return (
    <div className={styles.guestbook}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <label className="fieldLabel" htmlFor="gb-name">
            Your Name
          </label>
          <input
            id="gb-name"
            className="fieldInput"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Who is this beautiful message from?"
            autoComplete="name"
          />
        </div>
        <div className={styles.field}>
          <label className="fieldLabel" htmlFor="gb-message">
            Your Message
          </label>
          <textarea
            id="gb-message"
            className="fieldInput"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share your wishes for Chance & Elysee..."
            rows={4}
          />
        </div>

        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}
        {thanks && (
          <p className={styles.thanks} role="status">
            Your wishes have been added. Thank you.
          </p>
        )}

        <button type="submit" className="btn btnGold">
          Sign the Guestbook
        </button>
      </form>

      <div className={styles.entries}>
        {loaded && entries.length === 0 && (
          <p className={styles.empty}>
            Be the first to leave your wishes for the couple.
          </p>
        )}
        {entries.map((entry, i) => (
          <blockquote
            key={entry.id}
            className={styles.entry}
            style={{ animationDelay: `${Math.min(i, 6) * 0.08}s` }}
          >
            <span className={styles.quoteMark} aria-hidden="true">
              &ldquo;
            </span>
            <p className={styles.entryMessage}>{entry.message}</p>
            <footer className={styles.entryFooter}>
              <cite className={styles.entryName}>{entry.name}</cite>
              <span className={styles.entryDate}>
                {new Date(entry.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </footer>
          </blockquote>
        ))}
      </div>
    </div>
  );
}
