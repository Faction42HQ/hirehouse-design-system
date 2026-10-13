#!/usr/bin/env node
// Exports every logo variant from the tie identity file (assets/brand/source/hirehouse-tie-identity.html)
// using the file's own bake() / pngBlob() functions, so the output is exactly what the identity defines.
//
//   cd ../your-app-with-playwright && node ../hirehouse-design-system/scripts/export-logos.mjs
//
// Output (assets/brand/):
//   svg/hirehouse-<variant>-<light|dark>[-<accent>].svg        transparent background
//   svg/on-ground/…                                             with the light/dark ground baked in
//   png/<width>/hirehouse-<variant>-<light|dark>[-<accent>].png transparent, widths 512 / 1024 / 2048
//   png/on-ground/2048/…                                        with the ground, 2048 wide
// The brand-blue tie is the default (no suffix). Audience accents (lime, yellow, lilac) are exported
// for the primary wordmark only.
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { mkdirSync, writeFileSync } from "node:fs";

const { chromium } = createRequire(process.cwd() + "/")("playwright");
const root = fileURLToPath(new URL("../assets/brand/", import.meta.url));
const source = pathToFileURL(root + "source/hirehouse-tie-identity.html").href;
const WIDTHS = [512, 1024, 2048];
const ACCENT_VARIANTS = { lime: ["primary"], yellow: ["primary"], lilac: ["primary"] };

const browser = await chromium.launch({ channel: "chrome" }).catch(() => chromium.launch());
const page = await browser.newPage();
await page.goto(source);

async function exportAll(accent, onlyKeys) {
  return page.evaluate(async ({ accent, onlyKeys, WIDTHS }) => {
    // The page keeps `accent` in a top-level let; drive it through its own swatch buttons.
    document.querySelector(`.sw button[data-a="${accent}"]`)?.click();
    const toB64 = (blob) => new Promise((ok) => { const r = new FileReader(); r.onload = () => ok(r.result.split(",")[1]); r.readAsDataURL(blob); });
    const out = [];
    for (const pane of document.querySelectorAll(".pane")) {
      const key = pane.dataset.key, mode = pane.dataset.mode;
      if (onlyKeys && !onlyKeys.includes(key)) continue;
      for (const ground of ["transparent", "solid"]) {
        document.getElementById("bg").value = ground === "transparent" ? "transparent" : document.querySelector("#bg option:not([value=transparent])").value;
        const svg = '<?xml version="1.0" encoding="UTF-8"?>\n' + bake(pane).outerHTML;
        out.push({ key, mode, ground, kind: "svg", data: svg });
        const widths = ground === "transparent" ? WIDTHS : [2048];
        for (const w of widths) {
          const sel = document.getElementById("px");
          if (![...sel.options].some((o) => o.value == w)) sel.add(new Option(String(w), String(w)));
          sel.value = String(w);
          out.push({ key, mode, ground, kind: "png", width: w, data: await toB64(await pngBlob(pane)) });
        }
      }
    }
    return out;
  }, { accent, onlyKeys, WIDTHS });
}

let count = 0;
for (const [accent, keys] of [["blue", null], ...Object.entries(ACCENT_VARIANTS)]) {
  const files = await exportAll(accent, keys);
  for (const f of files) {
    const name = `hirehouse-${f.key}-${f.mode}${accent === "blue" ? "" : "-" + accent}`;
    const dir = f.kind === "svg"
      ? root + (f.ground === "solid" ? "svg/on-ground/" : "svg/")
      : root + (f.ground === "solid" ? `png/on-ground/${f.width}/` : `png/${f.width}/`);
    mkdirSync(dir, { recursive: true });
    if (f.kind === "svg") writeFileSync(dir + name + ".svg", f.data);
    else writeFileSync(dir + name + ".png", Buffer.from(f.data, "base64"));
    count++;
  }
}
await browser.close();
console.log(`exported ${count} files to ${root}`);
