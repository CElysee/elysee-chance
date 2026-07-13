import Reveal from "@/components/Reveal";
import { weddingData } from "@/data/weddingData";
import styles from "./Venue.module.css";

export default function Venue() {
  const { venue } = weddingData;
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    venue.mapsQuery
  )}`;

  return (
    <section className={`section ${styles.venue}`} id="venue">
      <div className={`container ${styles.grid}`}>
        <Reveal className={styles.card} variant="left">
          <p className="eyebrow">The Venue</p>
          <h2 className={styles.title}>{venue.name}</h2>
          <p className={styles.address}>{venue.address}</p>
          <hr className="goldRuleLeft" />
          <p className={styles.note}>{venue.arrivalNote}</p>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btnGold"
          >
            Get Directions
          </a>
        </Reveal>

        <div className={styles.photos}>
          <Reveal className={styles.photoMain} variant="right" as="figure">
            <img
              src="/images/venue/jalia 1.jpeg"
              alt="The ceremony stage at Jalia Hall, dressed in peach, florals, and woven lanterns"
              loading="lazy"
            />
            <span className={styles.photoFrame} aria-hidden="true" />
          </Reveal>
          <Reveal
            className={styles.photoSmall}
            variant="right"
            delay={0.12}
            as="figure"
          >
            <img
              src="/images/venue/625359255_1934446710487016_968334504907840260_n.jpg"
              alt="The floral entrance arch at Jalia Hall"
              loading="lazy"
            />
          </Reveal>
          <Reveal
            className={`${styles.photoSmall} ${styles.photoOffset}`}
            variant="right"
            delay={0.2}
            as="figure"
          >
            <img
              src="/images/venue/jalia 2.JPG"
              alt="Reception tables set with gold chairs and florals at Jalia Hall"
              loading="lazy"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
