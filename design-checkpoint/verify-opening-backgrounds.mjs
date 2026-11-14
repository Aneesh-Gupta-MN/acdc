import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const baseURL = process.env.OPENING_BASE_URL ?? "http://127.0.0.1:3001";
const outputDirectory = new URL("./opening-background-verification/", import.meta.url);
const viewports = [
  { name: "mobile-390x844", width: 390, height: 844 },
  { name: "desktop-1440x900", width: 1440, height: 900 },
];
const progressValues = [0, 0.45, 0.8];
const browser = await chromium.launch({ headless: true });
const report = [];

await mkdir(outputDirectory, { recursive: true });

for (const viewport of viewports) {
  const page = await browser.newPage({ viewport });
  const imageResponses = [];
  page.on("response", (response) => {
    if (response.url().includes("/images/opening/")) {
      imageResponses.push({ url: response.url(), status: response.status() });
    }
  });
  await page.goto(`${baseURL}/?openingDebug=1`, { waitUntil: "networkidle" });
  await page.waitForFunction(() => document.querySelector('[data-ready="true"]'));
  await page.waitForFunction(() => document.querySelector('[aria-label="Opening motion debug"]')?.textContent?.includes("ready"));

  for (const progress of progressValues) {
    await page.evaluate((p) => {
      const track = document.querySelector("[class*='storyTrack']");
      const distance = Number.parseFloat(getComputedStyle(track).getPropertyValue("--story-distance"));
      window.scrollTo(0, distance * p);
    }, progress);
    await page.waitForTimeout(200);
    const filename = `${viewport.name}-p${String(progress).replace(".", "-")}.png`;
    await page.screenshot({ path: new URL(filename, outputDirectory).pathname });
    const state = await page.evaluate(() => {
      const stage = document.querySelector("[class*='storyStage']");
      const canvas = document.querySelector("[data-testid='opening-tooth-canvas'] canvas");
      const backgroundImages = [...document.querySelectorAll("[aria-hidden='true'] picture img")];
      return {
        ivoryOpacity: getComputedStyle(stage).getPropertyValue("--ivory-opacity").trim(),
        burgundyOpacity: getComputedStyle(stage).getPropertyValue("--burgundy-opacity").trim(),
        canvasBackground: canvas ? getComputedStyle(canvas).backgroundColor : "fallback",
        backgrounds: backgroundImages.map((image) => ({ currentSrc: image.currentSrc, complete: image.complete, naturalWidth: image.naturalWidth })),
      };
    });
    report.push({ viewport: viewport.name, progress, filename, ...state });
  }

  report.push({ viewport: viewport.name, imageResponses });
  await page.close();
}

await browser.close();
await writeFile(new URL("report.json", outputDirectory), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
