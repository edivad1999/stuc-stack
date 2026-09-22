---
name: setup-stuc
description: >-
  Configure stuc-stack models per role and at what reasoning budget, doctor
  upstream installs (chrisbanes, android/skills, android CLI), and associate
  project-local stuc-stack verify skills with this harness. Use for /setup-stuc,
  "configure stuc-stack models", "stuc budget", or checking whether the stack
  is ready.
---

# Setup stuc-stack

Write `~/.cursor/rules/stuc-stack-models.mdc`, an always-applied rule that sets models per role. Skills read it and fall back to inline defaults when a line is absent.

This skill also **doctors upstreams**. Cursor `plugin.json` has no `dependencies` field. chrisbanes and android/skills are not in this plugin tree. If they or `android` are missing, print install commands and **do not claim the stack is ready**. (P29)

Harness association for project-local **stuc-stack** skills (verify skills under `docs/verify-*/`) is [`create-verification-skill/references/harness-delegates.md`](../create-verification-skill/references/harness-delegates.md). Associate those only. Never copy chrisbanes, android/skills, or `android-cli` into `.cursor/skills`, `.claude/skills`, or `.codex/skills`.

## Steps

### 0. Doctor upstreams (required)

Check, do not vendor:

| Need | How to check | If missing, print |
|---|---|---|
| `android` binary | `which android` and `android -V` (binary exists; this is not a device proof) | https://developer.android.com/tools/agents/android-cli/download |
| Official `android-cli` skill | skill name `android-cli` resolves (not a file under this plugin) | `android init` |
| chrisbanes HEAD clusters + router | Installed `using-chrisbanes-skills` resolves **outside this plugin** (chrisbanes HEAD router). `compose-state-and-effects` resolves the same way. This plugin's glue is `stuc-chrisbanes`; do not count a same-named file under this plugin as the router. Also probe `kotlin-api-design`, `kotlin-control-flow`, `gradle-run` if those tasks are in scope. Do **not** probe removed leaves such as `compose-state-authoring`. | `npx skills add chrisbanes/skills` (plus host-specific install below) |
| android/skills leaves | `edge-to-edge` resolves | `android init` then `android skills add --all` (Codex: `android skills add --agent=codex --all`) |

Host-specific chrisbanes and android/skills install if `npx skills add` / `android skills add` is not how this agent loads skills. On Claude Code, add these marketplaces and install these plugins **before** stuc-stack. Bare names would resolve as `…@stuc-stack`; do not install chrisbanes or android from this marketplace.

```
# Claude Code
/plugin marketplace add chrisbanes/skills
/plugin install chrisbanes-skills@chrisbanes-skills
/plugin marketplace add android/skills
/plugin install android-skills@android-skills

# Codex
codex plugin marketplace add chrisbanes/skills --ref main
codex plugin add chrisbanes-skills@chrisbanes-skills
```

Fail closed on missing **current** names. If `compose-state-authoring` is absent but `compose-state-and-effects` is present, that install is healthy. If `compose-state-and-effects` is absent, the stack is **not ready** even if old cache leaves exist.

Optional Cursor settings in the **consuming** project (not a substitute for skills.sh):

```json
{
  "plugins": {
    "stuc-stack": { "enabled": true }
  }
}
```

Do not instruct `plugins.chrisbanes-skills.enabled` until chrisbanes ships `.cursor-plugin/`.

If any required row fails, say the stack is **not ready**. Continue with model setup if the user wants it anyway.

### 0b. Doctor Artemis (optional explorer)

Not required for stack-ready. Required before any playbook step that loads **stuc-artemis**.

Check, do not vendor:

| Need | How to check | If missing, print |
|---|---|---|
| Artemis MCP | This session exposes `mobile_run_task`, or `uv run artemis --help` exits 0 | Clone https://github.com/google/artemis **outside this plugin**, then `uv run artemis mcp --install cursor` (or `--install all`). Do not copy that tree into git. |

If missing, say exploration is unavailable. Do not claim the stack is not ready for that reason alone.

### 1. Detect available models

Enumerate the model slugs you can pass to a `Task` subagent in this session. If you cannot detect any, ask the user to paste the slugs they have access to. Never write a real slug you have not confirmed is available. The aliases `inherit-parent` and `auto` are always valid.

### 2. Load current state

The default role-to-model mapping is the rule shape shown in step 5. If `~/.cursor/rules/stuc-stack-models.mdc` already exists, read it and treat its `# budget` line and its role values as the current choices. Otherwise start from those defaults.

### 3. Budget, map, and confirm

**(a) Ask for a budget.** Prefer AskQuestion over free text. Offer these four options with these exact labels, and name the current budget when the rule records one.

- `unlimited — keep max`
- `large — xhigh reasoning`
- `medium — high reasoning`
- `small — medium reasoning`

