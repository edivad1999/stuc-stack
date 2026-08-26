# stuc-stack

Android/Kotlin agent skill stack: sticky `/stuc-mode`, named principles, playbooks, and a verification loop that drives the `android` CLI after Gradle assemble.

This tree does **not** vendor chrisbanes/skills, android/skills, or the android-cli skill. Those stay upstream.

## Credit

Tailored from the [pstack](https://github.com/cursor/plugins/tree/main/pstack) engineering stack (MIT, Lauren Tan). Copyright retained in `LICENSE`. Version here is `0.1.0`; it does not impersonate pstack `0.14.3`.

Project-local verification skill + feature-map **shape** follows [poteto/verification-skill-example](https://github.com/poteto/verification-skill-example) (fictional Atlas map). In this plugin that shape is Android: Gradle assemble, the `android` CLI, **android-verify**, no Node `check.sh`. Sample: `skills/create-verification-skill/references/verify-notes-example/`.

## Install

1. Enable this plugin from `plugins/stuc-stack` (Cursor: `.cursor-plugin/`; Claude: `.claude-plugin/`; Codex: `.codex-plugin/`). This repo already points at it:
   - Cursor: `.cursor/settings.json` (`plugins.stuc-stack.enabled`). Local load: `mkdir -p ~/.cursor/plugins/local && ln -sfn "$(pwd)/plugins/stuc-stack" ~/.cursor/plugins/local/stuc-stack`, then reload and enable third-party plugins.
   - Claude Code: `.claude/settings.json` (`extraKnownMarketplaces` + `enabledPlugins`)
   - Codex: `.agents/plugins/marketplace.json`
2. Chris Banes skills (HEAD clusters, not the pre-cluster leaf names):

```
npx skills add chrisbanes/skills
```

Claude: `/plugin marketplace add chrisbanes/skills` then `/plugin install chrisbanes-skills@chrisbanes-skills`.

Codex:

```
codex plugin marketplace add chrisbanes/skills --ref main
codex plugin add chrisbanes-skills@chrisbanes-skills
```

A fresh install provides `compose-state-and-effects`, `compose-performance`, `compose-component-design`, `kotlin-concurrency-and-flow`, `kotlin-api-design`, `kotlin-control-flow`, `gradle-run`, plus `compose-animations`, `compose-focus-navigation`, `compose-ui-testing-patterns`. `/setup-stuc` probes those names and fails closed if they are missing.

3. Android CLI + Google skills:

```
# binary: https://developer.android.com/tools/agents/android-cli/download
android init
android skills add --all
```

Codex: `android skills add --agent=codex --all`.

4. Run `/setup-stuc`. It writes the model rule and **doctors** upstreams: `which android` / `android -V`, official `android-cli` skill, installed chrisbanes router `using-chrisbanes-skills`, chrisbanes `compose-state-and-effects`, android/skills `edge-to-edge`. If any of those are missing, the stack is not ready. Doctoring the binary is not a device proof.

Cursor `plugin.json` has no `dependencies` field. Claude Code declares `chrisbanes-skills` and `android-skills`. Cross-marketplace resolve may require installing those two first.

## Use

`/stuc-mode` for non-trivial work. Compose/Kotlin design goes through `stuc-chrisbanes`, then the installed chrisbanes router `using-chrisbanes-skills`, then **cluster names**. Google workflows route to android/skills **leaf names**. Device proof is `/android-verify` (Gradle assemble, then the `android` binary). Gradle execution uses the installed chrisbanes `gradle-run` skill, not a copy in this plugin.

Opinionated overlays come from the author’s Android/Kotlin work, restated without a particular product’s module graph. Follow the repo in front of you.

## Differences vs pstack

Catalog, roles, and generic engineering behavior match pstack. Examples and Android overlays differ. This is not a parallel methodology.

### Major

- **Android/Kotlin surface.** Playbooks that said “matching surface” / Playwright / `control-ui` default to `android-verify` + the official `android-cli` skill when the repo is an Android app. Gradle still builds; `android run` only deploys prebuilt APKs.
- **Same generic engineering machine, Android examples.** `how`, `why`, `unslop`, `architect`, `tdd`, `arena`, `eval`, playbooks, `create-verification-skill` / `maintain-verification-skill` keep pstack structure, triggers, and rules. TypeScript / Linear / `retry.ts` illustrations are Gradle / Compose / `android` CLI / Jira-or-GitHub. `architect` still runs on function-boundary crossing (arena, `not implemented` bodies, design-it-twice). Copy-the-last-screen / smallest-diff may skip with `architect skipped: …` — a thin exception, not a rewrite of architect.
- **TypeScript pack dropped.** There is no `typescript-best-practices/`. Kotlin type/API discipline is `kotlin-best-practices` plus chrisbanes Kotlin clusters by **name**.
- **Android glue (this plugin only).** `android-verify` (Drive loop), `kotlin-best-practices` (replacement for typescript-best-practices), `stuc-chrisbanes` (not named `using-chrisbanes-skills`), `using-android-skills`. Project-local `verify-<app>` skills are generated into the consuming repo with an Android feature map. `gradle-run` and `kotlin-control-flow` are **not** shipped here; they are chrisbanes skills on HEAD.
- **Upstreams referenced, not vendored.** `stuc-chrisbanes` (install / fail closed / when) plus the installed chrisbanes router `using-chrisbanes-skills`, and `using-android-skills`, route to current **names** and fail closed. Manifest `skills:` / `agents:` paths stay inside this directory. Official `android-cli` is named, never pasted.
- **Verification contract.** Do not claim device/screenshot coverage that was not run. Name Gradle tasks, `android` commands, and devices. One device serial per run (`principle-separate-before-serializing-shared-state`).
- **Multi-agent packaging.** pstack ships Cursor (`.cursor-plugin/`) only. This directory also has `.claude-plugin/` (with `dependencies`) and `.codex-plugin/` pointing at the same `skills/` tree.

### Minor

- **Renames.** `poteto-mode` → `stuc-mode`; `setup-pstack` → `setup-stuc` (writes `~/.cursor/rules/stuc-stack-models.mdc`); `poteto-agent` → `stuc-agent`.
- **Catalog vs pstack (names/purposes).** Kept: `how`, `why`, `unslop`, `architect`, `arena`, `eval`, `tdd`, `swarm`, `interrogate`, `create-verification-skill`, `maintain-verification-skill`, the 21 `principle-*` leaves, playbooks including babysit. Renamed: `poteto-mode` → `stuc-mode`, `setup-pstack` → `setup-stuc`, `typescript-best-practices` → `kotlin-best-practices`. Dropped: Benny automations. Added (Android glue only): `android-verify`, `stuc-chrisbanes`, `using-android-skills`.
- **No Benny.** `automations/benny/` is not in this tree.
- **Glue skill names.** `stuc-chrisbanes`, `using-android-skills`, `android-verify`, `kotlin-best-practices`. Cluster routing is the installed chrisbanes skill `using-chrisbanes-skills`. Chrisbanes owns `gradle-run` / `kotlin-control-flow` / Compose and Kotlin clusters.
- **Cursor vs Claude deps.** Cursor cannot declare plugin dependencies; enablement is `.cursor/settings.json` plus skill-name fail-closed plus the local symlink. Claude Code lists `chrisbanes-skills` and `android-skills`. Codex has no plugin deps; `AGENTS.md` requires the same upstreams.
- **Guide filename.** `docs/guide/02-stuc-mode.md` (not `02-poteto-mode.md`).
- **No pstack guide art.** Copied `docs/guide/images/*.jpg` were deleted; markdown image embeds were removed.
- **Playbook git paths.** Trunk re-reads use `plugins/stuc-stack/skills/...`, not a `pstack/` prefix.
- **Not in this plugin:** chrisbanes workflow extras (`to-plan`, `shepherd`, `implement-with-subagents`, `run-github-project`, `grounded-writing`) stay upstream. Install via `npx skills add chrisbanes/skills`. Local `~/.agents/skills/` (or this repo’s gitignored `.agents/skills/`) is the install location, not a vendor tree.
