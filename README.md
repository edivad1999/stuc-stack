# stuc-stack

Android/Kotlin agent skill stack: sticky `/stuc-mode`, named principles, playbooks, and a verification loop that drives the `android` CLI after Gradle assemble.

## Install

Public repo: [edivad1999/stuc-stack](https://github.com/edivad1999/stuc-stack). This tree does **not** vendor chrisbanes/skills, android/skills, or the android-cli skill. Install those upstreams **first**, then this plugin, then `/setup-stuc`.

Manifests in this repo: Cursor (`.cursor-plugin/`), Claude Code (`.claude-plugin/`), Codex (`.codex-plugin/`). No other agent manifests ship here.

### Required upstreams (not this git tree)

chrisbanes/skills ([skills.sh](https://skills.sh), HEAD clusters):

```
npx skills add chrisbanes/skills
```

Put the Android CLI on PATH ([download](https://developer.android.com/tools/agents/android-cli/download)), then:

```
android init
android skills add --all
```

Confirm with `which android` / `android -V`. Codex: `android skills add --agent=codex --all`.

A fresh chrisbanes install provides `compose-state-and-effects`, `compose-performance`, `compose-component-design`, `kotlin-concurrency-and-flow`, `kotlin-api-design`, `kotlin-control-flow`, `gradle-run`, plus `compose-animations`, `compose-focus-navigation`, `compose-ui-testing-patterns`. `/setup-stuc` probes those names and fails closed if they are missing.

Cursor `plugin.json` has no `dependencies` field. Claude Code still needs the two upstream plugins installed first (see Claude Code below).

Codex extras:

```
codex plugin marketplace add chrisbanes/skills --ref main
codex plugin add chrisbanes-skills@chrisbanes-skills
```

### Cursor

This plugin is **not** listed on the [Cursor Marketplace](https://cursor.com/marketplace). `/add-plugin stuc-stack` will not resolve until it is.

Cursor can import a public GitHub plugin as a personal marketplace:

```
/add-plugin https://github.com/edivad1999/stuc-stack
```

Turn on **Include third-party Plugins, Skills, and other configs**, then reload. That import can pin to the first-seen commit; if skills stay stale, use the local load below.

Official local load (clone + `~/.cursor/plugins/local`):

```
git clone https://github.com/edivad1999/stuc-stack.git
cd stuc-stack
mkdir -p ~/.cursor/plugins/local
ln -sfn "$(pwd)" ~/.cursor/plugins/local/stuc-stack
```

Then **Developer: Reload Window**. If the plugin stays hidden, enable third-party plugins in Settings.

Teams/Enterprise can also use **Dashboard → Plugins → Add Marketplace → Import from Repo** with the same GitHub URL.

### Claude Code

Add the upstream marketplaces and install those plugins **before** stuc-stack. Bare names would resolve as `…@stuc-stack`; chrisbanes and android are not in this marketplace.

```
/plugin marketplace add chrisbanes/skills
/plugin install chrisbanes-skills@chrisbanes-skills
/plugin marketplace add android/skills
/plugin install android-skills@android-skills
/plugin marketplace add edivad1999/stuc-stack
/plugin install stuc-stack@stuc-stack
```

Same from a shell:

```
claude plugin marketplace add chrisbanes/skills
claude plugin install chrisbanes-skills@chrisbanes-skills
claude plugin marketplace add android/skills
claude plugin install android-skills@android-skills
claude plugin marketplace add edivad1999/stuc-stack
claude plugin install stuc-stack@stuc-stack
```

This plugin's Claude `dependencies` are `chrisbanes-skills@chrisbanes-skills` and `android-skills@android-skills`. Cross-marketplace resolve needs those two marketplaces already added. `/setup-stuc` fails closed if the skills are missing.

### Codex

Add chrisbanes first (see Required upstreams), then:

```
codex plugin marketplace add edivad1999/stuc-stack --ref main
codex plugin add stuc-stack@stuc-stack
```

### Doctor

```
/setup-stuc
```

It writes the model rule, **doctors** upstreams, and **associates** `docs/verify-*` skills (`stuc-stack: true` only) with this harness via a thin delegate. Doctoring the binary is not a device proof.

## Credit

Tailored from the [pstack](https://github.com/cursor/plugins/tree/main/pstack) engineering stack (MIT, Lauren Tan). Copyright retained in `LICENSE`. Version here is `0.1.0`; it does not impersonate pstack `0.14.3`.

Project-local verification skill + feature-map **shape** follows [poteto/verification-skill-example](https://github.com/poteto/verification-skill-example) (fictional Atlas map). In this plugin that shape is Android: Gradle assemble, the `android` CLI, **android-verify**, no Node `check.sh`. Canonical files live in `docs/verify-<app>/`; Cursor/Claude/Codex only get a thin delegate. Sample: `skills/create-verification-skill/references/verify-notes-example/`.

## Use

`/stuc-mode` for non-trivial work. Compose/Kotlin design goes through `stuc-chrisbanes`, then the installed chrisbanes router `using-chrisbanes-skills`, then **cluster names**. Google workflows route to android/skills **leaf names**. Device proof is `/android-verify` (Gradle assemble, then the `android` binary). Gradle execution uses the installed chrisbanes `gradle-run` skill, not a copy in this plugin.

Opinionated overlays come from the author’s Android/Kotlin work, restated without a particular product’s module graph. Follow the repo in front of you.

## Differences vs pstack

Catalog, roles, and generic engineering behavior match pstack. Examples and Android overlays differ. This is not a parallel methodology.

### Major

- **Android/Kotlin surface.** Playbooks that said “matching surface” / Playwright / `control-ui` default to `android-verify` + the official `android-cli` skill when the repo is an Android app. Gradle still builds; `android run` only deploys prebuilt APKs.
- **Same generic engineering machine, Android examples.** `how`, `why`, `unslop`, `architect`, `tdd`, `arena`, `eval`, playbooks, `create-verification-skill` / `maintain-verification-skill` keep pstack structure, triggers, and rules. TypeScript / Linear / `retry.ts` illustrations are Gradle / Compose / `android` CLI / Jira-or-GitHub. `architect` still runs on function-boundary crossing (arena, `not implemented` bodies, design-it-twice). Copy-the-last-screen / smallest-diff may skip with `architect skipped: …` — a thin exception, not a rewrite of architect.
- **TypeScript pack dropped.** There is no `typescript-best-practices/`. Kotlin type/API discipline is `kotlin-best-practices` plus chrisbanes Kotlin clusters by **name**.
- **Android glue (this plugin only).** `android-verify` (Drive loop), `kotlin-best-practices` (replacement for typescript-best-practices), `stuc-chrisbanes` (not named `using-chrisbanes-skills`), `using-android-skills`. Project-local `verify-<app>` skills are generated into `docs/verify-<app>/` in the consuming repo (skill + feature map); harnesses get thin delegates. `gradle-run` and `kotlin-control-flow` are **not** shipped here; they are chrisbanes skills on HEAD.
- **Upstreams referenced, not vendored.** `stuc-chrisbanes` (install / fail closed / when) plus the installed chrisbanes router `using-chrisbanes-skills`, and `using-android-skills`, route to current **names** and fail closed. Manifest `skills:` / `agents:` paths stay inside this directory. Official `android-cli` is named, never pasted.
- **Verification contract.** Do not claim device/screenshot coverage that was not run. Name Gradle tasks, `android` commands, and devices. One device serial per run (`principle-separate-before-serializing-shared-state`).
- **Multi-agent packaging.** pstack ships Cursor (`.cursor-plugin/`) only. This directory also has `.claude-plugin/` (with `dependencies`) and `.codex-plugin/` pointing at the same `skills/` tree.

### Minor

- **Renames.** `poteto-mode` → `stuc-mode`; `setup-pstack` → `setup-stuc` (writes `~/.cursor/rules/stuc-stack-models.mdc`); `poteto-agent` → `stuc-agent`.
- **Catalog vs pstack (names/purposes).** Kept: `how`, `why`, `unslop`, `architect`, `arena`, `eval`, `tdd`, `swarm`, `interrogate`, `create-verification-skill`, `maintain-verification-skill`, the 21 `principle-*` leaves, playbooks including babysit. Renamed: `poteto-mode` → `stuc-mode`, `setup-pstack` → `setup-stuc`, `typescript-best-practices` → `kotlin-best-practices`. Dropped: Benny automations. Added (Android glue only): `android-verify`, `stuc-chrisbanes`, `using-android-skills`.
- **No Benny.** `automations/benny/` is not in this tree.
- **Glue skill names.** `stuc-chrisbanes`, `using-android-skills`, `android-verify`, `kotlin-best-practices`. Cluster routing is the installed chrisbanes skill `using-chrisbanes-skills`. Chrisbanes owns `gradle-run` / `kotlin-control-flow` / Compose and Kotlin clusters.
- **Cursor vs Claude deps.** Cursor cannot declare plugin dependencies and this plugin is not on the Cursor Marketplace. Enablement is Customize / `.cursor/settings.json` plus skill-name fail-closed. Load with `/add-plugin https://github.com/edivad1999/stuc-stack` or `~/.cursor/plugins/local`. Claude Code depends on `chrisbanes-skills@chrisbanes-skills` and `android-skills@android-skills` (upstream marketplaces, not this one). Codex has no plugin deps; add `edivad1999/stuc-stack` then `codex plugin add stuc-stack@stuc-stack`.
- **Guide filename.** `docs/guide/02-stuc-mode.md` (not `02-poteto-mode.md`).
- **No pstack guide art.** Copied `docs/guide/images/*.jpg` were deleted; markdown image embeds were removed.
- **Harness-agnostic verify skills.** Generated `verify-<app>` lives in `docs/verify-<app>/` (skill + `features/` map). `.cursor/skills`, `.claude/skills`, and `.codex/skills` only get a thin delegate. `/setup-stuc` associates `stuc-stack: true` skills with the current harness and does not copy chrisbanes or android/skills into the project.
- **Not in this plugin:** chrisbanes workflow extras (`to-plan`, `shepherd`, `implement-with-subagents`, `run-github-project`, `grounded-writing`) stay upstream. Install via `npx skills add chrisbanes/skills`. Local `~/.agents/skills/` (or this repo’s gitignored `.agents/skills/`) is the install location, not a vendor tree.
