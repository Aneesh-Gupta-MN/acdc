// The sitemap exposes only the real public home route and uses the verified canonical site URL.
import type { MetadataRoute } from "next";
import { publicEnv } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: publicEnv.siteUrl, lastModified: new Date("2026-11-08") }];
}
