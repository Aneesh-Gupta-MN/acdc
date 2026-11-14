import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const baseURL = process.env.OPENING_BASE_URL ?? "http://127.0.0.1:3001";
const outputDirectory = new URL("./scroll-choreography-verification/", import.meta.url);
const viewports = [
  { name: "mobile-390x844", width: 390, height: 844 },
  { name: "short-360x740", width: 360, height: 740 },
  { name: "large-mobile-430x932", width: 430, height: 932 },
  { name: "desktop-1440x900", width: 1440, height: 900 },
];
const checkpoints = [
  { name: "p0", p: 0 },
  { name: "p0-3", p: 0.3 },
  { name: "p0-52", p: 0.52 },
  { name: "p0-8", p: 0.8 },
  { name: "q0-5", q: 0.5 },
  { name: "q1", q: 1 },
];
const browser = await chromium.launch({ headless: true });
const report = { checkpoints: [], lifecycle: {}, reducedMotion: {}, loadingFailure: {}, consoleErrors: [] };

await mkdir(outputDirectory, { recursive: true });

const openPage = async (context) => {
  const page = await context.newPage();
  page.on("console", (message) => {
    if (message.type() === "error") report.consoleErrors.push(message.text());
  });
  await page.goto(`${baseURL}/?openingDebug=1`, { waitUntil: "networkidle" });
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
  });
  await page.waitForFunction(() => document.querySelector('[aria-label="Opening motion debug"]')?.textContent?.includes("ready"));
  return page;
};

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport });
  const page = await openPage(context);
  for (const checkpoint of checkpoints) {
    await page.evaluate(({ p, q }) => {
      const track = document.querySelector("[class*='storyTrack']");
      const distance = Number.parseFloat(getComputedStyle(track).getPropertyValue("--story-distance"));
      window.scrollTo(0, p === undefined ? distance + q * window.innerHeight : distance * p);
    }, checkpoint);
    await page.waitForTimeout(120);
    const filename = `${viewport.name}-${checkpoint.name}.png`;
    await page.screenshot({ path: new URL(filename, outputDirectory).pathname });
    const metrics = await page.evaluate(() => {
      const stage = document.querySelector("[class*='storyStage']");
      const track = document.querySelector("[class*='storyTrack']");
      const doctor = document.querySelector("#doctor");
      const doctorHeading = document.querySelector("#opening-doctor-title");
      const header = document.querySelector("header");
      const initials = document.querySelector("[class*='doctorCopy'] h3 span");
      const debug = document.querySelector('[aria-label="Opening motion debug"]');
      const rect = (element) => element ? Object.fromEntries(["top", "bottom", "left", "right", "width", "height"].map((key) => [key, element.getBoundingClientRect()[key]])) : null;
      return {
        scrollY: window.scrollY,
        viewport: { width: innerWidth, height: innerHeight },
        storyDistance: Number.parseFloat(getComputedStyle(track).getPropertyValue("--story-distance")),
        stage: rect(stage), doctor: rect(doctor), doctorHeading: rect(doctorHeading), header: rect(header), initials: rect(initials),
        headerBacked: header?.getAttribute("data-backed"),
        debug: debug?.textContent?.replace(/\s+/g, " ").trim(),
        canvasCount: document.querySelectorAll("[data-testid='opening-tooth-canvas'] canvas").length,
      };
    });
    report.checkpoints.push({ viewport: viewport.name, checkpoint: checkpoint.name, filename, ...metrics });
  }
  await context.close();
}

