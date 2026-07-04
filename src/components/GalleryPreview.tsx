import Link from "next/link";
import Reveal from "@/components/Reveal";
import { galleryImages } from "@/data/weddingData";
import styles from "./GalleryPreview.module.css";

interface GalleryPreviewProps {
  full?: boolean;
  hideHeader?: boolean;
}

export default function GalleryPreview({
  full = false,
  hideHeader = false,
}: GalleryPreviewProps) {
  const images = full ? galleryImages : galleryImages.slice(0, 15);

  return (
    <section className={`section ${styles.gallery}`} id="gallery">
      <div className="container">
        {!hideHeader && (
          <Reveal className={styles.header}>
            <p className="eyebrow">The Gallery</p>
            <h2 className="displayTitle">
              Moments Before <em className={styles.titleEm}>Forever</em>
            </h2>
          </Reveal>
        )}

        <div className={styles.masonry}>
          {images.map((image, i) => (
            <Reveal
              key={image.src}
              as="figure"
              className={`${styles.item} ${image.wide ? styles.wide : ""} ${
                image.mono ? styles.mono : ""
              }`}
              delay={(i % 3) * 0.1}
            >
              <img src={image.src} alt={image.alt} loading="lazy" />
              <figcaption className={styles.caption}>
                <span>{String(i + 1).padStart(2, "0")}</span>
              </figcaption>
            </Reveal>
          ))}
        </div>

        {!full && (
          <Reveal className={styles.cta}>
            <Link href="/gallery" className="btn btnGhost">
              View Full Gallery
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
