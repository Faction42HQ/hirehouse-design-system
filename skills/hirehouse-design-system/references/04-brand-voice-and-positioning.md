# 04 · Brand, voice and positioning

**Owner:** Brand and UX writing · **Status:** Handover v1 · **Date:** 13 October 2026
**Audience:** engineering, marketing, and any AI agent that writes or edits HireHouse copy.

This document says what HireHouse is, who it talks to, how it sounds, and what it may and may not claim. Visual foundations and components live in the sibling docs; this one only references them (accent names, for example).

**Canonical voice reference (product owner ruling, 2026-10-13):** the main landing page is the true design system, for words as much as for visuals. Its copy lives under `marketing:landing.*` (hero, why, story, how, routes, plus the closing and footer under `marketing:*`). When any other string in the product, any older key (`marketing:home.*`, `apply:fastTrack.*`) or any rule in this document seems to disagree with how the landing page speaks, the landing page wins and the other source goes on the clean-up list in §6.4.

**Source of truth for copy:** `messages/en/*.json` (English is the source locale; Spanish follows). Every example below cites its key as `file:key.path`. Precedence: (1) the landing page copy (`marketing:landing.*`), then (2) the rules in this document, then (3) any other live string. Where a non-landing string disagrees with these rules, the rules win and the key goes on the clean-up list in §6.4.

**Ground truth (confirmed by the product owner):**

- Applying is free, always. Every applicant hears back.
- Fast Track is an optional paid service, priced per role, reviewed within 72 hours.
- Paying never changes the score. Criteria are identical for free and paid.
- Markets: UAE and India (`src/lib/marketing/site.ts` `SITE.markets` = `UAE · India`).
- Never mention refunds. Never fabricate facts or statistics.
- The free route is always visible, with equal weight to Fast Track.

---

## 1. Brand essence

### 1.1 Mission

Make hiring decided on merit, and make sure nobody who applies is left in silence.

(Derived from `marketing:footer.tagline` "Hiring, decided on merit." and `marketing:footer.promise`.)

### 1.2 The problem

| For | The problem, in our words | Source |
|---|---|---|
| Candidates | You apply, a keyword filter decides in under a second, and you never hear back or learn why. | `marketing:home.problem.cards.*`, `marketing:landing.story.elsewhere.caption` |
| Companies | Most of the hiring budget goes on reading CVs and running first rounds by hand, and none of it shows on an invoice. | `companiesPage:pain.*` |
| Institutions | Trainer hours don't stretch to a whole cohort, so most students walk into placement season cold. | `institutionsPage:problem.*` |
| Partners | Selling recruitment usually means running delivery and handling money. | `partnersPage:why.*` |

### 1.3 The promise

> **Free to apply, always. Every application weighed on merit. Every applicant hears back.**
> `marketing:footer.promise`

Short form (the brand line): **The job board that always writes back.** (`marketing:landing.hero.headline`)
Footer form: **Always writes back.** (`marketing:footer.big`)
Tagline: **Hiring, decided on merit.** (`marketing:footer.tagline`, `SITE.tagline`)

### 1.4 Positioning statement

> **For** job seekers in the UAE and India who are tired of applying into silence,
> **HireHouse is** the job board that always writes back.
> **Unlike** job boards that filter CVs on keywords and never reply,
> **we** weigh every application on the same criteria, give every applicant a clear decision, and keep applying free, always. Paying for Fast Track buys speed, never a better score.

Employer-side positioning (secondary):

> **For** companies hiring in the UAE and India, **HireHouse** handles the top of the funnel for free: sourcing, screening and the first interview. **Unlike** agencies or screening software, there is no licence, no setup fee and no commission. **You** get a ranked shortlist and make every hiring decision.

### 1.5 Category

| Audience | Category we claim | Category we avoid |
|---|---|---|
| Candidates | Job board | "AI recruiter", "career coach", "guaranteed placement" |
| Companies | Free, AI-assisted screening and shortlisting (top-of-funnel hiring) | "ATS", "agency", "SaaS" (we sell against licences and agency fees) |
| Institutions | MockHouse: interview readiness at batch scale | "placement guarantee", "training institute" |
| Partners | Partner programme with revenue share | "franchise", "reseller with pricing control" |

### 1.6 Differentiators

1. **Always writes back.** Every applicant gets a decision: through to the next stage, or a clear "not this time".
2. **Merit, not keywords.** The whole application is scored against what the role needs, on the same criteria for everyone.
3. **Free to apply, always.** The free route never disappears and is never second-class.
4. **Paying never changes the score.** Fast Track changes speed, not the evaluation.
5. **Free for companies.** No licence, no setup, no per-seat pricing, no commission.
6. **Humans decide.** AI-assisted review; recruiters and employers make the decisions (`partnersPage:trust.candidates.items[3]`).

### 1.7 Proof points

Mark each claim before you use it. **By construction** means it is true because of how the product or pricing is built, so it needs no external evidence. **Needs evidence** means it is a performance or outcome claim: only publish it once there is data the owner has signed off.

| Claim | Type | Notes |
|---|---|---|
| Free to apply, always | By construction | Owner-confirmed policy. |
| Every applicant hears back | By construction | Decision emails exist for every outcome: `emails:notProgressing`, `emails:screenedOut`, `emails:roleMatched`. |
| Same criteria for free and paid; paying never changes the score | By construction | Owner-confirmed. |
| Fast Track reviewed within 72 hours | By construction (operational commitment) | Owner-confirmed. Say "within 72 hours", nothing more. |
| Fast Track is priced per role, one-time, shown before you pay | By construction | `marketing:landing.faq.qa.cost.a` |
| $0 / free to post a role, no licence, no setup | By construction | Pricing policy. See currency note in §5.5. |
| No agency commission on the hire | By construction | Pricing policy. |
| Recruiters / the employer make the final decision | By construction | Product design. |
| Partners never collect candidate money | By construction | Payments run through HireHouse (Stripe / Razorpay). |
| Interview video recorded only with consent, access-controlled | By construction | `marketing:landing.faq.qa.video.a`; link the Privacy Policy. |
| Ranked with an ELO-style merit score | By construction, describe accurately | `companiesPage:faq.qa.ranked.a`. Do not call it "unbiased" or "objective". |
| Authenticity checks in the video round | Needs verification | `companiesPage:how.steps.interview.body`. Confirm with product before expanding on it. |
| "Apply in two minutes" | Needs evidence | Plausible for the form; keep as is, do not shorten further. |
| "Shortlist in days" | Needs evidence | Already hedged in `companiesPage:faq.qa.speed.a` ("depending on applicant volume"). Keep the hedge wherever the claim is expanded. |
| Any count of candidates, ratings, percentages, savings, time-to-hire | Needs evidence | None currently exists. See banned list §6.2. |
| Fast Track extras (mock rounds, video interview, written feedback, 3 more matched roles, straight to hiring manager) | **Unconfirmed** | Present in live copy but not confirmed by the owner. Do not add new copy asserting them. |

