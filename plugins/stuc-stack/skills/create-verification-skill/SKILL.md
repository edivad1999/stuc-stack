---
name: create-verification-skill
description: >-
  Generate a project-local Android verification skill (verify-<app>) with a
  feature map. Drive via Gradle assemble and the android CLI, not Node check.sh
  or Playwright. Use for /create-verification-skill or when a repo has no
  scripted way to prove UI behavior.
disable-model-invocation: true
---

# Create a verification skill

Every serious Android project needs a scripted way to drive the real app: assemble it, deploy with the `android` CLI, exercise a feature the way a user would, and capture evidence. This skill generates that as a **project-local** skill (`.cursor/skills/verify-<app>/`) in the **consuming repo**. You write it for the next agent, not for a human.

Do not clone product names from this plugin. Interview **this** checkout. Copy the last similar screen's verification path. Do not invent a second screenshot stack. Do not claim coverage you did not run. (P8, P15, P18)

Worked shape (fictional Notes app, not a product): [`references/verify-notes-example/`](references/verify-notes-example/). `SKILL.md` + `features/` index + one file per area + `multi-surface-journeys.md`. Driver scripts are omitted; commands live in the skill.

## 1. Interview the repo, not the user

Answer these from the codebase and only ask what you cannot observe:

- **Surface:** Android app is the default for this stack. Note other surfaces (library modules, CLI) but Drive the primary user-facing APK.
- **Run:** how does the app assemble? Prefer the repo's documented Gradle task (`:app:assembleDebug` or the flavor the CI uses). Note applicationId, launcher activity, product flavors. Ask rather than guessing flavor policy. (android-opinions)
- **Drive:** **must** call **android-verify** and the `android` binary (official `android-cli` skill). Not Playwright, not `control-ui`, not a vendored `check.sh`. Do not paste android-cli into the generated skill. Host unit tests stay Gradle (chrisbanes `gradle-run` if installed).
- **Observe:** layout JSON, screen PNGs, preview PNGs, journey JSON, Gradle reports, logcat on crash.
- **Isolate:** one emulator serial this run started. Refuse to double-drive a shared emulator or the user's physical device. (device lock)

If the checkout does not assemble as-is, fix that first (or report it) before generating.

## 2. Generate the skill

Write `.cursor/skills/verify-<app>/SKILL.md` with YAML frontmatter (`name: verify-<app>` and a description that names the app and when to reach for it) and these sections, grounded in the interview (no placeholders):

- **Launch:** exact Gradle assemble, `android describe`, `android run --apks=`. How to tell it is ready. Teardown of emulators this run started.
- **Doctor:** `which android`, `android -V`, `adb devices`, APK still on disk, assemble receipt. Read-only.
- **Drive:** android-verify order: `layout` → input/`screen resolve` → `screen capture` (inspect PNG) → Studio preview if isolated composable → journeys if documented. Named screenshot/preview Gradle tasks are blocking when present. (P16)
- **Evidence:** named artifact dir. Proof standards: real user path, not ViewModel setters; action + resulting state; side effects (DB, files) alongside pixels; mocks only behind a production boundary. Host tests ≠ device proof. (P18)
- **Cleanup:** stop emulators this run started. Never kill by process name. Evidence survives.
- **Helpers:** do **not** ship a Node `check.sh`. If a tiny wrapper is needed, it must call `android` / the Gradle wrapper and be documented. Prefer no wrapper.

Copy structure from [`references/verify-notes-example/SKILL.md`](references/verify-notes-example/SKILL.md). Replace sample module names with this repo's.

## 3. Seed the feature map

Create `.cursor/skills/verify-<app>/features/README.md` plus one file per user-facing feature (start with the top 3–5 from navigation, screens, or docs). Follow [`references/verify-notes-example/features/`](references/verify-notes-example/features/).

Each file: H1 + one paragraph, then exactly four H2s in order:

1. `Sub-features`
2. `How to get to it (user POV)`
3. `Driving it with android-verify`
4. `Gotchas`

The README is the sweep order. Put `multi-surface-journeys.md` last. The map is the repo's maintained verification source; a proof that drives one convenient entry point is incomplete when the map lists others.

Keep implementation details out. Name user paths, stable handles (content descriptions, test tags), required state, `android` / Gradle commands, and observable proof.

## 4. Prove the generated skill before handing it over

Run its own instructions end to end once: launch, doctor, drive **ONE** mapped feature, capture evidence, clean up. After cleanup, confirm evidence still exists. A generated skill that was never executed is a draft. If this host is not an Android app, or `android` cannot Drive a device, **say so** and do not claim device proof. Doctoring `android -V` is not a Drive. (P18)

## 5. Offer the maintenance loop

Point at `/maintain-verification-skill`. Suggest a cadence only if they ask.
