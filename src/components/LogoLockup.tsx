import { weddingData } from "@/data/weddingData";
import styles from "./LogoLockup.module.css";

interface LogoLockupProps {
  className?: string;
}

/**
 * CSS recreation of the couple's invitation logo:
 * ZIRAJE / CHANCE & CONFIANCE / ELYSEE with a large script ampersand.
 */
export default function LogoLockup({ className = "" }: LogoLockupProps) {
  const { lockup } = weddingData.couple;

  return (
    <span
      className={`${styles.lockup} ${className}`.trim()}
      role="img"
      aria-label={`${lockup.top} ${lockup.nameOne} and ${lockup.nameTwo} ${lockup.bottom}`}
    >
      <span className={styles.amp} aria-hidden="true">
        &amp;
      </span>
      <span className={styles.top} aria-hidden="true">
        {lockup.top}
      </span>
      <span className={styles.nameOne} aria-hidden="true">
        {lockup.nameOne}
      </span>
      <span className={styles.nameTwo} aria-hidden="true">
        {lockup.nameTwo}
      </span>
      <span className={styles.bottom} aria-hidden="true">
        {lockup.bottom}
      </span>
    </span>
  );
}
