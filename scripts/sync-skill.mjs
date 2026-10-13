#!/usr/bin/env node
// Copies the canonical docs, tokens and brand assets into the self-contained skill folder.
// Run after editing anything in docs/, tokens/ or assets/brand/:   node scripts/sync-skill.mjs
import { cpSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("..", import.meta.url));
const skill = root + "skills/hirehouse-design-system/";
const map = {
  "docs/00-overview.md": "references/00-overview.md",
  "docs/01-foundations.md": "references/01-foundations.md",
  "docs/02-components.md": "references/02-components.md",
  "docs/04-brand-voice-and-positioning.md": "references/04-brand-voice-and-positioning.md",
  "docs/05-known-issues-and-open-questions.md": "references/05-known-issues-and-open-questions.md",
  "tokens/tokens.css": "tokens/tokens.css",
  "tokens/tokens.json": "tokens/tokens.json",
  "tokens/tailwind-theme.css": "tokens/tailwind-theme.css",
};
for (const d of ["references", "tokens", "assets"]) mkdirSync(skill + d, { recursive: true });
for (const [from, to] of Object.entries(map)) cpSync(root + from, skill + to);
// Logos: the app's web files, every transparent SVG variant, and the logo guide (PNGs stay in the repo only).
cpSync(root + "assets/brand/web", skill + "assets/web", { recursive: true });
cpSync(root + "assets/brand/svg", skill + "assets/svg", { recursive: true, filter: (p) => !p.includes("on-ground") });
cpSync(root + "assets/brand/email", skill + "assets/email", { recursive: true });
// The skill ships a subset of the kit; say so at the top of its copy of the guide.
writeFileSync(skill + "assets/README.md",
  "> **In this skill:** `web/`, `email/` and the transparent `svg/` files only. The PNG sizes, on-ground SVGs, legacy files and identity sources are in the design-system repo under `assets/brand/`.\n\n" +
  readFileSync(root + "assets/brand/README.md", "utf8"));
console.log("skill synced:", skill);
