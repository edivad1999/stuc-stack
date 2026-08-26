# stuc-stack

Android/Kotlin agent skill stack: sticky `/stuc-mode`, named principles, playbooks, and a verification loop that drives the `android` CLI after Gradle assemble.

This tree does **not** vendor chrisbanes/skills, android/skills, or the android-cli skill. Those stay upstream.

## Credit

Tailored from the [pstack](https://github.com/cursor/plugins/tree/main/pstack) engineering stack (MIT, Lauren Tan). Copyright retained in `LICENSE`. Version here is `0.1.0`; it does not impersonate pstack `0.14.3`.

## Install

1. Enable this plugin from `plugins/stuc-stack` (Cursor: `.cursor-plugin/`; Claude: `.claude-plugin/`; Codex: `.codex-plugin/`). This repo already points at it:
   - Cursor: `.cursor/settings.json` (`plugins.stuc-stack.enabled`)
   - Claude Code: `.claude/settings.json` (`extraKnownMarketplaces` + `enabledPlugins`)
   - Codex: `.agents/plugins/marketplace.json`
2. Chris Banes skills:

```
npx skills add chrisbanes/skills
```

Claude: `/plugin marketplace add chrisbanes/skills` then `/plugin install chrisbanes-skills@chrisbanes-skills`.

3. Android CLI + Google skills:

```
# binary: https://developer.android.com/tools/agents/android-cli/download
android init
android skills add --all
```

4. Run `/setup-stuc`. It writes the model rule and **doctors** upstreams. If chrisbanes, android/skills, or `android` is missing, the stack is not ready.

Cursor `plugin.json` has no `dependencies` field. Claude Code declares `chrisbanes-skills` and `android-skills`. Cross-marketplace resolve may require installing those two first.

Remaining GUI / reload steps: `.agents/stuc-stack-intake/design/install-status.md`.

## Use

`/stuc-mode` for non-trivial work. Compose/Kotlin design routes to chrisbanes **leaf names**. Google workflows route to android/skills **leaf names**. Device proof is `/android-verify` (Gradle assemble, then the `android` binary).

Opinionated overlays come from the author’s Android/Kotlin work, restated without a particular product’s module graph. Follow the repo in front of you.

## Differences vs pstack

Concrete, from this tree plus the intake spec. Not a restatement of pstack skill bodies.

### Major

- **Android/Kotlin surface.** Playbooks that said “matching surface” / Playwright / `control-ui` default to `android-verify` + the official `android-cli` skill when the repo is an Android app. Gradle still builds; `android run` only deploys prebuilt APKs.
- **Generic engineering skills kept, then tailored.** `how`, `why`, `unslop`, `tdd`, `architect`, `arena`, `swarm`, `interrogate`, the 21 `principle-*` leaves, and the playbook machine remain. Opinionated Android/Kotlin overlays live in `stuc-mode`, `references/android-opinions.md`, and a few principle leaves — project-agnostic wording, evidence ids (`P#`).
- **TypeScript pack dropped.** There is no `typescript-best-practices/`. Kotlin type/API discipline is `kotlin-best-practices` plus chrisbanes Kotlin leaves by **name**.
- **New verification and Kotlin glue (this plugin).** `android-verify` (Drive loop), `kotlin-best-practices` (routing + overlays). `gradle-run` and `kotlin-control-flow` are copies of existing stuc-owned tooling, not upstream leaves.
- **Upstreams referenced, not vendored.** `using-chrisbanes-skills` and `using-android-skills` route to leaf **names** and fail closed. Manifest `skills:` / `agents:` paths stay inside this directory. Official `android-cli` is named, never pasted.
- **Verification contract.** Do not claim device/screenshot coverage that was not run. Name Gradle tasks, `android` commands, and devices. One device serial per run (`principle-separate-before-serializing-shared-state`).
- **Multi-agent packaging.** pstack ships Cursor (`.cursor-plugin/`) only. This directory also has `.claude-plugin/` (with `dependencies`) and `.codex-plugin/` pointing at the same `skills/` tree.

### Minor

- **Renames.** `poteto-mode` → `stuc-mode`; `setup-pstack` → `setup-stuc` (writes `~/.cursor/rules/stuc-stack-models.mdc`); `poteto-agent` → `stuc-agent`.
- **No Benny.** `automations/benny/` is not in this tree.
- **Glue skill names.** `using-chrisbanes-skills`, `using-android-skills`, `android-verify`, `kotlin-best-practices`, plus `gradle-run` / `kotlin-control-flow`.
- **Cursor vs Claude deps.** Cursor cannot declare plugin dependencies; enablement is `.cursor/settings.json` plus skill-name fail-closed. Claude Code lists `chrisbanes-skills` and `android-skills`. Codex has no plugin deps; `AGENTS.md` requires the same upstreams.
- **Guide filename.** `docs/guide/02-stuc-mode.md` (not `02-poteto-mode.md`).
- **No pstack guide art.** Copied `docs/guide/images/*.jpg` were deleted; markdown image embeds were removed.
- **Playbook git paths.** Trunk re-reads use `plugins/stuc-stack/skills/...`, not a `pstack/` prefix.
- **Not in this plugin (deferred, may remain under `.agents/skills/` for this app):** `to-plan`, `shepherd`, `implement-with-subagents`, `run-github-project`, `grounded-writing`, Graphify, skydoves testing pack.
