import Reveal from "@/components/Reveal";
import styles from "./QuoteBand.module.css";

interface QuoteBandProps {
  quote: string;
  attribution?: string;
  image: string;
}
const quote_image  = "/images/couple/DSC09615.JPG"
export default function QuoteBand({ quote, attribution, image }: QuoteBandProps) {
  return (
    <section
      className={styles.band}
      style={{ backgroundImage: `url(${quote_image})` }}
    >
      <div className={styles.overlay} aria-hidden="true" />
      <Reveal className={styles.inner} variant="zoom">
        <span className={styles.mark} aria-hidden="true">
          &ldquo;
        </span>
        <p className={styles.quote}>{quote}</p>
        {attribution && <p className={styles.attribution}>{attribution}</p>}
      </Reveal>
    </section>
  );
}
