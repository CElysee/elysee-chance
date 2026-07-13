import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Guestbook from "@/components/Guestbook";
import { createMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata: Metadata = createMetadata({
  title: "Guestbook — Chance & Elysee Wedding",
  description:
    "Leave wishes, blessings, and kind words for Chance & Elysee before their wedding day.",
  path: "/guestbook",
});

export default function GuestbookPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <PageHeader
          eyebrow="The Guestbook"
          title={
            <>
              Words for <em>the Couple</em>
            </>
          }
          subtitle="Leave your wishes, blessings, and beautiful words for Chance & Elysee."
        />
        <Guestbook />
      </div>
    </div>
  );
}
