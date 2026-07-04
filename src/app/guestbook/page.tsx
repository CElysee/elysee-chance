import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Guestbook from "@/components/Guestbook";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Guestbook — Chance & Elysee",
  description:
    "Leave your wishes and blessings for Chance & Elysee ahead of their wedding day.",
};

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
