"use client";

import { useEffect, useState } from "react";
import { weddingData } from "@/data/weddingData";
import styles from "./Countdown.module.css";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft | null {
  const diff = new Date(weddingData.date.iso).getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function Countdown() {
  // null until mounted to avoid a server/client hydration mismatch
  const [time, setTime] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(getTimeLeft());
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (mounted && time === null) {
    return <p className={styles.today}>Today is the day.</p>;
  }

  const units = [
    { label: "Days", value: time ? String(time.days) : "—" },
    { label: "Hours", value: time ? pad(time.hours) : "—" },
    { label: "Minutes", value: time ? pad(time.minutes) : "—" },
    { label: "Seconds", value: time ? pad(time.seconds) : "—" },
  ];

  return (
    <div className={styles.countdown} role="timer" aria-label="Countdown to the wedding">
      {units.map((unit, i) => (
        <div key={unit.label} className={styles.unit}>
          {i > 0 && <span className={styles.divider} aria-hidden="true" />}
          <div className={styles.cell}>
            <span className={styles.value}>{unit.value}</span>
            <span className={styles.label}>{unit.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
