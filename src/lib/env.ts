// Public environment handling supplies safe metadata defaults and avoids exposing server secrets to the client.
import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  NEXT_PUBLIC_INDEXING_APPROVED: z.enum(["true", "false"]).optional(),
});

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_INDEXING_APPROVED: process.env.NEXT_PUBLIC_INDEXING_APPROVED,
});

if (!parsed.success && process.env.NODE_ENV === "production") {
  throw new Error("Invalid public environment configuration.");
}

const values = parsed.success ? parsed.data : {};

export const publicEnv = {
  siteUrl: values.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  indexingApproved: values.NEXT_PUBLIC_INDEXING_APPROVED === "true",
};
