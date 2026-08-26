---
name: android-verify
description: >-
  Proves Android user-visible behavior with Gradle assemble plus the android CLI
  (describe, run, layout, screen, journeys, Studio preview). Use when shipping
  UI, fixing runtime defects, launching on a device/emulator, or claiming visual
  coverage. Does not compile via android-cli. Stops if the android binary or
  official android-cli skill is missing.
---

# Android verify

Verification loops invoke the **`android` binary** and load the official **`android-cli` skill** (installed by `android init` / `android skills add`). This skill does not paste that skill and does not wrap every flag. Use `android <cmd> -h` and the official skill for syntax.

android-cli does **not** build. Gradle builds. `android run` deploys prebuilt APKs.

## Fail closed

If `android` is not on PATH, or the official `android-cli` skill does not resolve:

1. Stop. Do not fake a device proof.
2. Point at https://developer.android.com/tools/agents/android-cli/download and:

```
android init
android skills add --all
```

Do not copy `devtools/android-cli/SKILL.md` into the repo.

Do not claim screenshot, device, or visual coverage you did not run. Name the commands. (P18)

## When to use

Must use for user-visible Android UI, runtime-only bugs, “launch the app”, visual parity, or playbook “matching surface” on an Android repo.

If the consuming repo has `docs/verify-<app>/SKILL.md`, **follow that skill** after this one: its feature map is the coverage set. Harness delegates (`.cursor/skills/verify-*`, `.claude/skills`, `.codex/skills`) only point here; do not treat a delegate as the map. Sample shape: `create-verification-skill/references/verify-notes-example/`.

Host unit tests stay Gradle. Assemble alone is not done when UI changed. There is no `check.sh`.

## Device lock

One serial per run. Refuse to double-drive a shared emulator without a lock. android-cli has `--device` and no lease. See **principle-separate-before-serializing-shared-state**.

## Launch

1. Doctor: `which android`; `android -V`; `android info`; `adb devices`.
2. `android emulator list`. Start a profile if nothing is ready. Wait until start reports ready. Pass `--device` afterward.
3. **Gradle assemble** via chrisbanes `gradle-run` if that skill is installed, else the project wrapper. Not `android run` to compile. (`gradle-run` is a chrisbanes skill, not this plugin.)
4. `android describe [--project_dir]` for APK paths.
5. `android run --apks=<paths> [--device=] [--activity=]`.

## Drive (preferred order)

Load official `android-cli` (and its interact/journeys references if present) before driving. Order is from that official skill plus Android CLI docs.

1. `android layout` / `layout --diff`
2. `adb shell input` using `center` / `android screen resolve` as the official skill describes
3. `android screen capture` when layout is insufficient. **Inspect the PNG.**
4. `android studio render-compose-preview --print-semantics` when Studio is connected and the proof is an isolated composable
5. Journey XML when the official skill documents it; fail closed on missing controls

If the project has a named screenshot or preview Gradle task, run **that** task when the proof is screenshot/preview testing. It is blocking. (P16)

Use the repo’s established screenshot/UI test path. Do not introduce a second screenshot or UI-test stack beside the one already in use. (P15)

When the user froze production code, fix tests/fixtures only. (P17)

Compose test-shape choice: chrisbanes `compose-ui-testing-patterns`. Project test strategy: android/skills `testing-setup`. Neither replaces this Drive.

## Evidence and “done”

Keep artifacts. Cleanup must not delete them.

- layout JSON (`--output`)
- screen / preview PNGs
- journey result JSON
- Gradle test reports for host tests
- logcat via adb on crash (outside android-cli)

**Done (UI/device):** named Gradle assemble or the asked screenshot/preview task was run and its exit recorded; if device proof was in scope, `android run` with APKs from `describe` plus at least one layout JSON, screen PNG, preview PNG, or journey JSON on disk; the reply lists commands actually executed; missing checks are listed as not run. (P18)

**Done (host-only):** the named test task ran. Do not imply device coverage. (P18)

## Cleanup

Stop emulators **this run started**. Do not kill the user’s physical device session. Do not `adb uninstall` unless this run installed a throwaway package. Do not delete evidence.

## CI

CI claims come from live pipeline config/jobs, not folklore. Reporting-aggregation Gradle tasks are not test runners. (P19)
