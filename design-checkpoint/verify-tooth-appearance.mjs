import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const baseURL = process.env.OPENING_BASE_URL ?? "http://127.0.0.1:3001";
const outputDirectory = new URL("./tooth-appearance-verification/", import.meta.url);
const viewports = [
  { name: "mobile-390x844", width: 390, height: 844 },
  { name: "desktop-1440x900", width: 1440, height: 900 },
];
const appearances = ["source", "presentation"];
const progressValues = [0, 0.8];
const browser = await chromium.launch({ headless: true });
const report = [];

await mkdir(outputDirectory, { recursive: true });

for (const viewport of viewports) {
  for (const appearance of appearances) {
    const page = await browser.newPage({ viewport });
    const requests = [];
    page.on("response", (response) => {
      if (response.url().includes("third-molar") || response.url().includes("third_molar")) requests.push({ url: response.url(), status: response.status() });
    });
    const query = appearance === "source" ? "?openingDebug=1&toothSource=1" : "?openingDebug=1";
    await page.goto(`${baseURL}/${query}`, { waitUntil: "networkidle" });
    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = "auto";
    });
    await page.waitForFunction(() => document.querySelector('[aria-label="Opening motion debug"]')?.textContent?.includes("ready"));

    for (const progress of progressValues) {
      await page.evaluate((p) => {
        const track = document.querySelector("[class*='storyTrack']");
        const distance = Number.parseFloat(getComputedStyle(track).getPropertyValue("--story-distance"));
        window.scrollTo(0, distance * p);
      }, progress);
      await page.waitForTimeout(250);
      const filename = `${viewport.name}-${appearance}-p${String(progress).replace(".", "-")}.png`;
      await page.screenshot({ path: new URL(filename, outputDirectory).pathname });
      const state = await page.evaluate(() => {
        const canvas = document.querySelector("[data-testid='opening-tooth-canvas'] canvas");
        const stage = document.querySelector("[class*='storyStage']");
        const canvasBox = canvas?.getBoundingClientRect();
        const stageBox = stage?.getBoundingClientRect();
        return {
          scrollY: window.scrollY,
          canvasBackground: canvas ? getComputedStyle(canvas).backgroundColor : "missing",
          canvasBox: canvasBox ? { width: canvasBox.width, height: canvasBox.height } : null,
          stageBox: stageBox ? { top: stageBox.top, bottom: stageBox.bottom } : null,
        };
      });
      report.push({ viewport: viewport.name, appearance, progress, filename, ...state });
    }
    report.push({ viewport: viewport.name, appearance, requests });
    await page.close();
  }
}

await browser.close();
await writeFile(new URL("report.json", outputDirectory), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
