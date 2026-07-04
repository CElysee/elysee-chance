import Reveal from "@/components/Reveal";
import { scheduleEvents, weddingData } from "@/data/weddingData";
import styles from "./Schedule.module.css";

export default function Schedule() {
  return (
    <section className={`section ${styles.schedule}`} id="schedule">
      <div className="container">
        <Reveal className={styles.header}>
          <p className="eyebrow">The Celebration</p>
          <h2 className="displayTitle">One Day. Three Moments.</h2>
          <p className={styles.subtitle}>
            {weddingData.date.dayName}, {weddingData.date.display}
          </p>
        </Reveal>

        <div className={styles.timeline}>
          <span className={styles.line} aria-hidden="true" />
          {scheduleEvents.map((event, i) => (
            <Reveal
              key={event.id}
              className={`${styles.event} ${i % 2 === 1 ? styles.eventAlt : ""}`}
              delay={0.1}
            >
              <span className={styles.node} aria-hidden="true" />
              <div className={styles.eventBody}>
                <span className={styles.number} aria-hidden="true">
                  {event.number}
                </span>
                <div className={styles.eventContent}>
                  <p className={styles.time}>
                    {event.time}
                    <span className={styles.venueTag}>{event.venue}</span>
                  </p>
                  <h3 className={styles.eventTitle}>{event.title}</h3>
                  <p className={styles.description}>{event.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
