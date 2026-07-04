import { galleryImages } from "@/data/weddingData";
import styles from "./PhotoMarquee.module.css";

export default function PhotoMarquee() {
  const strip = [...galleryImages, ...galleryImages];

  return (
    <section className={styles.marquee} aria-label="Photo film strip">
      <div className={styles.track}>
        {strip.map((image, i) => (
          <figure className={styles.item} key={`${image.src}-${i}`}>
            <img
              src={image.src}
              alt={i < galleryImages.length ? image.alt : ""}
              loading="lazy"
              aria-hidden={i >= galleryImages.length}
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