> **Open question:** Which Fast Track benefits beyond "reviewed within 72 hours" are confirmed? Live copy at `marketing:landing.routes.rows`, `marketing:landing.faq.qa.includes.a`, `jobs:choice.tiles.*` and `apply:fastTrack.benefits.*` lists mock rounds, a structured video interview, written feedback, the interview video, and three more matched roles. The landing spec notes these are "pending owner confirmation".

---

## 2. Audience segments

Accent colours are the audience accents defined in `src/app/(marketing)/marketing-eb.css` (`[data-accent=…]`) and mapped per route in `SITE`'s `ROUTE_ACCENT`. The foundations doc owns their token names and usage; the names below are the plain-language names to use in briefs.

| Audience | Who | Accent | Primary CTA | Secondary CTA |
|---|---|---|---|---|
| **Candidates** (primary) | Job seekers in the UAE and India | **Lime** `#e9fea3`, black ink | **Find a role** (`marketing:footer.cta`); search on the landing page | Apply free (always shown next to any Fast Track CTA) |
| **Companies** | Employers, hiring managers, in-house recruiters, agencies | **Blue** `#4c49f3` (the spec also calls it indigo), white ink | **Post a role, free** (`companiesPage:cta.post`) | Book a demo / Talk to us |
| **Institutions** | College placement cells, TPOs, placement trainers, coaching institutes | **Lilac** `#cb9fd2`, black ink | **Book a demo** (`institutionsPage:cta.demo`) | Explore MockHouse |
| **Partners** | Referrers, regional partners, recruitment agencies with reach | **Yellow** `#fbfd78`, black ink | **Become a partner** (`partnersPage:cta.primary`) | See partner types |

Lime also marks Fast Track surfaces inside the product (`globals.css` comment: "the lime accent, reserved so every Fast Track surface matches"). Keep that in mind: a lime Fast Track button must sit next to a free option of equal size and weight.

### 2.1 Message pillars per audience

**Candidates**

| Pillar | Say it like this | Key |
|---|---|---|
| You always hear back | "You're either through to the next stage or you get a clear decision. Never silence." | `marketing:landing.why.items.answer.body` |
| Merit, not keywords | "You won't be screened out because a word didn't match a list." | `marketing:landing.why.items.merit.body` |
| One bar for everyone | "Everyone who applies for a role is scored on the same criteria. Paying never changes your score." | `marketing:landing.why.items.fair.body` |
| Free, always; Fast Track is optional speed | "Apply free, always. Or get reviewed within 72 hours." | `marketing:landing.routes.title` |

**Companies**

| Pillar | Say it like this | Key |
|---|---|---|
| The top of the funnel, handled | "We do the sourcing, screening and first interview. You make the decision." | `companiesPage:hero.sub` |
| A shortlist, not a pile | "A shortlist, not a spreadsheet of CVs." | `companiesPage:shortlist.title` |
| Free, and honest about why | "Optional candidate speed and partner revenue fund the platform, not a fee on you." | `companiesPage:free.items.elsewhere.body` |
| Fair to the people you don't hire | "Your company is never the one that didn't reply." | `companiesPage:fair.items.answer.body` |
| No invented savings | "We don't invent a number. We remove the work that creates the cost." | `companiesPage:cost.title` |

**Institutions (MockHouse)**

| Pillar | Say it like this | Key |
|---|---|---|
| Whole batches, not samples | "Get every batch interview-ready, not just the top ten." | `institutionsPage:hero.headline` |
| One rubric for every student | "Every answer is scored on the same criteria." | `institutionsPage:how.steps.score.body` |
| Trainers stay in control | "Your trainers can adjust scores, add notes and set remediation, then re-test." | `institutionsPage:how.steps.coach.body` |
| Readiness, not promises | "No. It gets students ready and shows you where each one stands." | `institutionsPage:faq.qa.placement.a` |

**Partners**

| Pillar | Say it like this | Key |
|---|---|---|
| You bring reach, we run the system | "You own the reach. We own the system." | `marketing:partners.guardrails.headline` |
| No delivery, no money handling | "Candidates and companies pay HireHouse directly." | `partnersPage:why.items.money.body` |
| Paid on real revenue | "Simple, and tied to real revenue." | `partnersPage:paid.title` |
| A brand you can put your name to | "A brand you can put your name to." | `partnersPage:trust.title` |

---

## 3. Naming and terminology

### 3.1 Product and company names

| Term | Rule | Wrong |
|---|---|---|
| **HireHouse** | One word, capital H twice. Never translated. | Hirehouse, Hire House, HIREHOUSE (in running text), HH |
| **MockHouse** | One word, capital M and H. The interview-practice product. Never translated. | Mockhouse, Mock House |
| **Fast Track** | Two words, both capitalised, no hyphen, in every position including as a verb ("Fast Track it for {price}"). Never translated. Prefer "choose Fast Track" over using it as a verb. | Fast-track, fast track, FastTrack, fast-tracked |
| **Standard** | Name of the free route. Capitalised when used as the name; always paired with "Free" or "Free, always" on first mention. | Basic, Free tier, Regular |
| **Digital Profile** | Capitalised product name for the candidate's profile. | digital profile, Profile Card (as a name) |
| **HireHouse ID** | Candidate's ID card in their space. | Hirehouse ID, Digital ID (legacy, `jobs:idTeaser.digitalId`) |
| **your space** / **candidate space** | The signed-in candidate area. In UI headings: "Your HireHouse space". | dashboard (for candidates), portal |
| **Studio** | MockHouse product area. Never translated. | |
| **workspace** | A company's or institution's admin account. | org, tenant (in UI copy) |
| Domain | `hirehouse.xyz` (`marketing:chrome.copyright`) | |

