# Critique rubric

Review the **diff and the subsystem it touches**. Proportionate findings. Roast niche or speculative architecture. Do not nitpick preexisting code. Do not "go for" a restructure that is not on the ticket. (P20, P30)

## On this diff

- Spaghetti: new ad-hoc branches stuffed into an unrelated flow
- Duplication: copied behavior that is actually shared, not two hosts that only look similar (P4)
- Quality: the change is harder to read than the last similar screen in this repo (P8)
- Extra layers with no demonstrated duplication problem (P1)
- App/UI importing data-layer DTOs (P2)
- A class used only in tests that can be removed (P20)

## Roast and skip

- Speculative architecture ("extract a shared module in case we need it")
- Findings that are too niche to matter on this change
- Preexisting nits unrelated to the diff
- Four-way redesigns, throwaway prototypes, or a new Compose architecture per screen
- Invented UX that is not in the ticket, OpenAPI, or design spec

## DRY

DRY only for behavior that is really shared. Do not extract helpers from two screens that merely look alike. (P4)

## Verification claims

Do not treat "it compiles" as proof. If the critique depends on tests, screenshots, or a device, name the command that was run or say it was not run. (P18)
