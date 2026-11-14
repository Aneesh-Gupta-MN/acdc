// Contact tests protect the exact telephone destination and ensure unsupported link types fail closed.
import { describe, expect, it } from "vitest";
import { emailHref, mapHref, phoneHref, whatsappHref } from "@/lib/contact-links";

describe("contact links", () => {
  it("creates the approved telephone link", () => {
    expect(phoneHref("+91 9844069010")).toBe("tel:+919844069010");
  });

  it("does not expose unsupported WhatsApp, map, or email destinations", () => {
    expect(whatsappHref(null)).toBeNull();
    expect(mapHref(null)).toBeNull();
    expect(emailHref(null)).toBeNull();
  });

  it("rejects malformed contact values", () => {
    expect(phoneHref("not-a-number")).toBeNull();
    expect(mapHref("javascript:alert(1)")).toBeNull();
    expect(emailHref("not-an-email")).toBeNull();
  });
});
