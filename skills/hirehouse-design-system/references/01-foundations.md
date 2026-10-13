# 01 · Foundations and design tokens

**Audience:** engineers and AI agents building HireHouse (a Fintrix Inc. product) web surfaces.
**Status:** handover from design, reflecting the code on `feature/landing-redesign` as of 2026-10-13.
**Token files:** [`../tokens/tokens.css`](../tokens/tokens.css) (portable custom properties), [`../tokens/tokens.json`](../tokens/tokens.json) (W3C DTCG), [`../tokens/tailwind-theme.css`](../tokens/tailwind-theme.css) (Tailwind v4 `@theme`).

> **The rule of precedence (product owner ruling, 2026-10-13).** The candidate landing page **is** the design system: `src/app/(marketing)/page.tsx`, `src/components/marketing/home/*`, the header and footer it renders, and `marketing-eb.css`, as rendered at `/`. Where anything else disagrees, the landing wins and the other source is listed as **legacy** or a **deviation**:
>
> | Source | Status |
> |---|---|
> | Landing page (`/`) | **Canonical** |
> | Product token layer (`globals.css` `:root`) | Canonical for **product UI** only (dashboards, ATS, candidate space). Legacy where it overlaps marketing |
> | Marketing archetype sections (`eb/sections/*`) and `.t-*` type roles | **Legacy** marketing. Keep rendering; do not extend |
> | Deck spec (`new-design-system.md`) | **Intent only.** Philosophy and palette origin; its pt measurements and rules are not web rules |

Paths are relative to the app repo (`powerhouse-hyring-candidate-flow/`). "The landing spec" means `docs/superpowers/specs/2026-10-09-landing-redesign-design.md`.

> **How to read this document.** Each section gives the canonical (landing) values first, then *Use it for / Never use it for* rules, then legacy values where they still exist, then a short **Source** note. Where the code does not answer a question, it is marked **Open question**. Most landing values are written as Tailwind arbitrary values in the code (`text-[#4f46e5]`, `rounded-[28px]`); the token **names** in this document are introduced by this handover so the values can be reused. Each one maps to the exact arbitrary class it replaces.

---

## Contents

