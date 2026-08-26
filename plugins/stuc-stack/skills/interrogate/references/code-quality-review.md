# Code Quality Review

Each reviewer applies this code-quality lens in addition to the rubric. It is a strict standard focused on the **diff**: spaghetti, real duplication, and quality. Roast findings that are not applicable or too niche. Do not nitpick preexisting code. Do not restructure off-ticket. (P20, P30)

## Core Prompt

Start from this baseline:

> Perform a code quality audit of the current branch's **diff**.
> Look for spaghetti, duplicated behavior that is actually shared, and quality issues this change introduces.
> Roast speculative architecture and niche nits. Do not flag preexisting problems unless this diff makes them worse.
> A class used only in tests may be removed.
> Do not "go for" a restructure that is not on the ticket. Extra layers need a demonstrated duplication problem.
> Prefer a few high-conviction comments over a long list.

## Dimensions

Each dimension is stated once. Apply the ones that are relevant.

0. **Smallest diff that fits this repo.** Copy the last similar screen. Extra layers need demonstrated duplication, not a hypothetical future. (P1, P8) If a dramatic simplification is on the ticket or this diff created the mess, say so. If it is a new architecture hobby, roast it.

1. **Do not let a PR push a file from under 1k lines to over 1k lines without a very strong reason.** Treat this as a strong smell. Prefer extracting helpers only when behavior is actually shared (P4). Waive for generated sources and for following an existing large file's pattern.

2. **Do not allow spaghetti growth in this diff.** Be suspicious of new ad-hoc conditionals, scattered special cases, or one-off branches inserted into unrelated flows. Treat "weird if statements in random places" as a design problem, not a style nit.

3. **DRY only for real sharing.** Two hosts that look similar are not a reason to extract a helper. (P4)

4. **Prefer direct, boring, maintainable code over hacky or magical code.** Treat brittle, ad-hoc, or "magic" behavior as a problem. Flag thin abstractions, identity wrappers, or pass-through helpers that add indirection without buying clarity.

5. **Push on type and boundary cleanliness when this diff regresses it.** App/UI must not import data-layer DTOs. (P2) Question unnecessary optionality or cast-heavy Kotlin when a sealed type would do. Load chrisbanes `kotlin-api-design` for syntax; do not write a TypeScript essay.

6. **Keep logic in the canonical layer and reuse existing helpers.** Call out feature logic leaking into shared paths. Prefer existing design-system composables over reimplementation. (P9)

7. **Test-only dead classes may go.** If a class is used only in tests, removing it is in scope for this lens. (P20)

## Output Expectations

Prioritize spaghetti and real duplication on this diff first, then boundary/type regressions this change introduced, then smaller legibility issues. Do not flood the review with low-value nits. Prefer a few high-conviction comments.

## Approval Bar

Do not approve merely because behavior seems correct if this diff adds spaghetti, fake DRY, app→data DTO imports, or speculative architecture. Do not block on preexisting nits or off-ticket restructures.

## Review Tone

Be direct. Roast if a finding is not applicable or too niche. Do not be rude. If the diff makes the codebase messier, say so. If the only "improvement" is a redesign nobody asked for, dismiss it.
