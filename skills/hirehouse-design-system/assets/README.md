> **In this skill:** `web/`, `email/` and the transparent `svg/` files only. The PNG sizes, on-ground SVGs, legacy files and identity sources are in the design-system repo under `assets/brand/`.

# HireHouse logo kit

Every HireHouse logo format in one place. The **tie identity** is current: a tie replaces the dot of the "i" (or the "I" in capitals), and the house mark carries the tie as a cut-out window. The usage notes below come from the identity file (`source/hirehouse-tie-identity.html`).

## Folders

| Folder | What | Use for |
|---|---|---|
| `web/` | The exact files the live app ships (`public/brand/`, `src/app/`) | Building in the app or matching it pixel for pixel |
| `svg/` | Every identity variant, light and dark, **transparent** | Default choice for anything digital |
| `svg/on-ground/` | Same, with the light or dark ground baked in | Places that cannot handle transparency |
| `png/512/`, `png/1024/`, `png/2048/` | Transparent PNGs by width in px | Slides, docs, social tools, anything that cannot take SVG |
| `png/on-ground/2048/` | PNG with ground | Previews, chat avatars, upload forms |
| `email/` | Raster wordmarks sized for email clients | Email templates only |
| `legacy/` | The earlier wordmark **without the tie** | Do not use in new work; kept for reference |
| `source/` | The identity files that generated `svg/` and `png/` | Regenerating exports (`node scripts/export-logos.mjs`) |

File names follow `hirehouse-<variant>-<light|dark>[-<accent>]`. **light** = artwork for light grounds (ink letters); **dark** = artwork for dark grounds (white letters). The tie is **brand blue `#4C49F3`** unless an accent suffix says otherwise.

## Variants

| Variant | Files | When to use it |
|---|---|---|
| **Primary wordmark** | `primary` | The default. One ink for the whole word; the tie is the only colour, which makes it the thing people remember. |
| Primary, audience accents | `primary-*-lime`, `-yellow`, `-lilac` | Audience-specific surfaces only (candidate lime, partner yellow, institution lilac). Check contrast: pale ties wash out on white. |
| **Split wordmark** | `split` | "Hire" in ink, "House" and tie in accent. Continuity with the deck and the app header (`web/hirehouse-wordmark.svg`), at the cost of three colour events instead of one. |
| Uppercase wordmark | `caps` | The tie replaces the "I" at full cap height. Headlines set in capitals. |
| **Stacked wordmark** | `stacked` | HIRE over HOUSE, the tie in the top line. Square-ish crops, merchandise, profile art, the footer. |
| **House mark** | `mark` | The primary symbol: a house with the tie cut out where a window would go. A single path that knocks out on any ground. |
| App icon | `appicon`, `web/app-icon.svg`, `web/icon.svg`, `web/apple-icon.png` | Home screens and store listings. 22% corner radius; house in the knockout ink, tie showing the accent through it. |
| Avatar | `avatar` | Circular crops for social profiles. The house is set smaller so the round crop clears the roof and corners. |
| Tie mark | `tie-only` | The bare tie. Very tight placements, and co-branding lines where a container would fight neighbouring marks. |
| Mark + wordmark lockup | `lockup` | House mark beside a one-ink wordmark. Headers and sign-in screens. |
| Tagline lockup | `tagline` | Wordmark, accent rule and "Hiring, decided on merit." Email footers, one-pagers, deck closers. |
| One colour | `mono` | The tie in the same ink as the letters. Required for embossing, etching and any single-colour print. |
| Badge | `badge` | Ink field, wordmark knocked out, tie in accent. Stickers, merchandise, app splash. |
| Social banner | `banner` | 3:1 centred lockup for LinkedIn, X and Open Graph cards. |
| Favicon | `web/favicon.ico` (16, 32, 48) | Browser tabs. |
| MockHouse | `web/mockhouse-wordmark*.svg`, `email/mockhouse-email-wordmark.png` | The sibling interview-prep brand, same scheme. |

## Rules

- Size by **height**; the width follows the artwork. In the site header the wordmark is 26px tall.
- Light artwork on light grounds, dark artwork on black. Never put the light wordmark on brand blue; use the badge or the dark artwork.
- Never recolour, outline, stretch, rotate, add shadows or effects, or rebuild the logo in a font. The logo ink `#1F2430` belongs to the artwork, not the UI palette.
- Prefer SVG. Use PNG only where SVG is not accepted, and pick a width at least 2× the display size.
- Write the name in text as **HireHouse** (one word, two capitals).

> **Open question:** the identity file does not define a minimum size or clear space. Suggested interim rule (from this handover, not from the identity file): keep clear space at least the height of the tie on every side, and do not use the wordmark below 16px tall (use the house mark instead).
