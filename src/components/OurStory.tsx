import Reveal from "@/components/Reveal";
import { weddingData } from "@/data/weddingData";
import styles from "./OurStory.module.css";

const chapters = [
  {
    numeral: "I",
    ghost: "Us",
    title: "The Beginning",
    quote: "It started quietly — the way the best things do.",
    text: "Before the plans, the dresses, and the guest lists, there was simply us: two people who found an easy laughter in each other, and a friendship that kept growing until it had another name. What began as ordinary days slowly became the story we now can't imagine living without.",
    image: "/images/couple/DSC09637.JPG",
    alt: "Chance and Elysee holding hands by the lake, in black and white",
  },
  {
    numeral: "II",
    ghost: "Yes",
    title: "The Yes",
    quote: "One question. One answer. Forever found its date.",
    text: "Under a wide Rwandan sky, with a racing heart and a ring in hand, the question was finally asked — and answered without a moment's doubt. In that instant, everything we had hoped for quietly became everything we are about to begin.",
    image: "/images/couple/story.jpg",
    alt: "Elysee resting her hand, wearing her engagement ring, as they sit together",
  },
  {
    numeral: "III",
    ghost: "Forever",
    title: "The Celebration",
    quote: "Now we gather everyone we love in one place.",
    text: "On 30 August 2026, at Jalia Hall in Rusororo, our two families become one. A morning of tradition, an afternoon of vows, an evening of dancing — and the people who mean the most to us, all under the same sky. This is the chapter we've been waiting for.",
    image: "/images/couple/DSC09615.JPG",
    alt: "Chance and Elysee arm in arm, smiling",
  },
];

export default function OurStory() {
  const { couple, story } = weddingData;

  return (
    <section className={`section ${styles.story}`} id="story">
      <div className="container">
        <Reveal className={styles.header}>
          <p className="eyebrow">Our Story</p>
          <h2 className="displayTitle">
            Two Hearts. <em className={styles.titleEm}>One Promise.</em>
          </h2>
          <p className={styles.lede}>{story.text}</p>
        </Reveal>

        <div className={styles.chapters}>
          {chapters.map((chapter, i) => {
            const flip = i % 2 === 1;
            return (
              <article
                key={chapter.numeral}
                className={`${styles.chapter} ${flip ? styles.chapterFlip : ""}`}
              >
                <span className={styles.ghost} aria-hidden="true">
                  {chapter.ghost}
                </span>

                <Reveal
                  className={styles.imageWrap}
                  variant={flip ? "right" : "left"}
                  as="figure"
                >
                  <div className={styles.imageInner}>
                    <img src={chapter.image} alt={chapter.alt} loading="lazy" />
                  </div>
                  <span className={styles.imageFrame} aria-hidden="true" />
                  <span className={styles.numeral} aria-hidden="true">
                    {chapter.numeral}
                  </span>
                </Reveal>

                <Reveal
                  className={styles.panel}
                  variant={flip ? "left" : "right"}
                  delay={0.15}
                >
                  <p className={styles.chapterKicker}>
                    Chapter {chapter.numeral}
                  </p>
                  <h3 className={styles.chapterTitle}>{chapter.title}</h3>
                  <hr className="goldRuleLeft" />
                  <p className={styles.quote}>{chapter.quote}</p>
                  <p className={styles.text}>{chapter.text}</p>
                </Reveal>
              </article>
            );
          })}
        </div>

        <Reveal className={styles.signatureBlock}>
          <hr className="goldRule" />
          <p className={styles.signature}>
            With all our love,
            <em>
              {couple.partnerOne} &amp; {couple.partnerTwo}
            </em>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
