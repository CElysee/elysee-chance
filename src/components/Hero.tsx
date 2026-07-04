"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Countdown from "@/components/Countdown";
import LogoLockup from "@/components/LogoLockup";
import { weddingData } from "@/data/weddingData";
import styles from "./Hero.module.css";

const heroImages = [
  { src: "/images/couple/DSC09637.JPG", position: "center 55%" },
  { src: "/images/couple/DSC09615.JPG", position: "center 24%" },
  { src: "/images/couple/DSC09728.JPG", position: "center 30%" },
];

export default function Hero() {
  const { date, venue } = weddingData;
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActive((i) => (i + 1) % heroImages.length),
      7000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section className={styles.hero} id="top">
      {heroImages.map((image, i) => (
        <div
          key={image.src}
          className={`${styles.slide} ${i === active ? styles.slideActive : ""}`}
          style={{
            backgroundImage: `url(${image.src})`,
            backgroundPosition: image.position,
          }}
          aria-hidden="true"
        />
      ))}
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />
      <div className={styles.frame} aria-hidden="true" />

      <div className={styles.content}>
        <p className={`${styles.item} ${styles.eyebrow}`}>The Wedding Of</p>

        <h1 className={`${styles.item} ${styles.names}`}>
          <LogoLockup />
        </h1>

        <div className={`${styles.item} ${styles.meta}`}>
          <p className={styles.metaDate}>
            {date.dayName} <em>·</em> {date.display}
          </p>
          <p className={styles.metaVenue}>
            <span className={styles.metaDash} aria-hidden="true" />
            {venue.name}, {venue.area}
            <span className={styles.metaDash} aria-hidden="true" />
          </p>
        </div>

        <div className={`${styles.item} ${styles.countdownWrap}`}>
          <Countdown />
        </div>

        <div className={`${styles.item} ${styles.actions}`}>
          <Link href="/rsvp" className="btn btnGold">
            RSVP Now
          </Link>
          <Link href="/#schedule" className="btn btnGhost">
            View Schedule
          </Link>
        </div>
      </div>

      <div className={styles.dots} aria-hidden="true">
        {heroImages.map((image, i) => (
          <button
            key={image.src}
            className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
            onClick={() => setActive(i)}
            tabIndex={-1}
          />
        ))}
      </div>

      <a
        href="#story"
        className={styles.scrollCue}
        aria-label="Scroll to our story"
      >
        <span className={styles.scrollLine} />
      </a>
    </section>
  );
}