1. [Design principles for the web](#1-design-principles-for-the-web)
2. [Colour](#2-colour)
3. [Typography](#3-typography)
4. [Spacing, layout and grid](#4-spacing-layout-and-grid)
5. [Radii, borders and elevation](#5-radii-borders-and-elevation)
6. [Iconography, logos and imagery](#6-iconography-logos-and-imagery)
7. [Motion](#7-motion)
8. [Theming and scoping](#8-theming-and-scoping)
9. [Legacy, inconsistencies and open questions](#9-legacy-inconsistencies-and-open-questions)

---

## 1. Design principles for the web

These are the principles the landing page actually follows. The deck's five principles are the ancestor; the table after them shows what changed.

1. **The sentence is the hero.** Every section opens with a full-sentence headline (with a full stop), set large in Manrope **SemiBold** with tight negative tracking. One phrase per headline is marked by hand (a lime highlighter). Hierarchy comes from scale first.
2. **Calm ground, black ink, colour with a job.** An off-white ground (`#FBFBF9`) and black text carry the page. **Lime** marks the candidate's win (the marked phrase, ticks, the Fast Track chip, "read in full"). **Indigo** marks information (eyebrows, step numbers, score bars, the caret). **Black** marks the primary action and the premium route. Nothing is coloured for decoration.
3. **Show the product, not pictures of people.** Real screenshots in phone frames, and small scenes built from UI primitives (a CV, an inbox, a score bar) explain what happens. No stock photography, no clip-art.
4. **Centred intros, left-aligned detail.** The hero and each section intro are a centred column. Detail inside cards, tables, the FAQ and the footer is left-aligned.
5. **Structure is flat; only objects float.** Sections and card grids are separated by hairlines and flat fills. Soft shadows are reserved for things that are objects in the scene: a document, a notice, the search field, its dropdown, a phone, the raised Fast Track card.
6. **Soft colour lives in two places only.** The hero backdrop (blurred palette glows over a dot grid) and the closing search card (a palette mesh on blue). Everywhere else, fills are flat.
7. **Motion explains, once.** Content rises in; scenes play once when they enter view; the "how it works" row pins and scrolls. Everything has a reduced-motion end state.

| Deck principle | Landing (canonical) | Status of the deck rule |
|---|---|---|
| Type is the picture; Manrope ExtraLight, synthesised bold | Type leads, but in **SemiBold 600** headlines and **Regular 400** body. Product imagery and micro-scenes are part of the picture | ExtraLight register is **legacy** (still the `.eb-marketing` default weight) |
| Colour is structural; no gradients, shadows, tints | Flat structure; **sanctioned** glows, mesh, washes and object shadows with exact values (see [2.7](#27-sanctioned-soft-colour-and-where-it-is-allowed), [5.3](#53-elevation)) | "Never" is **superseded** |
| Bleed on purpose | Not used on the landing. Page root clips horizontal overflow | `.bleed-left` is **legacy** (archetype sections) |
| Asymmetric, never centred | Hero and section intros **centred** (landing spec: "Hero (centered)") | **Superseded** |
| One idea per slide, as a sentence | Holds: one idea per section, as a sentence | **Kept** |
| Static | Motion with reduced-motion fallbacks | **New** |

**Source:** `src/app/(marketing)/page.tsx:38-56`; `home/HomeHero.tsx:10-66`; `home/HomeWhy.tsx:24-50`; `home/HomeRoutes.tsx:33-110`; `home/HomeBackdrop.tsx:1-31`; `home/HomeClosing.tsx:42-56`; landing spec lines 27-36, 106; `new-design-system.md:11-25`.

---

## 2. Colour

Light mode only (see [8](#8-theming-and-scoping)). Tailwind names marked † are **new** (added by `tailwind-theme.css`); the app writes the arbitrary value shown.

### 2.1 Canonical landing palette

#### Grounds and surfaces

| Token | Value | Tailwind | Replaces | Use it for |
|---|---|---|---|---|
| `--ground` | `#FBFBF9` | `bg-ground` † | `bg-[#fbfbf9]` | **Page ground** on every marketing route, footer gutter |
| white | `#FFFFFF` | `bg-white` | | Cards in the hairline grid, documents, search field, dropdown, header (`bg-white/90`) |
| `--surface-stage` | `#F6F6F3` | `bg-surface-stage` † | `bg-[#f6f6f3]` | Inset "stage" panel that holds an illustration or the CV scene |
| `--ink-raised` | `#0B0B0C` | `bg-ink-raised` † | `bg-[#0b0b0c]` | The raised black card (Fast Track column), phone bezels, the footer's black panel |
| black | `#000000` | `bg-black` | | Primary CTA pills, tags, ticks on light, the "Decision" chip |

#### Brand fills and signal

| Token | Value | Tailwind | Role on the landing |
|---|---|---|---|
| `--lime` | `#E9FEA3` | `bg-lime`, `text-lime` | **Candidate win.** Highlighter on the key phrase, number chips (`01`), ticks and clock on black, Fast Track chip, footer main panel, avatar tile |
| `--indigo` | `#4F46E5` | `text-indigo` † | **Information signal.** Eyebrows, step numbers, score bars, unread dot, typing caret, backdrop glow |
| `--indigo-halo` | `rgba(79,70,229,0.12)` | (shadow) | 5px focus halo round the hero search |
| `--blue` | `#4C49F3` | `bg-blue` | **Brand blue.** Footer link panel, logo tie, app icon, base of the closing mesh, employer accent |
| `--lilac` | `#CB9FD2` | `bg-lilac` | Backdrop glow, closing mesh light; institution accent |
| `--yellow` | `#FBFD78` | `bg-yellow` | Backdrop glow, closing mesh light, social pill hover; partner accent |
| `--lime-wash` | `rgba(233,254,163,0.45)` | `bg-lime/45` | "Read in full" wash over a document |
| `--lime-wash-soft` | `rgba(233,254,163,0.30)` | `bg-lime/30` | Highlighted (new) row in a mini inbox |

> **Two blues, on purpose (for now).** The landing uses `#4F46E5` (indigo) for small signals and text, and `#4C49F3` (brand blue) for large fills and the logo. Do not swap one for the other. See **Open question** in [9](#9-legacy-inconsistencies-and-open-questions).

#### Text ladder

| Token | Value | Tailwind | Replaces | Use it for |
|---|---|---|---|---|
| `--text-strong` | `#000000` | `text-black` | | Headlines, card titles, labels, input text, FAQ questions |
| `--text-proof` | `#3D3D3D` | `text-proof` † | `text-[#3d3d3d]` | Hero proof row |
| `--text-lead` | `#4A4A4A` | `text-lead` † | `text-[#4a4a4a]` | Hero sub, section subs, FAQ answers |
| `--text-secondary` | `#555555` | `text-secondary` † | `text-[#555]` | Card body, captions, step subs, criteria labels, search icon |
| `--text-quiet` | `#666666` | `text-quiet` † | `text-[#666]` | Replay button, "no results" |
| `--text-meta` | `#777777` | `text-meta` † | `text-[#777]` | Company · place, "Standard" column label, notice notes |
| `--text-overline` | `#888888` | `text-overline` † | `text-[#888]` | Overlines **inside decorative illustrations only** |
| `--text-faint` | `#999999` | `text-faint` † | `text-[#999]` | Placeholder, posted date, "Not read" |
| on lime | `rgba(0,0,0,0.65)` | `text-black/65` | | Footer promise line |
| on black | `#FFF`, `white/80`, `white/60`, `white/50`, `white/45` | `text-white/…` | | Title, list labels, decision note, legal line, column headings |
| on blue | `#FFF`, `white/60` | | | Links, column headings |

#### Lines

| Token | Value | Tailwind | Use it for |
|---|---|---|---|
| `--line` | `rgba(0,0,0,0.08)` | `border-line` † / `border-black/[0.08]` | Card-grid gaps, comparison rows, FAQ dividers, mobile route card |
| `--line-soft` | `rgba(0,0,0,0.07)` | `border-line-soft` † | Stage border, dropdown border, mobile list rows, empty bar track |
| `--line-strong` | `rgba(0,0,0,0.10)` | `border-line-strong` † | Header rule, idle search border, round icon button |
| `--line-on-dark` | `rgba(255,255,255,0.10)` | `bg-white/10` | Rows inside the raised black card |
| `--line-pill-on-dark` | `rgba(255,255,255,0.28)` | inline style | Social pill border on the black footer panel |
| focus (search) | `rgba(0,0,0,0.80)` | `border-black/80` | Search field border while engaged |

#### Illustration and status colours

Used only inside the landing's micro-scenes and search results.

| Token | Value | Use |
|---|---|---|
| `--live` | `#3FB950` | Live-role pulse dot in the hero pill |
| `--reject-bg` / `--reject-fg` / `--reject-icon` | `#FEE4E2` / `#B42318` / `#D92D20` | "Elsewhere" tag and auto-reject notice |
| `--reject-scan` | `#E5484D` (+ glow `rgba(229,72,77,.45)`) | Keyword scanner line |
| `--keyword-bg` / `--keyword-fg` | `#E0E7FF` / `#4338CA` | Keyword chip "hit" |
| `--tint-1` to `--tint-5` | `#E9FEA3`, `#D9D2FF`, `#CFEEFF`, `#FFE2CC`, `#E4F7D8` | Company-initial tiles in search results, cycled |
| `--mode-remote-*` | `#E8F7E4` / `#2F7A1F` | Work-mode chip |
| `--mode-hybrid-*` | `#FDF3D6` / `#8A6410` | Work-mode chip |
| `--mode-onsite-*` | `#EEF0F6` / `#4A5170` | Work-mode chip |

**Do**
- Keep the ground `#FBFBF9` and ink black; let lime and indigo be the only frequent colours.
- Use lime for the candidate's positive outcome and next move; indigo for labels and data.
- Use black pills for the primary action.

**Don't**
- Put white text on lime, yellow or lilac.
- Use the reject reds, mode colours or tints outside their scenes and chips.
- Use `--text-faint` (`#999`) or `--text-overline` (`#888`) for anything a user must read.

**Source:** `home/HomeHero.tsx:27-58`; `home/HomeWhy.tsx:26-135`; `home/SameCv.tsx:52-158`; `home/HowTrack.tsx:79-154`; `home/HomeRoutes.tsx:36-138`; `home/HeroSearch.tsx:21, 98-180`; `home/HomeClosing.tsx:17-30`; `eb/nav/Header.tsx:83`; `eb/nav/Footer.tsx:44-125`; `src/components/marketing/jobs/modeIcons.ts:12-16`.

### 2.2 Audience accent system (`data-accent`)

Each marketing page belongs to one audience. Its accent drives `.cta-accent` pills, text selection and the focus ring.

| Audience | `data-accent` | `--accent` | `--accent-ink` | Pages |
|---|---|---|---|---|
| Candidate (default) | `candidate` | Lime `#E9FEA3` | `#000` | `/` (canonical), `/jobs`, `/jobs/[id]`, Fast Track, legal, `/me`, `/p/[slug]/id` |
| Employer | `employer` | Blue `#4C49F3` | `#FFF` | `/companies`, the header's "Post a role" pill |
| Institution | `institution` | Lilac `#CB9FD2` | `#000` | `/institutions` |
| Partner | `partner` | Yellow `#FBFD78` | `#000` | `/partners` |

**How it works**

1. The page root carries both: `<div data-accent="candidate" class="eb-marketing …">`. The sticky header carries its own `data-accent={audience}` because it sits outside the page root.
2. `[data-accent="…"]` sets `--accent` / `--accent-ink`. `:root` and `.eb-marketing` default to lime/black so an accent pill is never transparent.
3. Consumers read the pair: `.cta-accent { background: var(--accent); color: var(--accent-ink) }`; hover swaps them.
4. Inside `.eb-marketing`: `::selection` uses the pair; `:focus-visible` draws `2px solid var(--accent)` at `3px` offset.
5. On other audience pages, the hand-drawn mark takes the accent (lilac for institutions, yellow for partners); on the landing it is lime. Exception: `/companies` marks in lime, not its blue accent (open question).

**Do:** set `data-accent` once on the page root; read `--accent` and `--accent-ink` together.
**Don't:** hard-code the accent hex where you mean "this page's accent".

**Source:** `marketing-eb.css:18-43, 72-74`; `page.tsx:44`; `eb/nav/Header.tsx:58, 76-83`; `institutions/shared.tsx:9-19`; `partners/ui.tsx:7-28`.

### 2.3 Product UI colour tokens

Canonical for **product UI** (dashboards, ATS, candidate space). Do not use these to style marketing pages. Token names predate the re-skin ("Deep Teal & Sand"); only values changed.

| Group | Tokens (value) | Tailwind |
|---|---|---|
| Primary | `--primary` `#4C49F3` · `--primary-active` `#3B38E6` · `--primary-disabled` `#E2E2E2` · `--on-primary` `#FFF` · `--primary-soft` `#ECEBFE` · `--primary-soft-fg` `#4C49F3` | `bg-primary`, `bg-primary-soft` … |
| Depth ramp ("teal", actually blue to black) | 50 `#ECEBFE` · 100 `#DAD9FB` · 200 `#B9B8F9` · 300 `#908EF4` · 400 `#6663F0` · 500 `#4C49F3` · 600 `#3B38E6` · 700 `#14141A` · 800 `#0A0A0D` · 900 `#000` | `bg-teal-50` … `bg-teal-900` (replaces Tailwind's teal) |
| Accent family | `--teal` `#4C49F3` · `--amber` `#8A5A14` · `--fern` `#3F6B3A` · `--rust` `#B23B2B` · `--slate` `#2B2B2B` · `--plum` `#6B4BB0` · `--on-accent` `#FFF` · `--on-accent-soft` `rgba(255,255,255,.88)` | `bg-amber` … |
| Accent text on black | `--rust-on-dark` `#E0907A` · `--amber-on-dark` `#DFA963` · `--fern-on-dark` `#A3C78D` | arbitrary only |
| Text | `--ink` `#000` · `--body-strong` `#111` · `--body` `#333` · `--muted` `#555` · `--muted-soft` `#8A8A8A` · `--on-dark` `#FFF` · `--on-dark-soft` `#B3B3B3` | `text-ink`, `text-body`, `text-muted` … |
| Surfaces | `--canvas` / `--surface` / `--surface-soft` / `--input-bg` `#FFF` · `--surface-card` `#F4F4F2` · `--surface-strong` `#E2E2E2` · `--surface-dark` `#000` · `--surface-dark-elevated` `#0A0A0D` | `bg-canvas`, `bg-surface-card` … |
| Lines | `--hairline` `rgba(0,0,0,.14)` (default border on every element) · `--hairline-soft` `rgba(0,0,0,.07)` | `border-hairline` |
| Semantic | `--success` `#3F6B3A` · `--warning` `#7A5410` · `--error` `#B23B2B` · `--danger` `#B23B2B` · `--danger-hover` `#9A3225` · `--on-danger` `#FFF` | `text-success` … |
| Status pills (bg / fg) | neutral `#F0F0EE`/`#555` · info `#ECEBFE`/`#4C49F3` · success `#EEFBC9`/`#3F6B3A` · warning `#FEFBD0`/`#7A5410` · error `#FBE3DF`/`#B23B2B` · ai `#F1E7F4`/`#6B4BB0` | `bg-[var(--pill-…)]` |
| Pipeline | Fast Track `#E9FEA3` / fg `#1C2408` / soft `#F3FEC8` (reserved) · Final Decision `#6B3FA0` / fg `#3D2460` / soft `#F6EEFE`; pills `#E9FEA3`/`#1C2408`, `#F3E8FB`/`#6B3FA0` | `bg-fast-track` …; class strings in `src/lib/ui/accents.ts` |
| Aliases | `--text-heading` · `--text-body` · `--text-muted` · `--surface-page` · `--surface-elevated` · `--border-default` · `--focus-ring` (= primary) · `--overlay-scrim` `rgba(26,24,20,.46)` | |

**Source:** `src/app/globals.css:14-128, 175-244`; `src/lib/ui/accents.ts:1-16`.

### 2.4 Legacy marketing palette and grounds

The deck palette and the archetype "ground" system. Still rendered by the archetype sections (which the committed `/companies`, `/institutions` and `/partners` pages use; the uncommitted page kits in the working tree move those pages to the landing system, see `02-components.md` section 10) and by `.t-*` screens; **not** used to build new landing-style pages.

| Token | Hex | Tailwind | Legacy role |
|---|---|---|---|
| `--grey-bg` | `#E2E2E2` | `bg-grey-bg` | Neutral section ground |
| `--grey-block` | `#CFCFCF` | `bg-grey-block` | "Incumbent" block |
| `--muted-dark` | `#9A9A9A` | `text-muted-dark` | Secondary text on black |
| `--muted-light` | `#555555` | `text-muted-light` | Secondary text on light grounds |
| `--label` | `#6B6B6B` | `text-label` | Field labels |

Legacy ground law (`src/lib/marketing/ground.ts`): black and blue grounds take white ink; white, grey, lime and yellow take black; lilac is never a section ground. Sibling accent blocks run lime, lilac, yellow, blue, with blue only at an end. These rules remain **correct pairings** and the landing does not break them; only the "everything is a full-bleed coloured band" composition is legacy.

**Source:** `globals.css:39-44, 213-216`; `src/lib/marketing/ground.ts:1-33`; `eb/sections/accents.ts:4-15`; `src/content/marketing/types.ts:17-25`.

### 2.5 Contrast pairings (WCAG 2.1)

Computed with the WCAG relative-luminance formula. Alpha colours are flattened onto their ground. AA normal text needs 4.5:1; AA large text (24px+, or 18.66px+ bold) and UI graphics need 3:1.

#### Landing text pairs

| Text | Background | Ratio | AA normal | AA large | Verdict |
|---|---|---|---|---|---|
| `#000` | `#FBFBF9` ground | 20.27 | Pass | Pass | Allowed |
| `#3D3D3D` proof | `#FBFBF9` | 10.48 | Pass | Pass | Allowed |
| `#4A4A4A` lead | `#FBFBF9` | 8.55 | Pass | Pass | Allowed |
| `#555555` secondary | `#FBFBF9` / `#FFF` / `#F6F6F3` | 7.20 / 7.46 / 6.89 | Pass | Pass | Allowed |
| `#666666` quiet | `#FBFBF9` | 5.54 | Pass | Pass | Allowed |
| `#777777` meta | `#FBFBF9` / `#FFF` | 4.32 / 4.48 | **Fail** | Pass | **Large text only** (24px+, or 18.66px+ bold). The landing's 13px "Standard" label and 12.5px result meta fail AA |
| `#888888` overline | `#FFF` | 3.54 | **Fail** | Pass | Decorative illustrations only |
| `#999999` faint | `#FFF` | 2.85 | **Fail** | **Fail** | Placeholders and non-essential metadata only |
| `#4F46E5` indigo | `#FBFBF9` / `#FFF` | 6.07 / 6.29 | Pass | Pass | Allowed (eyebrows, numbers) |
| `#000` | `#E9FEA3` lime | 19.17 | Pass | Pass | Allowed |
| `black/65` | `#E9FEA3` lime | 6.73 | Pass | Pass | Allowed |
| `#FFF` | `#E9FEA3` lime | 1.10 | **Fail** | **Fail** | **Forbidden** |
| `#FFF` | `#0B0B0C` ink-raised | 19.67 | Pass | Pass | Allowed |
| `#E9FEA3` lime | `#0B0B0C` | 17.96 | Pass | Pass | Allowed (Fast Track figures) |
| `white/80` | `#0B0B0C` | 12.50 | Pass | Pass | Allowed |
| `white/50` | `#0B0B0C` | 5.34 | Pass | Pass | Allowed (legal line) |
| `white/45` | `#0B0B0C` | 4.52 | Pass (just) | Pass | Allowed, no lower |
| `#FFF` | `#4C49F3` blue | 5.91 | Pass | Pass | Allowed |
| `white/60` | `#4C49F3` blue | 3.12 | **Fail** | Pass | **Deviation:** footer column headings (12px) fail AA |
| `#000` | `#4C49F3` blue | 3.55 | **Fail** | Pass | Forbidden |
| `#B42318` | `#FEE4E2` | 5.45 | Pass | Pass | Allowed |
| `#4338CA` | `#E0E7FF` | 6.41 | Pass | Pass | Allowed |

#### Product and legacy pairs

| Text | Background | Ratio | Verdict |
|---|---|---|---|
| `#333` body / `#111` / `#000` | `#FFF` | 12.63 / 18.88 / 21.00 | Allowed |
| `#6B6B6B` label | `#FFF` | 5.33 | Allowed |
| `#8A8A8A` muted-soft | `#FFF` | 3.45 | Large / non-essential only |
| `#9A9A9A` muted-dark | `#FFF` / `#000` | 2.81 / 7.46 | Black grounds only |
| `#555` | lime / yellow / grey-bg / grey-block | 6.81 / 6.90 / 5.75 / 4.79 | Allowed |
| `#555` | `#CB9FD2` lilac | 3.35 | **Large text only** (the deck's lilac pairing fails AA) |
| `#000` | lilac / yellow | 9.43 / 19.42 | Allowed |
| `#FFF` | `#B23B2B` danger | 5.91 | Allowed |
| Semantic text on white | `#3F6B3A` / `#7A5410` / `#B23B2B` | 6.22 / 6.77 / 5.91 | Allowed |
| Product pills (all 8) | | 4.83 to 15.19 | Allowed (error pill lowest) |

#### Non-text contrast (3:1)

| Element | Against | Ratio | Result |
|---|---|---|---|
| Focus ring, lime (candidate, incl. the landing) | `#FBFBF9` | 1.06 | **Fail** |
| Focus ring, yellow (partner) | `#FBFBF9` | 1.04 | **Fail** |
| Focus ring, lilac (institution) | `#FBFBF9` | 2.15 | **Fail** |
| Focus ring, blue (employer) | `#FBFBF9` | 5.70 | Pass |
| Search engaged border `black/80` | white | high | Pass (the search suppresses the accent ring and uses this instead) |

> **Deviation (accessibility):** on the landing, keyboard focus on links and buttons is drawn in lime and is effectively invisible on the off-white ground. The search field is the exception (black border plus indigo halo). Recommended fix: draw the ring in `--accent-ink` (black) with a lime halo, matching how the search does it.

**Source:** pairings from the landing components cited in 2.1; `marketing-eb.css:43-46`; ratios computed for this handover.

### 2.6 Text selection, scrollbars, cursor

- **Selection** (marketing): accent background, accent-ink text (lime / black on the landing).
- **Scrollbars** (global): thin; thumb `--muted-soft`, hover `--muted`; horizontal phone carousels hide theirs.
- **Cursor:** interactive elements get `pointer`, disabled get `not-allowed` (global rule; do not re-declare).

**Source:** `marketing-eb.css:42`; `globals.css:303-345`; `home/HowTrack.tsx:80`.

### 2.7 Sanctioned soft colour, and where it is allowed

The deck's "no gradients, no shadows, no tints, ever" is **superseded** by the landing. Soft colour is allowed in exactly these places, with these values. Anywhere else, fills are flat.

#### A. Hero backdrop (landing hero only)

Absolutely positioned behind the hero, `aria-hidden`, `pointer-events: none`, height `max(980px, 100svh + 160px)`, masked `linear-gradient(to bottom, #000 70%, transparent)` so it fades into the ground. Each glow is a `rounded-full` block with `.hh-glow` drift.

| Glow | Colour | Opacity | Size | Position | Blur | Drift delay |
|---|---|---|---|---|---|---|
| Lime | `#E9FEA3` | 0.70 | 620 × 620 | `-left-40 -top-48` | 120px | 0s |
| Lilac | `#CB9FD2` | 0.55 | 540 × 540 | `-right-32 -top-32` | 120px | -6s |
| Indigo | `#4F46E5` | 0.16 | 760 × 460 | centred, `top-[48%]` (behind the search) | 130px | -12s |
| Yellow | `#FBFD78` | 0.45 | 420 × 380 | `-left-24 top-[58%]` | 120px | -3s |
| Sky | `#BDEAFF` | 0.50 | 380 × 340 | `-right-20 top-[62%]` | 120px | -9s |
| Dot grid | `radial-gradient(rgba(0,0,0,.18) 1px, transparent 1px)` at 22px | layer 0.30 | full | masked to fade by 70% | | |

**Allowed:** behind the first screen of a marketing page (the jobs board and audience pages have their own backdrops built the same way). **Not allowed:** behind body sections, inside cards, or in product UI.

#### B. Closing search card (one per page, at the end)

`rounded-[32px]`, max 1200px, centred white text, background `--mesh-closing`:

```css
radial-gradient(55% 75% at 0% 0%,     rgba(233,254,163,.6),  transparent 62%),
radial-gradient(50% 70% at 100% 0%,   rgba(203,159,210,.75), transparent 60%),
radial-gradient(55% 70% at 100% 100%, rgba(251,253,120,.38), transparent 62%),
radial-gradient(45% 60% at 0% 100%,   rgba(189,234,255,.35), transparent 60%),
linear-gradient(135deg, #2c27c8, #4c49f3 55%, #6a3fd8);
```

> **Deviation from the landing spec:** the spec says the closing sits "on a black card with lime accents". The shipped (canonical) closing is this blue mesh. The code wins.

#### C. Washes and highlights inside scenes

| Effect | Value | Where |
|---|---|---|
| Lime wash | `bg-lime/45` (`--lime-wash`) | "Read in full" over the CV and mini document |
| Lime row | `bg-lime/30` | New "Decision" row in the mini inbox |
| Hard-stop highlighter | `linear-gradient(transparent 58%, #e9fea3 58%, #e9fea3 92%, transparent 92%)` | Marked word in the "How it works" step headlines |
| Avatar gradient | `linear-gradient(135deg, #c9c3ff, #ffd9c2)` | Placeholder avatar on the CV |
| Scanner glow | `0 0 14px 3px rgba(229,72,77,.45)` on `#E5484D` | Keyword scanner line |
| Header glass | `bg-white/90` + `backdrop-blur` | Sticky header; also the hero live pill (`bg-white/80`) |

**Never:** gradients on buttons, text, section bands or cards; tints of palette colours as flat UI fills on the landing (tints belong to the product pill system).

**Source:** `home/HomeBackdrop.tsx:8-31`; `home/HomeClosing.tsx:42-56`; `home/HowTrack.tsx:72-75`; `home/SameCv.tsx:73, 86, 168`; `home/HomeWhy.tsx:62, 122`; `home/HomeHero.tsx:27`; `eb/nav/Header.tsx:83`; `marketing-eb.css:186-188`; landing spec lines 102, 106.

---

## 3. Typography

### 3.1 Families and weights

| Family | Loaded via | Weights | Variable | Used by |
|---|---|---|---|---|
| **Manrope** | `next/font/google`, root layout | 200, 300, 400, 500, 600, 700, 800 | `--font-manrope` | Everything. `--font-display` and `--font-body` both resolve to it |
| Inter | `next/font/google`, marketing layout | 400, 500, 600, 700, 800 | `--font-inter` | Only `apply-page.css`; also second in the fallback stack |
| (mono) | system `font-mono` | 700 | | Step numbers in the phone carousel only |

Fallback stack: `Manrope, "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`.

**Weights on the landing (canonical):** 400 body and subs, 500 labels and input, **600 headlines, card titles and buttons**, 700 tags, number chips and ticks-labels. ExtraLight 200 is **not** used for landing copy.

> **Gotcha:** `.eb-marketing` still sets `font-weight: 200` (the legacy ExtraLight register). Any landing text without an explicit weight class renders ExtraLight. Always set a weight (`font-normal` for body).

> **Inconsistency:** Inter downloads on every marketing route but is used only by the apply page; the marketing layout's comment about "Schibsted/Hanken" is stale.

**Source:** `src/app/layout.tsx:12-19`; `src/app/(marketing)/layout.tsx:7-18`; `globals.css:164-166, 293-301`; `marketing-eb.css:32-36`.

### 3.2 Landing type scale (canonical)

`leading-relaxed` = 1.625, `leading-tight` = 1.25. Headlines use `text-balance`.

| Role | Token prefix | Size | Weight | Line-height | Tracking | Colour | Where |
|---|---|---|---|---|---|---|---|
| Hero | `--lp-hero-*` | `clamp(32px, 9.2vw, 56px)`; from `md`: `clamp(56px, 6.2vw, 90px)` | 600 | 0.98 | -0.055em | black | Hero `h1` |
| Footer display | `--lp-footer-display-*` | `clamp(58px, 9vw, 150px)` | 600 | 0.86 | -0.06em | black on lime | "Always writes back." |
| Section headline | `--lp-section-*` | `clamp(30px, 4.4vw, 56px)` | 600 | 1.04 (FAQ 1.02) | -0.045em | black | Every section `h2` |
| Closing headline | `--lp-closing-*` | `clamp(34px, 5.4vw, 72px)` | 600 | 0.98 | -0.05em | white on `--mesh-closing` | Closing card `h2` (max 16ch); sub 18px `white/85` |
| Step headline | `--lp-step-*` | `clamp(32px, 4vw, 54px)`; phones 26px / 1.08 / -0.035em | 600 | 1.02 | -0.045em | black | How it works |
| Statement | `--lp-statement-*` | `clamp(24px, 2.8vw, 34px)` | 600 | 1.25 | -0.035em | black | "Paying never changes your score." |
| Figure | `--lp-figure-*` | `clamp(24px, 2.4vw, 30px)`; phones 26px | 600 | 1 | -0.035em | black / lime on black | "Free, always" / "Priced per role" |
| Card title | `--lp-cardtitle-*` | 22px | 600 | 1.25 | -0.025em | black | Why cards |
| Question | `--lp-question-*` | 17px | 600 | inherit | -0.015em | black | FAQ summary |
| Lead | `--lp-lead-*` | `clamp(16.5px, 1.45vw, 19px)` | 400 | 1.625 | 0 | `#4A4A4A` | Hero sub (max 56ch) |
| Sub | `--lp-sub-*` | 17px | 400 | 1.625 | 0 | `#4A4A4A` / `#555` | Section subs (max 52 to 54ch) |
| Body | `--lp-body-*` | 15.5px | 400 | 1.625 | 0 | `#555` / `#4A4A4A` | Card body, captions, FAQ answers (max 60ch) |
| Small | `--lp-small-size` | 15px (14.5px in lists) | 400 | 1.625 | 0 | `#555` / `#444` | Notes, mobile rows |
| Label | | 16px | 500 | | | black | Comparison row labels |
| Proof | | 14px | 500 | | | `#3D3D3D` | Hero proof row |
| Meta | `--lp-meta-size` | 12.5px (12px for dates) | 400 | | | `#777` / `#999` | Result meta |
| Eyebrow | `--lp-eyebrow-*` | 12px | 600 | | **+0.16em**, uppercase | `#4F46E5` | Above every section headline. Footer variant: +0.14em, `white/60` or `white/45` |
| Column label | | 13px | 600 | | +0.12em, uppercase | `#777` | "Standard" column |
| Tag | `--lp-tag-*` | 12px | 700 | | +0.08em, uppercase | per tag | Pill tags ("Elsewhere", "Fast Track") |
| Number chip | | 12px | 700, `tabular-nums` | | | black on lime | `01`, `02`, `03` |
| Step number | | 13px mono | 700 | | | `#4F46E5` | Phone carousel |
| Button | `--lp-button-*` | 15px | 600 | | | white on black | CTA pills |
| Input | `--lp-input-*` | 17px | 500 (placeholder 400) | | | black / `#999` | Hero search |
| Live pill | | 12.5px | 500 | | | `#555` | Hero live pill |

### 3.3 Headline and text rules

**Do**
- Write headlines as full sentences with a full stop; put the topic in the eyebrow above.
- Follow the intro stack: eyebrow → 12px (`mt-3`) → headline → 20px (`mt-5`) → sub → 56px (`mt-14`) → content.
- Mark **one** phrase per headline with the lime marker or highlighter (see [6.4](#64-emphasis-marks)).
- Keep headline tracking negative (-0.025em to -0.06em, tighter as size grows). Positive tracking only on uppercase eyebrows, column labels and tags.
- Set an explicit weight on every text element.
- Cap measure: 52 to 60ch for body, 56ch for the hero sub.

**Don't**
- Use em dashes in any copy (brand rule). Use a colon, comma or full stop.
- Use italics, or underline other than links (links: `underline decoration-black/25 underline-offset-4`, darkening on hover).
- Use ExtraLight for landing copy, or bold for emphasis inside body text.
- Justify text.

### 3.4 Legacy marketing roles (`.t-*`)

Used by archetype sections, jobs, legal and the candidate space via `eb/primitives/Type.tsx`. **Not used by the landing.** Keep for existing screens; new marketing pages use 3.2.

| Class | Size (min / vw / max) | Weight | Line-height | Tracking |
|---|---|---|---|---|
| `.t-wordmark` | 72px / 14vw / 133px | 700 | 1 | -0.05em (nowrap) |
| `.t-hero` | 40px / 7vw / 57px | 700 | 1 | -0.07em |
| `.t-display` | 28px / 4.5vw / 44px | 700 | 1 | -0.05em |
| `.t-title` | 28px / 4.5vw / 44px | 200 | 1 | -0.03em |
| `.t-section` | 24px / 3.2vw / 34px | 200 | 1.1 | -0.03em |
| `.t-bar` | 18px / 2.4vw / 24px | 200 | 1.07 | -0.03em |
| `.t-lead` | 16px / 1.8vw / 18px | 300 | 1.4 | -0.03em |
| `.t-chip` | 15px / 1.4vw / 17.8px | 300 | 1 | -0.03em (nowrap) |
| `.t-cardtitle` | 15px / 1.5vw / 17.8px | 300 | 1.15 | -0.03em |
| `.t-name` | 14px / 1.3vw / 16px | 400 | 1.5 | -0.011em |
| `.t-body` | 15px / 1.2vw / 16px | 300 | 1.4 | -0.011em |
| `.t-caption` | 13px | 300 | 1.5 | -0.011em |
| `.t-micro` | 12px | 400 | 1.38 | -0.005em |
| `.t-eyebrow` | 12px | 400 | 1.2 | +0.05em, uppercase |
| `.lead-in` | inherit | 700 | | |

Differences from the landing: legacy headlines are bold 700 or ExtraLight 200 (landing: 600); legacy hero tops out at 57px (landing: 90px); legacy eyebrow is 400 / +0.05em in the current colour (landing: 600 / +0.16em in indigo).

### 3.5 Product type helpers

For product UI only (`globals.css`).

| Class | Size | Weight | Line-height | Tracking | Colour |
|---|---|---|---|---|---|
| `.display-xl` / `-lg` / `-md` / `-sm` | 72 / 56 / 40 / 32px | 300 / 300 / 300 / 400 | 1 / 1.02 / 1.08 / 1.12 | -3 / -2 / -1.4 / -1px | inherit |
| `.title-lg` / `-md` / `-sm` | 24 / 18 / 16px | 500 / 600 / 600 | 1.3 / 1.4 / 1.4 | -0.6 / -0.3 / -0.2px | ink |
| `.body-md` / `.body-sm` | 16 / 14px | 400 | 1.55 | | inherit |
| `.caption` | 13px | 500 | 1.4 | | muted |
| `.caption-upper` | 12px | 600 | 1.4 | +1.5px, uppercase | muted |
| `.prose-hh` | 14px | | 1.6 | | body; headings 700 ink; links primary |

**Source:** `home/HomeHero.tsx:27-58`; `home/HomeWhy.tsx:26-48`; `home/SameCv.tsx:52-110`; `home/HowTrack.tsx:79-118`; `home/HomeRoutes.tsx:36-102`; `home/HomeClosing.tsx:17-34`; `home/HeroSearch.tsx:113-158`; `eb/nav/Footer.tsx:53-58, 77, 97`; `marketing-eb.css:48-63`; `eb/primitives/Type.tsx:25-39`; `globals.css:347-383`.

---

## 4. Spacing, layout and grid

### 4.1 Landing layout (canonical)

| Token | Value | Replaces | Use it for |
|---|---|---|---|
| `--margin` | `clamp(20px, 5vw, 63px)` | `px-[var(--margin)]` | Horizontal page padding on every section, header and carousel |
| `--section-pad-y` / `-md` | 96px / 128px | `py-24 md:py-32` | Vertical padding of each landing section |
| `--width-hero` | 1440px | `max-w-[1440px]` | Hero column |
| `--width-section` | 1200px | `max-w-[1200px]` | Why, The difference, FAQ, closing card |
| `--width-section-narrow` | 1100px | `max-w-[1100px]` | Free vs Fast Track |
| `--width-intro` | 860px (760 to 860 in use) | `max-w-[860px]` | Centred eyebrow + headline + sub |
| `--width-search` | 720px (680px in the closing card) | `max-w-[720px]` | Hero search |
| `--gap-intro-content` | 56px | `mt-14` | Intro to content |
| `--header-height` | 64px | `h-16` | Sticky header |
| `--button-height` | 48px | `h-12` | Black CTA pills, search submit |
| `--search-height` | 64px | `h-16` | Hero search field |

**Hero:** centred column, `pt-14 pb-24`; from `md`: `min-height: calc(100svh - 64px)`, vertically centred, `pt-10 pb-28`.
**Section intro:** centred, eyebrow → headline → sub, content below.
**Card grid:** `grid gap-px` on a `bg-black/[0.08]` container with `rounded-[28px]` and `overflow-hidden`, so the 1px gaps *are* the hairlines; three columns from `md`, card padding 24px / 32px (`p-6 md:p-8`).
**FAQ:** two-column split from `md`, `0.8fr / 1.2fr`, gap 40px; intro left-aligned.
**Footer:** `p-2.5 md:p-3` gutter in `--ground`; three panels with 10px / 12px gaps; from `lg`: `1.55fr / 1fr` columns, lime panel spanning two rows (min height 440px, 580px from `lg`); panel padding 28px, 48px / 40px from `md`.

Common spacing steps on the landing (Tailwind numeric scale): 8, 10, 12, 16, 20, 24, 28, 32, 36, 40, 56, 96, 128px.

### 4.2 Breakpoints

| Name | Min width | Behaviour on the landing |
|---|---|---|
| `sm` | 640px | Search submit shows its label; result meta (mode chip, date) appears |
| **`md`** | **768px** | **The phone / wide-screen split.** Hero becomes full-height and shows the proof row; card grid goes 3-up; comparison becomes a table; "How it works" pins (phones get a swipe carousel); demo dropdown shows |
| `lg` | 1024px | Header shows CTAs (below: menu button); footer goes to two columns |
| `xl` | 1280px | Not used by the landing |

Design mobile-first; `md` changes behaviour, not only layout.

### 4.3 Product spacing and layout tokens

| Token | Value | Tailwind | Notes |
|---|---|---|---|
| `--space-xxs` … `--space-xxl` | 4, 8, 12, 16, 24, 32, 48px | `p-xxs` … `p-xxl` | Base 4px |
| `--space-section` | 96px | `py-section` | Same as the landing's `py-24` |
| `--container-max` | 1400px | | App shell |
| `--nav-height` | 52px | | Product nav (marketing header is 64px) |
| `--control-height` | 44px | | Inputs; legacy `.cta` pills |

> **Gotcha:** Tailwind v4 feeds the t-shirt spacing names to width utilities, so `max-w-lg` is **24px**. Never use t-shirt names with `max-w-`, `min-w-`, `w-`, `h-`, `size-` or `basis-`; use `max-w-[36rem]` or `max-w-[var(--container-max)]`.

### 4.4 Legacy layout

| Token / utility | Value | Status |
|---|---|---|
| `--content` | 1160px; `Container` max = content + 2 × margin | Legacy (archetype sections) |
| `--band` | `clamp(64px, 10vh, 120px)` section padding | Legacy; landing uses 96 / 128px |
| `.bleed-left` | `margin-left: calc(var(--margin) * -1)` | Legacy bleed gesture; not used on the landing |
| `.below-fold` | `content-visibility: auto; contain-intrinsic-size: auto 600px` | Still valid for any below-the-fold section |
| Deck grids A to F (pt) | | Not ported to the web |

The page root's `[overflow-x:clip]` stays canonical: it stops the backdrop glows and pinned row causing a horizontal scrollbar.

**Source:** `home/HomeHero.tsx:24, 64`; `home/HomeWhy.tsx:24-42`; `home/SameCv.tsx:50-64`; `home/HomeRoutes.tsx:34-42`; `home/HomeClosing.tsx:15, 44, 54`; `home/HeroSearch.tsx:98, 125-127`; `eb/nav/Header.tsx:83-91`; `eb/nav/Footer.tsx:44-47, 72, 96`; `marketing-eb.css:18-21, 88-89`; `globals.css:130-151, 270-280`; `eb/primitives/Container.tsx`, `Section.tsx`.

---

## 5. Radii, borders and elevation

### 5.1 Radius (landing, canonical)

| Token | Value | Tailwind | Use it for |
|---|---|---|---|
| (pill) | 9999px | `rounded-full` | **All buttons**, search field, tags, chips, number chips, icon buttons, dots |
| `--radius-chip-sm` | 6px (5px inside the CV) | `rounded-[6px]` | Keyword chips |
| `--radius-tile` | 11px | `rounded-tile` † | Company-initial tile |
| `--radius-doc` | 14px | `rounded-doc` † | Documents, notices, inbox, result rows |
| `--radius-stage` | 18px | `rounded-stage` † | Illustration stage |
| `--radius-popover` | 22px | `rounded-popover` † | Search dropdown |
| `--radius-card-mobile` | 24px | `rounded-card-mobile` † | Stacked route cards on phones |
| `--radius-feature` | 26px | `rounded-feature` † | Raised black Fast Track column |
| `--radius-panel` | **28px** | `rounded-panel` † | **Section containers**: card grid, story panels, footer panels |
| `--radius-closing` | 32px | `rounded-closing` † | Closing search card |
| `--radius-phone` / `-screen` | 44px / 36px | | Phone bezel / screen |
| (marked block) | 0.12em | `rounded-[0.12em]` | Reversed-out word in the footer display line |

Rule of thumb: **containers 28px, objects 14px, controls fully round.** Nest smaller radii inside larger ones (28 → 18 → 14).

Product radii (`globals.css`): `--radius-xs` 6 · `-sm` 8 · `-md` 11 · `-lg` 14 · `-xl` 20 · `-pill` 9999px; `rounded-card` 14px. Legacy deck rule "bars are always sharp (0)" applies to archetype bars only.

### 5.2 Borders and hairlines

Landing (canonical): 1px lines at `--line` (8%), `--line-soft` (7%), `--line-strong` (10%) on light; `white/10` on black. See [2.1](#lines).

- **Structure by gap, not border:** the card grid's lines are 1px gaps over an 8% black fill.
- **Comparison rows:** `border-t` at 8%; inside the black column, a `white/10` rule inset by the cell padding.
- **FAQ:** `divide-y` + `border-y` at 8%.
- **Icon button:** 32px circle, `border-black/10`; on open it fills black and rotates 45°.
- **Dashed line:** allowed once, as the "same score" marker in the fairness scene (`border-dashed border-black/50`).

Product: every element defaults to `border-color: var(--hairline)` (14%). Legacy `<Rule>`: 25% on light, 30% on dark, 35% on blue.

> **Gotcha:** the global `* { border-color: var(--hairline) }` is unlayered and beats Tailwind border-colour classes in some cases; the footer sets its social-pill border inline for this reason.

### 5.3 Elevation

**Structure is flat; objects float.** Section containers, card grids and panels never carry shadows. Shadows are allowed only on the objects below, with these exact values.

| Token | Value | Tailwind † | Use it for |
|---|---|---|---|
| `--elev-float` | `0 18px 40px -24px rgba(0,0,0,.35), 0 0 0 1px rgba(0,0,0,.05)` | `shadow-float` | Documents and mini-UI inside illustrations |
| `--elev-notice` | `0 18px 40px -16px rgba(0,0,0,.45), 0 0 0 1px rgba(0,0,0,.05)` | `shadow-notice` | Outcome notice landing on a document |
| `--elev-search` | `0 24px 60px -30px rgba(0,0,0,.35)` | `shadow-search` | Hero search field (idle) |
| `--elev-search-focus` | `0 0 0 5px rgba(79,70,229,.12), 0 24px 60px -30px rgba(0,0,0,.35)` | `shadow-search-focus` | Search field when engaged |
| `--elev-dropdown` | `0 30px 70px -30px rgba(0,0,0,.4)` | `shadow-dropdown` | Search results dropdown (solid white) |
| `--elev-feature` | `0 40px 80px -40px rgba(0,0,0,.6)` | `shadow-feature` | Raised black Fast Track column |
| `--elev-phone` | `0 50px 90px -40px rgba(0,0,0,.55), inset 0 0 0 1px rgba(255,255,255,.06)` | `shadow-phone` | Phone frames |

Pattern: large negative spread so the shadow sits **under** the object, never a halo around it; a 1px 5% ring defines the edge on light grounds.

Product UI (canonical for product): flat. `--shadow-card`, `--shadow-primary`, `--shadow-primary-hover`, `--shadow-sheen`, `--shadow-none` are `none`; `--shadow-raised` `0 0 0 0.75px rgba(0,0,0,.12)` and `--shadow-pop` `0 0 0 0.75px rgba(0,0,0,.16)` are hairline rings for menus and modals. Functional exceptions: the video seek thumb (`0 1px 4px rgba(0,0,0,.45)`).

**Source:** `home/HomeWhy.tsx:40-61, 105, 117`; `home/SameCv.tsx:106, 122, 161`; `home/HeroSearch.tsx:98-99, 138, 143-145`; `home/HomeRoutes.tsx:43, 78`; `home/HowTrack.tsx:150-151`; `home/HomeClosing.tsx:19, 22, 44`; `eb/nav/Footer.tsx:47, 72, 96, 108`; `globals.css:140-162, 285-287, 491-501`.

---

## 6. Iconography, logos and imagery

### 6.1 Icons

| Rule | Value (landing) |
|---|---|
| Library | `lucide-react` only (brand social marks in `eb/nav/SocialIcons.tsx`) |
| Sizes | 20px search and menu · 17px arrows in CTAs · 16px dropdown arrow, minus · 15px plus · 13px document, replay, X · 11 to 12px inside chips and dots |
| Stroke | Lucide default (2); **3** for ticks and X inside small filled circles; 2.6 for the Fast Track bolt; 2.4 for the minus |
| Colour | `currentColor` |
| Arrows | `ArrowRight` for "go to" CTAs (nudges right 2px on hover); `ArrowUpRight` on the search submit |
| Ticks | Check inside a filled circle: 18px lime (proof row), 28px black or lime (comparison), 24px (notices) |
| Accessibility | Decorative icons `aria-hidden="true"`; meaning carried by text or `sr-only` (e.g. "Included") |

**Do:** pair icons with text; keep them small. **Don't:** use an icon as a feature illustration, or mix libraries.

The deck's "no icons" rule is **legacy**.

### 6.2 Logos

The app's files live in `public/brand/` (copied to `assets/brand/web/`). The **full logo kit** (13 identity variants, light and dark, as SVG and PNG at 512, 1024 and 2048px, plus favicon, app icons, email and legacy files) and its usage guide are in [`../assets/brand/`](../assets/brand/README.md).

| File | Colours | Use on |
|---|---|---|
| `hirehouse-wordmark.svg` | ink `#1F2430` + blue `#4C49F3` | Light grounds; header via `BrandBadge`, **26px tall** |
| `hirehouse-wordmark-dark.svg` | white + blue | Dark grounds (`BrandBadge tone="onDark"`) |
| `hirehouse-stacked.svg` | ink `#1F2430` + blue | Footer lime panel (HIRE over HOUSE, the blue tie as the I), `clamp(150px, 15vw, 210px)` wide |
| `hirehouse-stacked-dark.svg` | white + blue | Dark grounds |
| `app-icon.svg` | white mark on a blue tile, corner radius 22% (28.16 / 128) | App icon; candidate space shell (36px) |
| `hirehouse-email-wordmark.png` | raster | Email templates only |
| `mockhouse-*` | same scheme | MockHouse sibling brand |

**Rules:** size by height only, width follows the artwork; light artwork on light grounds, `-dark` on black; never recolour, outline, add effects, or place the light wordmark on blue. Logo ink `#1F2430` is part of the artwork, not a UI colour.

### 6.3 Product imagery: phones and screenshots

- **Real screenshots** of the running app, 390 × 844 @2x WebP, captured by `npm run landing:shots` (Playwright, seeded fictional candidate), per locale in `public/landing/{en,es}/step-*.webp`. Served `unoptimized` so UI text stays sharp.
- **Frame:** `#0B0B0C` bezel, `rounded-[44px]`, 9px padding, `--elev-phone`; white screen `rounded-[36px]`, `aspect-[390/844]`; 30px status bar (11px semibold "9:41", 74 × 19px island, battery outline).
- **Screen scroll:** the centred phone's screenshot scrolls inside the frame via `object-position: 50% calc(var(--s) * 100%)`.
- **Never:** stock photography, people photos, fake UIs that look real, or screenshots with real personal data.

### 6.4 Emphasis marks

Three ways to mark a phrase. Use **one per headline**.

| Device | How | Where on the landing |
|---|---|---|
| **Marker** (`<Sketch kind="marker">`) | Hand-drawn highlighter swipe behind the word, 0.58em tall, rotated -1°, in the accent | Hero, Why, The difference, Free vs Fast Track headlines (lime) |
| **Highlighter** (`--highlight-lime`) | Hard-stop band from 58% to 92% of line height, `px-[0.06em]` | "How it works" step headlines |
| **Reversed block** | Word set in lime on a black block, `rounded-[0.12em]` | Footer display line ("back.") |

`Sketch` also offers `underline`, `double` and `circle` (used on audience pages in their accent). The stroke uses `pathLength=1` so it draws itself: on scroll into view, or on load with `now` (0.9s after a 0.75s delay) for above-the-fold marks. Marks are `aria-hidden`.

> **Gotcha:** `Sketch`'s default colour is `#4f46e5`. Always pass `color` (lime `#e9fea3` on candidate pages).

### 6.5 Illustration

Micro-scenes are built from **UI primitives**: white documents with grey skeleton lines (`bg-black/[0.08]`, 6px rounded bars), keyword chips, score bars (indigo fill on a 7% track), pill tags, notices. They sit on a `--surface-stage` panel, are `aria-hidden`, and play once on view. No characters, clip-art or stock illustration.

**Source:** `home/HomeHero.tsx:2, 40, 55-57`; `home/HomeWhy.tsx:56-141`; `home/SameCv.tsx:103-193`; `home/HomeRoutes.tsx:3, 51-52, 105-143`; `home/HowTrack.tsx:71-174`; `home/HeroSearch.tsx:102, 128, 169`; `home/Sketch.tsx:5-49`; `eb/nav/Footer.tsx:51-58`; `src/components/ui/BrandBadge.tsx:3-37`; `public/brand/*`; landing spec line 82.

---

## 7. Motion

### 7.1 Easing

| Token | Curve | Use it for |
|---|---|---|
| `--ease-out-editorial` | `cubic-bezier(.2, .7, .2, 1)` | **The house curve.** Rises, reveals, dropdown, results, FAQ, bar fills, card scenes |
| `--ease-glide` | `cubic-bezier(.2, .8, .2, 1)` | Horizontal slide-ins |
| `--ease-draw` | `cubic-bezier(.6, 0, .2, 1)` | Marker drawing on load |
| `--ease-sweep` | `cubic-bezier(.45, 0, .55, 1)` | Scanner and lime wash |
| `--ease-loop` | `cubic-bezier(.45, .05, .25, 1)` | Looping rings |
| `--ease-clock` | `cubic-bezier(.4, 0, .2, 1)` | 72-hour clock sweep |
| `--ease-pop` | `cubic-bezier(.3, 1.4, .5, 1)` | Notices and toasts landing |
| `--ease-pop-strong` | `cubic-bezier(.3, 1.6, .5, 1)` | Ticks popping |
| CSS `ease` / `ease-in-out` | | Colour and opacity, ambient drift |
| JS `ease()` | cubic in-out | Pinned phone row |

### 7.2 Durations and staggers

| Token | Value | Use it for |
|---|---|---|
| `--duration-instant` | 120ms | Legacy `.cta` colour swaps |
| `--duration-fast` | 200ms | Board list dimming, suggestion rise |
| `--duration-dropdown` | 280ms | Search dropdown |
| `--duration-control` | 300ms | Search border and halo, FAQ icon rotate |
| `--duration-result` | 350ms | Result row fade-up |
| `--duration-disclose` | 450ms (opacity 350ms) | FAQ open / close |
| `--duration-rise` | 900ms | Hero entrance, marker on load |
| `--duration-ambient` | 22s | Backdrop glow drift (alternate, infinite) |
| `--stagger-hero` | 80ms | Hero children: pill 0, h1 .08s, sub .16s, proof .24s, search .15s |
| `--stagger-result` | 40ms | Result rows |
| `--stagger-row` | 70ms | Comparison rows (+0.1s; ticks +0.35s) |
| `--stagger-list` | 30ms | Job board rows (capped 180ms) |
| Typing demo | 40 to 70ms per char · hold 1800ms · erase 18ms · gap 400ms | Hero search demo |
| Hover lift | `-2px` (`hover:-translate-y-0.5`; search submit `-1px`) | Black CTA pills |

### 7.3 Behaviours (landing)

| Pattern | Mechanism | Values |
|---|---|---|
| **Hero entrance** | `.hh-rise` | opacity 0 → 1, `translateY(18px)` → 0, 0.9s, house curve, staggered |
| **Section reveal** | `.hh-reveal`, `animation-timeline: view()` | `translateY(40px) scale(.98)` → none, over `entry 0%` to `entry 55%`; where unsupported, content simply shows |
| **One-shot scene** | `<InView>` sets `data-in="true"` once (threshold 0.35; comparison 0.25; CV scene 0.55) | Why cards (~1.7s), comparison (rows, ticks, clock), CV scene (~3.3s, with Replay) |
| **Pinned phone row** | `useScrollProgress` over a `340vh` sticky track (`md`+) | Each phone holds the centre for 45% of its stretch, then glides; neighbours scale 0.82 and fade 30% per step; gap 1.14 × phone width; headline swaps (fade, 16px shift); `01 / 04` counter |
| **Search demo** | Types example searches, live dropdown | Stops on hover or focus; caret blinks 1s `step-end` |
| **Smooth scroll** | Lenis (`lerp: 0.1`, anchors, autoRaf), home only | Touch keeps native scroll; browser `scroll-behavior` stands down while it runs |
| **Ambient** | `.hh-glow` drift | `translate(40px, 30px) scale(1.08)` → `translate(-30px, 10px) scale(.96)`, 22s, offset delays |
| **Live dot** | Tailwind `animate-ping` | Hero pill |

**Do:** play explanatory scenes once; use the house curve; keep entrances under 1s.
**Don't:** loop an explanatory scene (looping is for ambient and the Fast Track demo widgets only); animate layout on scroll below `md`.

### 7.4 Reduced motion

`prefers-reduced-motion: reduce` is honoured throughout:

- Every animation class has a reduced-motion block: `animation: none` / `transition: none`, or jump to the **end state** (CV scene runs at 1ms; rings full; counters final).
- `useScrollProgress` renders `p = 1` once; `HowTrack` swaps the pinned row for the static swipe row; `SmoothScroll` never starts Lenis; anchor scrolling becomes `auto`.
- The search demo shows the first example, still, without typing.

**Rule:** ship the reduced-motion path with the animation, and make it show the finished scene.

**Source:** `marketing-eb.css:11-16, 91-299`; `home/InView.tsx`; `home/useScrollProgress.ts`; `home/SmoothScroll.tsx`; `home/HowTrack.tsx:10-69, 93`; `home/HeroSearch.tsx:48-78, 142`; `home/SameCv.tsx:25-47`; `home/HomeHero.tsx:30, 36-52`; `home/HeroPeek.tsx:39`.

---

## 8. Theming and scoping

### 8.1 Light only

The product is **light only by design**. The dark theme's tokens were removed; `themeInitScript` pins `data-theme="light"` before first paint and clears any stored `hh-theme`. `ThemeProvider` / `useTheme` remain as no-ops so about 35 call sites compile.

| Mode | Values |
|---|---|
| Light | Everything in this document and `tokens.css` |
| Dark | **None shipped.** No `[data-theme="dark"]` block exists |

"Dark" means a **dark object or panel inside a light page**: on the landing, `--ink-raised` (`#0B0B0C`) cards and panels with white text, `white/10` rules and lime accents; in product UI, `--surface-dark`, `--on-dark`, `--on-dark-soft` and the `*-on-dark` accent text. Use `-dark` logo artwork there.

> **Open question:** the handover brief asked for dark-mode values; the code has none and says "light-only by design". Confirm dark mode is permanently out of scope.

### 8.2 Scoping marketing styles

`marketing-eb.css` is imported by `src/app/(marketing)/layout.tsx`, `src/app/me/layout.tsx` and `src/app/p/layout.tsx`.

| Layer | Scoped by | Effect |
|---|---|---|
| `.eb-marketing` | Class on the page root | Accent default; ExtraLight default weight (set weights explicitly); scopes `::selection` and `:focus-visible` |
| `[data-accent]` | Page root or region (header) | `--accent` / `--accent-ink` |
| `.on-dark` / `.on-light` | Legacy `Section` | Ghost CTA hover inversion |
| `hh-*`, `board-*`, `ftm-*`, `.t-*`, `.cta` | Global classes once loaded | Apply only where used |
| `:root` (`--margin`, `--content`, `--band`, `--accent`) | Global once loaded | Harmless to product pages |
| `html { scroll-behavior: smooth }` | Global once loaded | All routes in those groups |

**Canonical page root (landing):**

```html
<div data-accent="candidate" class="eb-marketing relative bg-[#fbfbf9] text-black [overflow-x:clip]">
  <!-- HomeBackdrop, then sections -->
</div>
```

With `tailwind-theme.css`, write `bg-ground` instead of `bg-[#fbfbf9]`.

**Scoped re-theming:** because the Tailwind theme is `@theme inline`, overriding a variable on a wrapper re-themes every utility inside it. The candidate space does this:

```html
<div data-accent="candidate"
     class="eb-marketing … [--primary:var(--ink)] [--primary-soft:var(--lime)] [--primary-soft-fg:var(--ink)] [--primary-active:var(--slate)]">
```

**Do:** put `.eb-marketing` and `data-accent` on every marketing page root; override variables locally to re-theme a region.
**Don't:** edit `globals.css` tokens to fix a marketing page; use landing styles inside product UI without the scope.

**Source:** `globals.css:1-15, 169`; `src/lib/theme/ThemeProvider.tsx:21-44`; `src/app/layout.tsx:43-46`; `marketing-eb.css:1-43`; `src/components/candidate/space/SpaceShell.tsx:71-72`; `src/app/me/layout.tsx:4-5`; `src/app/p/layout.tsx:3`.

---

## 9. Legacy, inconsistencies and open questions

> **Consolidated tracker:** every issue and open question below is also logged, de-duplicated, with an ID, severity and owner in [`05-known-issues-and-open-questions.md`](05-known-issues-and-open-questions.md).

### Legacy (keep rendering, do not extend)

| Item | Superseded by |
|---|---|
| Deck rules: ExtraLight-only type, no gradients / shadows / tints, never centred, bleed gesture, no icons | Landing principles (section 1) |
| `.t-*` type roles and `eb/primitives/Type.tsx` | Landing type scale (3.2) |
| Archetype sections (`eb/sections/*`), `Section` / `Container`, `--band`, `--content`, `.bleed-left`, `<Rule>` at 25 / 30 / 35% | Landing layout (4.1), lines (2.1) |
| `.cta` / `.cta-accent` / `.cta-ghost` at 44px, 400 weight | Landing black pill: 48px, 15px / 600 (header still uses `.cta`) |
| Deck palette greys `--grey-bg`, `--grey-block`, `--muted-dark`, `--label` as marketing grounds / text | Landing ground and text ladder (2.1) |

### Inconsistencies found in the code

1. **Focus ring** on the landing is lime on off-white (1.06:1), failing WCAG 1.4.11 (2.5).
2. **Footer column headings** `white/60` on blue are 3.12:1 at 12px, failing AA (2.5).
3. **`.eb-marketing` defaults to weight 200**, the legacy register; landing text relies on explicit weights (3.1).
4. **Two blues:** indigo `#4F46E5` (52 uses across marketing, incl. the `Sketch` default) and brand blue `#4C49F3`. The landing spec calls the employer colour "indigo" while the employer accent is `#4C49F3`.
5. **Untokenised landing values:** ground `#FBFBF9`, stage `#F6F6F3`, ink-raised `#0B0B0C`, the text ladder and all radii and shadows are arbitrary values in the code. This handover names them; the app does not yet use the names.
6. **Different "dark" grounds:** `#0B0B0C` (landing), `#000` (product and legacy), `#0A0A0D` / `#14141A` (ramp), `#1F2430` (logo ink).
7. **Hairline strengths:** 7 / 8 / 10% (landing), 14% (product default), 25% (legacy Rule).
8. **Closing card** is a blue mesh; the landing spec says black with lime accents (the code wins).
9. **Inter** loads on every marketing route but is used only by the apply page; stale layout comment.
10. **Legacy names:** `--teal-*` and `--teal` are blue / black; `--surface-soft` equals `--surface`; stale "light/dark" comments in `globals.css`.

### Open questions

- Should indigo `#4F46E5` and brand blue `#4C49F3` merge, and if so into which? (Recommendation: keep both roles, but decide whether the signal colour should become the brand blue.)
- Is dark mode permanently out of scope? (8.1)
- Should the landing's new token names (section 0 of `tokens.css`) be adopted in the app code, replacing arbitrary values?
- Should the focus ring move to black with an accent halo, as the search field already does? (2.5)
- Should the audience pages (`/companies`, `/institutions`, `/partners`) be migrated from the legacy archetype system to the landing system? (The uncommitted page kits already do this in the working tree; the question is whether to commit them.)
