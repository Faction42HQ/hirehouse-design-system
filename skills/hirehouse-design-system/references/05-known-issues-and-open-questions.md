# 05 · Known issues and open questions

**Owner:** Design QA · **Status:** consolidated tracker, handover v1 · **Date:** 13 October 2026
**Audience:** design, engineering, brand and product leads, and any AI agent picking up a fix.

This is the single, de-duplicated log of every known inconsistency, accessibility failure, copy guardrail violation and open question raised in [`01-foundations.md`](01-foundations.md), [`02-components.md`](02-components.md) and [`04-brand-voice-and-positioning.md`](04-brand-voice-and-positioning.md), plus the gaps found while cross-checking those docs and the token files against the source app. Each source doc keeps its own list; this file is the tracker.

- **Paths** are relative to the app repo (`powerhouse-hyring-candidate-flow/`). **Keys** use the `namespace:key.path` form from `messages/en/*.json` (English is the source locale).
- **Severity:** **Blocker** (must be fixed before launch: legal, trust or a WCAG failure that hides core interaction) · **High** (fix in the next pass; visible to most visitors or a guardrail breach on a live route) · **Medium** (fix before the system is extended) · **Low** (housekeeping).
- **Owner** is a role, not a person: Design, Eng, Brand or Product.
- **Source** column cites where the issue was first logged: `01 §9`, `02 #15`, `04 §6.2`, and so on. "QA" means it was found during this audit.

---

## Contents

