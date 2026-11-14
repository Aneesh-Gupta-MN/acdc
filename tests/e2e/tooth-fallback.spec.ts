// Fallback browser checks prove reduced motion leaves the static tooth and all essential text available.
import { expect, test } from "@playwright/test";

test("keeps the static opening composition under reduced motion", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByTestId("opening-tooth-reserve")).toBeVisible();
  await expect(page.getByTestId("care-tooth-reserve")).toBeVisible();
  await expect(page.getByRole("link", { name: "Request an appointment" }).first()).toBeVisible();
  await context.close();
});
