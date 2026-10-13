// Captures reference screenshots of the live landing page.
// Usage: node scripts/capture-screenshots.mjs [baseUrl]   (default http://localhost:3001)
// Run from any project that has `playwright` installed (resolved from the current directory):
//   cd ../your-app && node ../hirehouse-design-system/scripts/capture-screenshots.mjs
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
const { chromium } = createRequire(process.cwd() + "/")("playwright");
const base = process.argv[2] ?? "http://localhost:3001";
const out = fileURLToPath(new URL("../assets/screenshots/", import.meta.url));
// Prefers the installed Google Chrome; falls back to Playwright's bundled Chromium.
const browser = await chromium.launch({ channel: "chrome" }).catch(() => chromium.launch());
for (const [name, viewport, scheme] of [
  ["desktop", { width: 1440, height: 900 }, "light"],
  ["mobile", { width: 390, height: 844 }, "light"],
]) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1, colorScheme: scheme, reducedMotion: "reduce" });
  // Pre-answer the cookie banner (essential only) so it stays out of the shot.
  const { hostname } = new URL(base);
  await ctx.addCookies([{ name: "hh_consent", value: "denied", domain: hostname, path: "/" }]);
  const page = await ctx.newPage();
  await page.goto(base + "/", { waitUntil: "networkidle" });
  // Hide the Next.js dev-mode indicator if this is a dev server.
  await page.addStyleTag({ content: "nextjs-portal{display:none!important}" });
  // Scroll through once so in-view animations settle.
  const h = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += viewport.height / 2) { await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(120); }
  await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(400);
  await page.screenshot({ path: `${out}landing-${name}-hero.png` });
  await page.screenshot({ path: `${out}landing-${name}-full.png`, fullPage: true });
  await ctx.close();
}
await browser.close();
console.log("done");
