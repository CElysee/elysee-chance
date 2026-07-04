import Reveal from "@/components/Reveal";
import { weddingData } from "@/data/weddingData";
import styles from "./Invitation.module.css";

export default function Invitation() {
  const { date, venue, families, verse } = weddingData;

  return (
    <section className={`section ${styles.invitation}`} id="invitation">
      <img
        className={styles.floralTop}
        src="/images/brand/floral-corner.jpg"
        alt=""
        aria-hidden="true"
      />
      <img
        className={styles.floralBottom}
        src="/images/brand/floral-corner-flip.jpg"
        alt=""
        aria-hidden="true"
      />

      <div className="container">
        <Reveal className={styles.card} variant="zoom">
          <span className={styles.frame} aria-hidden="true" />

          <p className={styles.families}>{families.intro}</p>
          <p className={styles.parents}>{families.names}</p>

          <p className={styles.line}>
            together with our families
            <br />
            joyfully invite you to celebrate
            <br />
            the wedding of our children
          </p>

          <img
            className={styles.logo}
            src="/images/brand/logo-gold.png"
            alt="Ziraje Chance and Confiance Elysee"
          />

          <div className={styles.dateRow}>
            <span className={styles.dateWord}>August</span>
            <span className={styles.dateBar} aria-hidden="true" />
            <span className={styles.dateDay}>
              30<sup>th</sup>
            </span>
            <span className={styles.dateBar} aria-hidden="true" />
            <span className={styles.dateWord}>2026</span>
          </div>

          <p className={styles.venueLine}>
            {venue.name} · {venue.area} · Kigali
          </p>

          <blockquote className={styles.verse}>
            <p>{verse.text}</p>
            <cite>— {verse.reference}</cite>
          </blockquote>

          <p className={styles.dayName}>{date.dayName}, from 9:00 AM</p>
        </Reveal>
      </div>
    </section>
  );
}
