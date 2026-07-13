import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import AdminDashboard from "@/components/AdminDashboard";
import { createMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata: Metadata = createMetadata({
  title: "Admin — Chance & Elysee",
  description: "Private RSVP dashboard for Chance & Elysee's wedding.",
  path: "/admin",
  noIndex: true,
});

export default function AdminPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <PageHeader
          eyebrow="Wedding Admin"
          title={
            <>
              RSVP <em>Dashboard</em>
            </>
          }
          subtitle="An overview of every response, saved locally on this device."
        />
        <AdminDashboard />
      </div>
    </div>
  );
}
