import type { Metadata } from "next";

const siteUrl = "https://4mine.rw";
const siteName = "Chance & Elysee Wedding";
const defaultImage = "/images/couple/DSC09637.JPG";
const iconImage = "/images/brand/logo-gold.png";

type PageSeo = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

export const seoConfig = {
  siteUrl,
  siteName,
  defaultImage,
  iconImage,
};

export function createMetadata({
  title,
  description,
  path = "/",
  image = defaultImage,
  noIndex = false,
}: PageSeo): Metadata {
  const url = new URL(path, siteUrl).toString();
  const imageUrl = new URL(image, siteUrl).toString();

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 2880,
          height: 3600,
          alt: "Chance and Elysee wedding celebration",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
