# Skill evaluation

How the `hirehouse-design-system` skill was tested before release (RED, GREEN, REFACTOR).

**Task given to a fresh agent:** "Build a single self-contained HTML marketing section for HireHouse, aimed at employers, explaining what they get and pricing-ish details, plus one call to action. Make it look like it belongs on the real HireHouse website." The with-skill run also wrote a LinkedIn launch post for candidates.

| | Without the skill (baseline) | With the skill |
|---|---|---|
| Screenshot | [without-skill.png](employer-section/without-skill.png) | [with-skill.png](employer-section/with-skill.png) |
| Brand checker | **21 errors**: serif and mono fonts, off-palette colours, hard block shadows, em dash, "Most popular" badge | **0 errors, 0 warnings** |
| Facts | Invented plans, prices (AED 499, ₹9,999), features, limits, "cancel anytime" | Every claim traced to a section and copy key in the brand doc |
| Look | Guessed "editorial brutalist": warm paper, orange, Times, square corners | Landing register: off-white ground, Manrope SemiBold, lime marker, hairline grid, pills |

**Refactor:** the with-skill agent reported gaps (checker rejecting the logo ink, the asset guide listing folders the skill does not ship, h1 vs h2 for a fragment, focus-ring advice conflicting between docs, a "refund" suggestion contradicting the claims rules, no guidance for unruled cases). Each was fixed in v1.0.0; see the "Judgement calls" section of `SKILL.md`.

Re-run the checker on any output:

```bash
node skills/hirehouse-design-system/scripts/check-brand.mjs skills/evals/employer-section
```

(The `without-skill.html` file is expected to fail.)
