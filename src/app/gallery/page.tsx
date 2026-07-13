import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import GalleryPreview from "@/components/GalleryPreview";
import { createMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata: Metadata = createMetadata({
  title: "Gallery — Chance & Elysee Wedding",
  description:
    "Engagement photos and wedding gallery moments for Chance & Elysee ahead of their wedding day in Kigali.",
  path: "/gallery",
  image: "/images/couple/DSC09637.JPG",
});

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
