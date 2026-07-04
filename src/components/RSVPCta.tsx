import Link from "next/link";
import Reveal from "@/components/Reveal";
import { weddingData } from "@/data/weddingData";
import styles from "./RSVPCta.module.css";

export default function RSVPCta() {
  return (
    <section className={`section ${styles.cta}`} id="rsvp">
      <div className={`container ${styles.inner}`}>
        <Reveal>
          <p className={styles.eyebrow}>Kindly Respond</p>
          <h2 className={styles.title}>
            Will you <em>join us?</em>
          </h2>
          <p className={styles.text}>
            Your presence is the greatest gift. Let us know you&rsquo;re coming
            before {weddingData.date.display}.
          </p>
          <Link href="/rsvp" className="btn btnGold">
            RSVP Now
          </Link>
          <p className={styles.families}>
            Together with the families of {weddingData.families.names}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
