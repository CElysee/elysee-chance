"use client";

import { useEffect, useMemo, useState } from "react";
import { eventLabels } from "@/data/weddingData";
import { getRemoteRSVPs, getRSVPs } from "@/lib/storage";
import type { RSVPEntry } from "@/types/wedding";
import styles from "./AdminDashboard.module.css";

const attendanceLabels: Record<string, string> = {
  yes: "Attending",
  no: "Declined",
  maybe: "Not sure",
};

const sideLabels: Record<string, string> = {
  bride: "Bride side",
  groom: "Groom side",
  both: "Both",
};

const categoryLabels: Record<string, string> = {
  family: "Family",
  friend: "Friend",
  work: "Work",
  church: "Church",
  vip: "VIP",
};

function toCsvValue(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}

export default function AdminDashboard() {
  const [rsvps, setRsvps] = useState<RSVPEntry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState("");

  const [attendanceFilter, setAttendanceFilter] = useState("all");
  const [eventFilter, setEventFilter] = useState("all");
  const [sideFilter, setSideFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    async function loadRSVPs() {
      try {
        setRsvps(await getRemoteRSVPs());
        setLoadError("");
      } catch {
        setRsvps(getRSVPs());
        setLoadError(
          "Could not load Google Sheet RSVPs. Showing this browser's backup entries."
        );
      } finally {
        setLoaded(true);
      }
    }

    loadRSVPs();
  }, []);

  const stats = useMemo(() => {
    const confirmed = rsvps.filter((r) => r.attendance === "yes");
    const pending = rsvps.filter((r) => r.attendance === "maybe");
    const declined = rsvps.filter((r) => r.attendance === "no");
    const expected = confirmed.reduce((sum, r) => sum + r.guests, 0);
    return {
      total: rsvps.length,
      confirmed: confirmed.length,
      pending: pending.length,
      declined: declined.length,
      expected,
    };
  }, [rsvps]);

  const filtered = useMemo(() => {
    return rsvps.filter((r) => {
      if (attendanceFilter !== "all" && r.attendance !== attendanceFilter)
        return false;
      if (eventFilter !== "all" && !r.events.includes(eventFilter as never))
        return false;
      if (sideFilter !== "all" && r.side !== sideFilter) return false;
      if (categoryFilter !== "all" && r.category !== categoryFilter)
        return false;
      return true;
    });
  }, [rsvps, attendanceFilter, eventFilter, sideFilter, categoryFilter]);

  const exportCsv = () => {
    const header = [
      "Name",
      "Phone",
      "Email",
      "Attendance",
      "Guests",
      "Events",
      "Side",
      "Category",
      "Message",
      "Submitted",
    ];
    const rows = filtered.map((r) =>
      [
        r.fullName,
        r.phone,
        r.email ?? "",
        attendanceLabels[r.attendance],
        String(r.guests),
        r.events.map((e) => eventLabels[e]).join("; "),
        sideLabels[r.side],
        categoryLabels[r.category],
        r.message ?? "",
        new Date(r.submittedAt).toLocaleString("en-GB"),
      ]
        .map(toCsvValue)
        .join(",")
    );
    const csv = [header.map(toCsvValue).join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `rsvps-chance-elysee-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const statCards = [
    { label: "Total RSVPs", value: stats.total, accent: styles.accentGold },
    { label: "Confirmed", value: stats.confirmed, accent: styles.accentGreenish },
    { label: "Pending", value: stats.pending, accent: styles.accentGold },
    { label: "Declined", value: stats.declined, accent: styles.accentRed },
    { label: "Expected Attendees", value: stats.expected, accent: styles.accentGold },
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.stats}>
        {statCards.map((card) => (
          <div key={card.label} className={`${styles.statCard} ${card.accent}`}>
            <span className={styles.statValue}>{card.value}</span>
            <span className={styles.statLabel}>{card.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.toolbar}>
        <div className={styles.filters}>
          <div className={styles.filter}>
            <label className="fieldLabel" htmlFor="filter-attendance">
              Attendance
            </label>
            <select
              id="filter-attendance"
              className="fieldInput"
              value={attendanceFilter}
              onChange={(e) => setAttendanceFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="yes">Attending</option>
              <option value="maybe">Not sure</option>
              <option value="no">Declined</option>
            </select>
          </div>
          <div className={styles.filter}>
            <label className="fieldLabel" htmlFor="filter-event">
              Event
            </label>
            <select
              id="filter-event"
              className="fieldInput"
              value={eventFilter}
              onChange={(e) => setEventFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="dowry">{eventLabels.dowry}</option>
              <option value="church">{eventLabels.church}</option>
              <option value="reception">{eventLabels.reception}</option>
            </select>
          </div>
          <div className={styles.filter}>
            <label className="fieldLabel" htmlFor="filter-side">
              Side
            </label>
            <select
              id="filter-side"
              className="fieldInput"
              value={sideFilter}
              onChange={(e) => setSideFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="bride">Bride side</option>
              <option value="groom">Groom side</option>
              <option value="both">Both</option>
            </select>
          </div>
          <div className={styles.filter}>
            <label className="fieldLabel" htmlFor="filter-category">
              Category
            </label>
            <select
              id="filter-category"
              className="fieldInput"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="family">Family</option>
              <option value="friend">Friend</option>
              <option value="work">Work</option>
              <option value="church">Church</option>
              <option value="vip">VIP</option>
            </select>
          </div>
        </div>
        <button
          className="btn btnGold"
          onClick={exportCsv}
          disabled={filtered.length === 0}
        >
          Export CSV
        </button>
      </div>

      <div className={styles.tableWrap}>
        {loadError && (
          <p className={styles.empty} role="alert">
            {loadError}
          </p>
        )}
        {loaded && filtered.length === 0 ? (
          <p className={styles.empty}>
            {rsvps.length === 0
              ? "No RSVPs yet. Google Sheet responses will appear here."
              : "No RSVPs match the current filters."}
          </p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Attendance</th>
                <th>Guests</th>
                <th>Events</th>
                <th>Side</th>
                <th>Category</th>
                <th>Message</th>
                <th>Submitted</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id}>
                  <td className={styles.nameCell}>{r.fullName}</td>
                  <td>{r.phone}</td>
                  <td>
                    <span
                      className={`${styles.badge} ${
                        r.attendance === "yes"
                          ? styles.badgeYes
                          : r.attendance === "no"
                            ? styles.badgeNo
                            : styles.badgeMaybe
                      }`}
                    >
                      {attendanceLabels[r.attendance]}
                    </span>
                  </td>
                  <td>{r.guests}</td>
                  <td>
                    {r.events.length > 0
                      ? r.events.map((e) => eventLabels[e]).join(", ")
                      : "—"}
                  </td>
                  <td>{sideLabels[r.side]}</td>
                  <td>{categoryLabels[r.category]}</td>
                  <td className={styles.messageCell}>{r.message || "—"}</td>
                  <td className={styles.dateCell}>
                    {new Date(r.submittedAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