**Parent company (confirmed by the product owner, 2026-10-13): Fintrix Inc.** Write it exactly so: "Fintrix Inc." (capital F, "Inc." with the full stop). The live footer already renders "a product of Fintrix Inc." from `SITE.parent` (`marketing:footer.productOf`); keep using the `{parent}` placeholder in copy so the name stays in one place. Legacy strings that must not be reused: "Powered by Acumatic" (`marketing:chrome.poweredBy`), "Roni Analytics" (i18n glossary), and "Elyts".

### 3.2 People and things

| Term | Use for | Notes |
|---|---|---|
| **candidate** | The person, as an audience and in the product ("candidate space", "For candidates"). | Default word for a job seeker. |
| **applicant** | Someone who has applied to a specific role. Use in fairness and decision claims. | "Every applicant hears back." Not "every candidate hears back" (a candidate who never applied gets nothing to hear back about). |
| **student** | Institutions / MockHouse only. | Not "candidate" in institution copy. |
| **company** | The customer, when addressing them ("For companies", "your company"). | |
| **employer** | The hiring side, when talking to candidates ("The employer reads your full application"). | |
| **hiring manager** | The person who makes the hire. | |
| **recruiter** | A person screening on the employer's side. | |
| **role** | A job opening, in all running copy. | "job" only in navigation and page names ("Browse jobs", "Jobs"). Avoid "vacancy", "opening", "position". |
| **application** | What a candidate submits. | Never "submission". |
| **CV** | The candidate's document, in all candidate-facing copy. | Do not use "resume" or "résumé". Live copy is split almost evenly (57 "resume" to 54 "CV" in `messages/en`, plurals included); marketing uses CV, apply and email flows use "resume". Migrate to CV. |
| **shortlist** | The ranked, interview-verified set an employer receives. | Never implies an offer. |
| **decision** | The outcome every applicant receives. | "Clear decision", "Decision sent". |
| **score** / **criteria** | What is identical for everyone. | Never "rank higher", "boost", "priority score". |
| **review** | What Fast Track speeds up. | "Reviewed within 72 hours". |
| **Fast Track fee** | What a candidate pays for Fast Track. | Never "application fee" or "processing fee": applying is free. |
| **batch / cohort** | A group of students. | |
| **readiness** | Ready / Needs work / At risk. | Never "placement probability". |
| **partner programme** | The partner offer. | See spelling rule §5.8. |

### 3.3 Banned and avoid terms

| Banned | Why | Use instead |
|---|---|---|
| refund, money back, guarantee, "or your fee back", "refundable" (candidate-facing) | Owner rule: never mention refunds. | "Reviewed within 72 hours." |
| "application fee", "processing fee" | Contradicts "free to apply". Legal framing is an optional priority service. | "Fast Track fee" |
| "a real person reads every application", "deserves a human", "no human backlog" | The product is AI-assisted with recruiters deciding; the spec forbids the human-reads claim. | "Weighed on merit", "read in full and scored", "recruiters make the decisions" |
| "Recommended" (on Fast Track), "upgrade", "premium" (for Fast Track) | Makes the free route look second-class; breaks equal weight. | No badge; "Choose Fast Track" |
| "visibility", "stand out", "jump the queue", "skip the queue", "front of the queue", "priority ranking", "rank higher", "boost" | Implies paying improves the outcome (pay-to-win). | "Reviewed sooner", "reviewed within 72 hours" |
| "guaranteed" job / interview / placement / outcome | Not true, and a legal risk in both markets. | "A clear decision", "gets students ready" |
| "unbiased", "bias-free", "objective", "100% fair" | Unprovable absolute. | "Scored on the same criteria" |
| "AI decides", "our algorithm hires" | Not true. | "AI-assisted review. Recruiters make the decisions." |
| Any statistic not signed off (e.g. "12,400+", "94%", "68%", "4.7/5") | Fabricated. | Remove, or state a by-construction fact. |
| "keyword bot" | Mocking tone. | "keyword filter" |
| "Hirehouse", "Mockhouse", "Fast-track" | Casing drift. | See §3.1 |
| Em dash (the long dash) | Owner rule. | Colon, comma, full stop, or a middot in labels. |
| rockstar, ninja, guru, hustle, crush it | Off-voice and exclusionary. | Plain description of the work |

---

## 4. Voice

The design philosophy is "confident, spare, high-contrast, slightly severe. Not friendly, not corporate, not playful." The voice is the same thing in words.

### 4.1 Voice attributes

**1. Straight**
We say the thing, in the fewest words that are still kind.

| We are | We are not |
|---|---|
| Plain, declarative, sentence-first. "Straight answers." | Hedging, vague, or padded ("We strive to leverage…") |
| Willing to say no in the FAQ ("Does Fast Track improve my score? No.") | Evasive about money or outcomes |

**2. Honest**
We only claim what is true by construction, and we say when we won't give a number.

| We are | We are not |
|---|---|
| "We don't invent a number. We remove the work that creates the cost." | Inflating with stats, testimonials or ratings we can't show |
| Clear about what's free and what's paid, before anyone pays | Small print, surprise fees, refund bait |

**3. Even-handed**
One bar for everyone, and the copy treats both routes with equal respect.

| We are | We are not |
|---|---|
| "The free route never goes away." | Pay-to-win, upsell pressure, scarcity tricks |
| Respectful to people who don't get the role ("This was about a set requirement, not about you or your CV.") | Blaming, or silent |

**4. Spare and confident**
Type leads (see `01-foundations.md` section 1). Copy earns its space.

| We are | We are not |
|---|---|
| Short sentences, one idea per headline, a full stop at the end | Exclamation marks, emoji, puns, cartoon voice |
| Editorial: "Same CV. Two very different outcomes." | Corporate ("Unlock synergies") or chummy ("Hey there, superstar!") |

**5. Warm at the hard moments**
Severe on the page, human in the inbox. When the news is bad, we lead with clarity and then care.

| We are | We are not |
|---|---|
| "We know that's disappointing, and we'd rather tell you than leave you waiting." | Cold system language for a rejection |
| Practical about the next step ("your details are saved so applying again takes a minute") | Over-apologetic or falsely upbeat |

### 4.2 Tone by context

