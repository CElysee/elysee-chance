import type { ScheduleEvent } from "@/types/wedding";

export const weddingData = {
  couple: {
    partnerOne: "Chance",
    partnerTwo: "Elysee",
    // full brand lockup, as on the invitation: Ziraje Chance & Confiance Elysee
    lockup: {
      top: "Ziraje",
      nameOne: "Chance",
      nameTwo: "Confiance",
      bottom: "Elysee",
    },
    monogram: "C · E",
  },
  families: {
    intro: "The families of",
    names: "Nzeyimana Oscar & Segatare P Claver",
  },
  verse: {
    text: "“And the Lord God said, ‘It is not good that the man should be alone; I will make him a helper suitable for him.’”",
    reference: "Genesis 2:18",
  },
  date: {
    iso: "2026-08-30T09:00:00+02:00",
    display: "30 August 2026",
    dayName: "Sunday",
  },
  venue: {
    name: "Jalia Hall",
    area: "Rusororo",
    address: "Rusororo, Gasabo District, Kigali, Rwanda",
    mapsQuery: "Jalia Hall Rusororo Kigali Rwanda",
    arrivalNote:
      "Complimentary parking is available at the venue. We kindly ask guests to arrive twenty minutes early so every moment can begin on time.",
  },
  rsvpContacts: [
    { name: "Elysee", phones: ["+250 782 384 772", "+250 788 664 258"] },
    { name: "Chance", phones: ["+250 788 641 759", "+250 784 520 951"] },
  ],
  invitation: {
    line1: "Together with their families,",
    names: "Chance & Elysee",
    line2: "invite you to celebrate their wedding day.",
  },
  story: {
    title: "Two Hearts. One Promise.",
    text: "From a simple beginning to a love that feels like home, our journey has been filled with laughter, faith, growth, and beautiful memories. We are excited to celebrate this next chapter with the people who mean the most to us.",
  },
  dressCode: {
    title: "Red, Gold & Black Affair",
    text: "We invite our guests to dress elegantly in Red, Gold, Black, or a beautiful combination of these colors.",
    ladies:
      "Elegant dresses, gowns, or traditional attire in red, gold, black, or a refined combination.",
    gentlemen:
      "Black suits, formal wear, or traditional attire with red or gold accents.",
    swatches: [
      { name: "Luxury Red", hex: "#A80014" },
      { name: "Gold", hex: "#C99A3D" },
      { name: "Black", hex: "#050505" },
    ],
  },
};

export const scheduleEvents: ScheduleEvent[] = [
  {
    id: "dowry",
    number: "01",
    title: "Introduction & Dowry",
    time: "9:00 AM",
    venue: "Jalia Hall",
    description:
      "A morning of tradition and family, as two households become one in the time-honoured Rwandan way.",
  },
  {
    id: "church",
    number: "02",
    title: "Church Ceremony",
    time: "2:00 PM",
    venue: "Jalia Garden",
    description:
      "Vows spoken before God, family, and friends — the sacred heart of the day.",
  },
  {
    id: "reception",
    number: "03",
    title: "Reception",
    time: "5:00 PM",
    venue: "Jalia Hall",
    description:
      "An evening of dinner, toasts, and dancing beneath the lights as the celebration begins.",
  },
];

export const eventLabels: Record<string, string> = {
  dowry: "Introduction & Dowry",
  church: "Church Ceremony",
  reception: "Reception",
};

export interface GalleryImage {
  src: string;
  alt: string;
  mono?: boolean;
  wide?: boolean;
}

export const galleryImages: GalleryImage[] = [
  { src: "/images/couple/DSC09595.JPG", alt: "Chance and Elysee in a quiet engagement portrait" },
  { src: "/images/couple/DSC09598.JPG", alt: "Chance and Elysee sharing a warm moment together" },
  { src: "/images/couple/DSC09603.JPG", alt: "Chance and Elysee posing together outdoors" },
  { src: "/images/couple/DSC09615.JPG", alt: "Chance and Elysee sharing a quiet moment among the palms" },
  { src: "/images/couple/DSC09625.JPG", alt: "Chance and Elysee smiling during their engagement session" },
  { src: "/images/couple/DSC09630.JPG", alt: "Chance and Elysee standing together before forever" },
  { src: "/images/couple/DSC09637.JPG", alt: "Chance and Elysee in an intimate black and white portrait", mono: true },
  { src: "/images/couple/DSC09642.jpg", alt: "Chance and Elysee captured in a tender outdoor frame" },
  { src: "/images/couple/DSC09646.JPG", alt: "Chance and Elysee arm in arm" },
  { src: "/images/couple/DSC09661.JPG", alt: "Chance and Elysee sharing a joyful engagement moment" },
  { src: "/images/couple/DSC09675.JPG", alt: "Chance and Elysee facing forever together" },
  { src: "/images/couple/DSC09686.JPG", alt: "Chance and Elysee in a romantic portrait" },
  { src: "/images/couple/DSC09690.JPG", alt: "Chance and Elysee together in a soft outdoor scene" },
  { src: "/images/couple/DSC09700.JPG", alt: "Chance and Elysee holding each other close" },
  { src: "/images/couple/DSC09716.JPG", alt: "Chance and Elysee in a graceful engagement portrait" },
  { src: "/images/couple/DSC09728.JPG", alt: "Chance and Elysee seated together in black and white", mono: true },
  { src: "/images/couple/DSC09747.JPG", alt: "Chance and Elysee sharing a candid moment" },
  { src: "/images/couple/DSC09753.JPG", alt: "Chance and Elysee celebrating their love story" },
  { src: "/images/couple/hero.jpg", alt: "Chance and Elysee in the hero portrait" },
  { src: "/images/couple/story.jpg", alt: "Chance and Elysee in their story portrait" },
];
