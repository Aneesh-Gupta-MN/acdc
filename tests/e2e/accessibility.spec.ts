// Accessibility browser checks verify keyboard-visible actions and the mobile navigation disclosure.
import { expect, test } from "@playwright/test";

test("mobile menu exposes named navigation and closes with Escape", async ({ page, isMobile }) => {
  await page.goto("/");
  if (!isMobile) return;
  const trigger = page.getByRole("button", { name: "Open menu" });
  await trigger.focus();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
});
