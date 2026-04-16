import { test } from "@playwright/test";

test("Screenshot skipped persona banner", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000/?persona=skipped", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: "/tmp/persona-skipped-v2.png", fullPage: false });
});

test("Screenshot onboarded persona banner", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000/?persona=onboarded", { waitUntil: "networkidle" });
  await page.waitForSelector("text=Master Agile");
  await page.screenshot({ path: "/tmp/persona-onboarded-v3.png", fullPage: false });
});

test("Screenshot in-progress persona", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000/?persona=in-progress", { waitUntil: "networkidle" });
  await page.waitForSelector("text=Master Agile");
  await page.screenshot({ path: "/tmp/persona-in-progress-v3.png", fullPage: false });
});