| Context | Dial | Do | Example (real) |
|---|---|---|---|
| **Landing / marketing** | Most confident, most editorial | Sentence headlines, one emphasised phrase, short subs, proof rows | "Every job board helps you apply. We fix what happens next." `marketing:landing.why.title` |
| **Product UI** | Calm, functional, second person | Labels describe; helpers instruct; no selling | "Nothing needs you right now. We'll email you the moment something changes." `profile:space.home.allClear` |
| **Errors** | Plain, blame-free, actionable | Say what happened, then what to do. No codes or env names | "That upload didn't go through. Try again with a PDF, DOC or DOCX." `profile:space.apps.needsYou.error` |
| **Emails: neutral / next step** | Brisk, friendly | One action, one button | "You'll answer each question on camera, one at a time." `emails:interviewInvite.preparation` |
| **Emails: decisions** | Warmest | Clear outcome first, then care, then next step | `emails:notProgressing.intro`, `emails:screenedOut.body` |
| **Pricing / Fast Track** | Most careful | Free route first or side by side; price shown before paying; "never your score" nearby | "The free route never goes away. You choose Fast Track when you apply, and see its price first." `marketing:landing.routes.fairNote` |
| **Legal / consent / privacy** | Neutral, precise, no persuasion | Equal-weight choices; name what's collected and why | "We use essential cookies to keep you signed in. With your permission, we'd also like to use Google Analytics…" `common:consent.body` |
| **B2B (companies, institutions, partners)** | Same voice, more operational | Talk about work removed, control kept, money flows | "Six steps. You only show up for the last one." `companiesPage:how.title` |

---

## 5. Writing mechanics

### 5.1 Headlines

- **Complete sentences with terminal punctuation.** "Stop applying into silence." not "No more silence".
- Sentence case. Proper nouns keep their casing (HireHouse, Fast Track, UAE).
- One idea per headline. Two short sentences are allowed when they turn on each other: "Find a role. Apply once." (`jobs:board.title`).
- Fragments are allowed only when they read as a complete thought and end with a full stop: "Straight answers.", "Same CV. Two very different outcomes."
- Questions are allowed in FAQ items and in closing invitations ("Ready to hear yourself answer?" `mockStorefront:storefront.closingTitle`).
- **Emphasis:** at most one emphasised phrase per headline, marked with `<m>` in the message (the component renders it). Emphasise the payoff, not the brand name: "always <m>writes back</m>".
- Line breaks are authored with `<l>` tags, not with `\n`.
- No exclamation marks in headlines.

### 5.2 Eyebrows and pill labels

- Labels, not sentences: no terminal punctuation. "How it works", "Free or Fast Track", "Questions".
- Sentence case. Two-part pills use a spaced middot: "For companies · No SaaS fee, no setup" (`companiesPage:hero.pill`), "MockHouse for institutions · UAE and India".
- Use the middot `·` (U+00B7) with a space either side as the system separator in pills, meta lines, email taglines and page titles.
- All-caps is a styling decision (CSS), never typed into the string. `apply:journey.headerStandard` "STANDARD · FREE" is drift.

### 5.3 Card titles and bodies

- Card titles end with a full stop when they are a statement ("Screening eats weeks."). Partner-page step titles without a full stop ("You refer", "Recurring revenue") are drift; align to full stops in the next pass.
- Card bodies: one or two sentences, 25 words max.

### 5.4 CTAs

