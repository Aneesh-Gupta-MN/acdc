// Robots rules keep drafts and previews out of search until the client approves launch indexing.
import type { MetadataRoute } from "next";
import { publicEnv } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  if (!publicEnv.indexingApproved) {
    return { rules: { userAgent: "*", disallow: "/" }, sitemap: `${publicEnv.siteUrl}/sitemap.xml` };
  }
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${publicEnv.siteUrl}/sitemap.xml` };
}
