---
name: stuc-artemis
description: >-
  Fail-closed stuc glue for Google ARTEMIS MCP. Explores unknown Android UI
  paths, cross-app flows, soak, and logcat on a real device. Use when the tap
  path is unknown, a system dialog blocks android-cli, or a soak/logcat hunt
  needs a human-like driver. Does not replace android-verify. Stops if the
  Artemis MCP tools are missing.
---

# Stuc Artemis glue

This file is **not** a copy of [google/artemis](https://github.com/google/artemis) and **not** a second Drive. Device proof stays **android-verify**. Leaf MCP tool names and Flash vs Pro live in the references. Do not vendor the Artemis tree. (P29)

## When (Android / stuc tasks)

Load this glue when the task is:

- Reproducing a bug whose tap path is unknown, cross-app, or blocked by a system dialog
- Walking screens to author `docs/verify-<app>/` Drive commands
- Soak, popup hunting, or logcat-plus-keyframes on a connected device

Do **not** load it for shipping proof, visual parity, named screenshot Gradle tasks, or a screen already mapped in `docs/verify-<app>/`. Those stay **android-verify**. (P15, P18)

Google product workflows stay `using-android-skills`. Compose/Kotlin design stays `stuc-chrisbanes`.

## Fail closed

Before any `mobile_*` call, confirm this session exposes **`mobile_run_task`** (and preferably `mobile_diagnose`).

If the tools are missing:

1. Stop that exploration step. Do not fake taps from memory.
2. Tell the user to install Artemis **outside this plugin**:

```
git clone https://github.com/google/artemis.git
cd artemis
uv run artemis mcp --install cursor
```

For every supported IDE, run `uv run artemis mcp --install all`. For the first-time device wizard, run `uv run artemis init` or `./start.sh`.

Do not clone that repo into the consuming app. Do not copy MCP tool bodies into git. The stack can still be ready without Artemis. Exploration is unavailable until the MCP server is mounted.

If a tool errors, or the user says Artemis does not work, call `mobile_diagnose` first. Follow its `next_steps`. Do not retry `mobile_run_task` as a guess. API keys stay in Artemis `.env` or the MCP `env` block. Never paste keys into chat.

## Route

1. Doctor the device with `mobile_diagnose`. Optional `attempt_fix=true` for safe ADB heals. Optional `probe_device=true` when the serial looks connected but observation fails.
2. If more than one serial is ready, ask which device. Then pass `device_serial`.
3. Pick Flash or Pro from [profiles.md](references/profiles.md). Do not let the agent invent a third profile.
4. Run `mobile_run_task`. Poll with `mobile_manage_task`. Inspect with `mobile_inspect_trace` / `mobile_get_device_state` as needed. Tool arguments are in [mcp-tools.md](references/mcp-tools.md).
5. Hold the serial until the task stops. Then Drive with **android-verify**. Name those `android` commands. The Artemis trace is a receipt. It is not Done.

## Stuc overlays

- **Proof.** `android-verify` owns Done. Layout JSON, screen PNG, preview PNG, or journey JSON still required for UI/device claims. (P18)
- **Lock.** One serial. A running Artemis task is a mutex. Do not `android layout`, `android screen`, or journeys on that serial until `mobile_manage_task` shows it stopped. See **principle-separate-before-serializing-shared-state**.
- **Tests.** Authored tests follow the repo's existing stack (Compose semantics, Espresso, named screenshot Gradle). Do not emit coordinate-fallback UI tests because Artemis `rules.md` prefers them. (P15)
- **Global Cursor rule.** `uv run artemis mcp --install cursor` may write `~/.cursor/rules/artemis.mdc`. Those lines teach exploration. They do not override this overlay or **android-verify**.
- **Timing.** Artemis steps are slow (Flash about 3 to 5s, Pro about 15 to 40s). Put exact waits in the android-cli Drive or test code, not in the exploration prompt.
