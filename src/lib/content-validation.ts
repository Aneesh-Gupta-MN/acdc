// Zod validation is the production guard that keeps unapproved optional facts from reaching rendered sections.
import { z } from "zod";
import type { Review, SiteContent, Treatment } from "@/types/content";

const siteSchema = z.object({
  clinicName: z.string().min(1),
  tagline: z.string().nullable(),
  phone: z.string().nullable(),
  primaryContact: z.string().nullable(),
  emergencyPhone: z.string().nullable(),
  whatsapp: z.string().nullable(),
  address: z.string().nullable(),
  mapUrl: z.string().url().nullable(),
  email: z.string().email().nullable(),
  openingHours: z.array(z.object({ label: z.string(), value: z.string() })),
  consultationHours: z.array(z.object({ label: z.string(), value: z.string() })),
  heritage: z.object({ text: z.string().nullable(), approved: z.boolean() }),
  features: z.object({
    enquiryForm: z.boolean(),
    whatsapp: z.boolean(),
    reviews: z.boolean(),
    liveTooth: z.boolean(),
  }),
});

function isValidPhone(value: string | null): boolean {
  return value === null || /^\+?[0-9 ()-]{8,20}$/.test(value);
}

export function validateSiteContent(content: SiteContent): void {
  siteSchema.parse(content);
  if (!isValidPhone(content.phone) || !isValidPhone(content.emergencyPhone) || !isValidPhone(content.whatsapp)) {
    throw new Error("Clinic contact values must be valid telephone numbers.");
  }
  if ((content.address === null) !== (content.mapUrl === null)) {
    throw new Error("Address and map URL must either both be present or both be absent.");
  }
  if (content.features.whatsapp && content.whatsapp === null) {
    throw new Error("WhatsApp cannot be enabled without an approved WhatsApp number.");
  }
  if (content.heritage.approved && content.heritage.text === null) {
    throw new Error("Approved heritage content must include text.");
  }
}

export function canPublishHeritage(heritage: SiteContent["heritage"]): boolean {
  return heritage.approved && heritage.text !== null;
}

export function approvedReviews(reviews: Review[], enabled: boolean): Review[] {
  return enabled ? reviews.filter((review) => review.approved) : [];
}

export function validateTreatments(items: Treatment[]): void {
  if (items.length !== 9 || items.some((item) => !item.slug || !item.name || !item.description)) {
    throw new Error("Phase One must contain exactly nine complete approved treatments.");
  }
}
