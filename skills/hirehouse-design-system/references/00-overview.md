# 00 · Overview: start here

**HireHouse design system, handover v1.0** · 13 October 2026
HireHouse is a job board for the UAE and India, a product of **Fintrix Inc.** This handover is for the engineers, designers, writers and AI agents who build on it.

---

## 1. The one rule of precedence

> **The live candidate landing page (`/`) is the design system.**
> Source: `src/app/(marketing)/page.tsx`, `src/components/marketing/home/*`, the header and footer it renders, and `marketing-eb.css`, on branch `feature/landing-redesign` of the HireHouse app.

When two sources disagree, resolve it in this order:

| Rank | Source | Status |
|---|---|---|
| 1 | The landing page as shipped (code and copy under `marketing:landing.*`) | **Canonical** |
| 2 | These documents and `tokens/` | Canonical, derived from rank 1 |
| 3 | Product UI kit (`src/components/ui/*`, `globals.css` `:root`) | Canonical **for product screens only** |
| 4 | Editorial Brutalist (EB) library, archetype sections, `.t-*` type roles | **Legacy**: maintain, never start new work in it |
| 5 | The original deck spec (`new-design-system.md`, 720 × 405 pt slides) | **Ancestor**: the intent, not the rules |

If the landing page itself looks wrong (an accessibility failure, for example), it is logged in [05](05-known-issues-and-open-questions.md) with a recommended fix. Do not quietly "correct" it in new work without that fix being agreed.

## 2. The system in one screen

![Landing page hero, desktop](../assets/screenshots/landing-desktop-hero.png)

| | |
|---|---|
| **Feeling** | Calm, confident, product-led. Spare and high-contrast, never cartoonish. |
| **Ground and ink** | Off-white `#FBFBF9`, black text, white cards. |
| **Colour with a job** | Lime `#E9FEA3` = the candidate's win. Indigo `#4F46E5` = information. Black = the primary action. Blue `#4C49F3` = brand fills. |
| **Type** | Manrope only. Sentence headlines in SemiBold with tight tracking; one phrase marked with a lime highlighter. |
| **Shape** | Pills for every action; generous card radii (24 to 28px) that step down when nested. |
| **Depth** | Structure is flat (8% hairlines); only objects float (documents, search, phones). |
| **Soft colour** | Exactly two sanctioned places: the hero backdrop glows and one closing mesh card. |
| **Motion** | Rises in once, explains once, always has a reduced-motion end state. |
| **Voice** | Plain, direct, fair. Claims are true by construction. Free is always shown with equal weight. |

The seven principles, with the deck-to-web differences, are in [01 §1](01-foundations.md#1-design-principles-for-the-web).

## 3. What is in this handover

| Doc | For | Contents |
|---|---|---|
| [01 · Foundations](01-foundations.md) | Everyone building UI | Principles, colour (with WCAG ratios), typography, spacing and grid, radii and elevation, icons and imagery, motion, theming |
| [02 · Components](02-components.md) | Designers and engineers | Inventory, **how to design a new component** (recipe and checklist), specs for every landing component, product UI kit, page section patterns |
| [04 · Brand, voice and positioning](04-brand-voice-and-positioning.md) | Anyone writing words | Mission, positioning, audiences, naming, voice and tone, writing mechanics, claims guardrails, rewrites, microcopy |
| [05 · Known issues and open questions](05-known-issues-and-open-questions.md) | Design, product and eng leads | Every inconsistency, accessibility failure, copy violation and undecided question, with owner and priority |
| [`tokens/`](../tokens) | Engineers | `tokens.css` (custom properties), `tokens.json` (W3C DTCG), `tailwind-theme.css` (Tailwind v4 `@theme`) |
| [`assets/`](../assets) | Everyone | Logos (wordmark, stacked, app icon, MockHouse) and reference screenshots |
| [`skills/hirehouse-design-system`](../skills/hirehouse-design-system) | AI agents | A self-contained agent skill: instructions, references, tokens, a starter template and a brand checker |

(There is no 03: patterns are part of [02 §14](02-components.md#14-page-section-patterns).)

## 4. How to use it

**Building a page or screen in the app.** Read 02 §2 (new component recipe) and §14 (page patterns). Compose from `src/components/marketing/home/*`; take values from 01. Copy goes into `messages/en` and `messages/es`.

**Building outside the app** (prototype, campaign page, email, deck, social). Start from `skills/hirehouse-design-system/templates/starter.html` and `tokens/tokens.css`. Same type, colour and voice rules apply to every medium.

**Writing copy.** Read 04 §4 to §6. Run the pre-publish checklist in 04 §6.3.

**Checking work.** Run the brand checker on any files you produced:

```bash
node skills/hirehouse-design-system/scripts/check-brand.mjs path/to/files
```

It fails on the non-negotiables (invented claims language, em dashes, off-palette colours, serif or mono fonts, hard block shadows) and warns on likely drift (US spelling, prices, figures that look like statistics).

**Working with an AI agent.** Install the skill (see the [README](../README.md#use-the-agent-skill)). The agent then loads only the reference it needs for the task.

## 5. Non-negotiables

1. **No fabricated facts.** No statistic, price, plan, testimonial or partner logo ships unless it is signed off or true by construction.
2. **Not pay-to-win.** Fast Track buys a 72-hour review; it never changes the score. The free route is always visible, with equal weight. No refunds, guarantees or "application fee" language.
3. **The landing page wins.** No new hex values, fonts, radii or one-off sizes. If nothing fits, raise it with design.
4. **Accessible by default.** One `h1`, visible focus, 44px targets, decorative art hidden from assistive tech, reduced-motion end states.
5. **Names are exact.** HireHouse, Fast Track, MockHouse, Fintrix Inc. British spelling, "CV", no em dashes.

## 6. Governance

- **Owner of truth:** the landing page. Change the landing first (or agree the change), then update these docs and tokens in the same pull request.
- **Keeping the skill in sync:** after editing `docs/`, `tokens/` or `assets/brand/`, run `node scripts/sync-skill.mjs` so the skill's copies match.
- **Versioning:** semantic. Patch = corrections; minor = new tokens or components; major = a change to a principle, the palette or the type family. Record each change in [CHANGELOG](../CHANGELOG.md).
- **Screenshots:** regenerate with `node scripts/capture-screenshots.mjs [baseUrl]` from inside the app checkout (it uses the app's Playwright).
- **Open questions** live in [05](05-known-issues-and-open-questions.md). Close them there, then fix the docs.
