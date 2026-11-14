// Content tests prove required facts are present while unapproved optional content remains publishable only when approved.
import { describe, expect, it } from "vitest";
import { siteContent } from "@/content/site";
import { treatments } from "@/content/treatments";
import { canPublishHeritage, validateSiteContent, validateTreatments } from "@/lib/content-validation";

describe("Phase One content guard", () => {
  it("accepts the confirmed clinic content and exactly nine treatments", () => {
    expect(() => validateSiteContent(siteContent)).not.toThrow();
    expect(() => validateTreatments(treatments)).not.toThrow();
    expect(treatments).toHaveLength(9);
  });

  it("does not publish the unconfirmed heritage claim", () => {
    expect(siteContent.heritage.text).toBeNull();
    expect(canPublishHeritage({ text: "Caring for patients since 1969", approved: false })).toBe(false);
  });

  it("keeps unconfirmed contact surfaces empty", () => {
    expect(siteContent.address).toBeNull();
    expect(siteContent.mapUrl).toBeNull();
    expect(siteContent.whatsapp).toBeNull();
    expect(siteContent.features.whatsapp).toBe(false);
  });
});
