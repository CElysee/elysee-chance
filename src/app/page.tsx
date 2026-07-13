import Hero from "@/components/Hero";
import OurStory from "@/components/OurStory";
import QuoteBand from "@/components/QuoteBand";
import Schedule from "@/components/Schedule";
import DressCode from "@/components/DressCode";
import GalleryPreview from "@/components/GalleryPreview";
import Venue from "@/components/Venue";
import RSVPCta from "@/components/RSVPCta";
import PhotoMarquee from "@/components/PhotoMarquee";
import { seoConfig } from "@/lib/seo";
import { weddingData } from "@/data/weddingData";

function HomeStructuredData() {
  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Chance & Elysee Wedding",
    description:
      "Wedding celebration for Chance & Elysee at Jalia Hall in Rusororo, Kigali, Rwanda.",
    startDate: weddingData.date.iso,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    image: [`${seoConfig.siteUrl}${seoConfig.defaultImage}`],
    url: seoConfig.siteUrl,
    location: {
      "@type": "Place",
      name: weddingData.venue.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: weddingData.venue.address,
        addressLocality: "Kigali",
        addressCountry: "RW",
      },
    },
    organizer: {
      "@type": "Organization",
      name: weddingData.families.names,
    },
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([eventJsonLd, websiteJsonLd]),
      }}
    />
  );
}

export default function HomePage() {
  return (
    <>
      <HomeStructuredData />
      <Hero />
      <OurStory />
      <QuoteBand
        quote="“And the Lord God said, ‘It is not good that the man should be alone; I will make him a helper suitable for him.’”"
        attribution="Genesis 2:18"
        image="/images/couple/gallery-2.jpg"
      />
      <Schedule />
      <DressCode />
      <GalleryPreview />
      <Venue />
      <RSVPCta />
      <PhotoMarquee />
    </>
  );
}
