import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import GalleryPreview from "@/components/GalleryPreview";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Gallery — Chance & Elysee",
  description:
    "Moments before forever — a gallery of Chance & Elysee ahead of their wedding day.",
};

export default function GalleryPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <PageHeader
          eyebrow="The Gallery"
          title={
            <>
              Moments Before <em>Forever</em>
            </>
          }
          subtitle="A love story in frames — the quiet, golden moments that brought us here."
        />
      </div>
      <div className={styles.galleryWrap}>
        <GalleryPreview full hideHeader />
      </div>
    </div>
  );
}
