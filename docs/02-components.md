# 02 · Components

The HireHouse component library reference, from the Fintrix Inc. design team to engineering and to any AI agent building on this system.

> **Canonical source (product owner ruling):** the live landing page (`src/app/(marketing)/page.tsx` and `src/components/marketing/home/*`, as rendered at `http://localhost:3001/`) **is** the HireHouse design system. Its components are the primary specs and are documented in the most depth (section 6). Where the EB library, the in-progress page kits or the product UI kit do something differently (button, radius, card, pill, motion), the landing version is canonical and the other is a **legacy** or **deviation** entry in [Known inconsistencies](#12-known-inconsistencies).

- **Scope:** every component that exists in the source app today: the Editorial Brutalist (EB) marketing library, the live landing page, the other marketing pages, and the product UI kit.
- **Not in scope:** token values (colours, spacing, radius, shadows, type sizes as tokens) and brand voice. See `01-foundations.md` for values and the brand voice doc for tone. This file names tokens and classes; it does not redefine them.
- **Source root:** all paths are relative to `powerhouse-hyring-candidate-flow/` (Next.js 16, React 19, Tailwind v4, next-intl).
- **Truth rule:** everything here was read from the code (and checked against the rendered page at `http://localhost:3001/`). Where the code is ambiguous you will see `> **Open question:**`. Where two parts of the code disagree you will see an entry in [Known inconsistencies](#12-known-inconsistencies).

### Status legend

| Status | Meaning |
|---|---|
| **Live** | Rendered on a shipped route today. |
| **Live (shared)** | Live, and used by more than one page. |
| **Dormant** | Exported and working, but no route renders it today. Safe to adopt; check it against the live look first. |
| **Orphan** | Not used anywhere and missing its styles. Do not adopt without a rebuild. |
| **In progress** | Uncommitted work by another designer (`companies/`, `institutions/`, `partners/`). Documented so you can see the direction; APIs may change. |
| **Retired** | Kept as a no-op export for compatibility. Do not use. |
| **Legacy** | (design label) Works, but diverges from the canonical landing. Do not extend. Applies to the whole EB library and to `ui/*` where used on marketing routes. |

### Two registers, one system

Read this before anything else. The marketing code carries **two typographic registers**:

1. **EB register** (`.t-*` role classes, `Type.tsx` components, `.cta` pills, `Section`/`ground`). Extra-light weights (200 to 300), tight tracking, scale carries hierarchy. Used today by the legal pages, the candidate space (`/me`, `.t-*` classes), the jobs not-found page, the header CTAs and the archetype sections (dormant in the working tree).
2. **Landing register** (inline Tailwind on the live home, companies, institutions and partners pages). Semibold headlines (`font-semibold`), Manrope, rounded cards, soft glows, one-shot scenes. This is what visitors see on every live marketing page.

**The landing register is canonical.** Build every new marketing component in it (Section 2 tells you how). The EB register is **legacy**: keep it working where it already ships (legal pages, `.cta` classes in the Header) but do not extend it, and never mix the two inside one section. The split is logged as inconsistency #1.

---

## 1. Component inventory

Layers: **primitive** (building block, no page meaning), **section** (a full-width band), **page-pattern** (page chrome or a whole-page template), **product-UI** (app kit in `src/components/ui`).

### 1.1 Marketing: EB library (`src/components/marketing/eb/`)

| Name | Layer | Path | Status |
|---|---|---|---|
| Section | primitive | `eb/primitives/Section.tsx` | Dormant |
| Container | primitive | `eb/primitives/Container.tsx` | Dormant |
| Stack | primitive | `eb/primitives/Stack.tsx` | Dormant |
| Chip, ChipRow | primitive | `eb/primitives/Chip.tsx` | Dormant |
| Rule | primitive | `eb/primitives/Rule.tsx` | Dormant |
| Cta (EB) | primitive | `eb/primitives/Cta.tsx` | Dormant (its `.cta` classes are Live via Header) |
| GroundProvider, useGround | primitive | `eb/primitives/GroundContext.tsx` | Dormant |
| Type roles (Wordmark, Hero, Display, Title, SectionHead, CardTitle, BarTitle, Lead, Body, Caption, Micro, Name, Eyebrow) | primitive | `eb/primitives/Type.tsx` | Dormant (the `.t-*` classes are Live via LegalDocument, the candidate space and `jobs/[id]/not-found`) |
| HeroA | section | `eb/sections/HeroA.tsx` | Dormant |
| StatementB | section | `eb/sections/StatementB.tsx` | Dormant |
| StaggerC | section | `eb/sections/StaggerC.tsx` | Dormant |
| ScorecardD | section | `eb/sections/ScorecardD.tsx` | Dormant |
| GridE | section | `eb/sections/GridE.tsx` | Dormant |
| CompareF | section | `eb/sections/CompareF.tsx` | Dormant |
| BarsG | section | `eb/sections/BarsG.tsx` | Dormant |
| StatRowH | section | `eb/sections/StatRowH.tsx` | Dormant |
| FeatureI | section | `eb/sections/FeatureI.tsx` | Dormant |
| TiersJ | section | `eb/sections/TiersJ.tsx` | Dormant |
| DualK (lists, faq) | section | `eb/sections/DualK.tsx` | Dormant |
| ContrastL | section | `eb/sections/ContrastL.tsx` | Dormant |
| ClosingM | section | `eb/sections/ClosingM.tsx` | Dormant |
| SectionRenderer | page-pattern | `eb/sections/SectionRenderer.tsx` | Dormant |
| accentInk (helper) | primitive | `eb/sections/accents.ts` | Dormant |
| Header | page-pattern | `eb/nav/Header.tsx` | Live (shared) |
| Footer | page-pattern | `eb/nav/Footer.tsx` | Live (shared) |
| AccountMenu | primitive | `eb/nav/AccountMenu.tsx` | Live (shared) |
| SocialIcon | primitive | `eb/nav/SocialIcons.tsx` | Live (shared) |

### 1.2 Marketing: landing page (`src/components/marketing/home/`)

| Name | Layer | Path | Status |
|---|---|---|---|
| HomeBackdrop | section | `home/HomeBackdrop.tsx` | Live |
| HomeHero | section | `home/HomeHero.tsx` | Live |
| HeroPeek | primitive (server data wrapper) | `home/HeroPeek.tsx` | Live |
| HeroSearch (+ ModeChip) | primitive | `home/HeroSearch.tsx` | Live |
| HomeWhy | section | `home/HomeWhy.tsx` | Live |
| SameCv | section | `home/SameCv.tsx` | Live |
| HowTrack (+ Phone) | section | `home/HowTrack.tsx` | Live |
| HomeRoutes (+ Value) | section | `home/HomeRoutes.tsx` | Live |
| HomeClosing (FAQ + closing card) | section | `home/HomeClosing.tsx` | Live |
| Sketch | primitive | `home/Sketch.tsx` | Live (shared) |
| InView | primitive | `home/InView.tsx` | Live (shared) |
| SmoothScroll | primitive | `home/SmoothScroll.tsx` | Live |
| useScrollProgress (hook) | primitive | `home/useScrollProgress.ts` | Live |

### 1.3 Marketing: inline patterns (repeated in code, not yet extracted)

| Name | Layer | Where it appears | Status |
|---|---|---|---|
| Section heading (eyebrow + h2 + sub) | primitive | HomeWhy, SameCv, HomeRoutes, HomeClosing; extracted as `SectionHead` in `companies/Cta.tsx` | Live (inline) |
| Black pill CTA | primitive | HomeRoutes, Footer; extracted as `PostRoleCta` / `BookCta` / `PillOut` in progress kits | Live (inline) |
| Hairline card grid | section | HomeWhy, CompaniesPain, PartnersWhy | Live (inline) |
| FAQ accordion (`.hh-faq`) | section | HomeClosing, CompaniesClosing, InstClosing, PartnersClosing | Live (inline) |
| Closing card | section | HomeClosing (blue mesh), Companies/Inst/Partners closings (black) | Live (inline) |

### 1.4 Marketing: other

| Name | Layer | Path | Status |
|---|---|---|---|
| Logo | primitive | `marketing/Logo.tsx` | Live (inside WorkspaceSignInModal) |
| WorkspaceSignInModal | page-pattern | `marketing/WorkspaceSignInModal.tsx` | Live (Header, non-candidate routes) |
| LegalDocument | page-pattern | `marketing/LegalDocument.tsx` | Live (`/privacy`, `/terms`) |
| JobCard | primitive | `marketing/JobCard.tsx` | Dormant (only its `JobCardData` type is imported) |
| JobSearchBar | primitive | `marketing/JobSearchBar.tsx` | Orphan (no importer; its `.searchbar`, `.fld`, `.ac-list`, `.btn` classes are not defined anywhere) |
| ModePill + MODE_ICON / MODE_STYLE | primitive | `marketing/jobs/ModePill.tsx`, `jobs/modeIcons.ts` | Live (shared) |
| JobRow | primitive | `marketing/jobs/JobRow.tsx` | Live (`/jobs`) |
| Jobs board kit (BoardSearch, BoardToolbar, BoardPagination, SortMenu, JobListItem, ApplyLauncher, FastTrackChoice, FastTrackMotion tiles, IdTeaser, SaveRole, SaveRoleButton, LoopVideo, BoardBackdrop, UrlSync, JobLd) | mixed | `marketing/jobs/*` | Live (`/jobs`, `/jobs/[id]`). Inventoried only; the board is outside this doc's landing focus. |

### 1.5 Marketing: in-progress page kits (uncommitted)

| Name | Layer | Path | Status |
|---|---|---|---|
| PostRoleCta, DemoCta, SectionHead | primitive | `companies/Cta.tsx` | In progress |
| StickyCta | page-pattern | `companies/StickyCta.tsx` | In progress |
| CompaniesBackdrop, Hero, Pain, How, Shortlist, Fair, Cost, Closing | section | `companies/*.tsx` | In progress |
| Eyebrow, PillOut, DemoButton, mark, markNow, STATE | primitive | `institutions/shared.tsx` | In progress |
| InstBackdrop, InstHero, Problem, How, Readiness, Reports, Students, Closing | section | `institutions/*.tsx` | In progress |
| Eyebrow, BookCta, AnchorCta, mark, markNow | primitive | `partners/ui.tsx` | In progress |
| TypesTabs | primitive | `partners/TypesTabs.tsx` | In progress |
| PartnersBackdrop, Hero, Why, Types, Flow, Paid, Trust, Closing | section | `partners/*.tsx` | In progress |

### 1.6 Product UI kit (`src/components/ui/`, barrel `ui/index.ts`)

| Name | Layer | Path | Status |
|---|---|---|---|
| Button | product-UI | `ui/Button.tsx` | Live (shared) |
| Badge | product-UI | `ui/Badge.tsx` | Live (shared) |
| Card | product-UI | `ui/Card.tsx` | Live (shared) |
| TextInput, TextArea | product-UI | `ui/TextField.tsx` | Live (shared) |
| Select | product-UI | `ui/Select.tsx` | Live (shared) |
| Modal | product-UI | `ui/Modal.tsx` | Live (shared) |
| Drawer | product-UI | `ui/Drawer.tsx` | Live (shared) |
| Tabs | product-UI | `ui/Tabs.tsx` | Live (shared) |
| Tooltip | product-UI | `ui/Tooltip.tsx` | Live (shared) |
| Switch | product-UI | `ui/Switch.tsx` | Live (shared) |
| Skeleton, SkeletonText | product-UI | `ui/Skeleton.tsx` | Live (shared) |
| ApplicationRowSkeleton, DashboardSkeleton, CandidateSheetSkeleton, ContestSkeleton | product-UI | `ui/skeletons.tsx` | Live (shared) |
| Spinner | product-UI | `ui/Spinner.tsx` | Live (shared) |
| BrandBadge | product-UI | `ui/BrandBadge.tsx` | Live (shared, also in marketing Header) |
| BrandLogo | product-UI | `ui/BrandLogo.tsx` | Live (shared) |
| Icon | product-UI | `ui/Icon.tsx` | Live (shared) |
| LanguageSwitcher | product-UI | `ui/LanguageSwitcher.tsx` | Live (shared, also in marketing Header) |
| ResumeDropzone | product-UI | `ui/ResumeDropzone.tsx` | Live |
| MarkdownEditor | product-UI | `ui/MarkdownEditor.tsx` | Live |
| VideoPlayer | product-UI | `ui/VideoPlayer.tsx` | Live |
| ThemeToggle, ThemeSwitch, FloatingThemeToggle | product-UI | `ui/Theme*.tsx`, `ui/FloatingThemeToggle.tsx` | Retired (return `null`) |

---

## 2. How to design a NEW component in this system

Use this when the component you need does not exist yet. The goal: someone looking at the page should not be able to tell which components are new.

### 2.1 Recipe

1. **Look for it first.** Search this inventory and the inline patterns (1.3). Three CTA pills and three eyebrows already exist (see inconsistencies); a fourth is the most common way this system drifts.
2. **Pick the layer and the register.**
   - Product app screen: product-UI layer, build on `ui/*`, tokens such as `bg-surface`, `text-ink`, `border-hairline`, `rounded-md`, spacing `gap-sm`/`px-md`/`p-lg`.
   - Any marketing page: the landing register (2.3). This is canonical.
   - Only when editing an existing legacy EB surface (legal pages, dormant archetypes): the EB register (`Section` + `Type` roles + `Cta`). Do not start new work in it.
   - Product app screens may keep `ui/*`, but where a product component overlaps a landing pattern (pill CTA, card, chip), the landing look wins for anything customer-facing on marketing routes.
3. **Pick the ground and accent.**
   - Marketing pages sit in a wrapper `<div data-accent="{candidate|employer|institution|partner}" className="eb-marketing relative bg-[#fbfbf9] text-black [overflow-x:clip]">`. Use `var(--accent)` / `var(--accent-ink)` for anything that must follow the route (focus ring, selection, `.cta-accent`).
   - Named accents come from the palette tokens `bg-lime`, `bg-lilac`, `bg-yellow`, `bg-blue` (values in `01-foundations.md`).
   - Ink pairing is law: black and blue grounds take white ink; lime, yellow, lilac and grey take black ink (`src/lib/marketing/ground.ts`, `accentInk()`).
   - Lilac is never a full-width section ground; it is a panel or highlight colour only (`SectionGround` excludes it).
   - Blue anchors an end of an accent sequence, never the middle (`accentAt()` in `src/content/marketing/types.ts`).
4. **Set type with roles, not ad hoc sizes.** Use the landing scale (2.3) or the EB roles (section 4). Do not invent a new size; if none fits, raise it with design.
5. **Choose the radius from the ladder** (2.4).
6. **Write states before visuals:** default, hover, focus-visible, active, disabled, loading, error, empty. If a state does not apply, say so in the component's doc comment.
7. **Motion is one-shot and optional.** Entrance scenes run once via `InView` (`data-in`) plus a page-prefixed CSS class. Always ship a `prefers-reduced-motion: reduce` rule that shows the finished state (2.5).
8. **Accessibility pass** (2.6), then **content pass** (2.7).
9. **Copy goes in `messages/{en,es}/*.json`**, never hardcoded. Ship English and Spanish together.
10. **Document it here** with the template in 2.9 and add it to the inventory.

### 2.2 Accent usage rules

| Rule | Source of truth |
|---|---|
| One route accent per page, set by `data-accent` on the page wrapper and on the Header. | `marketing-eb.css` (`[data-accent=…]`), `Header.tsx` |
| Lime means "the candidate's next move": highlights, ticks, the Fast Track chip, the hand-drawn marker. | Spec `2026-10-09-landing-redesign-design.md` (Visual system) |
| The hand-drawn marker (`Sketch kind="marker"`) colours 1 to 2 words of a headline via the `<m>` tag in copy. Use the route's accent colour: lime (candidate), lilac (institutions), yellow (partners). `/companies` also uses lime although its route accent is blue (open question). | `Sketch.tsx`, `partners/ui.tsx` (`mark`), `institutions/shared.tsx` |
| Indigo is used for eyebrows, score bars, the caret and live-state rings on the landing register. | `HomeWhy.tsx` etc. (note the hex mismatch, inconsistency #15) |
| Lilac text is too pale to read; use plum `#7b3f87` for small institution text. | `institutions/shared.tsx` (`PLUM`) |
| Pale accent fills (lime, yellow, lilac) never carry white text. | `ground.ts` |
| Never use the accent as a large flat page ground on the landing register; it appears as glows (`HomeBackdrop`), chips, highlights and one panel (the Footer's lime panel). | HomeBackdrop, Footer |

### 2.3 The landing register (de facto scale used by every live marketing page)

All values below are literal classes found in the live components. Font is Manrope (inherited from `body`).

| Role | Classes | Example |
|---|---|---|
| Live pill / kicker link | `rounded-full border border-black/[0.08] bg-white/80 py-1 pl-2.5 pr-3 text-[12.5px] font-medium text-[#555]` | HomeHero count pill |
| Hero H1 | `text-[clamp(32px,9.2vw,56px)] md:text-[clamp(56px,6.2vw,90px)] font-semibold leading-[0.98] tracking-[-0.055em]` | HomeHero |
| Eyebrow | `text-[12px] font-semibold uppercase tracking-[0.16em] text-[#4f46e5]` | HomeWhy, SameCv, HomeRoutes |
| Section H2 | `text-balance text-[clamp(30px,4.4vw,56px)] font-semibold leading-[1.04] tracking-[-0.045em]` | HomeWhy |
| Closing H2 | `text-[clamp(34px,5.4vw,72px)] font-semibold leading-[0.98] tracking-[-0.05em]` | HomeClosing |
| Section sub | `text-[17px] font-normal leading-relaxed text-[#4a4a4a] max-w-[52ch]` | HomeWhy |
| Card H3 | `text-[22px] font-semibold leading-tight tracking-[-0.025em]` | HomeWhy |
| Card body | `text-[15.5px] leading-relaxed text-[#555]` | HomeWhy |
| FAQ question | `text-[17px] font-semibold tracking-[-0.015em]` | HomeClosing |
| Meta / caption | `text-[12.5px] text-[#777]` to `text-[13px]` | HeroSearch rows |
| Numbered chip | `rounded-full bg-lime px-2.5 py-1 text-[12px] font-bold tabular-nums` (`01`, `02`) | HomeWhy |

Section rhythm: `relative mx-auto w-full max-w-[1200px] px-[var(--margin)] py-24 md:py-32`. Heading block: `mx-auto max-w-[860px] text-center`, content starts `mt-14`.

Always set an explicit weight (`font-normal` or heavier) on landing-register text: `.eb-marketing` sets a base `font-weight: 200`, so unweighted text renders extra-light.

### 2.4 Radius ladder (observed)

| Radius | Used for |
|---|---|
| `rounded-full` | All actions (CTAs, search field, icon buttons), chips, tags, avatars, status dots |
| `rounded-[5px]` to `rounded-[6px]` | Inline keyword tags inside illustrations, the JobRow "Featured" tag |
| `rounded-[10px]` to `rounded-[11px]` | Menu items, result avatar tiles |
| `rounded-[14px]` (`rounded-card`, `rounded-lg`) | Small cards, result rows, illustration documents, EB cards and panels |
| `rounded-[16px]` to `rounded-[18px]` | Dropdown menus (AccountMenu), illustration wells |
| `rounded-[22px]` | Search results dropdown |
| `rounded-[24px]` to `rounded-[28px]` | Section-level cards and panels (hairline grids, SameCv panels, Footer panels, routes table column) |
| `rounded-[32px]` | Closing card (one per page) |
| `rounded-[44px]` / `[36px]` | Phone bezel / screen |

Product UI uses the token radii (`rounded-xs` 6, `rounded-sm` 8, `rounded-md` 11, `rounded-lg` 14, `rounded-xl` 20, `rounded-pill`). Values in `01-foundations.md`.

Rule of thumb: the larger the surface, the larger the radius; nested surfaces step down at least one rung. EB archetype blocks are the exception: they use flat `rounded-[14px]` everywhere and `BarsG` bars have no radius at all.

### 2.5 Motion recipe

| Step | Do this |
|---|---|
| Trigger | Wrap the scene in `<InView className="hh-why …">` (or your page prefix). It sets `data-in="true"` once, at 35% visibility by default. |
| Classes | Prefix per page: `hh-` home, `hc-` companies, `hi-` institutions, `hp-` partners, `ftm-` Fast Track, `board-` jobs board. Put them in that page's CSS file. |
| Easing | Enter/settle: `cubic-bezier(.2, .7, .2, 1)`. Pop/overshoot: `cubic-bezier(.3, 1.4 to 1.6, .5, 1)`. |
| Duration | Small beats 0.25 to 0.5s, fills and washes 0.8 to 1.6s, whole scenes about 3s. Stagger with a `--i` custom property (`calc(var(--i) * 70ms)`). |
| Page load | Use `.hh-rise` with `animationDelay` steps of 0.08s for above-the-fold content. |
| Scroll scenes | Use `animation-timeline: view()` only inside `@supports`; content must be fully visible without it. |
| Reduced motion | Mandatory `@media (prefers-reduced-motion: reduce)` block that removes the motion and shows the end state (see `.hh-cv` for the 1ms trick that lands keyframes on their final frame). |
| Loops | Avoid. Infinite loops exist only for ambient glows (`.hh-glow`), the caret, the ID sway and Fast Track tiles, and each has a reduced-motion stop (except the two noted in inconsistency #20). |
| JS | No animation libraries. Lenis (`SmoothScroll`) is the only scroll library and is disabled for reduced motion and touch. |

### 2.6 Accessibility checklist

- Real text lives in the DOM; illustrative scenes are `aria-hidden="true"` (HomeWhy art, SameCv CV, HowTrack status bar).
- Icons are `aria-hidden`; icon-only controls carry an `aria-label` from i18n (`header.menu`, `header.close`).
- Ticks and dashes carry `sr-only` words (HomeRoutes `Value`: `included` / `notIncluded`).
- Dynamic results announce with `aria-live="polite"` (HeroSearch list).
- Headings descend without gaps: one `h1` per page (the hero), `h2` per section, `h3` per card.
- Focus is always visible. Inside `.eb-marketing` the shipped `:focus-visible` draws `2px solid var(--accent)` with `3px` offset; on the off-white ground the lime, yellow and lilac rings fail 3:1 (A11Y-01 in 05). **For new work** use a `2px solid #000` outline with `3px` offset plus an accent halo (`box-shadow: 0 0 0 6px var(--accent)`), as `templates/starter.html` does. Product UI uses `ring-2 ring-[var(--focus-ring)] ring-offset-1`. If your component suppresses outline, it must show its own focus (as HeroSearch does with its border).
- Touch targets at least 44px (`.cta` is 44px, landing pills `h-12` 48px, FAQ summary `min-h-[44px]` in the companies version).
- Popups close on Escape and on outside click (AccountMenu pattern).
- Respect reduced motion (2.5).

### 2.7 Content rules (all components)

| Rule | Example from the code |
|---|---|
| Sentence case for every label, button and heading. | "Post a role, free", "Browse jobs", "Find a role" |
| CTAs are verb-first, 1 to 4 words, no trailing punctuation. | "Search", "Sign in", "Find a role, free" |
| Headlines are full sentences with a full stop. | "Straight answers.", "Your next application deserves an answer." |
| Eyebrows are 1 to 4 words, no full stop, rendered uppercase by CSS (write them in sentence case in copy). | "Why HireHouse", "The difference", "Free or Fast Track" |
| Mark at most one phrase per headline with `<m>…</m>`; keep it short (1 to 2 words is the stated rule). | `always <m>writes back</m>.` |
| Line breaks in headlines come from `<l>…</l>` tags in copy, never `<br>`. | Hero and Footer headlines |
| No fabricated numbers. Figures must be true by construction or come from the proof gate (`resolveProof`). | `HomeHero` hides the role count below 20; `PartnersPaid` shows only a zero that is true |
| No em dashes; use colons, commas or parentheses. British spelling. | Brand rule |
| Never claim a human reads every CV, never mention refunds, never state a fixed Fast Track price. | Spec, "Claims we may not make" |

### 2.8 New component checklist

| Check | Done |
|---|---|
| Not a duplicate of an existing component or inline pattern | ☐ |
| Layer and register chosen; no mixing of `.t-*` roles and landing-register classes in one section | ☐ |
| Colours from tokens or the route accent; ink pairing respected; no new hex values | ☐ |
| Type from the landing scale or an EB role; explicit weight set | ☐ |
| Radius from the ladder; nested surfaces step down | ☐ |
| Spacing on the section rhythm (`py-24 md:py-32`, `mt-14` content gap) or the token scale | ☐ |
| States designed: default, hover, focus-visible, active, disabled, loading, error, empty (or marked n/a) | ☐ |
| Motion one-shot, page-prefixed classes, reduced-motion end state | ☐ |
| Accessible name, roles, keyboard path, 44px targets, decorative parts hidden | ☐ |
| Copy in `messages/en` and `messages/es`; sentence case; no em dashes; no unproven numbers | ☐ |
| Server component unless it needs state or effects | ☐ |
| Entry added to this file (template 2.9) | ☐ |

### 2.9 Documentation template

```md
### ComponentName
**Purpose:** one line. **Layer:** … **Status:** … **Source:** `path`
**Anatomy:** named parts.
**Variants & props:** table from the real TS props.
**States:** default / hover / focus-visible / active / disabled / loading / error / empty.
**Spacing & sizing:** real classes.
**Accessibility:** roles, labels, keyboard, focus, reduced motion.
**Content rules:** length, casing.
**Do / Don't.**
**Usage:** minimal real JSX.
```

---

## 3. Marketing primitives (EB library, legacy)

> **Legacy.** Documented because it ships in places (Header `.cta`, legal pages). For new work use the landing equivalents in sections 6 and 7.

Shared EB rules for this section: all primitives live in `src/components/marketing/eb/primitives/` and are re-exported from `eb/primitives/index.ts`. Ground-aware pieces (`Chip`, `Rule`) are client components because they read `GroundContext`.

### Section

**Purpose:** a full-width vertical band with one flat ground and its mandatory ink pairing.
**Source:** `eb/primitives/Section.tsx` · **Status:** Dormant

**Anatomy:** `<Tag>` band (ground background, ink colour, `on-dark`/`on-light` class) › `Container` (unless `bare`) › children. Wraps everything in `GroundProvider`.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `ground` | `SectionGround` = `"black" \| "white" \| "grey" \| "lime" \| "yellow" \| "blue"` | required | Lilac is excluded by type. |
| `bare` | `boolean` | `false` | Skip the inner Container for full-bleed layouts. |
| `belowFold` | `boolean` | `false` | Adds `.below-fold` (`content-visibility: auto`). Never on the first section. |
| `id` | `string` | none | Anchor target. |
| `as` | `"section" \| "header" \| "footer" \| "div"` | `"section"` | |
| `className`, `containerClassName` | `string` | none | |

**States:** static. `on-dark`/`on-light` drives `.cta-ghost` hover inversion inside it.
**Spacing & sizing:** `py-[var(--band)]`, `relative overflow-x-clip`.
**Accessibility:** renders a landmark-free `<section>`; give it a heading. `overflow-x-clip` means bleed effects never create a horizontal scrollbar.
**Do:** derive ink from ground (never pass text colour). **Don't:** put a lilac or accent-coloured Section on a page that already has a blue Section (one blue band per page, per `StatementB`).

```tsx
<Section ground="white" id="how">
  <ChipRow labels={["How it works"]} />
  <SectionHead className="mt-6">Three steps, one bar.</SectionHead>
</Section>
```

### Container

**Purpose:** max-width wrapper with the hard left margin.
**Source:** `eb/primitives/Container.tsx` · **Status:** Dormant
**Props:** `className?`, `children`.
**Sizing:** `mx-auto w-full px-[var(--margin)]`, `maxWidth: calc(var(--content) + var(--margin) * 2)`. Values of `--margin` and `--content` in `01-foundations.md`.
**Do:** use it for every non-bleed EB layout. **Don't:** nest two Containers.

```tsx
<Container className="py-10">{children}</Container>
```

### Stack

**Purpose:** vertical rhythm restricted to the system spacing scale.
**Source:** `eb/primitives/Stack.tsx` · **Status:** Dormant

| Prop | Type | Default |
|---|---|---|
| `gap` | one of `4, 8, 12, 16, 20, 22, 26, 30, 34, 44, 46, 50, 53` | `16` |
| `className` | `string` | none |

Any other number silently falls back to `gap-4` (16px).

```tsx
<Stack gap={26}><Lead>…</Lead><Body>…</Body></Stack>
```

### Chip and ChipRow

**Purpose:** the signature EB eyebrow pill above a headline.
**Source:** `eb/primitives/Chip.tsx` · **Status:** Dormant

**Anatomy:** pill (`t-chip`) · label. `ChipRow` = one or two adjoining chips.

| Component | Props |
|---|---|
| `Chip` | `children`, `className?` |
| `ChipRow` | `labels: [string] \| [string, string]` (typed so three is impossible) |

**States:** fill inverts with the ground: `bg-black text-white` on light, `bg-white text-black` on dark.
**Spacing:** `h-[27px] px-2 rounded-full`; `ChipRow` is `-ml-1.5 flex gap-[1px]` so the chip text, not the pill cap, aligns with the headline margin.
**Content rules:** 1 to 3 words each, sentence case, no punctuation. Never three chips.

```tsx
<ChipRow labels={["For candidates", "Free"]} />
```

### Rule

**Purpose:** hairline divider whose alpha follows the ground.
**Source:** `eb/primitives/Rule.tsx` · **Status:** Dormant
**Props:** `className?`.
**Sizing:** `h-px w-full border-0`; colour `rgba(0,0,0,.25)` on light, `rgba(255,255,255,.30)` on dark, `rgba(255,255,255,.35)` on blue.
**Accessibility:** renders `<hr>` (a separator for assistive tech). Use a `div` border instead when it is purely decorative inside a list.

```tsx
<Rule className="mt-12" />
```

### Cta (EB)

**Purpose:** primary (accent-filled) or secondary (ghost hairline) call to action, self-instrumented for analytics.
**Source:** `eb/primitives/Cta.tsx`, styles `.cta`, `.cta-accent`, `.cta-ghost` in `src/app/(marketing)/marketing-eb.css` · **Status:** Dormant component, Live classes (Header)

| Prop | Type | Default | Notes |
|---|---|---|---|
| `href` | `string` | required | `/path` renders a locale-aware `Link`; `http(s)://` or `//` opens in a new tab with `noopener noreferrer`; anything else is a plain `<a>`. |
| `variant` | `"accent" \| "ghost"` | `"accent"` | |
| `track` | `string` | string children | Written to `data-track` for the consent-gated analytics delegate. |
| `className` | `string` | none | |

**States**

| State | accent | ghost |
|---|---|---|
| Default | `background: var(--accent)`, `color: var(--accent-ink)` | transparent, `1px solid currentColor` |
| Hover | inverts: background `--accent-ink`, text `--accent` | 14% `currentColor` tint; full invert inside `.on-dark` (white fill) or `.on-light` (black fill) |
| Focus-visible | `.eb-marketing :focus-visible` accent outline, 2px, offset 3px | same |
| Active / disabled / loading | not defined | not defined |

**Sizing:** `height: 44px; padding-inline: 20px; border-radius: 999px; font: 400 15px; letter-spacing: -0.01em`; `48px` tall when a direct child of `[data-search]`. Transition 120ms on colours.
**Accessibility:** a link, not a button: use it for navigation only. External links do not announce "opens in a new tab" (compare `BookCta`, which does).
**Content rules:** verb-first, 1 to 4 words, sentence case.
**Do:** one accent CTA per group, ghost for the second. **Don't:** add `!` overrides except on a blue ground (StatementB does `!bg-white !text-blue`).

```tsx
<Cta href="/jobs">Find a role</Cta>
<Cta href="/companies" variant="ghost">For employers</Cta>
```

### GroundProvider / useGround

**Purpose:** passes the current section ground and tone (`light`/`dark`) to children so they can pick ink.
**Source:** `eb/primitives/GroundContext.tsx` · **Status:** Dormant
**API:** `<GroundProvider ground={Ground}>`; `useGround(): { ground, tone }`. Default outside a provider: `{ ground: "white", tone: "light" }`.
**Do:** read it in any new ground-aware primitive. **Don't:** pass ink colours as props.

```tsx
const { tone } = useGround();
```

---

## 4. Type roles (EB, legacy)

> **Legacy.** The canonical type scale is the landing register in 2.3.

**Purpose:** typographic components bound to `.t-*` role classes; `Type.tsx` calls them "the only way to set type" in the EB register.
**Source:** `eb/primitives/Type.tsx`, classes in `marketing-eb.css` · **Status:** Dormant components; classes Live in LegalDocument, the candidate space (`src/app/me/*`, `components/candidate/*`) and `jobs/[id]/not-found.tsx`.

Every role accepts `as?: ElementType`, `className?`, `children`, and passes other props through.

| Component | Class | Default element | Weight | Size | Leading | Tracking |
|---|---|---|---|---|---|---|
| `Wordmark` | `t-wordmark` | span | 700 | clamp(72px, 14vw, 133px) | 1 | -0.05em (nowrap) |
| `Hero` | `t-hero` | h1 | 700 | clamp(40px, 7vw, 57px) | 1 | -0.07em |
| `Display` | `t-display` | h2 | 700 | clamp(28px, 4.5vw, 44px) | 1 | -0.05em |
| `Title` | `t-title` | h1 | 200 | clamp(28px, 4.5vw, 44px) | 1 | -0.03em |
| `SectionHead` | `t-section` | h2 | 200 | clamp(24px, 3.2vw, 34px) | 1.1 | -0.03em |
| `BarTitle` | `t-bar` | span | 200 | clamp(18px, 2.4vw, 24px) | 1.07 | -0.03em |
| `Lead` | `t-lead` | p | 300 | clamp(16px, 1.8vw, 18px) | 1.4 | -0.03em |
| `CardTitle` | `t-cardtitle` | h3 | 300 | clamp(15px, 1.5vw, 17.8px) | 1.15 | -0.03em |
| `Name` | `t-name` | span | 400 | clamp(14px, 1.3vw, 16px) | 1.5 | -0.011em |
| `Body` | `t-body` | p | 300 | clamp(15px, 1.2vw, 16px) | 1.4 | -0.011em |
| `Caption` | `t-caption` | p | 300 | 13px | 1.5 | -0.011em |
| `Micro` | `t-micro` | span | 400 | 12px | 1.38 | -0.005em |
| `Eyebrow` | `t-eyebrow` | span | 400 | 12px, uppercase | 1.2 | 0.05em |
| (chip text) | `t-chip` | n/a | 300 | clamp(15px, 1.4vw, 17.8px) | 1 | -0.03em (nowrap) |
| (emphasis) | `lead-in` | n/a | 700 | inherits | | |

**Rules:** hierarchy comes from scale, not weight. Change the element with `as`, never the class (for example `<CardTitle as="span">` in an FAQ summary). Bold only the first clause of a callout with `<span className="lead-in">`.

```tsx
<SectionHead>Every applicant hears back.</SectionHead>
<Body className="mt-4 text-muted-light">Scored on the same criteria.</Body>
```

---

## 5. Navigation and chrome

### Header

**Purpose:** sticky site header for every marketing page: wordmark, language, route-appropriate CTAs.
**Source:** `eb/nav/Header.tsx` · **Status:** Live (shared)

**Anatomy:** `<header data-accent={audience}>` › `<nav>` › home link (`BrandBadge variant="hire" height={26}`) · right cluster (`LanguageSwitcher` · desktop CTA group · mobile menu toggle) › mobile panel `#marketing-mobile-navigation` · `WorkspaceSignInModal`.

**Props:** none. Audience comes from `ROUTE_ACCENT[pathname]` (`src/lib/marketing/site.ts`), default `"candidate"`.

| Audience | CTAs (desktop, in order) |
|---|---|
| candidate (`/`, `/jobs`, `/fast-track`) | "Browse jobs" (`cta cta-ghost`) · AccountMenu, or "Sign in" (`cta cta-accent`, link to candidate sign-in) |
| employer (`/companies`) | "Post a role, free" (`cta cta-accent`, `data-accent="employer"`) · "Sign in" (`cta cta-ghost` button, opens WorkspaceSignInModal) |
| institution, partner | "Browse jobs" ghost · AccountMenu whose signed-out slot is a "Sign in" button that opens WorkspaceSignInModal |

> **Open question:** institution and partner routes fall through to the candidate CTA set (Browse jobs + account menu) but their Sign in opens the employer workspace modal. Is that intended?

**States:** mobile menu closed/open (icon `Menu` / `X`); AccountMenu loading placeholder; signed in / signed out.
**Spacing & sizing:** `sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur`; nav `h-16 px-[var(--margin)]`; cluster `gap-2 sm:gap-3`; desktop group `hidden lg:flex gap-3`; toggle `h-10 w-8`; mobile panel `px-[var(--margin)] py-6`, stacked `gap-3`.
**Accessibility:** home link `aria-label` "{name} home"; toggle has `aria-expanded`, `aria-controls`, localised `aria-label`. The header sits outside `.eb-marketing`, so its focus ring is the browser default, not the accent ring. The mobile panel does not close on Escape or trap focus. The toggle is 32px wide (below 44px).
**Content rules:** two CTAs maximum; labels from `marketing.header.*`.
**Do:** keep `data-accent` on the header (without it `.cta-accent` rendered transparent, per the code comment). **Don't:** re-add audience nav links (removed by request).

```tsx
<Header />
```

### AccountMenu

**Purpose:** header account control: avatar menu when signed in, the provided sign-in control when not.
**Source:** `eb/nav/AccountMenu.tsx` · **Status:** Live (shared)

| Prop | Type | Notes |
|---|---|---|
| `signIn` | `ReactNode` | Rendered when signed out or anonymous. |
| `onNavigate` | `() => void` | Called after any menu choice (closes the mobile panel). |
| `name`, `photoUrl` | `string`, `string \| null` | When given, skips the `/api/me/identity` fetch. |

**Anatomy:** trigger pill (Avatar 34px · ChevronDown) › menu panel (identity row: Avatar 38px, name, email) › links (Your space, Your applications, Saved roles) › Sign out.
**States:** loading (neutral `h-10 w-[60px] rounded-full bg-black/[0.05]` placeholder so "Sign in" never flashes); signed out (`signIn` slot); closed; open (chevron rotates 180°); item hover `bg-black/[0.04]`.
**Spacing:** trigger `h-10 rounded-full border border-black/10 bg-white pl-1 pr-2.5`, hover `border-black/30`; panel `w-[260px] rounded-[16px] p-1.5 shadow-[0_24px_50px_-20px_rgba(0,0,0,.35)]`, entrance `.hh-dropdown`; items `rounded-[10px] px-3 py-2 text-[14px]`, icons 16px `text-[#555]`. Initials avatar: lime-to-lilac gradient, `text-[13px] font-bold`.
**Accessibility:** trigger `aria-haspopup="menu"`, `aria-expanded`, `aria-label` "Account menu for {email}"; panel `role="menu"`, items `role="menuitem"`; Escape and outside click close it. Arrow-key navigation and focus-into-menu are not implemented, which the `menu` role implies.
**Do:** pass `name`/`photoUrl` where the page already has them. **Don't:** use the sign-in provider's photo (deliberately excluded).

```tsx
<AccountMenu signIn={<a className="cta cta-accent" href={signInHref}>Sign in</a>} />
```

### Footer

**Purpose:** shared marketing footer: three solid panels (promise, links, social and legal).
**Source:** `eb/nav/Footer.tsx` · **Status:** Live (shared)

**Anatomy:** lime panel (stacked wordmark link · big promise with one reversed-out word · promise line · "Find a role" pill) · blue panel (three link columns: Candidates, Business, Legal + Cookie settings) · black panel (Follow heading · social pills · legal line).
**Props:** none.
**States:** link hover `text-white/80` to `text-white`; social pill hover `bg-yellow text-black`; CTA hover lifts `-translate-y-0.5`, arrow nudges `translate-x-0.5`.
**Spacing & sizing:** outer `bg-[#fbfbf9] p-2.5 md:p-3`; grid `lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] gap-2.5 lg:gap-3`; panels `rounded-[28px]`, lime `p-7 md:p-12 min-h-[440px] lg:min-h-[580px] lg:row-span-2`, blue and black `p-7 md:p-10`; wordmark `w-[clamp(150px,15vw,210px)]`; big type `text-[clamp(58px,9vw,150px)] font-semibold leading-[0.86] tracking-[-0.06em]`; column heads `text-[12px] font-semibold uppercase tracking-[0.14em] text-white/60`; links `text-[15px]`; social pills `rounded-full border py-2 pl-3 pr-4 text-[14px]` with inline border colour `rgba(255,255,255,0.28)`; legal line `text-[13px] text-white/50`.
**Accessibility:** wordmark link labelled "{name} home"; social links open new tabs (no "new tab" hint); outside `.eb-marketing`, so browser-default focus ring.
**Content rules:** big promise uses `<l>` line tags and `<m>` for the reversed word ("Always writes back.").
**Don't:** add gradients or illustration (spec: "No gradients, no illustration").

```tsx
<Footer />
```

### SocialIcon

**Purpose:** line-art social marks (LinkedIn, X, Instagram, Facebook) that sit with their label.
**Source:** `eb/nav/SocialIcons.tsx` · **Status:** Live (shared)
**Props:** `label: string` (matched case-insensitively), `size = 16`. Unknown label renders nothing.
**Style:** 24px viewBox, `stroke="currentColor"`, `strokeWidth 1.7`, round caps; `aria-hidden`, `focusable="false"`.
**Do:** always render next to the visible network name.

```tsx
<SocialIcon label="LinkedIn" />
```

---

## 6. Landing page components (`/`): canonical

> **Canonical.** These are the primary specs of the HireHouse design system. When any other component disagrees with one of these, this one wins.

The home page composes these inside `<div data-accent="candidate" className="eb-marketing relative bg-[#fbfbf9] text-black [overflow-x:clip]">` (`src/app/(marketing)/page.tsx`). All copy is in `messages/{en,es}/marketing.json` under `marketing.landing.*`.

### HomeBackdrop

**Purpose:** the hero's ambient light: five drifting colour glows over a dot grid, fading to the page ground.
**Source:** `home/HomeBackdrop.tsx` · **Status:** Live
**Props:** none.
**Anatomy:** masked wrapper › glows (lime top-left, lilac top-right, indigo behind the search, yellow low-left, pale blue low-right) › dot grid (`radial-gradient` 1px dots on 22px).
**Sizing:** `absolute inset-x-0 top-0 h-[max(980px,calc(100svh+160px))]`, mask fades from 70%; glows 340 to 760px with `blur-[120px]` to `blur-[130px]`, opacity 0.16 to 0.7; each `.hh-glow` (22s alternate) with a negative delay.
**Accessibility:** `aria-hidden`, `pointer-events-none`; `.hh-glow` stops under reduced motion.
**Do:** render it first inside the page wrapper. Sibling versions exist per page (`BoardBackdrop`, `CompaniesBackdrop`, `InstBackdrop`, `PartnersBackdrop`) that lead with the route's accent. **Don't:** place content inside it.

```tsx
<HomeBackdrop />
```

### HomeHero

**Purpose:** the first screen, centred: live pill, headline with a marker, sub, proof list, search.
**Source:** `home/HomeHero.tsx` (server) · **Status:** Live

| Prop | Type | Notes |
|---|---|---|
| `openRoles` | `number` | From `boardStats()`; `0` on failure. |

**Anatomy:** live pill link to `/jobs` (pinging green dot + count or "Now hiring across the UAE and India") · `h1` (lines via `<l>`, `Sketch kind="marker" color="#e9fea3" now` on `<m>`) · sub · proof list (lime tick chips, wide screens only) · `HeroPeek`.
**States:** count shown only when `openRoles >= 20` (`SHOW_COUNT_FROM`), else the "hiring now" line; pill hover `border-black/20`.
**Spacing & sizing:** `section relative z-30` (no overflow clipping: the search dropdown overlaps the next section); inner `max-w-[1440px] px-[var(--margin)] pb-24 pt-14 md:min-h-[calc(100svh-64px)] md:justify-center md:pb-28 md:pt-10`; h1 per 2.3; sub `mt-6 max-w-[56ch] text-[clamp(16.5px,1.45vw,19px)] text-[#4a4a4a]`; proof list `mt-7 hidden md:flex gap-x-6 gap-y-2.5`, items `text-[14px] font-medium`, tick chip `h-[18px] w-[18px] bg-lime`; search wrapper `relative z-20 mt-9 max-w-[720px]`. Entrance `.hh-rise` with delays 0, .08, .16, .24s.
**Accessibility:** the page's only `h1`; marker SVG is `aria-hidden`; ticks `aria-hidden`. The green ping uses Tailwind `animate-ping` with no reduced-motion stop.
**Content rules:** headline 2 lines, one marked phrase; proof items 3, each under 6 words, no full stop.
**Do:** keep the proof list above the search (the demo dropdown covers what is below). **Don't:** show the role count below 20.

```tsx
<HomeHero openRoles={total} />
```

### HeroPeek

**Purpose:** server wrapper that loads the 60 newest roles and renders `HeroSearch`.
**Source:** `home/HeroPeek.tsx` (server) · **Status:** Live
**Props:** `inline?: boolean` (default `false`).
**States:** empty: renders `null` when no roles load (the hero then has no search).
**Sizing:** `hh-rise relative w-full min-w-0`, delay .15s.

> **Open question:** if the jobs query fails, both the hero and the closing card lose their search with no fallback CTA. Should there be a "Browse jobs" fallback?

```tsx
<HeroPeek />          {/* hero: results drop down over the next section */}
<HeroPeek inline />   {/* inside a card: results open in the flow */}
```

### HeroSearch

**Purpose:** the primary action: a pill search that types example searches by itself until the visitor takes over, with live results.
**Source:** `home/HeroSearch.tsx` (client) · **Status:** Live

| Prop | Type | Notes |
|---|---|---|
| `roles` | `PeekRole[]` | `{ id, href, title, company, place, mode, modeLabel, posted }` |
| `examples` | `string[]` | Fallback demo phrases; live ones come from `liveExamples()`. |
| `inline` | `boolean` | Default `false`. In a card: demo only types, results open in flow. |

**Anatomy:** `form[role=search][data-search]` › `label` pill (Search icon · input + demo overlay with caret · submit button) › results dropdown (role rows: tinted initial tile, title, company · place, `ModeChip`, posted) › footer link ("See all N matches" or "Search all roles").

| State | Behaviour |
|---|---|
| Idle (demo) | Types an example (40 to 70ms per letter), holds 1.8s, erases, next. Placeholder empty, caret `.hh-caret`. On phones the dropdown stays hidden during the demo. |
| Live (hover, focus or typed text) | Demo stops; border `border-black/80` plus a 5px indigo glow ring; placeholder shows. |
| Results | Up to 5 rows (`SHOWN`), each `.hh-result` with 40ms stagger. |
| Empty | "No match in the newest roles." line (`hero.noPeek`) plus "Search all roles". |
| Submit | Enter or button pushes `/jobs?q=…` (or `/jobs`). |
| Hover (rows, submit) | Row `bg-black/[0.035]`; submit lifts `-translate-y-px`; footer arrow nudges `translate-x-1`. |
| Reduced motion | No typing: shows the first example, still. |
| Disabled, loading, error | Not applicable (client-side filtering). |

**Spacing & sizing:** field `h-16 rounded-full border bg-white pl-6 pr-2 gap-3`, input `text-[17px] font-medium`; submit `h-12 rounded-full bg-black px-5 text-[15px] font-semibold text-white`; dropdown `mt-3 rounded-[22px] border-black/[0.07] bg-white`, list `p-2`, rows `rounded-[14px] px-3 py-2.5`, tile `h-10 w-10 rounded-[11px]`, title `text-[14.5px] font-semibold`, meta `text-[12.5px] text-[#777]`, footer `px-5 py-3.5 text-[14px] font-semibold`.
**Accessibility:** `role="search"`; input `aria-label` from the placeholder string; demo overlay `aria-hidden`; results `aria-live="polite"`. The input's own outline is removed (`[data-search] input:focus-visible { outline: none }`) and the pill border is the focus indicator. Below 640px the submit button's text is `hidden`, leaving an icon-only button with no accessible name (inconsistency #17).
**Content rules:** placeholder lists what can be searched ("Search role, skill, company or city"); button one word ("Search").
**Do:** keep the dropdown solid white (spec). **Don't:** wrap it in an `overflow-hidden` ancestor (except `inline`).

```tsx
<HeroSearch roles={roles} examples={t.raw("searchExamples") as string[]} />
```

### ModeChip / ModePill (work-mode tag)

**Purpose:** work mode at a glance (Remote, Hybrid, On-site) with icon and tint.
**Source:** `ModeChip` inside `home/HeroSearch.tsx`; `ModePill` in `jobs/ModePill.tsx`; shared `MODE_ICON`, `MODE_STYLE` in `jobs/modeIcons.ts` · **Status:** Live (shared)
**Props (ModePill):** `mode: "remote" | "onsite" | "hybrid"`, `small?: boolean`.
**Tints:** remote `bg-[#e8f7e4] text-[#2f7a1f]` (Globe), hybrid `bg-[#fdf3d6] text-[#8a6410]` (Blend), onsite `bg-[#eef0f6] text-[#4a5170]` (Building2).
**Sizing:** small `h-[22px] px-2 text-[11.5px]`, icon 11; default `h-[26px] px-2.5 text-[12.5px]`, icon 13; `rounded-full font-medium gap-1.5`.
**Do:** reuse `MODE_STYLE`; `ModeChip` duplicates the small `ModePill` (it is a client copy).

```tsx
<ModePill mode="remote" small />
```

### HomeWhy

**Purpose:** what HireHouse is: a heading and three outcome cards, each with a one-shot micro-scene.
**Source:** `home/HomeWhy.tsx` (server) · **Status:** Live
**Props:** none. Items fixed: `merit` (WholeApplication), `fair` (SameBar), `answer` (Answered).
**Anatomy:** section heading (eyebrow, h2 with marker, sub) › hairline grid › 3 × `InView.hh-why` card (art well › number chip › h3 › body).
**States:** `data-in="false"` (scene at rest) to `"true"` (keywords grey, lime glow fills, pop chip, bars fill, email slides in), delays 0.35s to 1.7s.
**Spacing & sizing:** section per 2.3; grid `mt-14 gap-px overflow-hidden rounded-[28px] border border-black/[0.08] bg-black/[0.08] md:grid-cols-3` (the gaps are the borders); card `bg-white p-6 md:p-8`; art well `h-[188px] rounded-[18px] bg-[#f6f6f3]`; chip `mt-7`; h3 `mt-4 text-[22px]`; body `mt-2.5 text-[15.5px]`.
**Accessibility:** scenes `aria-hidden`; text carries the meaning; reduced motion removes transitions (scenes appear finished).
**Content rules:** card titles are short sentences with a full stop ("One bar for everyone."); bodies 1 to 2 sentences.

```tsx
<HomeWhy />
```

### SameCv

**Purpose:** "the difference": the same CV twice, rejected by a keyword scan on the left, read and answered on the right.
**Source:** `home/SameCv.tsx` (client) · **Status:** Live · anchor `#story`
**Props:** none. Internal parts: `Panel`, `Cv`, `Notice`, `Criteria`.
**Anatomy:** heading › two `Panel`s (tag chip · `Cv` document with scan line or lime wash · `Notice` toast on the corner · `Criteria` bars) · caption under each › Replay button.
**States:** each panel plays once at 55% visibility (own `IntersectionObserver`, not `InView`); Replay resets `data-in` and replays both; reduced motion lands every keyframe on its end frame (1ms).
**Spacing & sizing:** grid `mt-14 gap-5 md:grid-cols-2`; panel `rounded-[28px] border-black/[0.07] bg-[#f6f6f3] px-6 pb-8 pt-6 md:px-10`; tag `rounded-full px-3 py-1 text-[12px] font-bold uppercase tracking-[0.08em]` (left `bg-[#fee4e2] text-[#b42318]`, right `bg-lime`); CV `max-w-[300px] rounded-[14px] p-5`; notice `rounded-[14px] px-3.5 py-2.5 -bottom-5 -right-3 md:-right-8`; criteria label column `w-[86px]`, bars `h-2` indigo; caption `mt-4 text-[15.5px] text-center`; Replay `absolute -bottom-12 right-0 rounded-full px-3 py-1.5 text-[13px] font-semibold`.
**Accessibility:** CV art `aria-hidden`; tags, captions, notice text and criteria names are real text. Replay is a real `button` with a visible label.
**Content rules:** tag 1 to 2 words ("Elsewhere", "On HireHouse"); notice title 2 to 3 words, note under 6 words.
**Do:** keep the notice as a sibling of the CV so dimming never dims it. **Don't:** reintroduce a rubber stamp (spec: read as comic).

```tsx
<SameCv />
```

### HowTrack

**Purpose:** how it works, as a row of phones showing real app screenshots; pinned horizontal scroll on wide screens.
**Source:** `home/HowTrack.tsx` (client) · **Status:** Live · anchor `#how`
**Props:** none. Steps fixed: `apply`, `review`, `interview`, `answer`. Images `/landing/{locale}/step-{step}.webp`.
**Anatomy (wide):** 340vh track › sticky stage › eyebrow with counter `01 / 04` › stacked step headings (one visible) › phone row. **Anatomy (phones and reduced motion):** eyebrow › horizontal snap list of phones, each with number, h3, sub.
**States:** progress-driven (`useScrollProgress`): centred phone full size, neighbours `scale(0.82)` and faded; centred screen scrolls via `--s`; heading cross-fades; reduced motion renders only the swipe row.
**Spacing & sizing:** phone `rounded-[44px] bg-[#0b0b0c] p-[9px]`, screen `rounded-[36px] aspect-[390/844]`; wide row height `calc(clamp(380px,54svh,600px)+18px)`; step h3 `text-[clamp(32px,4vw,54px)]`; swipe items `w-[78vw] max-w-[320px] snap-center gap-5`, number `font-mono text-[13px] font-bold text-[#4f46e5]`, h3 `text-[26px]`.
**Accessibility:** each screenshot has localised `alt`; the section has no `h2` (eyebrow is a `p`, steps are `h3`), which skips a heading level. The marked word uses a CSS gradient highlight instead of `Sketch`.
**Content rules:** step title is a short sentence with one marked phrase ("Weighed on **merit**."); sub one sentence.

> **Open question:** the spec lists a progress bar and a closing "Find your role →" link for this section; neither is in the code. Dropped, or still to build?

```tsx
<HowTrack />
```

### HomeRoutes

**Purpose:** Free (Standard) versus Fast Track, compared row by row, then the fairness line and a CTA.
**Source:** `home/HomeRoutes.tsx` (server) · **Status:** Live
**Props:** none. Rows come from copy: `{ label, standard, fast, clock? }` where `"+"` is a tick, `"-"` a dash, anything else words.
**Anatomy (wide):** heading › `InView.hh-cmp` grid: label column · Standard column (name, price) · Fast Track column raised as a black card (lime "Fast Track" chip with Zap, lime price) › rows of `Value` cells › fairness line with marker › note › black pill CTA. **Anatomy (phones):** two stacked route cards.
**States:** rows fade up in sequence (70ms stagger), ticks pop, the 72-hour clock sweeps once; reduced motion shows all.
**Spacing & sizing:** section `max-w-[1100px]`; grid `mt-14 grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)_minmax(0,0.95fr)]`; black column `rounded-[26px] bg-[#0b0b0c]`; header cells `px-6 pb-6 pt-7` (`px-7` on Fast Track); price `text-[clamp(24px,2.4vw,30px)] font-semibold`; rows `py-5 border-t border-black/[0.08]` (white/10 inside the black column); tick `h-7 w-7 rounded-full`; phone cards `rounded-[24px] p-6`, rows `py-3.5 text-[14.5px]`; CTA `mt-8 h-12 rounded-full bg-black px-6 text-[15px] font-semibold`.
**Accessibility:** ticks and dashes have `sr-only` "Included" / "Not included". The grid is built from `div`s with no table semantics, so the column headers are not associated with cells.
**Content rules:** no prices (each role sets its own); Standard price line "Free, always", Fast Track "Priced per role"; row labels are noun phrases.
**Do:** keep Standard at equal visual weight (positive frame, never greyed). **Don't:** add refund wording.

> **Open question:** should the wide comparison be a real `<table>` (or `role="table"`) for screen readers?

```tsx
<HomeRoutes />
```

### HomeClosing

**Purpose:** straight answers (FAQ), then the closing card with the hero search one last time.
**Source:** `home/HomeClosing.tsx` (server) · **Status:** Live
**Props:** none. Questions fixed: `free`, `hear`, `score`, `includes`, `cost`, `video`.
**Anatomy:** FAQ section (left: eyebrow + h2; right: `details.hh-faq` list, each summary with a round plus icon) › closing section (`.hh-reveal` card: h2, sub, `HeroPeek inline`).
**States:** FAQ closed/open (plus rotates 45° and fills black; answer slides open via `::details-content`, snaps where unsupported); summary hover cursor; in-answer link hover underline darkens; closing card rises in on scroll where `animation-timeline` exists.
**Spacing & sizing:** FAQ grid `max-w-[1200px] gap-10 py-24 md:py-32 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]`; list `divide-y border-y border-black/[0.08]`; item `py-5`; summary `text-[17px] font-semibold gap-6`; icon `h-8 w-8 rounded-full border border-black/10`; answer `mt-3 max-w-[60ch] text-[15.5px]`. Closing `px-[var(--margin)] pb-28`, card `max-w-[1200px] rounded-[32px] px-6 py-20 md:py-28 text-center text-white`, blue mesh background (inline gradient of brand colours over `#2c27c8 → #4c49f3 → #6a3fd8`); h2 `max-w-[16ch]`; sub `mt-5 max-w-[40ch] text-[18px] text-white/85`; search `mt-10 max-w-[680px]`.
**Accessibility:** native `details/summary` (keyboard and AT for free); default marker hidden. Reduced motion removes the slide.
**Content rules:** questions are real questions with "?"; answers 1 to 3 sentences; the privacy answer links with the `<link>` tag.

> **Open question:** the spec says the closing search sits "on a black card with lime accents (replaces the off-system violet card)"; the code ships a blue/violet mesh. Under the ruling the code is canonical; confirm the spec should follow.

```tsx
<HomeClosing />
```

### Sketch

**Purpose:** a hand-drawn mark on a word (circle, underline, highlighter marker, double underline) that draws itself.
**Source:** `home/Sketch.tsx` · **Status:** Live (shared by every marketing page)

| Prop | Type | Default |
|---|---|---|
| `kind` | `"circle" \| "underline" \| "marker" \| "double"` | required |
| `color` | `string` | `"#4f46e5"` |
| `now` | `boolean` | `false` (draw on scroll); `true` draws on load (hero) |
| `children` | `ReactNode` | |

**States:** draws with `animation-timeline: view()` (entry 10% to 90%); `now` draws after .75s; elsewhere it is simply shown; reduced motion: no draw.
**Sizing:** marker sits behind the text at `h-[0.58em]`, scales with the font; other kinds overflow the word.
**Accessibility:** SVGs `aria-hidden`; the word stays plain text.
**Content rules:** wrap via the `<m>` copy tag; 1 to 2 words (stated in `partners/ui.tsx`).
**Do:** colour with the route accent. **Don't:** stack two Sketches in one headline.

```tsx
{t.rich("title", { m: (c) => <Sketch kind="marker" color="#e9fea3">{c}</Sketch> })}
```

### InView

**Purpose:** sets `data-in="true"` on its box the first time it is properly on screen, for CSS one-shot scenes.
**Source:** `home/InView.tsx` (client) · **Status:** Live (shared)
**Props:** `className?`, `threshold = 0.35`, `children`.
**States:** `data-in="false"` until intersecting, then `"true"` forever; falls back to `"true"` immediately without `IntersectionObserver`.
**Do:** keep children server-rendered; key every animation off `[data-in="true"]`. **Don't:** use it to toggle back (it never resets).

```tsx
<InView threshold={0.25} className="hh-cmp …">{rows}</InView>
```

### SmoothScroll and useScrollProgress

| | SmoothScroll | useScrollProgress |
|---|---|---|
| Purpose | Lenis inertial scrolling on the home page | 0 to 1 progress for a pinned scroll scene, written straight to the DOM per frame |
| Source | `home/SmoothScroll.tsx` | `home/useScrollProgress.ts` (also exports `seg`, `ease`, `mix`) |
| API | `<SmoothScroll />` (renders null) | `const track = useScrollProgress<HTMLDivElement>((p) => …)` |
| Reduced motion | Not started | Calls `onFrame(1)` once (end state) |
| Notes | `lerp: 0.1`, anchors glide; touch keeps native scroll | Never re-renders React during scroll |

---

## 7. Landing patterns (inline, not yet extracted): canonical

These repeat across live pages but have no shared component on the home page. Extract them before adding a fifth copy.

| Pattern | Anatomy | Classes | Extracted version |
|---|---|---|---|
| Section heading | eyebrow · h2 (optional marker) · sub | per 2.3; wrapper `mx-auto max-w-[860px] text-center` | `SectionHead` in `companies/Cta.tsx` (`eyebrow`, `title`, `sub?`, `align?: "center" \| "left"`) |
| Black pill CTA | label · ArrowRight 17 | `group inline-flex h-12 items-center gap-2 rounded-full bg-black px-6 text-[15px] font-semibold text-white hover:-translate-y-0.5`; arrow `group-hover:translate-x-0.5` | `PostRoleCta`, `BookCta`, `PillOut` (in progress) |
| Hairline card grid | grid whose 1px gaps are the borders | `gap-px overflow-hidden rounded-[28px] border border-black/[0.08] bg-black/[0.08]`, cells `bg-white p-6 md:p-8` | none |
| FAQ accordion | eyebrow + h2 left, `details.hh-faq` list right | per HomeClosing | none (four copies, with different item padding) |
| Raised black card | the highlighted option as a black card with lime accents | `rounded-[24px to 26px] bg-[#0b0b0c]` plus deep shadow | none |
| Closing card | big centred h2, sub, the way in | `hh-reveal rounded-[32px] px-6 py-20 md:py-28 text-center` | none |

---

## 8. Archetype sections (EB library, legacy)

**Status of the whole set:** Dormant and **Legacy** (landing is canonical; see 12.1). They are typed against `src/content/marketing/types.ts` and selected by `SectionRenderer` from a content `kind`, but no route renders them in the working tree. (The committed `/companies`, `/institutions` and `/partners` pages still render them until the in-progress kits in section 10 are committed.) They use the EB register (ExtraLight `.t-*` roles, `ChipRow` eyebrows, flat accent blocks, `rounded-[14px]`), which differs visibly from the live landing register.

### Shared rules for all archetypes

| Aspect | Rule |
|---|---|
| Wrapper | Each renders one `Section` with a `ground` prop; ink comes from the ground. |
| Header block | `ChipRow` (1 or 2 chips) → `mt-6` headline (`SectionHead` unless noted) inside `max-w-[42rem]` → optional sub in `Body text-muted-light`. |
| Content gap | Content starts `mt-12` to `mt-14`. |
| Accent blocks | `accentInk(accent)` returns `{ bg, text, muted, sub }`; sequence via `accentAt(i, count, accentSequence)` (default lime → lilac → yellow → blue; blue only at an end). |
| Numbers | Stats pass through `resolveProof()` (proof gate). Never hardcode a figure. |
| States | Static, except `Cta` hover and `DualK` FAQ open/closed. No loading, error or empty states: content is required by type. |
| Accessibility | Headline is the section's `h2` (HeroA uses `Title` as `h1`). Numbered indices are text, not list semantics. Hairlines inside sections are hardcoded `border-black/15`, so they disappear on dark grounds. |
| Motion | None. |
| Content | Chips 1 to 3 words; headlines one sentence; cards: title under 6 words, body one sentence. |

### Archetype reference

| Archetype | Purpose | Anatomy | Key props | Key sizing |
|---|---|---|---|---|
| **HeroA** (`hero-a`) | Dark cover statement, page opener; holds the `h1`. | Eyebrow · `Title` · `Lead` · CTA pair · Rule + meta row | `ground, eyebrow, headline, descriptor, cta?, secondaryCta?, metaLeft?, metaRight?` | `!pt-20 !pb-24`, headline `max-w-[54rem]`, lead `max-w-[52ch]`, meta `gap-x-16` |
| **StatementB** (`statement-b`) | THE ASK: the single blue section of a page. | ChipRow · Display or SectionHead · Lead · proof stat (`t-hero`) · up to 2 black cards · CTA pair | `ground, chips, headline, headlineRole?, subline, stat?, cards?, primaryCta, secondaryCta?` | cards `rounded-[14px] bg-black p-6`, grid `lg:max-w-[640px]`; on blue the accent CTA is forced white/blue |
| **StaggerC** (`stagger-c`) | Hero layout: up to 4 accent cards stepping down 26px and bleeding past the bottom. | ChipRow · headline (+ optional right notes) · staggered cards (index, CardTitle, caption) | `ground, chips, headline, rightNotes?, cards, accentSequence?` | cards `rounded-[14px] p-[22px]`, `lg:mt-0/26/52/78px`, `lg:!pb-0` |
| **ScorecardD** (`scorecard-d`) | Split data: hairline rows left, accent summary panel right (58/38). | ChipRow · headline · sub · rows (label, descriptor, value) · panel (label, `t-hero` stat, caption) | `ground, chips, headline, subline?, rows, panel, footnote?` | `lg:grid-cols-[58fr_38fr] gap-x-[37px]`; panel stacks first on mobile |
| **GridE** (`grid-e`) | The only centred layout: 3 to 5 peer entities. | Centred ChipRow · headline · sub · 4-up numerals (`t-display`) with Name + caption | `ground, chips, headline, subline, items` | heading `max-w-[640px]`, grid `lg:grid-cols-4 gap-x-[6px]` |
| **CompareF** (`compare-f`) | Comparison table of two options; plain column never demoted. | ChipRow · headline · 3-col grid (dimension, colA, highlighted colB) · lead-in closing | `ground, chips, headline, dimensions, colA, colB, closing` | `grid-cols-[170px_1fr_1.25fr] md:[220px_…]`, `min-w-[560px]` with horizontal scroll; colB `rounded-[14px]` top and bottom |
| **BarsG** (`bars-g`) | Bleeding bars: ranked items as sharp bars from the left edge. | ChipRow (+ right caption) · headline · bars (index, BarTitle, value line, tag) · ghost CTA | `ground, chips, headline, bars, rightColumn?, closing?, accentSequence?` | bars `bleed-left`, width `widthPct%`, no radius, `gap-[6px]`, `py-4` or `py-[22px]` |
| **StatRowH** (`stat-row-h`) | 3 to 5 proof tiles plus a black callout. | ChipRow · headline · stat tiles (Rule, CardTitle value, caption) · black callout with lead-in | `ground, chips, headline, headlineRole?, stats, callout` | callout `rounded-[14px] bg-black p-8 text-center` |
| **FeatureI** (`feature-i`) | One dominant stat plus 4 numbered reasons. | ChipRow + headline left · accent stat card right · 4-up numbered items | `ground, chips, headline, featureCard, items, footnote?` | card `max-w-[280px] rounded-[14px] p-[22px]`, items `lg:grid-cols-4` |
| **TiersJ** (`tiers-j`) | Three bleeding panels with a left copy column. | Left: ChipRow, headline, optional stat · right: 3 panels stepping 30px | `ground, chips, headline, leftStat?, panels, accentSequence?` | `lg:grid-cols-[1fr_2fr] gap-[60px]`, panels `rounded-t-[14px]`, `lg:mt-0/30/60px` |
| **DualK** (`dual-k`) | `variant="lists"`: two parallel lists; `variant="faq"`: zero-JS accordion. | Lists: hairline rows with status pill + accent rows. FAQ: `details` rows with a rotating `+` | lists: `left, right, ctas?`; faq: `qa, ctas?` | FAQ `max-w-[820px] py-5`; status pill `h-[18px]`, live = `bg-blue`; FAQ uses `belowFold` |
| **ContrastL** (`contrast-l`) | Us vs them, equal-size panels; Standard is a positive frame. | ChipRow · headline · sub · grey panel · accent panel · footnote | `ground, chips, headline, subline, left, right, footnote?` | panels `rounded-[14px] p-8`, `md:grid-cols-2 gap-6` |
| **ClosingM** (`closing-m`) | Closing, contact or legal block with flat geometric shapes. | Brand mark · `Hero` headline · descriptor · Rule · 2×2 contact grid · shapes (lime square, blue circle, lilac rounded square) | `ground, brandMark, headline, descriptor, contactGrid?, shapes = true` | grid `gap-x-[155px] gap-y-[46px] lg:max-w-[65%]`; shapes `hidden lg:block`, `aria-hidden` |

### SectionRenderer

**Purpose:** maps a content `Section` object (`kind`) to its archetype; wraps it in `div#id.scroll-mt-20` when the content declares an `id`.
**Source:** `eb/sections/SectionRenderer.tsx`

```tsx
{page.sections.map((s, i) => <SectionRenderer key={i} section={s} />)}
```

**Do (all archetypes):** keep the fairness invariants in CompareF and ContrastL (both options same weight). **Don't:** use lilac as a `Section` ground, or put blue in the middle of an accent sequence.

---

## 9. Other marketing components

### Logo

**Purpose:** HireHouse wordmark linked home.
**Source:** `marketing/Logo.tsx` · **Status:** Live (inside WorkspaceSignInModal)
**Props:** none. Renders `BrandBadge variant="hire" height={26}` in a `Link` with `aria-label` from `marketing.chrome.logoLabel`.
**Note:** Header does the same thing inline instead of using `Logo`.

```tsx
<Logo />
```

### WorkspaceSignInModal

**Purpose:** employer "Sign in": collect a workspace subdomain, check it exists, redirect to its admin.
**Source:** `marketing/WorkspaceSignInModal.tsx` · **Status:** Live
**Props:** `open: boolean`, `onClose: () => void`.
**Anatomy:** `Modal size="sm"` › Logo › title line › address field (input + fixed `.hirehouse.xyz` suffix) › error line › `Button block` "Continue".
**States:** default; focus (field `focus-within:border-ink`, input autofocused on open); typing lowercases input and clears errors; loading (`Button loading`, label from `workspaceSignIn.loading`); error (`role="alert"`, `text-[var(--danger)]`, input `aria-invalid`): required, invalid, not found at address, generic; success redirects.
**Spacing:** stack `gap-lg`, field `rounded-md border border-hairline bg-surface`, input `px-md py-2.5 text-[14px]`.
**Accessibility:** modal title via `ariaTitle`; Enter submits; error announced.
**Note:** uses product-UI tokens and `Button` inside the marketing site (the only marketing surface that does).

```tsx
<WorkspaceSignInModal open={open} onClose={() => setOpen(false)} />
```

### LegalDocument

**Purpose:** long-form legal page template (Privacy, Terms) in the EB register.
**Source:** `marketing/LegalDocument.tsx` · **Status:** Live
**Props:** `doc: LegalDoc` = `{ eyebrow, title, intro, sections: { id, title, blocks: (string | { list: string[] })[] }[] }`. Inline `**bold**` and `[text](href)` supported.
**Anatomy:** Header › black opener (`t-eyebrow`, `t-display` h1, `t-lead`, `t-caption` meta) › body grid (sticky contents nav, `lg` only · article of numbered `h2.t-section` sections) › Footer.
**Spacing:** container `max-w-[var(--content)] px-[var(--margin)] py-[var(--band)]`; grid `lg:grid-cols-[220px_minmax(0,1fr)] gap-12`; article `max-w-[72ch]`; sections `py-10 border-t border-black/10 scroll-mt-24`.
**Accessibility:** `nav aria-label="Contents"`; numbered headings; external links open in a new tab.
**Note:** "Last updated", "Contents" and the nav label are hardcoded English (inconsistency #23).

```tsx
<LegalDocument doc={privacy} />
```

### JobRow

**Purpose:** one role on the `/jobs` board as a hairline-ruled line, like a careers index.
**Source:** `marketing/jobs/JobRow.tsx` (server) · **Status:** Live
**Props:** `job: JobRowData`, `locale: string`, `state?: BoardState`, `applied?: boolean`. Also exports `postedLabel(date, locale)`.
**Anatomy:** link row › hover surface · title + tag (Applied black pill, New lime pill, or Featured lime tag) · company · place · ModePill · posted · arrow circle.
**States:** hover lifts a white card behind the row (`scale-[0.985]` → `1`, shadow) and hides adjacent hairlines (`.board-row`); arrow circle turns `bg-black text-lime`; `applied`, `isNew` (under 7 days), `featuredAt` decide the tag.
**Sizing:** `py-5`, `md:grid-cols-[minmax(0,1fr)_120px_84px_32px] md:gap-6`; title `text-[16px] font-semibold`; meta `text-[13.5px] text-[#6f6f6f]`.

```tsx
<JobRow job={job} locale={locale} state={state} applied={appliedIds.has(job.id)} />
```

### JobCard (Dormant)

**Purpose:** board role as a flat white card with hairline border.
**Source:** `marketing/JobCard.tsx` · **Props:** `job: JobCardData`.
**States:** hover `border-black/40` (from `/[0.12]`), no shadow. Tags: neutral hairline pills for mode and pay, lime for Featured.
**Sizing:** `rounded-[14px] p-5`, tags `h-[26px] px-2.5 text-[12px]`.
**Note:** replaced on the board by `JobRow`; only the `JobCardData` type is still imported.

### JobSearchBar (Orphan)

**Purpose:** a GET search form with title autocomplete (debounced 220ms) and a custom work-mode listbox.
**Source:** `marketing/JobSearchBar.tsx` · **Props:** `searchIcon: ReactNode`, `modeIcon: ReactNode`.
**Accessibility (worth keeping):** `role="combobox"`, `aria-expanded`, `aria-controls`, `aria-autocomplete="list"`, arrow keys, Enter only intercepted when a suggestion is active, Escape closes.
**Status note:** no importer, and its classes (`.searchbar`, `.fld`, `.ac-list`, `.ac-item`, `.mode-btn`, `.btn.primary`, `.reveal`) are not defined in any stylesheet. Use `HeroSearch` or `BoardSearch` instead; reuse this file's combobox logic if you build a new autocomplete.

---

## 10. In-progress page kits

**Status:** uncommitted work by another designer in `src/components/marketing/{companies,institutions,partners}/`, wired into `/companies`, `/institutions` and `/partners`. These pages follow the landing register (same section rhythm, hairline grids, `.hh-faq`, closing card, `InView` scenes) and each brings its own CSS file with a page prefix (`companies.css` `hc-*`, `institutions.css` `hi-*`, `partners.css` `hp-*`). The shared pieces are documented here; the page sections are listed in section 14.

### PostRoleCta and DemoCta (companies)

**Source:** `companies/Cta.tsx`

| Component | Props | Look |
|---|---|---|
| `PostRoleCta` | `label, tone?: "light" \| "dark", className?, id?` | Link to `/signup`; black pill on light, lime pill on dark; ArrowRight 17 |
| `DemoCta` | `label, tone?, className?` | `<a>` to the cal.com booking link, new tab; outlined pill (`border-black/15 bg-white/70 backdrop-blur` light, `border-white/30 bg-white/[0.06]` dark); ArrowUpRight 16 |

**Sizing:** `h-12 rounded-full px-6 text-[15px] font-semibold`. **Hover:** Post lifts `-translate-y-0.5`; Demo darkens its border. **A11y:** Demo opens a new tab without telling AT (BookCta does).

```tsx
<PostRoleCta id="hc-hero-cta" label={t("cta.post")} />
<DemoCta label={t("cta.talk")} tone="dark" />
```

### SectionHead (companies)

**Purpose:** the landing section heading, extracted. **Props:** `eyebrow: string`, `title: ReactNode`, `sub?: string`, `align?: "center" | "left"` (default centre). Classes exactly as 2.3. Name clashes with the EB `SectionHead` type role.

```tsx
<SectionHead eyebrow={t("eyebrow")} title={t.rich("title", { m: mark })} sub={t("sub")} />
```

### StickyCta (companies)

**Purpose:** phones only: once the hero CTAs scroll away, a slim bottom bar keeps both actions in thumb reach; it hides again over the closing card.
**Props:** `post: string`, `demo: string`. Watches `#hc-hero-cta` and `#hc-closing`.
**States:** hidden (`translate-y-full opacity-0`, `aria-hidden`, links `tabIndex=-1`) / shown; 300ms transition; `md:hidden`.
**Sizing:** `fixed inset-x-0 bottom-0 z-40`, safe-area padding, bar `max-w-[480px] rounded-full p-1.5 bg-white/90 backdrop-blur`, buttons `h-11 text-[14.5px]`.

### Eyebrow, BookCta, AnchorCta, mark (partners)

**Source:** `partners/ui.tsx`

| Component | Props | Notes |
|---|---|---|
| `Eyebrow` | `children, className?, dark?` | Uppercase 12px label with a yellow dot; text `#5c5c52` (light) or `white/70` (dark). |
| `BookCta` | `label, newTab, tone?: "black" \| "yellow", className?` | Booking link; includes `sr-only` new-tab text (the only CTA that does). |
| `AnchorCta` | `href, label, dark?, className?` | Outlined in-page link with a downward arrow. |
| `mark` / `markNow` | `(c: ReactNode)` | Yellow `Sketch` marker, on scroll / on load. |

### Eyebrow, PillOut, DemoButton, STATE (institutions)

**Source:** `institutions/shared.tsx`

| Export | Notes |
|---|---|
| `Eyebrow` | 12px uppercase, plum `#7b3f87` on light, lilac on dark. |
| `PillOut` | `href, tone: "black" \| "lime" \| "ghost" \| "ghost-dark", children`; always new tab, ArrowUpRight. |
| `DemoButton` | `label, tone?`; `PillOut` to the booking link. |
| `STATE` | Readiness colours: `ready` (lime), `work` (amber), `risk` (red), each `{ chip, bar, dot }`. |
| `mark` / `markNow`, `LILAC`, `PLUM`, `MOCKHOUSE_URL` | Lilac marker and constants. |

### TypesTabs (partners)

**Purpose:** three partner types as vertical tabs with a detail panel and a commitment ladder.
**Accessibility:** `role="tablist"` with `aria-orientation="vertical"` and `aria-label`; tabs `role="tab"`, `aria-selected`, `aria-controls`, arrow-key handler; panel `role="tabpanel"` `aria-labelledby`. This is the most complete tab implementation in the codebase (compare `ui/Tabs`).

---

## 11. Product UI kit (`src/components/ui`)

Import from the barrel: `import { Button, Modal } from "@/components/ui"`. Tokens (`primary`, `surface`, `hairline`, `ink`, `muted`, spacing `xs` to `xl`, radii) are defined in `src/app/globals.css`; values in `01-foundations.md`. Shared focus ring where present: `focus-visible:ring-2 ring-[var(--focus-ring)] ring-offset-1` (`--focus-ring` = primary blue).

### Button

**Purpose:** the product's action button. **Source:** `ui/Button.tsx`

| Prop | Type | Default |
|---|---|---|
| `variant` | `"primary" \| "secondary" \| "on-color" \| "ghost" \| "text-link"` | `"primary"` |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `block` | `boolean` | `false` |
| `loading` | `boolean` | `false` |
| `loadingLabel` | `string` | Spinner default "Loading" |
| `iconLeft`, `iconRight` | `ReactNode` | |
| `type` | button type | `"button"` |
| ...rest | `ButtonHTMLAttributes` | forwarded, `ref` forwarded |

| Size | Classes |
|---|---|
| sm | `h-[38px] px-md text-[13px] gap-[7px]` |
| md | `h-[46px] px-[22px] text-[14px] gap-xs` |
| lg | `h-[54px] px-[30px] text-[15px] gap-[10px]` |

| State | primary | secondary | on-color | ghost | text-link |
|---|---|---|---|---|---|
| Default | `bg-primary text-on-primary` pill | `bg-surface border-hairline` pill | `bg-white text-ink` | transparent | `text-primary underline`, no padding |
| Hover | `bg-primary-active` | `bg-surface-card` | `bg-white/90` | `bg-surface-card` | none |
| Active | `translate-y-px` | `translate-y-px` | `translate-y-px` | none | none |
| Focus-visible | ring (all) | | | | |
| Disabled | `bg-primary-disabled text-muted`, `cursor-not-allowed` | not styled beyond cursor | not styled | transparent | not styled |
| Loading | label hidden (`opacity-0`), centred Spinner (20px on lg, else 16), `aria-busy`, disabled | same | same | same | same |

**Rules:** flat fills, no shadow, no hover lift (code comment). One primary per view. Labels sentence case, verb-first.

```tsx
<Button loading={saving} loadingLabel="Saving" iconRight={<ArrowRight size={16} />}>Save role</Button>
```

### Badge

**Purpose:** status or category pill. **Source:** `ui/Badge.tsx`
**Props:** `tone?: BadgeTone` (default `neutral`), `dot?: boolean`, plus span attributes. Tones: tint (`neutral, info, success, warning, error, fastTrack, finalDecision`, using `--pill-*` vars), solid (`teal, amber, fern, rust, slate, plum`, text `var(--on-accent)`), and `outline`.
**Sizing:** `rounded-pill px-sm py-1 text-[13px] font-semibold gap-1.5`; dot `h-1.5 w-1.5`.
**States:** static. **Content:** 1 to 2 words.

```tsx
<Badge tone="success" dot>Hired</Badge>
```

### Card

**Purpose:** neutral content surface. **Source:** `ui/Card.tsx`
**Props:** div attributes. **Classes:** `rounded-lg border border-hairline bg-surface shadow-[var(--shadow-card)]` (`--shadow-card` is currently `none`, so no shadow renders despite the comment).

```tsx
<Card className="p-lg">…</Card>
```

### TextInput and TextArea

**Purpose:** labelled form fields. **Source:** `ui/TextField.tsx`
**Props (both):** `label?: ReactNode`, `hint?: string`, `error?: string`, `containerClassName?`, plus native input/textarea attributes; `ref` forwarded; `id` auto-generated with `useId` when absent.
**Sizing:** input `h-[var(--control-height)] px-md text-[16px]`; textarea `min-h-[100px] resize-y px-md py-sm`; label `text-[14px] font-semibold`; help `text-[13px]`; stack `gap-1.5`.

| State | Look |
|---|---|
| Default | `bg-input-bg border-hairline rounded-md` |
| Focus | `border-primary` + 1px primary ring |
| Error | `aria-invalid`, `border-[var(--error)]`, error text replaces hint |
| Disabled | `bg-surface-card cursor-not-allowed` |
| Placeholder | `text-muted-soft` |

**Accessibility:** label is a real `<label htmlFor>`. Hint and error are not linked with `aria-describedby`.

```tsx
<TextInput label="Work email" type="email" error={errors.email} hint="We never share it." />
```

### Select

**Purpose:** fully themed select on Radix (native popups cannot be styled). **Source:** `ui/Select.tsx`

| Prop | Type | Notes |
|---|---|---|
| `value`, `onChange`, `options` | `string`, `(v) => void`, `SelectOption[]` (`{ value, label, icon? }`) | required |
| `label` / `ariaLabel` | `string` | visible label wraps in `<label>`; else `aria-label` |
| `placeholder` | `string` | `"Select…"` (English default) |
| `pill`, `sm` | `boolean` | toolbar pill style; `sm` = 34px tall, else 40px |
| `leftIcon`, `prefix` | `ReactNode`, `string` | e.g. "Sort:" |
| `disabled`, `className`, `containerClassName` | | |

**States:** field focus `border-ink` + 1px ink ring; placeholder `text-muted-soft`; disabled `opacity-60`; pill hover `bg-surface-card`; item highlighted `bg-surface-card`, checked `font-semibold` + primary check.
**Sizing:** field `h-[var(--control-height)] rounded-md px-md text-[15px]`; menu `rounded-md border-hairline shadow-[var(--shadow-pop)] p-1`, items `rounded-sm py-2 pl-2.5 pr-8 text-[14px]`.
**Accessibility:** Radix handles keyboard and roles.

```tsx
<Select label="Work mode" value={mode} onChange={setMode} options={MODES} />
```

### Modal

**Purpose:** centred dialog on Radix. **Source:** `ui/Modal.tsx`
**Props:** `open`, `onClose?`, `title?`, `description?`, `header?` (full-bleed custom header; panel becomes `h-[90vh]`), `ariaTitle?`, `children?`, `footer?`, `size?: "sm" | "md" | "lg" | "xl" | "full"` (420 / 600 / 820 / 1060 / min(1200px, 95vw); default `md`), `showClose = true`, `closeLabel = "Close"`, `lang?`.
**Anatomy:** scrim › panel (`rounded-xl border-hairline bg-surface max-h-[90vh]`) › header (title `title-lg`, description `body-sm text-muted`, close) › scrolling body `px-lg pb-lg pt-md` › footer `border-t p-lg py-md`, right-aligned `gap-sm`.
**States:** open fades in (150ms); Escape, scrim click and close button call `onClose`.
**Accessibility:** Radix focus trap and return; always provide `title` or `ariaTitle`; pass a localised `closeLabel`.

```tsx
<Modal open={open} onClose={close} title="Withdraw application?" footer={<Button onClick={confirm}>Withdraw</Button>} closeLabel={t("close")}>…</Modal>
```

### Drawer

**Purpose:** side panel on Radix. **Source:** `ui/Drawer.tsx`
**Props:** `open`, `onClose?`, `side?: "right" | "left"` (default right), `title?`, `description?`, `header?`, `ariaTitle?`, `children?`, `footer?`, `width = 480`.
**States:** slides in 220ms `cubic-bezier(.2,.7,.3,1)`; scrim fade 150ms.
**Spacing:** header `p-lg border-b`, body `p-lg`, footer as Modal.
**Accessibility:** as Modal, but the close label is hardcoded English "Close" (no prop).

```tsx
<Drawer open={open} onClose={close} title={candidate.name}>…</Drawer>
```

### Tabs

**Purpose:** tab switcher. **Source:** `ui/Tabs.tsx`
**Props:** `items: (TabItem | string)[]` (`{ value, label, count? }`), `value`, `onChange?`, `variant?: "segmented" | "underline" | "folder"` (default segmented), `size?: "md" | "sm"` (segmented only), `className?`.

| Variant | Look | Active |
|---|---|---|
| segmented | pill track `bg-surface-card border-hairline p-1`, items `px-md py-2 text-[13.5px]` (`sm`: `px-3 py-1 text-[12.5px]`) | `bg-surface text-ink` |
| underline | `gap-lg`, items `py-2.5 text-[14px]` | `font-semibold`, 2.5px primary bar |
| folder | `rounded-t-lg border px-md py-2.5 text-[13.5px]` | joins the panel below |

Count bubble: `text-[11px] font-bold`, primary fill when active.
**Accessibility:** `role="tablist"`/`"tab"` and `aria-selected`, but no arrow-key navigation, no `aria-controls`, no roving `tabIndex` (compare `partners/TypesTabs`).

```tsx
<Tabs items={[{ value: "saved", label: "Saved", count: 3 }, "Applied"]} value={tab} onChange={setTab} />
```

### Tooltip

**Purpose:** small dark hover/focus hint in a portal. **Source:** `ui/Tooltip.tsx`
**Props:** `content`, `children` (one focusable element), `side = "top"`, `align = "center"`, `delayDuration = 200`, `className?`.
**Sizing:** `max-w-[240px] rounded-md bg-ink px-2.5 py-1.5 text-[11px] font-medium text-white`, arrow, `sideOffset 6`.
**Content:** one short sentence. **Don't:** put essential information only in a tooltip.

```tsx
<Tooltip content="Scored on the role's criteria"><button aria-label="About scoring"><Info size={13} /></button></Tooltip>
```

### Switch

**Purpose:** on/off toggle. **Source:** `ui/Switch.tsx`
**Props:** `checked`, `onChange(checked)`, `disabled?`, `ariaLabel?`, `className?`.
**States:** off `bg-surface-strong border-hairline`; on `bg-primary`; thumb slides 200ms; disabled `opacity-50`; focus ring.
**Sizing:** track `h-6 w-11 rounded-pill`, thumb `h-5 w-5`.
**Accessibility:** `role="switch"`, `aria-checked`; needs `ariaLabel` or an associated visible label.

```tsx
<Switch checked={on} onChange={setOn} ariaLabel="Email me new matches" />
```

### Skeleton, SkeletonText and preset skeletons

**Purpose:** loading placeholders. **Source:** `ui/Skeleton.tsx`, `ui/skeletons.tsx`
**Props:** `Skeleton { className?, rounded?: "sm" | "md" | "lg" | "pill" | "full" }` (default `md`); `SkeletonText { lines = 3, className? }` (last line `w-2/3`). Presets: `ApplicationRowSkeleton`, `DashboardSkeleton`, `CandidateSheetSkeleton`, `ContestSkeleton`.
**Motion:** `hh-shimmer` 1.4s infinite, with no reduced-motion stop.
**Accessibility:** `aria-hidden`; pair with a `Spinner` or `aria-busy` region so AT knows content is loading.

```tsx
<SkeletonText lines={2} />
```

### Spinner

**Purpose:** inline loading indicator in `currentColor`. **Source:** `ui/Spinner.tsx`
**Props:** `size = 16`, `className?`, `label = "Loading"`. Renders an SVG with `role="status"` and `aria-label`; `animate-spin`.

```tsx
<Spinner label={t("loading")} />
```

### BrandBadge and BrandLogo

| | BrandBadge | BrandLogo |
|---|---|---|
| Purpose | Wordmark lockup (HireHouse or MockHouse) | App icon mark |
| Source | `ui/BrandBadge.tsx` | `ui/BrandLogo.tsx` |
| Props | `variant?: "hire" \| "mock"`, `tone?: "onLight" \| "onDark"`, `height = 28`, `className?` | `height = 28`, `className?` |
| Rules | Size only by `height`; never add height or max-width classes (they stretch it). `onDark` loads the light artwork. | `next/image`, unoptimised |
| Alt | "HireHouse" / "MockHouse" | "HireHouse" |

```tsx
<BrandBadge variant="hire" height={26} />
```

### Icon

**Purpose:** lucide wrapper with consistent size and stroke. **Source:** `ui/Icon.tsx`
**Props:** `as: LucideIcon`, `size = 18`, `strokeWidth = 2`, `className?`. Always `aria-hidden`.
**Note:** most marketing code imports lucide icons directly with ad hoc sizes (11 to 20) and stroke widths (2 to 3).

```tsx
<Icon as={Bookmark} size={16} />
```

### LanguageSwitcher

**Purpose:** themed language picker (English, Español) with drawn flags. **Source:** `ui/LanguageSwitcher.tsx`
**Props:** `className?`. Uses `Select pill`; writes the locale cookie and a `localStorage` mirror (`hh_locale`), then refreshes server components. Disabled while pending.
**Accessibility:** `aria-label` from `marketing.languageSwitcher.label`; flags `aria-hidden`.

```tsx
<LanguageSwitcher />
```

### ResumeDropzone

**Purpose:** drag-and-drop area for a PDF, DOC or DOCX CV. **Source:** `ui/ResumeDropzone.tsx`
**Props:** `file: File | null`, `onFile(file | null)`, `accept?`, `labels?` (`invalid, remove, drop, drag, browseHint, fileInfo(sizeKb, type)`).
**States:** empty, dragging, invalid type (error text), file chosen (file row with remove button).
**Accessibility:** drop area is `role="button"` with `tabIndex={0}` and a key handler; remove has `aria-label`. English fallbacks exist for every label; pass localised `labels`.

### MarkdownEditor

**Purpose:** Write/Preview markdown field (job descriptions). **Source:** `ui/MarkdownEditor.tsx`
**Props:** `value`, `onChange`, `placeholder?`, `className?`, `labels?` (`write, preview, emptyPreview`). Preview uses `.prose-hh`.

### VideoPlayer

**Purpose:** themed video player replacing native controls. **Source:** `ui/VideoPlayer.tsx`
**Props:** `src`, `className?`, `overlay?` (e.g. a "Question 1 of 6" chip), `labels?: Partial<VideoPlayerLabels>` (play, pause, seek, playback speed, mute, full screen…). Speeds 0.5x to 2x. Custom seek styles `.hh-seek` in `globals.css` include a focus-visible thumb.

### ThemeToggle, ThemeSwitch, FloatingThemeToggle (Retired)

The product is light-only. These return `null` and exist only so old imports compile. Do not use; delete the imports when touching those files.

---

## 12. Known inconsistencies

> **Consolidated tracker:** these rows are also logged, de-duplicated, with an ID, severity and owner in [`05-known-issues-and-open-questions.md`](05-known-issues-and-open-questions.md).

Per the product owner ruling, the **landing page is canonical**. Each row names the canonical (landing) behaviour and labels the other as **Legacy** (older system still in code, do not extend) or **Deviation** (newer code that drifted from the landing). Rows marked **Landing defect** are issues inside the canonical page itself: keep its design, fix the defect.

### 12.1 Divergences from the landing (canonical vs legacy or deviation)

| # | Topic | Canonical (landing) | Legacy / deviation | Where | Action |
|---|---|---|---|---|---|
| 1 | Type register | Inline landing scale (2.3): Manrope, `font-semibold` headlines, explicit weights | **Legacy:** EB `.t-*` roles and `Type.tsx` (weights 200 to 300; claims to be "the ONLY way to set type") | `eb/primitives/Type.tsx`, `LegalDocument` | Re-express the landing scale as shared roles; migrate LegalDocument; retire EB roles. |
| 2 | Button / CTA | Black pill `h-12 rounded-full bg-black px-6 text-[15px] font-semibold text-white`, ArrowRight 17 nudging `translate-x-0.5`, hover lift `-translate-y-0.5` (HomeRoutes, Footer, HeroSearch submit) | **Legacy:** EB `Cta` / `.cta` (44px, weight 400, colour-invert hover; Header uses these classes). **Legacy:** `ui/Button` on marketing (`WorkspaceSignInModal`; 46px, blue primary, no lift). **Deviation:** `PostRoleCta`/`DemoCta`, `BookCta`/`AnchorCta`, `PillOut`/`DemoButton` (same look, three APIs) | see inventory | One marketing `Pill` matching the landing; move Header CTAs onto it. |
| 3 | Eyebrow / section heading | Indigo uppercase eyebrow `text-[12px] font-semibold tracking-[0.16em]` + semibold H2 + 17px sub (HomeWhy) | **Legacy:** EB `Eyebrow` (`t-eyebrow`, weight 400, 0.05em) and `ChipRow` black chips. **Deviation:** partners `Eyebrow` (yellow dot, grey text), institutions `Eyebrow` (plum); companies `SectionHead` matches the landing and is the best extraction | `Type.tsx`, `Chip.tsx`, `partners/ui.tsx`, `institutions/shared.tsx`, `companies/Cta.tsx` | Promote companies `SectionHead` (renamed `SectionHeading`) with an accent prop. |
| 4 | Radius | Ladder by surface size up to 32px (2.4) | **Legacy:** EB archetypes flat `rounded-[14px]`, BarsG square. **Legacy:** `ui/Card` `rounded-lg` (14px) and `ui/Modal` `rounded-xl` (20px) | `eb/sections/*`, `ui/*` | Use the ladder for all new marketing work. |
| 5 | Card | Flat white cell inside a hairline 1px-gap grid (`rounded-[28px]` outer), or `#f6f6f3` well with `rounded-[28px]`; raised black card `#0b0b0c` for the highlighted option | **Legacy:** EB accent blocks (lime/lilac/yellow fills, `rounded-[14px]`). **Legacy:** `ui/Card` (hairline border, shadow token). **Deviation:** `JobCard` (dormant) | `eb/sections/*`, `ui/Card.tsx`, `JobCard.tsx` | Landing card styles for marketing. |
| 6 | Pill / chip / tag | Lime numbered chip, lime tick chip, tinted ModeChip, black "Decision" chip; all `rounded-full` | **Legacy:** EB `Chip` (`h-[27px]`, black on light). **Legacy:** `ui/Badge` tones on marketing. **Deviation:** JobRow "Featured" tag `rounded-[6px]` | as listed | Pills are always `rounded-full`. |
| 7 | Motion | One-shot `InView` + `data-in` scenes, `.hh-rise` load stagger, `cubic-bezier(.2,.7,.2,1)`, reduced-motion end state | **Legacy:** EB archetypes have no motion. **Deviation:** `SameCv` runs its own observer (for Replay); HowTrack marker is a CSS gradient instead of `Sketch`; product `Modal`/`Drawer`/`Skeleton` animations have no reduced-motion stop | as listed | Give `InView` a reset API; use `Sketch`; add reduced-motion stops. |
| 8 | FAQ | HomeClosing `details.hh-faq`, `py-5`, round plus icon that fills black | **Deviation:** CompaniesClosing (`py-3`, `min-h-[44px]`). **Legacy:** DualK text `+` | as listed | Extract one `Faq` from the landing version (keep the 44px minimum). |
| 9 | Focus ring | Landing intent: visible focus (HeroSearch shows its own border) | **Legacy:** `.eb-marketing :focus-visible` uses `var(--accent)` (lime on near-white, nearly invisible); Header/Footer outside `.eb-marketing` get browser defaults; product kit uses a blue ring | `marketing-eb.css` | Define one dark ring for all marketing surfaces. |
| 10 | Tabs / menus | n/a on the landing; best in code is `partners/TypesTabs` (arrow keys, `aria-controls`) | **Legacy:** `ui/Tabs` (no arrow keys). `AccountMenu` `role="menu"` with no arrow keys | as listed | Bring both to the TypesTabs standard. |
| 11 | Product form focus | n/a | **Deviation inside product kit:** `TextInput` focuses blue, `Select` focuses black | `ui/TextField.tsx`, `ui/Select.tsx` | Pick one. |
| 12 | Font loading | Landing renders Manrope (from `body`) | **Legacy:** marketing layout loads Inter (`--font-inter`) that nothing uses; comments disagree | `(marketing)/layout.tsx`, `marketing-eb.css` | Drop the Inter load; fix comments. |
| 13 | Section hairlines | Landing `border-black/[0.08]` on light, `white/10` in black cards | **Legacy:** EB archetypes hardcode `border-black/15` on every ground | `DualK`, `ScorecardD`, `CompareF` | Follow the landing values. |
| 14 | Small duplicates | `ModeChip` / `ModePill` tints from `MODE_STYLE` | **Deviation:** `ModeChip` duplicates `ModePill small`; Header inlines what `Logo` does | as listed | Consolidate. |

### 12.2 Landing defects (keep the design, fix the defect)

| # | Defect | Where | Fix |
|---|---|---|---|
| 15 | Two indigos: landing hardcodes `#4f46e5` (52 occurrences across marketing code, 13 in `home/*`) while the token `--blue`/`--primary` is `#4c49f3`. | `home/*`, in-progress kits | Decide the canonical indigo with foundations; tokenise. |
| 16 | Off-token hex values: `#fbfbf9`, `#0b0b0c`, `#f6f6f3`, greys `#4a4a4a` to `#999`, `#3fb950`, `#bdeaff`, status reds. These are canonical values that lack tokens. | `home/*`, Footer | Promote to tokens (see `01-foundations.md`). |
| 17 | Icon-only search submit on phones has no accessible name. | `home/HeroSearch.tsx` | `aria-label` or `sr-only` text. |
| 18 | HowTrack section has no `h2` (eyebrow is a `p`, steps are `h3`). | `home/HowTrack.tsx` | Make the eyebrow line, or a hidden heading, the `h2`. |
| 19 | HomeRoutes comparison has no table semantics. | `home/HomeRoutes.tsx` | `role="table"` or a real table on wide screens. |
| 20 | No reduced-motion stop for the hero's `animate-ping` live dot (and `.ftm-badge` elsewhere). | `HomeHero.tsx`, `marketing-eb.css` | `motion-reduce:animate-none`. |
| 21 | Marker length: "1 to 2 words" rule broken by the HomeWhy title (`<m>We fix what happens next.</m>`). | `messages/*/marketing.json` | Trim the marked phrase. |
| 22 | Spec drift: spec says closing search on a black card with lime accents (code: blue/violet mesh); hero proof row under the search on phones (code: hidden on phones); HowTrack progress bar and closing link (code: neither). Under the ruling the code is canonical. | `HomeClosing`, `HomeHero`, `HowTrack` | Update the spec to match the page, unless the owner says otherwise. |

### 12.3 Housekeeping (not design divergences)

| # | Issue | Where |
|---|---|---|
| 23 | Hardcoded English: `LegalDocument` ("Last updated", "Contents"), `Drawer` close label, `Select` placeholder, `Spinner` label, `ResumeDropzone` fallbacks. | as listed |
| 24 | Stale comments: `Card` "soft card shadow" (`--shadow-card` is `none`), `Skeleton` "Citrus Tropical", `JobCard` "one row on the board". | as listed |
| 25 | Dead code: `JobSearchBar` (unused, unstyled), `JobCard` component, EB archetypes and `SectionRenderer` (not rendered), retired theme toggles. | as listed |

---

## 13. Open questions

> **Consolidated tracker:** see [`05-known-issues-and-open-questions.md`](05-known-issues-and-open-questions.md) for every open question across the docs, with owners.

> **Resolved:** the landing register is canonical (product owner ruling). The EB archetypes are legacy: keep, do not extend. Whether to delete them is still open.

> **Open question:** Institution and partner routes show the candidate CTA set in the Header but open the employer workspace modal on Sign in. Intended?

> **Open question:** Closing card: the code (blue/violet mesh) is canonical under the ruling; please confirm the spec should be updated to match.

> **Open question:** HowTrack: are the progress bar and the closing "Find your role" link (spec) still wanted?

> **Open question:** Should HeroPeek render a fallback CTA when the jobs query fails, rather than nothing?

> **Open question:** Should the HomeRoutes comparison expose table semantics?

> **Open question:** Is the JobRow "Featured" tag deliberately square-ish (6px) to set it apart from status pills?

---

## 14. Page section patterns

Use these to compose new marketing pages. Every live marketing page follows the same frame.

### 14.1 The page frame

```tsx
<>
  <SmoothScroll />                               {/* home only */}
  <Header />
  <div data-accent="candidate" className="eb-marketing relative bg-[#fbfbf9] text-black [overflow-x:clip]">
    <PageBackdrop />                             {/* first child, absolute, aria-hidden */}
    {/* sections */}
  </div>
  <Footer />
</>
```

- `data-accent` sets the route accent; use `employer`, `institution` or `partner` on those pages, and add the route to `ROUTE_ACCENT` so the Header matches.
- The wrapper clips horizontal overflow; sections themselves must not clip vertically if a dropdown needs to overlap the next section (HomeHero is `relative z-30` for this reason).
- Page-specific motion CSS is imported in the page file (`import "@/components/marketing/companies/companies.css"`).

### 14.2 Live archetypes (landing register)

| ID | Archetype | What it is | Live examples |
|---|---|---|---|
| L1 | Centred hero with the way in | Kicker pill, H1 with marker, sub, proof list, primary action (search or CTA pair), optional product drawing | HomeHero, CompaniesHero, InstHero, PartnersHero |
| L2 | Heading + hairline card grid | Centred heading, 3 or 4 cards in a 1px-gap grid, each with a one-shot scene or icon | HomeWhy, CompaniesPain, PartnersWhy |
| L3 | Side-by-side scene | Two panels showing the same thing two ways, with captions and Replay | SameCv, CompaniesShortlist |
| L4 | Process track | Steps as a pinned horizontal phone track, a drawing rail, or a timeline | HowTrack, CompaniesHow, PartnersFlow, InstHow |
| L5 | Comparison with a raised black column | Label column, plain option, highlighted option as a black card; equal weight for the plain option; fairness line and CTA under it | HomeRoutes, CompaniesCost |
| L6 | Split FAQ | Eyebrow + H2 left (0.8fr), `details.hh-faq` list right (1.2fr) | HomeClosing (first half), all in-progress closings |
| L7 | Closing card | One rounded-32 card, centred H2 (max 16 to 18ch), sub, the way in again | HomeClosing (second half), CompaniesClosing, InstClosing, PartnersClosing |
| Chrome | Header / Footer | Shared on every page | Header, Footer |

EB deck equivalents if you build with the dormant library: L1 ≈ HeroA, L2 ≈ GridE / FeatureI, L5 ≈ CompareF / ContrastL, L6 ≈ DualK `faq`, L7 ≈ StatementB / ClosingM.

### 14.3 Landing page (`/`) section order

| # | Section | Component | Archetype | Anchor | Notes |
|---|---|---|---|---|---|
| 0 | Header | `Header` | Chrome | | Sticky, candidate CTAs |
| 1 | Backdrop | `HomeBackdrop` | (ambient) | | Behind sections 2 and 3 |
| 2 | Hero + search | `HomeHero` | L1 | | `h1`; search dropdown overlaps section 3 |
| 3 | What HireHouse is | `HomeWhy` | L2 | | Three outcomes |
| 4 | The difference | `SameCv` | L3 | `#story` | Same CV, two outcomes |
| 5 | How it works | `HowTrack` | L4 | `#how` | Pinned on wide screens |
| 6 | Free vs Fast Track | `HomeRoutes` | L5 | | Ends with "Find a role, free" |
| 7 | FAQ | `HomeClosing` (part 1) | L6 | | Six questions |
| 8 | Closing | `HomeClosing` (part 2) | L7 | | Search again (inline) |
| 9 | Footer | `Footer` | Chrome | | |

### 14.4 In-progress pages (for reference)

| Page | Order |
|---|---|
| `/companies` (`data-accent="employer"`) | CompaniesBackdrop · CompaniesHero (L1, two CTAs) · CompaniesPain (L2) · CompaniesHow (L4) · CompaniesShortlist (L3) · CompaniesFair (L2) · CompaniesCost (L5) · CompaniesClosing (L6 + L7, black card) · StickyCta (phones) |
| `/institutions` (`data-accent="institution"`) | InstBackdrop · InstHero (L1) · InstProblem (L2) · InstHow (L4) · InstReadiness (scale scene) · InstReports (list + raised black card, L5-like) · InstStudents (sample report) · InstClosing (L6 + L7) |
| `/partners` (`data-accent="partner"`) | PartnersBackdrop · PartnersHero (L1) · PartnersWhy (L2) · PartnersTypes (TypesTabs) · PartnersFlow (L4) · PartnersPaid (single true number) · PartnersTrust (two-sided guardrails) · PartnersClosing (L6 + L7) |
| `/privacy`, `/terms` | LegalDocument (EB register: black opener, contents nav + article) |

### 14.5 Composition rules

1. **Open with L1, close with L6 then L7.** Every live page does. The closing card repeats the page's primary action.
2. **One `h1`** (in L1). Every other section opens with an `h2`.
3. **Alternate density:** follow a scene-heavy section (L3, L4) with a calmer text or grid section.
4. **Section rhythm:** `py-24 md:py-32`, `max-w-[1200px]` (1100 for tables, 1440 for the hero), heading block then content at `mt-14`.
5. **One raised black element per section,** at most one blue element per page (the closing card on home, or StatementB in the EB register).
6. **Accent discipline:** the route accent marks one phrase per headline and the "next move"; everything else is black, white and hairlines.
7. **Anchors** get an `id` and a scroll margin that clears the 64px header (`scroll-mt-20` in SectionRenderer, `scroll-mt-24` in LegalDocument).
8. **Every scene has a still:** if you remove all motion, the page must still say everything.
9. **No invented numbers** anywhere in a section; use mechanism instead (the companies and partners pages show how).