**(b) Apply it.** Build the working table from the skill defaults, and on a re-run keep any role you changed by family, list, or alias (`inherit-parent`, `auto`). `unlimited` leaves every effort as in that table. `large`, `medium`, and `small` set the effort token of every real slug, panel entries included, to `xhigh`, `high`, or `medium`. The effort token is the last token, or the one before a trailing `fast`, on the ladder `max` > `xhigh` > `high` > `medium` > `low`. If the result is not a detected slug, use the same family's detected slug with the highest effort at or below the target, else mark the role as needing a choice. `inherit-parent` and `auto` do not change. So `small` turns `claude-fable-5-1-thinking-max` into `claude-fable-5-1-thinking-medium`, and `grok-4.6-fast-xhigh` into `cursor-grok-4.6-medium-fast` when only that form is detected.

**(c) Show the roles and confirm.** Show every role with its model, marking any real slug not in the detected set as needing a choice. Ask whether to accept as-is or change specific roles, offering the detected models plus `inherit-parent` and `auto` (both mean this role runs on the parent chat model) as the options. Prefer AskQuestion. Panel roles (arena runners, architect runners, interrogate reviewers) are lists. List length sets fan-out. `arena cross-judge pool` is a list. Arena picks one whose family differs from the parent when possible. `swarm workers` is the default model for every worker unless a race assigns another model per arm.

### 4. Validate

Every real slug written must be in the detected set. `inherit-parent` and `auto` always pass. If a chosen real slug is not available, stop and ask again.

### 5. Write the rule

Write `~/.cursor/rules/stuc-stack-models.mdc` with `alwaysApply: true`, a `# budget` line with the chosen label and its target effort, and one line per role. Overwrite the whole file so re-runs stay idempotent. Shape:

```
---
description: stuc-stack per-role model choices (overrides skill defaults)
alwaysApply: true
---
# stuc-stack model configuration. One line per role. Delete a line to fall back to the skill default.
# `inherit-parent` or `auto` as a value: the role runs on the parent chat model (omit Task `model`). Alias entries in a panel list still count toward its fan-out.
# budget: unlimited (max)
feature, refactoring: grok-4.6-fast-xhigh
bug-fix: grok-4.6-fast-xhigh
perf-issue: grok-4.6-fast-xhigh
hillclimb: grok-4.6-fast-xhigh
judgment and prose: claude-fable-5-1-thinking-max
hardest tasks: claude-fable-5-1-thinking-max
how explorer: grok-4.6-fast-xhigh
how explainer: claude-fable-5-1-thinking-max
why investigators: grok-4.6-fast-xhigh
why synthesizer: claude-fable-5-1-thinking-max
reflect tooling: gpt-5.6-sol-max
reflect judgment, divergent, synthesizer: claude-fable-5-1-thinking-max
arena runners: claude-fable-5-1-thinking-max, gpt-5.6-sol-max, grok-4.6-fast-xhigh, claude-opus-5-thinking-xhigh
arena cross-judge pool: claude-fable-5-1-thinking-max, gpt-5.6-sol-max, grok-4.6-fast-xhigh, claude-opus-5-thinking-xhigh
swarm workers: grok-4.6-fast-xhigh
architect runners: claude-fable-5-1-thinking-max, gpt-5.6-sol-max, grok-4.6-fast-xhigh, claude-opus-5-thinking-xhigh
interrogate reviewers: claude-fable-5-1-thinking-max, gpt-5.6-sol-max, grok-4.6-fast-xhigh, claude-opus-5-thinking-xhigh
```

Use only slugs confirmed in step 1. If a default slug is not in the detected set, ask before writing it.

### 6. Associate stuc-stack project skills with this harness

Project-local stuc-stack skills live in `docs/` (canonical) plus a thin harness delegate. Do this every `/setup-stuc` run so a repo opened in a new agent still gets `/verify-<app>`.

1. Detect the current harness: Cursor → `.cursor/skills/`; Claude Code → `.claude/skills/`; Codex → `.codex/skills/`. If unsure, ask. Do **not** use `.agents/skills/` (upstream install cache).
2. Find canonical skills: `docs/verify-*/SKILL.md` whose frontmatter has `stuc-stack: true`. Ignore every other SKILL.md (chrisbanes, android/skills, personal `*-mode`, plugin skills).
3. For each, if the current-harness delegate is missing or is still a full copy of the skill, write or replace it with the thin pointer in `harness-delegates.md`. Keep `name` / `description` in sync with docs.
4. If a **full** `verify-*` skill still lives only under `.cursor/skills/` (or `.claude` / `.codex`) and `docs/verify-*` is missing, migrate it to `docs/` first, then write the delegate.
5. If other harness skill dirs already exist in this repo, refresh those delegates too. Do not create `.claude/` or `.codex/` from scratch unless this session is that harness.
6. Report what was associated. Do not claim chrisbanes skills were "installed" into the project.

### 7. Confirm

Tell the user the rule was written, whether required upstreams are ready, whether Artemis MCP is available for **stuc-artemis**, which stuc-stack project skills were associated with this harness, and that the model rule applies to new sessions.

### 8. Offer a verification skill (optional)

If the project has no `docs/verify-*` skill, offer once to generate one with `/create-verification-skill`. Android apps should Drive through **android-verify** and a `features/` map. Sample shape: `create-verification-skill/references/verify-notes-example/`.
