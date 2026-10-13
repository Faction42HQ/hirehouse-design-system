#!/usr/bin/env node
// HireHouse brand + design checker. Catches the mechanical rule breaks so judgement can go elsewhere.
//
//   node scripts/check-brand.mjs <file-or-dir> [...more]
//
// Scans .html .css .tsx .jsx .ts .js .md .mdx .json .txt files. Exit code 1 if any ERROR is found.
// ERROR  = breaks a non-negotiable (claims, em dashes, off-palette colour, wrong font family).
// WARN   = likely drift; check by eye (US spelling, unweighted landing text, grey text for reading).

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const EXT = new Set([".html", ".css", ".tsx", ".jsx", ".ts", ".js", ".md", ".mdx", ".json", ".txt"]);
const SKIP_DIRS = new Set(["node_modules", ".git", ".next", "dist", "build"]);

// Palette: every hex the system sanctions (tokens/tokens.css). Anything else is an ERROR in UI files.
const tokensPath = fileURLToPath(new URL("../tokens/tokens.css", import.meta.url));
const PALETTE = new Set(
  [...readFileSync(tokensPath, "utf8").matchAll(/#([0-9a-f]{3,8})\b/gi)].map((m) => normHex(m[1]))
);
function normHex(h) {
  h = h.toLowerCase();
  if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join("");
  return h.slice(0, 6);
}

const RULES = [
  // Claims and compliance (references/04-brand-voice-and-positioning.md §6)
  { level: "ERROR", re: /\b(refund(s|ed|able)?|money[- ]back|guarantee[sd]?)\b/i, prose: true, msg: "Refund/guarantee language is not allowed (brand §6.2)." },
  { level: "ERROR", re: /\b(application|processing) fee\b/i, prose: true, msg: 'Never call Fast Track an "application/processing fee" (brand §6.2).' },
  { level: "ERROR", re: /\b(a )?real (person|human) reads\b|deserves a human/i, prose: true, msg: "Never claim a human reads every application (brand §6.2)." },
  { level: "ERROR", re: /\b(skip|jump) the (queue|line)\b|\bstand out\b|\bmore visibility\b|\bupgrade\b/i, prose: true, msg: "Pay-to-win wording; Fast Track buys speed, never a better outcome (brand §6.2)." },
  { level: "ERROR", re: /\b(unbiased|bias-free|objective(ly)? fair)\b/i, prose: true, msg: "Fairness absolutes are not allowed (brand §6.2)." },
  { level: "ERROR", re: /\b(Elyts|Acumatic|Roni Analytics)\b/, msg: 'Wrong company name; the parent is "Fintrix Inc.".' },
  { level: "ERROR", re: /\bHirehouse\b|\bHIREHOUSE\b|\bHire House\b/, msg: 'Write "HireHouse" (one word, capital H twice).' },
  { level: "ERROR", re: /\bFast-track\b|\bFasttrack\b|\bFastTrack\b|\b[Ff]ast track\b/, msg: 'Write "Fast Track" (two words, both capitalised).' },
  { level: "ERROR", re: /—|&mdash;|&#8212;|&#x2014;/i, prose: true, msg: "No em dashes; use a colon, comma or parentheses." },
  // Visual non-negotiables (references/01-foundations.md)
  { level: "ERROR", re: /font-family:[^;{}]*((?<!sans-)\bserif\b|Georgia|Times|Playfair|Garamond|var\(--[\w-]*(?<!sans-)serif[\w-]*\))/i, msg: "Serif font; HireHouse is set in Manrope only." },
  { level: "ERROR", re: /font-family:[^;{}]*(\bmonospace\b|Courier|SF Mono|Menlo|ui-monospace|var\(--[\w-]*mono[\w-]*\))/i, msg: "Monospace font; not part of the system (Manrope only)." },
  { level: "ERROR", re: /box-shadow:\s*-?[1-9]\d*px\s+-?[1-9]\d*px\s+0(px)?\s+(#|black|var\(|rgba?\()/i, msg: "Hard offset 'brutalist' block shadow; only the soft object shadows in foundations §5.3 are allowed." },
  { level: "ERROR", prose: true, re: /\b(Most popular|Recommended|Best value|Bestseller)\b/, msg: "Sales badges push the paid route; the free path keeps equal weight (brand §6.2)." },
  { level: "WARN", prose: true, re: /\b(AED|INR|USD|Rs\.?)\s?\d|[$₹]\s?\d|&#8377;\s?\d/, msg: "A price. Fast Track is 'priced per role' with no fixed price; any figure needs sign-off (brand §6.1)." },
  { level: "WARN", prose: true, re: /\bobjective(ly)?\b|\bguaranteed?\b/i, msg: "Absolute fairness or outcome wording; prefer 'same criteria' (brand §3.3)." },
  { level: "WARN", re: /\b(organiz|optimiz|prioritiz|analyz|recogniz|customiz)(e|es|ed|ing|ation)\b|\bresume\b(?! upload)|\blicense\b/i, prose: true, msg: "US spelling or 'resume'; HireHouse writes British English and 'CV'." },
  { level: "WARN", re: /\bcolor\b(?=[^:;{}]*[.!?]\s)|\bprogram\b/, prose: true, msg: 'Possible US spelling in prose ("colour", "programme").' },
  { level: "WARN", re: /color:\s*#(888|888888|999|999999)\b/i, msg: "#888/#999 is for decoration only; readable text needs #555 to #777 or darker (foundations §2.1)." },
  { level: "WARN", re: /\b\d{1,3}(,\d{3})+\+|\b\d{2,3}%|\b\d\.\d\/5\b/, prose: true, msg: "Looks like a statistic. Only signed-off or true-by-construction numbers may ship (brand §6.2)." },
];

const HEX_RE = /#([0-9a-f]{6}|[0-9a-f]{3})\b/gi;
const UI_EXT = new Set([".html", ".css", ".tsx", ".jsx"]);

let errors = 0, warns = 0;
function report(level, file, line, msg, text) {
  level === "ERROR" ? errors++ : warns++;
  console.log(`${level.padEnd(5)} ${file}:${line}  ${msg}\n        ${text.trim().slice(0, 140)}`);
}

function scan(file) {
  const ext = extname(file);
  const lines = readFileSync(file, "utf8").split("\n");
  let inStyle = false;
  lines.forEach((text, i) => {
    if (/brand-check:\s*ignore/.test(text)) return;
    if (/<style[\s>]/i.test(text)) inStyle = true;
    // Prose rules (claims, spelling, stats, dashes) only apply to words, not to CSS declarations.
    const isCss = ext === ".css" || inStyle || /^\s*(--[\w-]+|[a-z-]+)\s*:[^;]*;?\s*(\/\*.*)?$/i.test(text) || /^\s*[^<]*\{[^}]*\}?\s*$/.test(text) && !/<\w/.test(text);
    // Words only: drop attributes (class names, inline styles, URLs) and CSS functions before prose rules.
    const words = text
      .replace(/[\w:-]+=("[^"]*"|'[^']*'|\{\{.*?\}\}|\{[^{}]*\})/g, " ")
      .replace(/\b[\w-]+\((?:[^()]|\([^()]*\))*\)/g, " ");
    for (const r of RULES) {
      if (r.prose ? !isCss && r.re.test(words) : r.re.test(text)) report(r.level, file, i + 1, r.msg, text);
    }
    if (/<\/style>/i.test(text)) inStyle = false;
    if (UI_EXT.has(ext)) {
      for (const m of text.matchAll(HEX_RE)) {
        if (!PALETTE.has(normHex(m[1]))) report("ERROR", file, i + 1, `Off-palette colour #${m[1]}; use a token from tokens/tokens.css.`, text);
      }
    }
  });
}

function walk(p) {
  const st = statSync(p);
  if (st.isDirectory()) {
    for (const name of readdirSync(p)) if (!SKIP_DIRS.has(name)) walk(join(p, name));
  } else if (EXT.has(extname(p))) scan(p);
}

const targets = process.argv.slice(2);
if (!targets.length) { console.error("usage: node check-brand.mjs <file-or-dir> [...]"); process.exit(2); }
targets.forEach(walk);
console.log(`\n${errors} error(s), ${warns} warning(s).` + (errors ? " Fix every ERROR before shipping." : ""));
process.exit(errors ? 1 : 0);
