# Worked example: `verify-notes`

Fictional Android notes app. Not a real product. The **shape** is what agents copy into a consuming repo as `docs/verify-<app>/` (canonical skill + `features/`). Each harness gets a thin delegate only (see [`harness-delegate.SKILL.md`](harness-delegate.SKILL.md) and [`../harness-delegates.md`](../harness-delegates.md)).

Modeled on [poteto/verification-skill-example](https://github.com/poteto/verification-skill-example) (`verify-atlas` + `features/` map). Mapped to this stack:

| Shape to copy | This sample (Android) |
|---|---|
| UI driver | **android-verify** + the `android` binary (official `android-cli` skill). No driver script vendored. |
| Host unit+e2e | Gradle assemble / unit tests; device proof is `android describe` / `run` / `layout` / `screen` |
| Isolated `--checkout` | One emulator **serial** this run started. Do not drive the user's physical device. |
| `doctor` before drive | `which android`, `android -V`, `adb devices`, assemble receipt |
| Feature map four H2s | Same four H2s. Harness name is `android-verify`, not `control-*` |
| Sweep + `multi-surface-journeys.md` | Same |

Do not copy this sample into git as the consuming app's skill. Generate with `/create-verification-skill` from **that** repo's screens.

Layout in the consuming repo:

```text
docs/verify-<app>/SKILL.md              # launch, doctor, drive, prove, clean up
docs/verify-<app>/features/README.md    # index, conventions, sweep order
docs/verify-<app>/features/*.md         # one file per user-facing area
.cursor/skills/verify-<app>/SKILL.md    # Cursor delegate (if this harness)
.claude/skills/verify-<app>/SKILL.md    # Claude Code delegate (if this harness)
.codex/skills/verify-<app>/SKILL.md     # Codex delegate (if this harness)
```
