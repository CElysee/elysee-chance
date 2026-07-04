import Link from "next/link";
import LogoLockup from "@/components/LogoLockup";
import { weddingData } from "@/data/weddingData";
import styles from "./Footer.module.css";

export default function Footer() {
  const { date, venue } = weddingData;

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.lockup}>
          <LogoLockup />
        </div>
        <p className={styles.meta}>
          {date.display} · {venue.name}, {venue.area}, Kigali
        </p>

        <nav className={styles.nav} aria-label="Footer">
          <Link href="/rsvp">RSVP</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/guestbook">Guestbook</Link>
        </nav>

        <hr className="goldRule" />
        <p className={styles.closing}>
          With love, we can&rsquo;t wait to celebrate with you.
        </p>
      </div>
    </footer>
  );
}
