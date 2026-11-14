// Metadata uses only verified public content and keeps canonical URLs stable across preview and production builds.
import type { Metadata } from "next";
import { publicEnv } from "@/lib/env";
import { siteContent } from "@/content/site";

export function buildSiteMetadata(): Metadata {
  return {
    title: `${siteContent.clinicName} | Thoughtful care. Considered dentistry.`,
    description:
      "Explore All Care Dental Centre’s treatments and call the clinic to discuss an appointment enquiry.",
    metadataBase: new URL(publicEnv.siteUrl),
    alternates: { canonical: "/" },
    openGraph: {
      title: siteContent.clinicName,
      description:
        "A calm, patient-friendly introduction to All Care Dental Centre and its approved treatment paths.",
      type: "website",
      url: publicEnv.siteUrl,
      siteName: siteContent.clinicName,
    },
    robots: publicEnv.indexingApproved ? "index, follow" : "noindex, nofollow",
    icons: { icon: "/icons/favicon.svg" },
  };
}