1. [Decisions already made](#1-decisions-already-made)
2. [Accessibility failures (A11Y)](#2-accessibility-failures-a11y)
3. [Visual and system inconsistencies (VIS)](#3-visual-and-system-inconsistencies-vis)
4. [Copy guardrail violations (COPY)](#4-copy-guardrail-violations-copy)
5. [Engineering housekeeping (ENG)](#5-engineering-housekeeping-eng)
6. [Open questions (Q)](#6-open-questions-q)
7. [First 10 fixes](#7-first-10-fixes)
8. [Counts](#8-counts)

---

## 1. Decisions already made

Do not reopen these. Build on them.

| ID | Decision | Made by | Consequence | Where documented |
|---|---|---|---|---|
| D-01 | **The candidate landing page is the canonical design system**, for visuals and for words: `src/app/(marketing)/page.tsx`, `src/components/marketing/home/*`, the Header and Footer it renders and `marketing-eb.css`, as rendered at `/`. Where anything else disagrees, the landing wins and the other source is legacy or a deviation. | Product owner, 2026-10-13 | Landing values are canonical tokens; anything else is fixed towards them, not the other way round. | 01 rule of precedence; 02 intro; 04 intro |
| D-02 | **Where the shipped landing and the landing spec disagree, the code wins** (blue mesh closing card, hero proof row hidden on phones, no HowTrack progress bar). The spec is updated to match. | Follows from D-01 | Spec drift is a documentation task (VIS-13), not a code change. | 01 §2.7 B; 02 #22 |
| D-03 | **Company name: Fintrix Inc.**, written exactly so. HireHouse is "a product of Fintrix Inc." via `SITE.parent`. "Powered by Acumatic", "Roni Analytics" and "Elyts" are legacy and must not be reused. | Product owner, 2026-10-13 | Use the `{parent}` placeholder in copy. | 04 §3.1 |
| D-04 | **Light mode only.** The code confirms it: the dark theme tokens were removed (`globals.css:169`), `themeInitScript` pins `data-theme="light"`, and the theme toggles return `null`. "Dark" means a dark panel inside a light page. | Code, confirmed by 01 §8.1 and `tokens.css` | No dark value set ships. Whether this is permanent is still Q-02. | 01 §8.1; `tokens/tokens.css` header |
| D-05 | **Legacy Editorial Brutalist (EB) library:** the `.t-*` type roles, `Type.tsx`, `.cta` pills, `Section` / ground system and the archetype sections (`eb/sections/*`) are **legacy**. Keep them rendering where they ship; do not extend them; build every new marketing component in the landing register. Whether to delete them is still Q-05. | Product owner ruling, applied by 01 and 02 | Never mix `.t-*` roles and landing classes in one section. | 01 §1, §3.4, §9; 02 "Two registers", §13 |
| D-06 | **Ground truth for claims:** applying is free, always; every applicant hears back; Fast Track is optional, priced per role, reviewed within 72 hours; paying never changes the score; markets are the UAE and India; never mention refunds; never fabricate facts or statistics; the free route always has equal weight. | Product owner | Every COPY item below is measured against this list. | 04 intro, §1.7, §6 |
| D-07 | **British English (en-GB, -ise), no em dashes, sentence case.** | Brand (04) | Applies to product copy and to this documentation set. | 04 §5.7 to §5.9; 01 §3.3; 02 §2.7 |

---

## 2. Accessibility failures (A11Y)

| ID | Severity | What | Where | Recommended fix | Owner | Source |
|---|---|---|---|---|---|---|
| A11Y-01 | **Blocker** | Keyboard focus ring is drawn in the route accent: lime on the off-white ground is 1.06:1 (yellow 1.04:1, lilac 2.15:1), so focus is effectively invisible on the canonical page (WCAG 2.4.7, 1.4.11). Only employer blue passes (5.70:1). | `src/app/(marketing)/marketing-eb.css:43` (`.eb-marketing :focus-visible`) | Draw the ring in `--accent-ink` (black, 2px, 3px offset) with an accent halo, matching how HeroSearch already shows focus. One ring for all marketing surfaces. | Eng (Design signs off the look) | 01 §2.5, §9 #1; 02 #9 |
| A11Y-02 | High | HeroSearch submit button hides its text below 640px (`hidden sm:inline`), leaving an icon-only button with no accessible name. | `home/HeroSearch.tsx:125-127` | Add `aria-label={t("searchCta")}` or keep an `sr-only` label. | Eng | 02 #17 |
| A11Y-03 | High | Header and Footer render outside `.eb-marketing`, so they get the browser default focus style; the mobile menu panel does not close on Escape or trap focus; the menu toggle is 32px wide (below 44px). | `eb/nav/Header.tsx:100-108`; `eb/nav/Footer.tsx` | Apply the A11Y-01 ring globally to marketing chrome; close the panel on Escape and return focus to the toggle; widen the toggle to 44px. | Eng | 02 §5 Header, Footer |
| A11Y-04 | Medium | `--text-meta` `#777` is 4.32:1 on the ground (4.48:1 on white): it fails AA for normal text, yet the landing uses it at 13px ("Standard" column label) and 12.5px (result meta, notice notes). | `home/HomeRoutes.tsx:47, 84`; `home/HeroSearch.tsx` rows; `tokens.css` `--text-meta` | Darken to `#6b6b6b` or `#666` (5.54:1) for any text a user must read; keep `#777` for large text only. | Design | QA (01 and `tokens.css` disagreed on the threshold; both now say large text only) |
| A11Y-05 | Medium | Footer column headings `white/60` on brand blue are 3.13:1 at 12px, failing AA. | `eb/nav/Footer.tsx:76` | Raise to `white/80` (or white). | Design | 01 §2.5, §9 #2 |
| A11Y-06 | Medium | "How it works" section has no `h2` (eyebrow is a `p`, steps are `h3`), so a heading level is skipped. | `home/HowTrack.tsx` | Make the eyebrow line (or a visually hidden heading) the `h2`. | Eng | 02 #18 |
| A11Y-07 | Medium | Free vs Fast Track comparison is built from `div`s with no table semantics; column headers are not associated with cells. | `home/HomeRoutes.tsx:42-70` | Use `role="table"` / `row` / `columnheader` / `cell`, or a real `<table>` on wide screens. See Q-10. | Eng | 02 #19, §13 |
| A11Y-08 | Medium | Reduced-motion gaps: the hero live dot (`animate-ping`), `.ftm-badge`, product `Modal` / `Drawer` transitions and `Skeleton` `hh-shimmer` have no reduced-motion stop. | `home/HomeHero.tsx:30`; `marketing-eb.css`; `ui/Modal.tsx`, `ui/Drawer.tsx`, `ui/Skeleton.tsx` | `motion-reduce:animate-none` / a `prefers-reduced-motion` block for each. | Eng | 02 #7, #20; 02 §11 Skeleton |
| A11Y-09 | Medium | `AccountMenu` uses `role="menu"` / `menuitem` but has no arrow-key navigation or focus-into-menu, which the role promises. | `eb/nav/AccountMenu.tsx` | Implement the menu keyboard pattern, or drop the menu roles and use a plain disclosure list. | Eng | 02 §5 AccountMenu, #10 |
| A11Y-10 | Medium | Product `TextInput` / `TextArea` hint and error text are not linked with `aria-describedby`. | `ui/TextField.tsx` | Link hint and error ids via `aria-describedby`. | Eng | 02 §11 TextInput |
| A11Y-11 | Low | `ui/Tabs` has `role="tab"` and `aria-selected` but no arrow keys, no `aria-controls`, no roving `tabIndex`. | `ui/Tabs.tsx` | Bring to the `partners/TypesTabs` standard. | Eng | 02 #10, §11 Tabs |
| A11Y-12 | Low | Links that open a new tab do not say so to assistive tech (EB `Cta`, companies `DemoCta`, Footer social pills, institutions `PillOut`). Only partners `BookCta` does. | `eb/primitives/Cta.tsx`; `companies/Cta.tsx`; `eb/nav/Footer.tsx`; `institutions/shared.tsx` | Add `sr-only` "(opens in a new tab)" as `BookCta` does. | Eng | 02 §3 Cta, §5 Footer, §10 |
| A11Y-13 | Low | `--text-faint` `#999` (2.85:1) carries the posted date and "Not read" status, which some users need. | `home/HeroSearch.tsx:158`; `home/SameCv.tsx` | Keep `#999` for placeholders only; move dates and status to `#666`. | Design | 01 §2.1, §2.5 |
| A11Y-14 | Low | White text on the closing mesh is unverified: `white/85` sub is 4.72:1 on the base blue, but the lime and yellow corner glows lighten parts of the card. | `home/HomeClosing.tsx:44-52` | Measure at the text positions at 375px and 1440px; add a scrim if any point drops below 4.5:1. | Design | QA |
| A11Y-15 | Low | Legacy deck pairing `#555` on lilac is 3.35:1 (large text only). | Legacy archetype accent blocks | Use black on lilac; do not carry the pairing into new work. | Design | 01 §2.5 |

---

## 3. Visual and system inconsistencies (VIS)

| ID | Severity | What | Where | Recommended fix | Owner | Source |
|---|---|---|---|---|---|---|
| VIS-01 | High | `.eb-marketing` sets `font-weight: 200` (the legacy ExtraLight register), so any landing text without an explicit weight renders ExtraLight. | `marketing-eb.css:32-36` | Keep the rule while legacy `.t-*` screens need it, but lint for unweighted landing text; once VIS-02 lands, set the base to 400. | Eng | 01 §3.1, §9 #3; 02 §2.3 |
| VIS-02 | Medium | Two typographic registers: EB `.t-*` roles (weights 200 to 300) still ship in LegalDocument, the candidate space (`src/app/me/*`, `components/candidate/*`) and `jobs/[id]/not-found.tsx`; everything else uses the landing scale. | `eb/primitives/Type.tsx`; files listed | Re-express the landing scale as shared roles (`--lp-*`), migrate LegalDocument and the candidate space, then retire the EB roles. | Design + Eng | 01 §3.4, §9; 02 #1 (02 previously omitted the candidate space; fixed) |
| VIS-03 | Medium | Two blues: indigo `#4F46E5` (52 occurrences across marketing code, 13 in `home/*`, and the `Sketch` default colour) and brand blue `#4C49F3` (logo, footer panel, employer accent, product primary). The landing spec calls the employer colour "indigo". | `home/*`; `home/Sketch.tsx:13`; in-progress kits | Keep both roles until Q-01 is decided; never swap one for the other; always pass `color` to `Sketch`. | Design | 01 §2.1, §9 #4; 02 #15 (02 said "about 47 uses"; corrected) |
| VIS-04 | Medium | Landing values are arbitrary Tailwind values in code (`#fbfbf9`, `#f6f6f3`, `#0b0b0c`, the grey text ladder, every radius and shadow, `#3fb950`, `#bdeaff`, status reds). This handover names them (`tokens.css` section 0, `tailwind-theme.css` second block) but the app does not use the names yet. | `home/*`, `eb/nav/Footer.tsx` | Adopt the names (see Q-03), migrating class by class; each token's comment gives the exact class it replaces. | Eng | 01 §9 #5; 02 #16 |
| VIS-05 | Medium | Three CTA systems: landing black pill (48px, 15px / 600, lift on hover) vs EB `.cta` (44px, weight 400, colour-invert hover; still used by the Header) vs `ui/Button` on marketing (`WorkspaceSignInModal`, 46px, blue). The in-progress kits add three more APIs for the same pill (`PostRoleCta` / `DemoCta`, `BookCta` / `AnchorCta`, `PillOut` / `DemoButton`). | `eb/nav/Header.tsx`; `marketing/WorkspaceSignInModal.tsx`; kits | One marketing `Pill` component matching the landing; move the Header CTAs onto it. | Eng | 01 §9 legacy table; 02 #2 |
| VIS-06 | Medium | Four eyebrow treatments: landing (indigo, 600, +0.16em), EB `Eyebrow` / `ChipRow`, partners (yellow dot, grey text), institutions (plum). | `Type.tsx`, `Chip.tsx`, `partners/ui.tsx`, `institutions/shared.tsx` | Promote companies `SectionHead` (renamed `SectionHeading`) with an accent prop. | Design + Eng | 02 #3 |
| VIS-07 | Medium | Closing card colour differs within the live pages: home uses the blue mesh (canonical), while the companies, institutions and partners closings are black cards. | `home/HomeClosing.tsx`; `companies/CompaniesClosing.tsx:45`; institutions and partners closings | Decide per Q-07 whether audience pages keep black (their own one-blue-element rule) or adopt a per-accent mesh; document the rule in 02 §14.5. | Design | 02 §1.3, §14.2 (QA: called out as a divergence) |
| VIS-08 | Medium | The global, unlayered `* { border-color: var(--hairline) }` beats Tailwind border-colour classes in some cases (the Footer sets its social-pill border inline to get round it). | `src/app/globals.css:285-287` | Move the rule into `@layer base`. | Eng | 01 §5.2 gotcha |
| VIS-09 | Low | Hairline strengths differ: landing 7 / 8 / 10%, product default 14%, EB `<Rule>` 25 / 30 / 35%, EB archetypes hardcode `border-black/15` (which disappears on dark grounds). | `globals.css`; `eb/primitives/Rule.tsx`; `DualK`, `ScorecardD`, `CompareF` | Follow the landing `--line*` values in all new work. | Design | 01 §9 #7; 02 #13 |
| VIS-10 | Low | Radius divergences: EB archetypes flat `rounded-[14px]`, `BarsG` square, `ui/Card` 14px, `ui/Modal` 20px, JobRow "Featured" tag 6px (pills elsewhere are always round). | `eb/sections/*`, `ui/*`, `jobs/JobRow.tsx` | Use the landing ladder (28 / 18 / 14 / full) for marketing work. See Q-11. | Design | 02 #4, #6 |
| VIS-11 | Low | Card divergences: EB accent blocks (lime / lilac / yellow fills), `ui/Card` (hairline plus an empty shadow token), dormant `JobCard`. | `eb/sections/*`, `ui/Card.tsx`, `marketing/JobCard.tsx` | Landing card styles for marketing. | Design | 02 #5 |
| VIS-12 | Low | Different "dark" values: `#0B0B0C` (landing), `#000` (product and legacy), `#0A0A0D` / `#14141A` (ramp), `#1F2430` (logo ink). | tokens; `public/brand/*` | Landing raised panels use `--ink-raised` only; logo ink stays inside the artwork. | Design | 01 §9 #6 |
| VIS-13 | Low | Landing spec drift (code is canonical per D-02): closing card on a black card with lime accents (code: blue mesh), hero proof row under the search on phones (code: hidden), HowTrack progress bar and closing "Find your role" link (code: neither). | `docs/superpowers/specs/2026-10-09-landing-redesign-design.md` | Update the spec to match the page. | Product | 01 §2.7 B, §9 #8; 02 #22, §6 |
| VIS-14 | Low | Motion deviations: `SameCv` runs its own `IntersectionObserver` (for Replay) instead of `InView`; the HowTrack marked word is a CSS gradient instead of `Sketch`. | `home/SameCv.tsx`; `home/HowTrack.tsx` | Give `InView` a reset API; decide whether the gradient highlighter is a sanctioned second mark (01 §6.4 already lists it). | Eng | 02 #7 |
| VIS-15 | Low | Four FAQ accordion copies with different item padding (home `py-5`; companies `py-3` plus `min-h-[44px]`); EB `DualK` uses a text `+`. | `HomeClosing`, `CompaniesClosing`, `InstClosing`, `PartnersClosing`, `DualK` | Extract one `Faq` from the landing version, keeping the 44px minimum target. | Eng | 02 #8 |
| VIS-16 | Low | `/companies` marks headline phrases in lime while its route accent is blue; the rule elsewhere is "the marker takes the route accent". | `companies/*.tsx` (`Sketch color="#e9fea3"`) | Decide per Q-20; then document it in 01 §2.2 and 02 §2.2. | Design | QA (02 §2.2 listed companies under lime without noting the conflict; both docs now flag it) |
| VIS-17 | Low | Product form focus differs: `TextInput` focuses blue, `Select` focuses black. | `ui/TextField.tsx`, `ui/Select.tsx` | Pick one (black matches the search field). | Design | 02 #11 |
| VIS-18 | Low | Small duplicates: `ModeChip` copies `ModePill small`; Header inlines what `Logo` does. | `home/HeroSearch.tsx`; `jobs/ModePill.tsx`; `eb/nav/Header.tsx`; `marketing/Logo.tsx` | Consolidate on `ModePill` and `Logo`. | Eng | 02 #14 |
| VIS-19 | Low | Legacy token names: `--teal-*` and `--teal` are blue to black; `--surface-soft` equals `--surface`; stale "light / dark" comments in `globals.css`. | `src/app/globals.css` | Keep for compatibility; add a deprecation note; do not use in new code. | Eng | 01 §9 #10 |

---

## 4. Copy guardrail violations (COPY)

Measured against D-06 and the rules in 04 §3.3, §5 and §6. Rewrites for most of these are in 04 §7.

| ID | Severity | What | Where | Recommended fix | Owner | Source |
|---|---|---|---|---|---|---|
| COPY-01 | **Blocker** | Fabricated statistics: "12,400+ candidates fast-tracked", "94% reviewed within 72h", "68% reach a hiring manager", "4.7/5 candidate rating", and the microproof line "4.7/5 · joined by 12,400+ candidates". Rendered by `FastTrackOffer.tsx`, which `ResumePayment.tsx` uses on `/apply/resume`, so this is reachable. | `apply:fastTrack.stats.*`, `apply:fastTrack.microproof` | Delete the stats block; replace the microproof with "Paying never changes your score." | Brand + Eng | 04 §6.2, §7 #3 |
| COPY-02 | **Blocker** | Refund and money-back wording to candidates: "or your {price} back", "refundable under the 72h guarantee", "the fee is refunded in full", "Front of the queue, or your fee back." (live on `/jobs/[id]/fast-track`), "or your money back". | `apply:fastTrack.guarantee`, `apply:fastTrack.secureCheckout`, `apply:fastTrack.feeDescription`, `jobs:choice.tiles.fast.body`, `marketing:home.closing.subline` | State only "Reviewed within 72 hours."; remove every refund mention (04 §7 #1, #2). | Brand | 04 §6.2, §7 |
| COPY-03 | **Blocker** | Pay-to-win and unequal-weight wording: "Recommended" badge and "everything you need to stand out" on the live Fast Track choice; "how visibly you're reviewed"; "speed and visibility"; "jump the queue"; "Upgrade to Fast Track". | `jobs:choice.fastTrack.badge`, `jobs:choice.fastTrack.pitch`, `apply:fastTrack.fairness`, `marketing:home.paths.subline`, `apply:journey.fastQueue`, `apply:standard.upgrade` | Remove the badge; "Reviewed sooner" / "reviewed within 72 hours"; "Choose Fast Track for {price}" (04 §7 #5 to #7, #15). | Brand | 04 §3.3, §6.2 |
| COPY-04 | High | Fast Track extras asserted in live copy but not confirmed by the owner (mock rounds, structured video interview, written feedback, the interview video, three more matched roles, straight to the hiring manager). Includes the canonical landing. | `marketing:landing.routes.rows`, `marketing:landing.faq.qa.includes.a`, `jobs:choice.tiles.*`, `apply:fastTrack.benefits.*`, `apply:fastTrack.feeDescription` | Get Q-12 answered; until then add no new copy asserting them, and cut any the owner rejects. | Product + Brand | 04 §1.7, §6.2 |
| COPY-05 | High | Human-reads claim ("a real person reads every application", "deserves a human"). | `profile:space.home.noApplicationsBody`, `profile:space.home.todo.firstApplyHint`, `marketing:home.headline` | "Every application is weighed on merit" (04 §7 #4). | Brand | 04 §3.3, §6.2 |
| COPY-06 | High | Fee called an "application fee" or "processing fee", contradicting "free to apply". | `apply:payment.description`, `emails:paymentReceipt.intro`, `emails:paymentReceipt.fee`, `emails:paymentReceipt.preview` | "Fast Track fee" (04 §7 #9). | Brand | 04 §3.3, §6.2 |
| COPY-07 | High | Free route disparaged ("screened by hand… a busy week can bury a good CV", "it can take a while"), and "if there's a match" contradicts "every applicant hears back". | `marketing:home.paths.left.body`, `apply:journey.standardSubtitle`, `apply:standard.description` | 04 §7 #8: "you'll hear back either way". | Brand | 04 §6.2, §8.4 |
| COPY-08 | High | Hard-coded Fast Track price "$25". | `marketing:home.paths.right.eyebrow`, `marketing:home.closing.cards.item1.title` | Use `{price}` or "priced per role". Severity drops to Low if Q-17 confirms `marketing:home.*` is unreachable (then delete). | Brand | 04 §5.5, §6.2 |
| COPY-09 | Medium | Error exposes an environment variable name: "Payments are not configured (STRIPE_SECRET_KEY)." | `apply:errors.paymentsUnavailable` | 04 §7 #13: never show env names; always offer the free route. | Brand + Eng | 04 §7 |
| COPY-10 | Medium | Em dashes: 108 in `messages/en`, 28 in `messages/es`, including page titles (`marketing:home.metadata.title`), email subjects (`emails:notProgressing.subject`) and most of `apply:fastTrack.*`. | `messages/{en,es}/*.json` | Replace per 04 §5.7; add a lint that fails on U+2014 in `messages/`. | Brand + Eng | 04 §5.7, §6.4 |
| COPY-11 | Medium | Brand casing drift: "Hirehouse" 52 times in en (email subjects and bodies, `auth:*.metadata.title`, `apply:form.homeLabel`, `jobs:detail.homeLabel`, `profile:metadata.*`); "Mockhouse" in `emails:profileReady.mockBenefit` and 2 others. | as listed | HireHouse, MockHouse. | Brand | 04 §6.4 |
| COPY-12 | Low | "resume" vs "CV": 57 "resume" to 54 "CV" in `messages/en`; marketing uses CV, apply and email flows use "resume". | `apply:*`, `emails:*`, `profile:*` | Migrate to CV ("Remove resume" becomes "Remove CV"). | Brand | 04 §3.2, §6.4 |
| COPY-13 | Low | American spellings: "Organization" (`adminSettings`, `auth`, `adminShell`, `mockAdmin`), "Not analyzed" / "AI-analyzed" (`adminCandidates`), "Partner program" (`marketing:partners.eyebrow`, `partnersPage:hero.pill`). | as listed | en-GB per D-07. | Brand | 04 §5.8 |
| COPY-14 | Low | Mixed page-title separators (em dash, pipe, middot). | `jobs:board.metaTitle`, `partnersPage:metadata.title`, `profile:metadata.*` | `{Page} · HireHouse`. | Brand | 04 §5.7, §6.4 |
| COPY-15 | Low | Mechanics drift: all caps typed into `apply:journey.headerStandard` ("STANDARD · FREE"); partner step titles without full stops; "Thanks!" in `apply:payment.description`; "Enter a valid email." (`apply:errors.invalidEmail`); "Invalid input." (`apply:errors.invalidInput`); "keyword bot" (`profile:space.home.why.read`). | as listed | 04 §5.2, §5.3, §5.7, §8.3, §7 #14, #16. | Brand | 04 §5, §7 |
| COPY-16 | Low | Legacy parent string "Powered by Acumatic" still exists as a key (no component renders it today). | `marketing:chrome.poweredBy` | Delete the key; parent is Fintrix Inc. via `{parent}` (D-03). | Eng | 04 §3.1, open question 2 (QA: confirmed not rendered) |
| COPY-17 | Low | A number inside a decorative inbox scene on the canonical landing: "Your profile is 80% complete". Illustrative, not a claim, but it brushes the "no fabricated numbers" rule. | `marketing:landing.why.art.older[1]` | Brand to confirm illustrative numbers are allowed in `aria-hidden` mock UI, or swap for a non-numeric subject. | Brand | QA |

---

## 5. Engineering housekeeping (ENG)

Not design divergences, but they block a clean handover.

| ID | Severity | What | Where | Recommended fix | Owner | Source |
|---|---|---|---|---|---|---|
| ENG-01 | Medium | If the jobs query fails, `HeroPeek` renders `null`: the hero and the closing card both lose their only action, with no fallback CTA. | `home/HeroPeek.tsx` | Render a "Browse jobs" black pill fallback (see Q-09). | Eng | 02 §6 HeroPeek, §13 |
| ENG-02 | Medium | Hardcoded English in shared components breaks the Spanish locale: `LegalDocument` ("Last updated", "Contents", nav label), `Drawer` close label, `Select` placeholder, `Spinner` label, `ResumeDropzone` fallbacks. | as listed | Move to `messages/*`; pass localised labels. | Eng | 02 #23 |
| ENG-03 | Medium | The `/companies`, `/institutions` and `/partners` page kits and their message files are **uncommitted**. Committed `HEAD` still renders the legacy archetype sections on those routes; the working tree renders the landing-register kits. The docs describe the working tree. | `src/components/marketing/{companies,institutions,partners}/`, `messages/*/{companies,institutions,partners}Page.json` | Commit (or drop) the kits; see Q-05. | Product + Eng | QA (01 §2.4 and 02 §8 disagreed on what those routes render; both now state the split) |
| ENG-04 | Low | Inter is loaded on every marketing route but used only by `apply-page.css`; the marketing layout comment about "Schibsted/Hanken" is stale. | `src/app/(marketing)/layout.tsx:1-18` | Drop the Inter load from the marketing layout; fix the comment. | Eng | 01 §3.1, §9 #9; 02 #12 |
| ENG-05 | Low | Dead or dormant code: `JobSearchBar` (no importer, unstyled), `JobCard` component, EB archetypes and `SectionRenderer` (dormant in the working tree), retired theme toggles, and `src/content/marketing/home.ts` (only imported by `src/lib/ui/accents.test.ts`). | as listed | Delete once Q-05 and Q-17 are answered. | Eng | 02 #25 (QA added `home.ts`) |
| ENG-06 | Low | Stale comments: `ui/Card` "soft card shadow" (`--shadow-card` is `none`), `Skeleton` "Citrus Tropical", `JobCard` "one row on the board", `.eb-marketing` "ExtraLight is the marketing register". | as listed | Update the comments. | Eng | 02 #24; QA |

---

## 6. Open questions (Q)

| ID | Severity | Question | Where | Recommendation | Owner | Source |
|---|---|---|---|---|---|---|
| Q-01 | Medium | Should indigo `#4F46E5` and brand blue `#4C49F3` merge, and if so into which? | VIS-03 | Keep both roles; decide whether the signal colour should become brand blue. | Design | 01 §2.1, §9; 02 #15 |
| Q-02 | Low | Is dark mode permanently out of scope? (The handover brief asked for dark values; the code has none.) | D-04 | Confirm "light only" as permanent and remove the no-op `ThemeProvider` later. | Product | 01 §8.1, §9 |
| Q-03 | Medium | Should the handover's landing token names (`tokens.css` section 0, `tailwind-theme.css` second block) replace the arbitrary values in the app? | VIS-04 | Yes, gradually; values are identical, so migration is visual no-op. | Eng + Design | 01 §9 |
| Q-04 | High | Should the marketing focus ring move to black with an accent halo, as the search field already does? | A11Y-01 | Yes. | Design | 01 §2.5, §9; 02 #9 |
| Q-05 | Medium | Commit the audience-page kits (migrating `/companies`, `/institutions`, `/partners` off the archetypes)? And, once nothing renders them, delete the EB archetypes? | ENG-03, D-05 | Commit the kits; delete archetypes one release later. | Product | 01 §9; 02 §13 |
| Q-06 | Medium | Institution and partner routes show the candidate CTA set in the Header, but their Sign in opens the employer workspace modal. Intended? | `eb/nav/Header.tsx`; `src/lib/marketing/site.ts` `ROUTE_ACCENT` | Give each audience its own CTA set. | Product | 02 §5, §13 |
| Q-07 | Medium | Closing card: confirm the spec follows the code (blue mesh). Should audience-page closings (black) match home? | VIS-07, VIS-13 | Spec follows code (D-02); audience pages keep black so each page has at most one blue element. | Design | 01 §2.7 B; 02 §6, §13 |
| Q-08 | Low | HowTrack: are the spec's progress bar and closing "Find your role" link still wanted? | `home/HowTrack.tsx` | Drop from the spec unless the owner wants them. | Product | 02 §6, §13 |
| Q-09 | Medium | Should `HeroPeek` render a fallback CTA when the jobs query fails? | ENG-01 | Yes. | Product | 02 §6, §13 |
| Q-10 | Medium | Should the HomeRoutes comparison expose table semantics? | A11Y-07 | Yes. | Eng | 02 §6, §13 |
| Q-11 | Low | Is the JobRow "Featured" tag deliberately square-ish (6px) to set it apart from status pills? | VIS-10 | If not deliberate, make it `rounded-full`. | Design | 02 §13 |
| Q-12 | **Blocker** | Which Fast Track benefits beyond "reviewed within 72 hours" are confirmed? | COPY-04 | Owner to confirm each listed extra by name. | Product | 04 §1.7, open question 1 |
| Q-13 | High | Which currency do candidates see for Fast Track per market: AED / INR, or USD (as the code and `docs/i18n/README.md` say)? | 04 §5.5 | Decide before any amount reaches a string. | Product | 04 §5.5, open question 3 |
| Q-14 | Low | 12-hour or 24-hour clock for interview times across the UAE and India? | `{whenText}` in interview emails | Pick one and set it in the `Intl` formatter. | Product | 04 §5.6, open question 4 |
| Q-15 | Low | Spanish word for "application": candidatura (glossary), solicitud (landing) or postulación (profile)? | `docs/i18n/glossary.md`; `messages/es/*` | Pick one and migrate. | Brand | 04 §5.11, open question 5 |
| Q-16 | High | Do partner payout terms ("after the refund window") and the MockHouse B2B "Withdraw and refund unused credits" fall under the no-refunds rule? | `partnersPage:flow.steps.paid.body`, `partnersPage:paid.items.collected.body`, `partnersPage:faq.qa.when.a`, `marketing:partners.stats.item4`, `marketing:partners.flow.item4.body`, `marketing:partners.commercials.item1.body` | If the rule is candidate-facing only, keep; otherwise "once the payment is final". | Brand + Product | 04 §6.2, §8.1, open question 6 |
| Q-17 | High | Are `marketing:home.*` and `apply:fastTrack.*` still reachable? QA evidence: `apply:fastTrack.*` **is** reachable (`FastTrackOffer` via `ResumePayment` on `/apply/resume`; `FastTrackChoice` on `/jobs/[id]/fast-track`); `src/content/marketing/home.ts` is imported only by a test, so `marketing:home.*` looks unreachable. | COPY-01 to COPY-08 | Rewrite `apply:fastTrack.*` before launch; confirm and delete `marketing:home.*`. | Product + Eng | 04 §6.2, open question 7 |
| Q-18 | Low | Is "every application read" acceptable for AI-assisted reading, or should it become "weighed"? | `emails:shared.tagline`, `jobs:board.description` | "Every application weighed on merit. Every applicant answered." | Brand | 04 §6.2, open question 8 |
| Q-19 | Low | Marker length: 02 and the partners code say mark 1 to 2 words; 04 says one phrase; the canonical HomeWhy title marks a whole sentence ("We fix what happens next."). Which rule stands? | `marketing:landing.why.title` | Under D-01 the landing wins: allow one short clause (up to 5 words) and update 02 §2.7. | Brand + Design | 02 #21; QA |
| Q-20 | Low | Should `/companies` mark phrases in its blue accent rather than lime? | VIS-16 | Lime reads as "the candidate's win"; for employers, use blue or the indigo signal. | Design | QA |

---

## 7. First 10 fixes

In priority order. Each is small enough for one pull request.

1. **COPY-02:** remove every refund and money-back line in `apply:fastTrack.*`, `jobs:choice.tiles.fast.body` and `marketing:home.closing.subline` (Brand writes, Eng ships en and es together).
2. **COPY-01:** delete `apply:fastTrack.stats.*` and replace `apply:fastTrack.microproof` with "Paying never changes your score."
3. **COPY-03:** remove the "Recommended" badge and the "stand out", "visibility", "queue" and "upgrade" wording from the live Fast Track choice and checkout.
4. **A11Y-01 + A11Y-03:** one black focus ring with an accent halo across `.eb-marketing`, the Header and the Footer; Escape closes the mobile menu.
5. **Q-12 then COPY-04:** owner confirms the Fast Track extras; Brand cuts the unconfirmed ones from the landing rows, FAQ and checkout.
6. **A11Y-02:** accessible name on the phone-width search submit.
7. **COPY-05 + COPY-06 + COPY-07:** human-reads claim, "application fee" naming, and the disparaging Standard copy (04 §7 #4, #8, #9).
8. **VIS-01:** lint for unweighted landing text under `.eb-marketing` (the ExtraLight trap) and fix any hits.
9. **COPY-10 + COPY-11:** em dashes and "Hirehouse" in page titles and email subjects first, then the rest, with a U+2014 lint on `messages/`.
10. **A11Y-06 + A11Y-07 + A11Y-04:** `h2` for How it works, table semantics for the comparison, and darken `#777` meta text to `#666`.

---

## 8. Counts

| Category | Blocker | High | Medium | Low | Total |
|---|---|---|---|---|---|
| Decisions already made (D) | | | | | 7 |
| Accessibility (A11Y) | 1 | 2 | 7 | 5 | 15 |
| Visual and system (VIS) | 0 | 1 | 7 | 11 | 19 |
| Copy guardrails (COPY) | 3 | 5 | 3 | 6 | 17 |
| Engineering housekeeping (ENG) | 0 | 0 | 3 | 3 | 6 |
| Open questions (Q) | 1 | 4 | 7 | 8 | 20 |
| **Total issues and questions** | **5** | **12** | **27** | **33** | **77** |
