import Reveal from "@/components/Reveal";
import { weddingData } from "@/data/weddingData";
import styles from "./DressCode.module.css";

export default function DressCode() {
  const { dressCode } = weddingData;

  return (
    <section className={`section ${styles.dresscode}`} id="dresscode">
      <img
        className={styles.rose}
        src="/images/brand/floral-rose.jpg"
        alt=""
        aria-hidden="true"
      />
      <div className="container">
        <Reveal className={styles.header}>
          <p className={styles.eyebrow}>Dress Code &amp; Theme</p>
          <h2 className={styles.title}>{dressCode.title}</h2>
          <p className={styles.intro}>{dressCode.text}</p>
        </Reveal>

        <div className={styles.swatches}>
          {dressCode.swatches.map((swatch, i) => (
            <Reveal key={swatch.name} className={styles.swatch} delay={i * 0.12}>
              <div
                className={styles.swatchColor}
                style={{ backgroundColor: swatch.hex }}
              >
                <span className={styles.swatchSheen} aria-hidden="true" />
              </div>
              <p className={styles.swatchName}>{swatch.name}</p>
              <p className={styles.swatchHex}>{swatch.hex}</p>
            </Reveal>
          ))}
        </div>

        <div className={styles.guidance}>
          <Reveal className={styles.guideCol}>
            <p className={styles.guideLabel}>Ladies</p>
            <hr className={styles.guideRule} />
            <p className={styles.guideText}>{dressCode.ladies}</p>
          </Reveal>
          <Reveal className={styles.guideCol} delay={0.12}>
            <p className={styles.guideLabel}>Gentlemen</p>
            <hr className={styles.guideRule} />
            <p className={styles.guideText}>{dressCode.gentlemen}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
