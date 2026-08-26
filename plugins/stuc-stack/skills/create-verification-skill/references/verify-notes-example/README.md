# Worked example: `verify-notes`

Fictional Android notes app. Not a real product. The **shape** is what agents copy into a consuming repo as `.cursor/skills/verify-<app>/`.

Modeled on [poteto/verification-skill-example](https://github.com/poteto/verification-skill-example) (`verify-atlas` + `features/` map). Mapped to this stack:

| Example (desktop / Node) | This sample (Android) |
|---|---|
| `control-atlas.mjs` / CDP | **android-verify** + the `android` binary (official `android-cli` skill). No driver script vendored. |
| `check.sh` unit+e2e | Gradle assemble / unit tests; device proof is `android describe` / `run` / `layout` / `screen` |
| Isolated `--checkout` | One emulator **serial** this run started. Do not drive the user's physical device. |
| `doctor` before drive | `which android`, `android -V`, `adb devices`, assemble receipt |
| Feature map four H2s | Same four H2s. Harness name is `android-verify`, not `control-*` |
| Sweep + `multi-surface-journeys.md` | Same |

Do not copy this sample into git as the consuming app's skill. Generate with `/create-verification-skill` from **that** repo's screens.

Layout:

```text
SKILL.md                 # launch, doctor, drive, prove, clean up
features/README.md       # index, conventions, sweep order
features/*.md            # one file per user-facing area
```
