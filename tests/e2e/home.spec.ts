// Home browser checks cover section order, verified actions, and the absence of invented contact surfaces.
import { expect, test } from "@playwright/test";

test("renders the public clinic journey and verified call action", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Call the clinic" }).first()).toHaveAttribute("href", "tel:+919844069010");
  await expect(page.getByText("Since 1969", { exact: true })).toBeVisible();
  await page.mouse.wheel(0, 900);
  await expect(page.getByRole("heading", { name: "Care in every detail." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "A considered view of the care available." })).toBeVisible();
  await expect(page.getByText("Caring for patients since 1969")).toHaveCount(0);
  await expect(page.getByText("Patient proof")).toHaveCount(0);
});

test("keeps the page usable at a narrow viewport", async ({ page }) => {
  await page.goto("/");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow).toBe(false);
});
