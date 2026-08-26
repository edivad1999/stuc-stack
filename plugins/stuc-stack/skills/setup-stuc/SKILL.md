---
name: setup-stuc
description: >-
  Configure stuc-stack models per role and doctor upstream installs (chrisbanes,
  android/skills, android CLI). Use for /setup-stuc, "configure stuc-stack
  models", or checking whether the stack is ready.
---

# Setup stuc-stack

Write `~/.cursor/rules/stuc-stack-models.mdc`, an always-applied rule that sets models per role. Skills read it and fall back to inline defaults when a line is absent.

This skill also **doctors upstreams**. Cursor `plugin.json` has no `dependencies` field. chrisbanes and android/skills are not in this plugin tree. If they or `android` are missing, print install commands and **do not claim the stack is ready**. (P29)

## Steps

### 0. Doctor upstreams (required)

Check, do not vendor:

| Need | How to check | If missing, print |
|---|---|---|
| `android` binary | `which android` / `android -V` | https://developer.android.com/tools/agents/android-cli/download |
| Official `android-cli` skill | skill name resolves (not a file under this plugin) | `android init` |
| chrisbanes leaves | e.g. `compose-state-authoring` resolves | `npx skills add chrisbanes/skills` and Claude marketplace install if they use Claude |
| android/skills leaves | e.g. `edge-to-edge` resolves | `android skills add --all` |

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

### 1. Detect available models

Enumerate the model slugs you can pass to a `Task` subagent in this session. If you cannot detect any, ask the user to paste the slugs they have access to. Never write a real slug you have not confirmed is available. The aliases `inherit-parent` and `auto` are always valid.

### 2. Load current state

If `~/.cursor/rules/stuc-stack-models.mdc` already exists, read it. Otherwise start from the defaults in step 5.

### 3. Map and confirm

Show every role with its current model, marking any real slug not in the detected set as needing a choice. Ask whether to accept as-is or change specific roles. Prefer AskQuestion. Panel roles are lists; list length sets fan-out. `arena cross-judge pool` is a list; Arena picks one whose family differs from the parent when possible.

### 4. Validate

Every real slug written must be in the detected set; `inherit-parent` and `auto` always pass.

### 5. Write the rule

Write `~/.cursor/rules/stuc-stack-models.mdc` with `alwaysApply: true`. Overwrite the whole file so re-runs stay idempotent. Shape:

```
---
description: stuc-stack per-role model choices (overrides skill defaults)
alwaysApply: true
---
# stuc-stack model configuration. One line per role. Delete a line to fall back to the skill default.
# `inherit-parent` or `auto` as a value: the role runs on the parent chat model (omit Task `model`).
feature, refactoring: grok-4.6-fast-xhigh
bug-fix: gpt-5.6-sol-max
perf-issue: gpt-5.6-sol-max
hillclimb: gpt-5.6-sol-max
judgment and prose: claude-fable-5-thinking-max
hardest tasks: claude-fable-5-thinking-max
how explorer: grok-4.6-fast-xhigh
how explainer: claude-fable-5-thinking-max
how critics: claude-fable-5-thinking-max, gpt-5.6-sol-max, grok-4.6-fast-xhigh, claude-opus-5-thinking-xhigh
why investigators: grok-4.6-fast-xhigh
why synthesizer: claude-fable-5-thinking-max
reflect tooling: gpt-5.6-sol-max
reflect judgment, divergent, synthesizer: claude-fable-5-thinking-max
arena runners: claude-fable-5-thinking-max, gpt-5.6-sol-max, grok-4.6-fast-xhigh, claude-opus-5-thinking-xhigh
arena cross-judge pool: claude-fable-5-thinking-max, gpt-5.6-sol-max, grok-4.6-fast-xhigh, claude-opus-5-thinking-xhigh
swarm workers: grok-4.6-fast-xhigh
architect runners: claude-fable-5-thinking-max, gpt-5.6-sol-max, grok-4.6-fast-xhigh, claude-opus-5-thinking-xhigh
interrogate reviewers: claude-fable-5-thinking-max, gpt-5.6-sol-max, grok-4.6-fast-xhigh, claude-opus-5-thinking-xhigh
```

Use only slugs confirmed in step 1. If a default slug is not in the detected set, ask before writing it.

### 6. Confirm

Tell the user the rule was written, whether upstreams are ready, and that the model rule applies to new sessions.

### 7. Offer a verification skill (optional)

If the project has no `verify-*` skill, offer once to generate one with `/create-verification-skill`. Android apps should Drive through **android-verify**.
