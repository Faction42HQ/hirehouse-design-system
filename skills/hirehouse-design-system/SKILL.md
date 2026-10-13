---
name: hirehouse-design-system
description: Use when building, designing, writing or reviewing anything for HireHouse (Fintrix Inc. job board, UAE and India) or MockHouse - web pages, components, app screens, emails, decks, social posts, ads, mockups or copy - and whenever "HireHouse brand", "on-brand", "Editorial Brutalist" or "Fast Track" comes up.
---

# HireHouse design system

## Overview

The live candidate landing page (`/`) **is** the design system. Everything here is derived from it; where any other source (the old deck spec, legacy EB components, older copy) disagrees, the landing page wins.

The look is **calm, confident, product-led**: off-white ground, black ink, Manrope SemiBold sentence headlines with one phrase marked in lime, flat hairline structure, soft shadows only on floating objects, rounded pills for every action. It is **not** the stereotype the name "Editorial Brutalist" suggests: no serif, no monospace, no square corners, no hard offset shadows.

## Workflow

1. **Classify the job:** (a) inside the Next.js app, (b) standalone web (HTML, prototype, microsite), (c) non-web (deck, email, social, doc), (d) copy only.
2. **Read only what the job needs** (all in `references/`):

| Need | Read |
|---|---|
| Colours, type, spacing, radii, shadows, motion, accents | `01-foundations.md` §2 to §7 |
| An existing component, or how to design a new one | `02-components.md` §2 (recipe + checklist), §6 (landing components), §14 (page patterns) |
| Headlines, CTAs, claims, naming, tone, microcopy | `04-brand-voice-and-positioning.md` §3 to §8 |
| Known bugs, legacy, undecided points | `05-known-issues-and-open-questions.md` |
| Which logo file to use | `assets/README.md` (SVGs in `assets/svg/`, app files in `assets/web/`) |

3. **Start from the canonical pieces:** (a) compose from `src/components/marketing/home/*` and `tailwind-theme.css`; (b) copy `templates/starter.html` plus `tokens/tokens.css` and a logo from `assets/web/`; (c) apply the same tokens, type scale and voice; (d) follow `04-brand-voice-and-positioning.md`.
4. **Check before you hand over:** `node scripts/check-brand.mjs <your files>`. Fix every ERROR. Then walk the checklist in `02-components.md` §2.8 and the pre-publish checklist in `04-brand-voice-and-positioning.md` §6.3.

## Quick reference

| Element | Value |
|---|---|
| Ground / ink | `#FBFBF9` / `#000`; cards `#FFF`; raised black `#0B0B0C` |
| Lime `#E9FEA3` | the candidate's win: marker on 1 to 2 headline words, ticks, number chips, Fast Track chip |
| Indigo `#4F46E5` | information: eyebrows (12px, 600, uppercase, 0.16em), step numbers, score bars |
| Brand blue `#4C49F3` | large fills, logo, employer accent, closing mesh base |
| Route accents | candidate lime, employer blue (white ink), institution lilac `#CB9FD2`, partner yellow `#FBFD78` |
| Type | Manrope only. Headlines 600, tracking -0.045em to -0.055em; body 400; labels 500; tags 700. Always set a weight |
| Headlines | Full sentences with a full stop. Hero H1 `clamp(56px,6.2vw,90px)`, H2 `clamp(30px,4.4vw,56px)` |
| Shape | Every action `rounded-full`; cards 24 to 28px; nested surfaces step down |
| Depth | Structure flat with 8% hairlines; soft shadows only on floating objects (`--elev-*`) |
| Soft colour | Only the hero backdrop glows and one closing mesh card per page |
| Primary CTA | Black pill, 48px, 15px/600, verb-first, 1 to 4 words, arrow |

## Non-negotiables

- **Never invent facts.** No statistics, prices, plans, features, testimonials or logos unless the user supplied them or `04-brand-voice-and-positioning.md` lists them as true. Use a clearly marked placeholder (`[price: needs sign-off]`) instead.
- **Fast Track** is optional, "priced per role", reviewed within 72 hours, and paying never changes the score. Never mention refunds or guarantees, never say "application fee", never use "Recommended" or "Most popular" badges. The free route keeps equal visual weight.
- The company is **Fintrix Inc.** Write **HireHouse**, **Fast Track**, **MockHouse**, **CV** (not resume). British spelling. No em dashes.
- No new hex values, fonts or radii. If nothing fits, say so and flag it for design.
- One `h1`, visible focus, 44px targets, a reduced-motion end state for every animation.

## Judgement calls

- **Fragment or page?** A single section, card or email block uses `h2` for its headline. Only a full page carries the `h1`, the hero and the closing card.
- **Audience pages** (employer, institution, partner): copy what that page ships today (for `/companies`: lime marker, lime chips, black pills; blue for panels with white ink). The marker colour per audience is still open (`05` Q-20).
- **Focus:** new work uses a `2px` black outline, `3px` offset, plus a `6px` accent halo (`templates/starter.html`). The shipped accent-only ring is a logged defect.
- **Logos:** reference a file from `assets/web/` or `assets/svg/` (`assets/README.md` says which). The logo ink `#1F2430` is allowed inside logo artwork only (`--logo-ink`). PNG, email and legacy logo files live in the repo's `assets/brand/`, not in this skill.
- **Fintrix Inc.** appears in footers and legal lines ("a product of Fintrix Inc."), not in headlines or posts.
- **No rule covers it** (hashtags, a launch claim, an employer pricing block): follow the voice in `04` §4, never fill the gap with an invented fact, and list each assumption in your handover so a human can confirm it.

## Common mistakes (seen when building without this skill)

| Mistake | Instead |
|---|---|
| Reading "Editorial Brutalist" as serif headlines, mono labels, square corners, offset block shadows | Manrope SemiBold, rounded pills, soft object shadows (`01-foundations.md` §1) |
| Warm paper ground with an orange or red accent | `#FBFBF9` ground; lime, indigo and blue only |
| Made-up pricing tiers and "AED 499 / month" | Describe what the product does; leave prices to the user |
| Section labels like "§ 04" or "For employers" as the headline | An indigo eyebrow plus a sentence headline |
| Lime focus ring on the off-white ground (fails 3:1) | Black 2px outline with an accent halo (`05-known-issues-and-open-questions.md`) |
| Text without an explicit weight inside `.eb-marketing` (renders ExtraLight 200) | Always set `font-normal` or heavier |
