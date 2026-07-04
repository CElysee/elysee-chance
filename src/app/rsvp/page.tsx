import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import RSVPForm from "@/components/RSVPForm";
import { weddingData } from "@/data/weddingData";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "RSVP — Chance & Elysee",
  description:
    "Kindly respond by RSVP for the wedding of Chance & Elysee, 30 August 2026 at Jalia Hall, Rusororo, Kigali.",
};

export default function RSVPPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <PageHeader
          eyebrow="Kindly Respond"
          title={
            <>
              Will you <em>join us?</em>
            </>
          }
          subtitle="Your presence is the greatest gift. Please let us know if you will celebrate with us on 30 August 2026."
        />
        <div className={styles.formWrap}>
          <RSVPForm />
        </div>

        <aside className={styles.contacts}>
          <p className={styles.contactsTitle}>Prefer to RSVP by phone?</p>
          <div className={styles.contactsGrid}>
            {weddingData.rsvpContacts.map((contact) => (
              <div key={contact.name} className={styles.contact}>
                <span className={styles.contactName}>{contact.name}</span>
                {contact.phones.map((phone) => (
                  <a
                    key={phone}
                    className={styles.contactPhone}
                    href={`tel:${phone.replace(/\s/g, "")}`}
                  >
                    {phone}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
