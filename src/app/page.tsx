import Hero from "@/components/Hero";
import OurStory from "@/components/OurStory";
import QuoteBand from "@/components/QuoteBand";
import Schedule from "@/components/Schedule";
import DressCode from "@/components/DressCode";
import GalleryPreview from "@/components/GalleryPreview";
import Venue from "@/components/Venue";
import RSVPCta from "@/components/RSVPCta";
import PhotoMarquee from "@/components/PhotoMarquee";

export default function HomePage() {
  return (
    <>
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
