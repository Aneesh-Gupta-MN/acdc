// Approved clinic facts and feature flags; unconfirmed fields remain null or disabled by design.
import type { SiteContent } from "@/types/content";

export const siteContent: SiteContent = {
  clinicName: "All Care Dental Centre",
  tagline: "Care in every detail.",
  phone: "+91 9844069010",
  primaryContact: "Dr. Venkatesh M J",
  emergencyPhone: null,
  whatsapp: null,
  address: null,
  mapUrl: null,
  email: null,
  openingHours: [],
  consultationHours: [],
  heritage: { text: null, approved: false },
  features: {
    enquiryForm: false,
    whatsapp: false,
    reviews: false,
    liveTooth: true,
  },
};

export const emergencyGuidance =
  "If you have an urgent dental concern, please call the clinic directly. Availability and the next appropriate step will be confirmed by the clinic.";

export const appointmentGuidance =
  "Call the clinic and our team will help confirm the next appropriate step.";
