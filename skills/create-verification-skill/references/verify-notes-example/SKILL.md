---
name: verify-notes
description: >-
  Drive the fictional Notes Android app on a device or emulator via Gradle
  assemble plus the android CLI. Use for layout JSON, screen PNGs, save/search
  flows, or claiming visual coverage. Sample only; generate verify-<app> in the
  consuming repo.
disable-model-invocation: true
---

# Verify Notes (sample)

Drive a running Notes debug APK the way a user would. Gradle **builds**. The `android` binary **deploys and drives**. Load **android-verify** and the official **android-cli** skill. Do not paste those bodies. Do not invent a `check.sh`.

This file is a **sample** of what `/create-verification-skill` should emit for an Android app. In a real repo the name is `verify-<app>` and the Gradle module/task names come from that repo.

## Fail closed

If `android` is missing or the official `android-cli` skill does not resolve, stop. Print https://developer.android.com/tools/agents/android-cli/download and `android init` / `android skills add --all`. Do not fake a device proof. (P18)

## Launch

1. Doctor the CLI: `which android`; `android -V`; `android info`; `adb devices`.
2. `android emulator list`. Start a profile **this run owns**. Wait until start reports ready. Pass `--device=<serial>` afterward. Refuse to double-drive a shared emulator. (device lock)
3. Assemble via chrisbanes `gradle-run` if installed, else the wrapper. Example (replace with the repo's applicationId module):

```
./gradlew :app:assembleDebug
```

Not `android run` to compile.

4. `android describe --project_dir .` for APK paths.
5. `android run --apks=<debug-apk> --device=<serial> --activity=<launcher>`.

Ready when `adb` shows the package in `dumpsys window` / the activity is resumed. Teardown: stop the emulator **this run started**. Do not `adb uninstall` the user's daily build unless this run installed a throwaway package.

Host unit tests (not device proof):

```
./gradlew :app:testDebugUnitTest
```

A green unit test is not visual coverage.

## Doctor

Read-only. Run before the first drive and after any failed drive.

- `android` on PATH; `android -V` prints a version
- Official `android-cli` skill name resolves
- `adb devices` shows the serial this run started, `device` not `offline`
- The APK path from `describe` still exists
- Assemble exit code was recorded this session (or re-assemble)

If doctor fails, fix the skill or the environment. Do not drive.

## Drive

Load **android-verify**. Preferred order (syntax from official `android-cli` / `android <cmd> -h`):

1. `android layout --device=<serial>` / `layout --diff` (JSON to `--output`)
2. `adb shell input` using `center` / `android screen resolve` as the official skill describes
3. `android screen capture` when layout is insufficient. **Inspect the PNG.**
4. `android studio render-compose-preview --print-semantics` only if Studio is connected and the proof is an isolated composable
5. Journey XML when the official skill documents it

If this repo has a named screenshot/preview Gradle task, that task is blocking for screenshot/preview claims. Do not add a second screenshot stack. (P15, P16)

Stable handles: content descriptions, test tags, text on screen. Not raw coordinates unless `screen resolve` produced them.

Read the matching file under [`features/`](features/). Exercise every reachable entry point and the success / cancel / error / empty / persistence paths the change can affect.

## Evidence

Keep artifacts. Cleanup must not delete them. Suggested dir: `artifacts/verify-notes/<feature-id>/` (in the consuming repo; this sample does not ship a binary).

- layout JSON
- screen / preview PNGs
- journey JSON if used
- Gradle test reports for host-only claims
- logcat on crash (`adb logcat`, outside android-cli)

**Done (UI/device):** named assemble (or screenshot Gradle task) ran; `android run` used APKs from `describe`; at least one layout JSON, screen PNG, preview PNG, or journey JSON is on disk; the reply lists commands actually executed. Missing checks are listed as not run. (P18)

**Done (host-only):** the named unit/screenshot Gradle task ran. Do not imply device coverage.

## Cleanup

Stop emulators this run started. Do not kill the user's physical device session. Do not delete evidence.

## Feature map

[`features/`](features/). Four H2s per file: `Sub-features`, `How to get to it (user POV)`, `Driving it with android-verify`, `Gotchas`. Sweep order is the README. Finish with `multi-surface-journeys.md`.