- Start with a verb. Sentence case. No full stop.
- Name the object: "Find a role", "Post a role, free", "Book a demo", "Start video interview", "Open my profile", "Track your application".
- When free is the point, append it after a comma: "Post a role, free", "Find a role, free". Keep "free" on the free action, never on Fast Track.
- Possessive: "my" for buttons that act on the reader's own thing in emails ("Open my profile", "See my application"); "your" in page links ("Track your application"). Don't mix within one surface.
- Fast Track CTA and free CTA appear together with equal size and weight: "Fast Track for {price}" next to "Keep Standard (free)" (`jobs:choice.*.cta`).
- Trailing arrow `→` only on text links, and preferably rendered by the component, not typed in the string.
- Approved verbs: Find, Search, Apply, Post, Book, Track, Open, Start, Join, Save, Upload, Continue, See, Browse, Become, Talk. Avoid: Submit (except the final form action), Click here, Learn more (say what they'll learn), Unlock (except owned ID features), Claim (sales-y).

### 5.5 Numbers, currency, time

- **Prose:** spell out one to nine ("two minutes", "three more matched roles"); numerals from 10 up.
- **Commitments, tables, counters:** numerals always ("72 hours", "3 more matched roles" in a comparison row, "{count} roles").
- **72 hours:** write "within 72 hours" in sentences. "72h" only in very tight labels and chips.
- **Plurals:** always ICU plural forms, never "role(s)": `"{count, plural, one {# role} other {# roles}}"`.
- **Ranges:** "1 to 3" in prose; an en-style range dash is not used in authored copy (the `jobs:board.range` "{from}–{to}" pattern is a numeric range in a counter and may stay).
- **Prices:** never hard-code a Fast Track price. It is "priced per role" and always comes from the `{price}` placeholder, shown before payment, described as "one-time".
- **Currency:** format with the locale's number formatting and the ISO currency of the price. Put the currency symbol or code before the amount with no space for symbols ("$25") and a space for codes ("AED 95", "INR 1,999" or "₹1,999"). Indian grouping (1,00,000) only when the locale is en-IN.
- "$0 to post" (`companiesPage:free.big`) is a free-to-post claim, not a price. Prefer "Free to post" where the currency would confuse a UAE or India reader.

> **Open question:** Which currency do candidates see for Fast Track in each market? The brief expects AED (UAE) and INR (India); the code and `docs/i18n/README.md` say payment amounts are in USD, and older copy hard-codes "$25" (`marketing:home.paths.right.eyebrow`, `marketing:home.closing.cards.item1.title`). Until decided, never write an amount into a message string.

### 5.6 Dates and times

- Long form, day first, no ordinals: "9 October 2026". Short form in tables: "9 Oct 2026".
- Times: format through `Intl` for the reader's locale and include the time zone for interviews (live interview emails interpolate `{whenText}`).
- Relative time ("Posted 2 days ago") only in listings; absolute dates in emails and anything legal.

> **Open question:** 12-hour or 24-hour clock for interview times across UAE and India? Today `{whenText}` is generated in code; confirm and set one format.

### 5.7 Punctuation

- **No em dashes. Anywhere.** Not in copy, page titles, email subjects, or alt text. Replace with a colon (to introduce), a comma (to continue), a full stop (to separate), or parentheses (to aside). Live copy contains 108 em dashes in `messages/en` (for example the page title `marketing:home.metadata.title`, email subjects `emails:notProgressing.subject`, and most of `apply:fastTrack.*`). All are drift.
- Avoid en dashes in prose too; use "to" for ranges.
- Curly quotes and apostrophes in display copy (“ ” ’). Straight quotes are acceptable inside ICU syntax.
- Serial comma: no ("sourcing, screening and first interview"). Use it only to prevent ambiguity.
- Ellipsis is the single character `…`, only for in-progress states ("Searching…", "Starting…").
- Exclamation marks: none in marketing or errors. At most one in a positive confirmation, and prefer none ("Thanks." not "Thanks!"; `apply:payment.description` "Thanks!" is drift).
- Ampersand: only in fixed UI labels where space is critical; write "and" in prose and headings ("Brand and assets provided").
- Page titles: `{Page} · HireHouse` (the middot pattern already used in `profile:metadata.*`). Home: "HireHouse · The job board that always writes back".

### 5.8 Spelling: British English

**Rule: British English (en-GB), with -ise endings.** This is what the candidate-facing and marketing copy already uses, and it matches standard business English in the UAE and India.

Evidence in live copy: "licence" (14 including plurals, 0 "license"), "practise" as a verb, "Prioritise", "Analyse", "cancelled", "fulfilment", "CV".

| Use | Not |
|---|---|
| organisation, prioritise, analyse, recognise, personalise, optimise | organization, prioritize, analyze |
| licence (noun), license (verb) | license (noun) |
| practice (noun), practise (verb) | practice (verb) |
| programme (an offer or scheme) | program (except software: "a computer program") |
| colour, behaviour, centre, cancelled, enrol, fulfilment, catalogue | color, behavior, center, canceled |
| CV | resume, résumé |

Drift to fix: "Organization" across `adminSettings`, `auth`, `adminShell`, `mockAdmin`; "Not analyzed", "AI-analyzed" in `adminCandidates`; "Partner program" in `marketing:partners.eyebrow` and `partnersPage:hero.pill`.

Exceptions: third-party product names and API terms keep their own spelling (Google Analytics, "Authorization" headers in code).

### 5.9 Casing

- Sentence case for everything typed: headlines, buttons, labels, menu items, email subjects, table headers.
- Title Case only for proper nouns and product names (HireHouse, MockHouse, Fast Track, Digital Profile, HireHouse ID, Privacy Policy, Terms of Service).
- Never type all caps into a string; use CSS.
- Acronyms: UAE, CV, JD (define as "job description" on first use in student-facing copy), AI, TPO (institution copy only).

### 5.10 Inclusive language

- Address the reader as "you". Refer to third parties as "they".
- No gendered defaults ("hiring manager", not "his manager"). Sample names span the markets (`companiesPage:hero.mock.candidates`: Aisha R., Rohan M., Layla H.); keep that mix, and always label sample data as "Sample data" or "Example role".
- No age signals in candidate copy ("young", "fresh blood", "digital native"). Prefer "early-career" over "fresher" in marketing.
- Video interviews: don't assume ability. State the requirement neutrally ("any device with a camera and microphone") and keep a support contact visible.
- Don't make rejection personal: "This was about a set requirement, not about you or your CV." (`emails:screenedOut.body`).
- No idioms that don't travel across UAE and India English ("knock it out of the park", "ballpark").

### 5.11 Localisation (en / es)

- English (`messages/en`) is the source. Spanish (`messages/es`) ships with it for every marketing change (spec: "English and Spanish copy ship together"). Spanish routes are currently staging previews with `noindex`.
- Follow `docs/i18n/glossary.md`. Key rules:
  - Address the reader with **tú** consistently. Never usted, vos or vosotros.
  - Sentence case, correct accents, opening ¿ and ¡.
  - Never translate: HireHouse, MockHouse, Fast Track, Standard, Studio, LinkedIn, X, Instagram, Facebook, Stripe, Razorpay.
  - Markets: "EAU · India" (keep the middot).
  - Preserve every ICU placeholder, plural branch and rich-text tag (`<m>`, `<l>`, `<link>`, `<role>`) exactly.
  - Do not convert currency, round amounts, or add claims. Keep "free" scoped to what the English says is free.
- Same voice rules apply in Spanish: no em dashes (Spanish copy currently has 28), no refunds, no pay-to-win wording.
- Design for text expansion: allow about 30% more width for Spanish in buttons, pills and table cells.
- Keys stay identical across locales; never add a locale-only key or a language conditional in a component.

> **Open question:** Which Spanish word for "application"? The glossary prescribes **candidatura** ("not aplicación"), but the live landing uses **solicitud** ("Respuesta a cada solicitud") and the profile uses **postulación**. Pick one and migrate.

### 5.12 Length limits

| Element | Limit (English) | Reference |
|---|---|---|
| Hero headline | 10 words | "The job board that always writes back." is 7 |
| Section headline | 12 words | |
| Sub / descriptor | 35 words | `marketing:landing.hero.sub` is 28 |
| Eyebrow | 4 words, no full stop | "Free or Fast Track" (`marketing:landing.routes.eyebrow`) |
| Pill | 7 words, ~40 characters | "Now hiring across the UAE and India" (`marketing:landing.hero.hiringNow`) |
| Proof-row item | 6 words | "Free to apply, always" |
| Button | 4 words, ~24 characters | "Post a role, free" |
| Card title | 6 words | |
| Card body | 25 words | |
| FAQ answer | 50 words | |
| Error message | 2 sentences | |
| Page `<title>` | 60 characters | |
| Meta description | 155 characters | |
| Email subject | 50 characters | |
| Email preview text | 90 characters | |

---

## 6. Claims and compliance guardrails

### 6.1 What we may say

**About applying**
- "Free to apply, always." / "Every role on HireHouse can be applied to for free, and it always will be."
- "Every applicant hears back." / "You'll get a clear decision." / "Never silence."
- "Weighed on merit, not keywords." / "Scored on the same criteria as everyone else."

**About Fast Track**
- It is optional.
- It is "reviewed within 72 hours".
- It is "priced per role", "one-time, not a subscription", and the price is "shown before you pay".
- "Paying never changes your score." / "Criteria are identical for both." / "The free route never goes away."
- Legal framing: Fast Track is an **optional priority review service**; the free route is the alternative and is always available.

**About fairness and AI**
- "Scored on the same criteria." "One bar for everyone."
- "AI-assisted review. Recruiters make the decisions." (`partnersPage:trust.candidates.items[3]`)
- "AI scores every answer on the same rubric… Your trainers review the results and can adjust any score." (MockHouse, `institutionsPage:faq.qa.scoring.a`)

**About results**
- Describe what the product does, not outcomes it produces: "gets students ready", "shows you where each one stands", "a ranked shortlist".
- Hedge time claims we don't control: "Days, not weeks, depending on applicant volume for the role."

### 6.2 What we may not say

| Topic | Not allowed | Live examples to remove |
|---|---|---|
| Refunds | Any mention of refunds, money back, guarantees, refund windows to candidates | `marketing:home.closing.subline`, `apply:fastTrack.secureCheckout`, `apply:fastTrack.feeDescription`, `apply:fastTrack.guarantee`, `jobs:choice.tiles.fast.body` |
| Statistics | Any number not signed off | `apply:fastTrack.stats.*` (12,400+, 94%, 68%, 4.7/5), `apply:fastTrack.microproof` (rendered in `FastTrackOffer.tsx`) |
| Pay-to-win | "visibility", "stand out", "jump/skip the queue", "Recommended", "upgrade" | `marketing:home.paths.subline`, `apply:fastTrack.fairness`, `apply:journey.fastQueue`, `jobs:choice.fastTrack.badge`, `jobs:choice.fastTrack.pitch`, `apply:standard.upgrade` |
| Disparaging the free route | "screened by hand… a busy week can bury a good CV", "screening happens, but by hand", "it can take a while" | `marketing:home.paths.left.body`, `apply:journey.standardSubtitle`, `apply:standard.description` |
| Human-reads claim | "a real person reads every application", "deserves a human" | `profile:space.home.noApplicationsBody`, `profile:space.home.todo.firstApplyHint`, `marketing:home.headline` |
| Unconfirmed benefits | New copy asserting Fast Track extras beyond 72-hour review | See §1.7 open question |
| Fees | "application fee", "processing fee" | `apply:payment.description`, `emails:paymentReceipt.intro`, `emails:paymentReceipt.fee`, `emails:paymentReceipt.preview` |
| Guarantees | Job, interview, placement, outcome | (none live; `institutionsPage:faq.qa.placement` correctly says no) |
| Fixed price | A hard-coded Fast Track price | `marketing:home.paths.right.eyebrow` "$25", `marketing:home.closing.cards.item1.title` |
| Fairness absolutes | unbiased, objective, bias-free | (none live) |

> **Open question:** Partner payouts. Partner copy says shares are paid "after the refund window" (`partnersPage:flow.steps.paid.body`, `partnersPage:paid.items.collected.body`, `partnersPage:faq.qa.when.a`, `marketing:partners.stats.item4`). The owner rule is "never mention refunds". Is the rule candidate-facing only, or should partner copy say "once the payment is final" instead?

> **Open question:** `marketing:home.*` (older home copy, still loaded by `src/content/marketing/home.ts`) and `apply:fastTrack.*` (checkout, rendered by `FastTrackOffer.tsx` and `FastTrackChoice.tsx`) contain most of the violations above. Confirm whether these surfaces are still reachable; if yes they need a rewrite before launch, if no they should be deleted.

> **Open question:** Email tagline `emails:shared.tagline` "Every application read. Every applicant answered." and `jobs:board.description` "Every application gets read." The landing uses "read in full" for the system. Is "read" acceptable for AI-assisted reading, or should these become "weighed"? Recommendation: "Every application weighed on merit. Every applicant answered."

### 6.3 Pre-publish checklist

Run this on every string, page, email and social post before it ships.

**Truth**
- [ ] Every factual claim is either by construction (§1.7) or has signed-off evidence.
- [ ] No statistic, rating, testimonial or logo appears without source and approval.
- [ ] No refund, money-back or guarantee wording in candidate-facing copy.
- [ ] No Fast Track benefit beyond "reviewed within 72 hours" unless the owner has confirmed it.
- [ ] No claim that a human reads every application.

**Fairness and legal framing**
- [ ] Wherever Fast Track appears, the free route appears too, with equal size, weight and prominence.
- [ ] "Paying never changes your score" (or equivalent) is within one scroll of any Fast Track price or CTA.
- [ ] The price is never hard-coded; it says "priced per role" or uses `{price}`, and is shown before payment.
- [ ] The fee is called the "Fast Track fee", never an application or processing fee.
- [ ] No "Recommended", "upgrade", "visibility", "queue-jumping" language.

**Voice and mechanics**
- [ ] Headlines are sentences with terminal punctuation; at most one `<m>` emphasis.
- [ ] Zero em dashes (search the diff for U+2014).
- [ ] British spelling; "CV", not "resume".
- [ ] HireHouse, MockHouse, Fast Track cased correctly.
- [ ] CTAs start with a verb and name the object.
- [ ] Within length limits (§5.12).

**Localisation and accessibility**
- [ ] Spanish string added for every new English key, same placeholders and tags, tú form.
- [ ] Alt text describes the content, not the decoration; sample data is labelled.
- [ ] Consent and cookie choices have equal weight ("Accept analytics" / "Essential only").

### 6.4 Clean-up list (drift found in live copy)

| Issue | Where | Fix |
|---|---|---|
| "Hirehouse" casing (52 in en) | `emails:*` subjects and bodies, `auth:*.metadata.title`, `apply:form.homeLabel`, `jobs:detail.homeLabel`, `profile:metadata.*` | HireHouse |
| "Mockhouse" | `emails:profileReady.mockBenefit` and 2 others | MockHouse |
| Em dashes (108 en, 28 es) | many, notably page titles and email subjects | §5.7 |
| "resume" vs "CV" | `apply:*`, `emails:*`, `profile:*` | CV |
| American spellings | admin namespaces, partner pages | §5.8 |
| Refunds, stats, pay-to-win, fee naming | §6.2 table | §7 rewrites |
| Page-title separators mixed (em dash, pipe, middot) | `jobs:board.metaTitle`, `partnersPage:metadata.title`, `profile:metadata.*` | `{Page} · HireHouse` |

---

## 7. Before and after

Each "before" is live copy (em dashes shown as `[em dash]` so this document stays dash-free).

| # | Key | Before | After | Why |
|---|---|---|---|---|
| 1 | `marketing:home.closing.subline` | Fast Track your next application and get a real answer in 72 hours, or your money back. | Choose Fast Track and get reviewed within 72 hours. Or apply free: the free route never closes. | No refunds; free route given equal weight. |
| 2 | `apply:fastTrack.guarantee` | Reviewed within 72 hours, or your {price} back. | Reviewed within 72 hours. | No refunds; state only the confirmed commitment. |
| 3 | `apply:fastTrack.microproof` | 4.7/5 · joined by 12,400+ candidates | Paying never changes your score. | Fabricated stats removed; replaced with a by-construction fairness fact. |
| 4 | `profile:space.home.noApplicationsBody` | On HireHouse a real person reads every application, and every applicant gets an answer. Pick a role, add your CV once, and we'll reuse it next time. | On HireHouse every application is weighed on merit, and every applicant gets an answer. Pick a role, add your CV once, and we'll reuse it next time. | Banned human-reads claim. |
| 5 | `marketing:home.paths.subline` | Same evaluation, same bar. Fast Track buys speed and visibility, never a better score. | Same evaluation, same bar. Fast Track buys speed, never a better score. | "Visibility" implies a better outcome. |
| 6 | `jobs:choice.fastTrack.badge` | Recommended | (remove the badge) | Breaks equal weight between routes. |
| 7 | `apply:standard.upgrade` | Upgrade to Fast Track for {price} | Choose Fast Track for {price} | "Upgrade" frames the free route as lesser. |
| 8 | `apply:standard.description` | You're in the Standard queue for {roleTitle}. The team reviews these manually, so it can take a while. You'll hear from us by email if there's a match. | Your application for {roleTitle} is in, on Standard. The employer reviews it when they reach it, and you'll hear back either way. | Don't disparage the free route; "if there's a match" contradicts "every applicant hears back". |
| 9 | `apply:payment.description` | Thanks! Your application fee is in and your application is now being reviewed… | Thanks. Your Fast Track fee is paid and your application is in review. You'll hear back within 72 hours, and your receipt is on its way to your inbox. | "Application fee" contradicts free to apply; no exclamation mark. |
| 10 | `emails:notProgressing.subject` | Update on your application [em dash] {roleTitle} | Update on your application: {roleTitle} | No em dashes. Matches `marketing:landing.why.art.subject`. |
| 11 | `marketing:home.metadata.title` | HireHouse [em dash] The job board that always writes back. | HireHouse · The job board that always writes back | No em dashes; page-title pattern. |
| 12 | `emails:profileReady.preview` | We've filled it in from your resume [em dash] check it and publish. | We've filled it in from your CV. Check it, then publish. | CV; no em dash. |
| 13 | `apply:errors.paymentsUnavailable` | Payments are not configured (STRIPE_SECRET_KEY). | Payments aren't available right now. Try again later, or keep your free application. | Never show env names; always offer the free route. |
| 14 | `apply:errors.invalidInput` | Invalid input. | Check the highlighted fields and try again. | Errors say what to do. |
| 15 | `apply:journey.fastQueue` / `fastNoBacklog` | jump the queue / no human backlog | reviewed within 72 hours | Pay-to-win and human-backlog framing. |
| 16 | `profile:space.home.why.read` | Read in full, never filtered out by a keyword bot | Read in full, never filtered out on keywords | "Keyword bot" mocks; keep it plain. |

### 7.1 Approved lines bank

Use these verbatim. They are on-voice and within the claims rules.

**Brand lines**
- "The job board that always writes back." `marketing:landing.hero.headline`
- "Hiring, decided on merit." `marketing:footer.tagline`
- "Free to apply, always. Every application weighed on merit. Every applicant hears back." `marketing:footer.promise`
- "Always writes back." `marketing:footer.big`

**Candidate**
- "Every job board helps you apply. We fix what happens next." `marketing:landing.why.title`
- "Most applications vanish into a filter or an inbox. On HireHouse, each one is weighed properly and answered." `marketing:landing.why.sub`
- "No keyword roulette." `marketing:landing.why.items.merit.title`
- "One bar for everyone." `marketing:landing.why.items.fair.title`
- "You're either through to the next stage or you get a clear decision. Never silence." `marketing:landing.why.items.answer.body`
- "Same CV. Two very different outcomes." `marketing:landing.story.title`
- "A keyword list decides in under a second. No one reads the rest." `marketing:landing.story.elsewhere.caption`
- "Hear back, always." `marketing:landing.how.steps.answer.title`
- "Show how you think." `marketing:landing.how.steps.interview.title`
- "Apply free, always. Or get reviewed within 72 hours." `marketing:landing.routes.title`
- "Paying never changes your score." `marketing:landing.routes.fair`
- "The free route never goes away. You choose Fast Track when you apply, and see its price first." `marketing:landing.routes.fairNote`
- "The price is set for each role and shown before you pay. It's a one-time fee, not a subscription." `marketing:landing.faq.qa.cost.a`
- "Your next application deserves an answer." `marketing:landing.closing.title`
- "Stop applying into silence." `marketing:home.closing.headline`
- "You did everything right and still heard nothing back." `marketing:home.problem.headline`
- "Find a role. Apply once." `jobs:board.title`
- "Your first application is two minutes away." `profile:space.home.noApplicationsTitle`

**Companies**
- "The top of your funnel, handled. Free." `companiesPage:hero.headline`
- "Six steps. You only show up for the last one." `companiesPage:how.title`
- "A shortlist, not a spreadsheet of CVs." `companiesPage:shortlist.title`
- "Every applicant weighed the same way. Every one answered." `companiesPage:fair.title`
- "Your company is never the one that didn't reply." `companiesPage:fair.items.answer.body`
- "We don't invent a number. We remove the work that creates the cost." `companiesPage:cost.title`
- "Candidates can choose Fast Track to hear back sooner, but it never changes their score." `companiesPage:faq.qa.fast.a`
- "The final call is always yours." `companiesPage:how.steps.decide.body`

**Institutions**
- "Get every batch interview-ready, not just the top ten." `institutionsPage:hero.headline`
- "Trainer hours don't stretch to a whole cohort." `institutionsPage:problem.title`
- "Practice for the role, not a quiz." `institutionsPage:students.items.practice.title`
- "No. It gets students ready and shows you where each one stands. Hiring decisions stay with employers." `institutionsPage:faq.qa.placement.a`
- "Rehearse it until it lands." `mockStorefront:storefront.heroLine1` + `heroLine2`

**Partners**
- "Bring the reach. We run the rest." `partnersPage:hero.headline`
- "You own the reach. We own the system." `marketing:partners.guardrails.headline`
- "A brand you can put your name to." `partnersPage:trust.title`
- "Never promise anyone a job." `partnersPage:trust.rules.items[2]`
- "AI-assisted review. Recruiters make the decisions." `partnersPage:trust.candidates.items[3]`

**FAQ heading**
- "Straight answers." `marketing:landing.faq.title` (use this form; "The straight answers." on B2B pages is acceptable but align over time)

---

## 8. UX microcopy patterns

### 8.1 Buttons

| Pattern | Formula | Examples |
|---|---|---|
| Primary action | Verb + object | "Find a role", "Post a role, free", "Book a demo", "Start video interview" |
| Free / paid pair | Equal weight; free action names "free" | "Keep Standard (free)" / "Fast Track for {price}" |
| Final form submit | "Submit" + object | "Submit application" |
| Progress | "Continue" or "Next step" | `common:continue`, `apply:form.next` |
| Dismiss | Short, neutral | "Not now", "Close", "Cancel" |
| Loading | Present participle + `…` | "Searching…", "Starting…" |
| Destructive | Verb names the loss | "Remove resume" becomes "Remove CV"; "Withdraw unused credits" (MockHouse B2B; avoid "refund" until Q-16 in 05 is decided) |

### 8.2 Empty states

Formula: **what's here (or not) + the next useful action.** Calm, never guilt.

- "Nothing saved yet. Tap Save on a role to keep it here." `profile:space.jobs.emptySaved`
- "Nothing needs you right now. We'll email you the moment something changes." `profile:space.home.allClear`
- "New roles are added as companies post them. Check back shortly." `jobs:board.empty`
- "Try a broader search, or clear the filters to see everything." `jobs:board.emptyFiltered`

Prefer "Select" over "Tap" or "Click" when the surface is used on both desktop and mobile.

### 8.3 Errors

Formula: **what happened (plain, no blame) + what to do next.** Never show codes, stack traces or env variable names. Never imply the user lacks an account unless we know.

| Good (live) | Key |
|---|---|
| "That upload didn't go through. Try again with a PDF, DOC or DOCX." | `profile:space.apps.needsYou.error` |
| "We couldn't save. Check your connection and try again." | `profile:space.studio.errors.generic` |
| "That address is taken. Try another." | `profile:errors.slugTaken` |
| "Links must be web addresses, like github.com/you." | `profile:space.studio.errors.link` |
| "We couldn't access your camera and microphone." (add: "Check your browser permissions and try again.") | `interview:errors.deviceAccess` |

Validation: imperative and specific. "Enter a valid email address." (Use "email address", not "email", in validation; `apply:errors.invalidEmail` "Enter a valid email." is drift.)

Fallback when nothing else is known: "Something went wrong. Try again." Never "Something went wrong." alone.

Payment errors always restate that the free application stands: "Your payment didn't go through. Your application is still in as Standard." (`profile:space.home.todo.fastTrackHint`).

### 8.4 Confirmations

Formula: **outcome in the title, specifics in the body, what happens next.**

- Title: "Application sent" · Body: "Your application for {role} at {company} is in." (`jobs:applyModal.success`)
- Next steps as a short list: "You'll hear back by email." / "Track it any time in your candidate space."
- Never end a candidate confirmation with "if there's a match" (contradicts "every applicant hears back"). Say "you'll hear back either way".

### 8.5 Emails

Structure (as built in `messages/en/emails.json`): `tag` · `subject` · `preview` · `heading` · `intro` · body · `button` · `support` · `footer` · `tagline`.

| Part | Rule | Example |
|---|---|---|
| Tag | 1 to 2 words, sentence case, states the email's kind | "Decision", "Next step", "Needs you", "Good news" |
| Subject | Plain text, under 50 characters, says what changed; colon not em dash | "Your video interview for {roleTitle}" |
| Preview | One sentence that adds to the subject, under 90 characters | "{orgName} invited you to a short recorded video interview." |
| Heading | Sentence, no full stop needed for short statements | "You're invited to a video interview" |
| Greeting | Optional, via `{greeting}` ("Hi {name}, ") | |
| Intro | Outcome first, then context | |
| Button | One per email, verb + object | "Start video interview", "See open roles" |
| Support | "Questions? Reply to this email or write to {email}." | `emails:shared.support` |
| Footer | "If you weren't expecting this email, you can safely ignore it." | `emails:shared.footer` |

**Decision emails** (the most important emails we send): say the outcome in the first sentence, acknowledge it, depersonalise the reason if it was a requirement, and point to the next role. Model: `emails:notProgressing.intro` + `emails:screenedOut.body`. Never "Unfortunately…" as the opening word; never "we'll keep your CV on file" unless that is true.

**Receipts:** call it the Fast Track fee; restate "reviewed within 72 hours"; no refund language.

---

## Open questions (summary)

> **Consolidated tracker:** these questions, the §6.2 violations and the §6.4 clean-up list are logged with IDs, severity and owners in [`05-known-issues-and-open-questions.md`](05-known-issues-and-open-questions.md).

1. Which Fast Track benefits beyond "reviewed within 72 hours" are confirmed? (§1.7)
2. ~~Which legal entity is named?~~ **Resolved:** Fintrix Inc. (§3.1). Remove "Powered by Acumatic" (`marketing:chrome.poweredBy`) wherever it still renders.
3. Display currency for Fast Track per market: AED / INR vs USD. (§5.5)
4. Interview time format: 12-hour or 24-hour. (§5.6)
5. Spanish term for "application": candidatura, solicitud or postulación. (§5.11)
6. Do partner payout terms ("after the refund window") fall under the no-refunds rule? (§6.2)
7. Are `marketing:home.*` and `apply:fastTrack.*` still reachable surfaces? If so, they need a rewrite before launch. (§6.2)
8. Is "every application read" acceptable for AI-assisted reading, or should it become "weighed"? (§6.2)
