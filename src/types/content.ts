// Shared content types distinguish verified clinic facts from optional fields that must stay hidden.
export interface ClinicHours {
  label: string;
  value: string;
}

export interface SiteContent {
  clinicName: string;
  tagline: string | null;
  phone: string | null;
  primaryContact: string | null;
  emergencyPhone: string | null;
  whatsapp: string | null;
  address: string | null;
  mapUrl: string | null;
  email: string | null;
  openingHours: ClinicHours[];
  consultationHours: ClinicHours[];
  heritage: { text: string | null; approved: boolean };
  features: {
    enquiryForm: boolean;
    whatsapp: boolean;
    reviews: boolean;
    liveTooth: boolean;
  };
}

export interface Treatment {
  slug: string;
  name: string;
  description: string;
}

export interface Doctor {
  name: string;
  role: string;
  credentials: string[];
  biography: string | null;
  image: string | null;
}

export interface Review {
  quote: string;
  attribution: string | null;
  approved: boolean;
}
