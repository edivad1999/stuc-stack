---
name: using-android-skills
description: >-
  Routes Google Android product and migration workflows to android/skills leaf
  names (AGP 9, Navigation 3, edge-to-edge, R8, Play, CameraX, testing-setup,
  and related). Stops if those upstream skills are not installed. Use when the
  task is a Google workflow, not everyday Compose state design.
---

# Using android/skills

chrisbanes owns everyday Compose/Kotlin design. android/skills owns Google workflows where agents underperform. Do not merge the two. Do not copy android/skills bodies into this repo. (research split; P29)

## Fail closed

If the needed leaf **name** does not resolve:

1. Stop.
2. Tell the user:

```
android init
android skills add --all
```

Codex: `android skills add --agent=codex --all`.

Do not paste a remembered Google procedure. Do not vendor the skill. Do not treat the skydoves testing pack (if present on disk) as android/skills.

## Routing (HEAD leaf names)

| Task signal | Load |
|---|---|
| Android Gradle Plugin 9 upgrade | `agp-9-upgrade` |
| CameraX | `camerax` (install alias may be `camera1-to-camerax`; use what resolves, note the alias) |
| On-device AppFunctions | `appfunctions` |
| How to invoke the `android` CLI | official `android-cli` skill; device proof still goes through `android-verify` |
| Restore Credentials / passkeys-adjacent | `restore-credentials` |
| OTP-less email via Credential Manager | `verified-email` |
| Adaptive / window-size UI | `adaptive` |
| XML views → Compose **workflow** | `migrate-xml-views-to-jetpack-compose` |
| Compose Styles API / component theming | `styles` |
| Media3 Cast | `media3-cast-integration` |
| Navigation 3 setup / migration | `navigation-3` |
| R8 keep rules | `r8-analyzer` |
| Play Engage SDK | `engage-sdk-integration` |
| Play Billing library upgrade | `play-billing-library-version-upgrade` |
| Play policy audit | `play-policy-insights` |
| Android Studio profilers | `android-profiler` |
| Intent / exported-component security | `android-intent-security` |
| Edge-to-edge / insets | `edge-to-edge` |
| Unit / UI / screenshot **strategy** for the project | `testing-setup` |
| Leanback → Compose TV | `leanback-to-compose-tv-migration` |
| Wear Compose Material 3 | `wear-compose-m3` (alias may be `jetpack-compose-m3`) |
| Display glasses / Glimmer | `display-glasses-with-jetpack-compose-glimmer` |

If a HEAD name is missing and only a local alias exists, use the alias and say so. Do not copy either file into git.

## Stuc overlays

- Insets and gestures follow official specs. Load `edge-to-edge` for inset work. Do not invent custom physics when docs exist. (P13)
- View→Compose: load `migrate-xml-views-to-jetpack-compose` for the Google workflow, **and** follow the repo’s written plan plus how the last similar screen was done. Do not invent a new Compose architecture per screen. (P8)
- Compose test **shape** is chrisbanes `compose-ui-testing-patterns`. Project test **setup** is `testing-setup`. Use the repo’s established screenshot/UI test path; do not add a second stack. (P15)
- Existing screenshot/preview Gradle tasks are blocking when present. Run the named task. (P16)
- When the user asks for official docs or exhaustive upstream research, fetch; do not summarize from memory. (P31)

Pin requests during dependency upgrades are literal. Do not bump a named pinned stack while you are here. (P33)