// Fast jumps, reverse scrolling, resize, and focus all use the same mounted canvas/model.
{
  const failureBrowser = await chromium.launch({ headless: true });
  const context = await failureBrowser.newContext({ viewport: { width: 390, height: 844 } });
  let modelRequests = 0;
  const page = await context.newPage();
  page.on("request", (request) => {
    if (request.url().includes("/models/third_molar.glb")) modelRequests += 1;
  });
  page.on("console", (message) => {
    if (message.type() === "error") report.consoleErrors.push(message.text());
  });
  await page.goto(`${baseURL}/?openingDebug=1`, { waitUntil: "networkidle" });
  await page.evaluate(() => { document.documentElement.style.scrollBehavior = "auto"; });
  await page.waitForFunction(() => document.querySelector('[aria-label="Opening motion debug"]')?.textContent?.includes("ready"));
  const jump = (value) => page.evaluate((ratio) => {
    const track = document.querySelector("[class*='storyTrack']");
    const distance = Number.parseFloat(getComputedStyle(track).getPropertyValue("--story-distance"));
    window.scrollTo(0, distance * ratio);
  }, value);
  await jump(0.8); await page.waitForTimeout(80);
  await jump(0.3); await page.waitForTimeout(80);
  await jump(1); await page.waitForTimeout(80);
  await jump(0); await page.waitForTimeout(80);
  await page.locator("[data-testid='opening-tooth-canvas'] canvas").evaluate((node) => { node.dataset.lifecycleProbe = "same-canvas"; });
  const distanceBeforeResize = await page.evaluate(() => Number.parseFloat(getComputedStyle(document.querySelector("[class*='storyTrack']")).getPropertyValue("--story-distance")));
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(120);
  const distanceAfterResize = await page.evaluate(() => Number.parseFloat(getComputedStyle(document.querySelector("[class*='storyTrack']")).getPropertyValue("--story-distance")));
  await page.getByRole("button", { name: "Open menu" }).focus();
  const focusVisible = await page.getByRole("button", { name: "Open menu" }).evaluate((node) => node.matches(":focus-visible"));
  report.lifecycle = {
    modelRequests,
    canvasCount: await page.locator("[data-testid='opening-tooth-canvas'] canvas").count(),
    canvasPersistedAcrossResize: await page.locator("[data-testid='opening-tooth-canvas'] canvas[data-lifecycle-probe='same-canvas']").count() === 1,
    distanceBeforeResize,
    distanceAfterResize,
    expectedBeforeResize: 844 * 1.8,
    expectedAfterResize: 900 * 1.8,
    focusVisible,
  };
  await context.close();
  await failureBrowser.close();
}

// Reduced motion must remove the sticky spacer and keep sections in ordinary flow.
{
  const context = await browser.newContext({ viewport: { width: 360, height: 740 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto(baseURL, { waitUntil: "networkidle" });
  report.reducedMotion = await page.evaluate(() => {
    const stage = document.querySelector("[class*='storyStage']");
    const doctor = document.querySelector("#doctor");
    const track = document.querySelector("[class*='storyTrack']");
    return {
      stagePosition: getComputedStyle(stage).position,
      doctorMarginTop: getComputedStyle(doctor).marginTop,
      trackHeight: track.getBoundingClientRect().height,
      documentHeight: document.documentElement.scrollHeight,
      viewportHeight: innerHeight,
      openingReserveVisible: document.querySelector("[data-testid='opening-tooth-reserve']").getBoundingClientRect().height > 0,
      careReserveVisible: document.querySelector("[data-testid='care-tooth-reserve']").getBoundingClientRect().height > 0,
    };
  });
  await page.screenshot({ path: new URL("reduced-motion-360x740.png", outputDirectory).pathname, fullPage: false });
  await context.close();
}

// A failed GLB request should produce the existing fallback once, without an update loop.
{
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  let errors = 0;
  page.on("console", (message) => { if (message.type() === "error") errors += 1; });
  await page.route("**/models/third_molar.glb", (route) => route.abort("failed"));
  await page.goto(`${baseURL}/?openingDebug=1`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1500);
  report.loadingFailure = {
    fallbackCount: await page.locator("[data-testid='tooth-fallback']").count(),
    errorBoundaryCount: await page.locator("[data-testid='tooth-model-error']").count(),
    consoleErrorCount: errors,
  };
  await context.close();
}

// Slow forward and reverse pass for visual lifecycle review.
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, recordVideo: { dir: new URL("./video/", outputDirectory).pathname, size: { width: 1440, height: 900 } } });
  const page = await openPage(context);
  const distance = await page.evaluate(() => Number.parseFloat(getComputedStyle(document.querySelector("[class*='storyTrack']")).getPropertyValue("--story-distance")));
  for (let step = 0; step <= 30; step += 1) { await page.evaluate((y) => scrollTo(0, y), ((distance + 900) * step) / 30); await page.waitForTimeout(90); }
  for (let step = 30; step >= 0; step -= 1) { await page.evaluate((y) => scrollTo(0, y), ((distance + 900) * step) / 30); await page.waitForTimeout(90); }
  await page.close();
  await context.close();
}

await browser.close();
report.consoleErrors = [...new Set(report.consoleErrors)];
await writeFile(new URL("report.json", outputDirectory), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
