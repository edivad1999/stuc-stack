# Set up stuc-stack

Install upstreams first, then this plugin, pick models, then run a first task. `/setup-stuc` refuses to call the stack ready if chrisbanes, android/skills, or `android` is missing.

## Install upstreams (not this git tree)

```text
npx skills add chrisbanes/skills
android init
android skills add --all
```

Codex extras: `codex plugin marketplace add chrisbanes/skills --ref main` then `codex plugin add chrisbanes-skills@chrisbanes-skills`; `android skills add --agent=codex --all`.

Binary: https://developer.android.com/tools/agents/android-cli/download

Claude Code `dependencies` are `chrisbanes-skills@chrisbanes-skills` and `android-skills@android-skills`. Install those two plugins **before** stuc-stack. `/setup-stuc` fails closed if they are missing.

## Install this plugin

Public repo: [edivad1999/stuc-stack](https://github.com/edivad1999/stuc-stack). Commands and Cursor caveats live in the [README Install](../../README.md#install) section. Short form:

Cursor is **not** on the [Cursor Marketplace](https://cursor.com/marketplace). Closest GitHub path: `/add-plugin https://github.com/edivad1999/stuc-stack`. If that import stays stale or hidden, clone and load locally:

```text
git clone https://github.com/edivad1999/stuc-stack.git
cd stuc-stack
mkdir -p ~/.cursor/plugins/local
ln -sfn "$(pwd)" ~/.cursor/plugins/local/stuc-stack
```

Claude Code (upstreams first; those plugins are not in this marketplace):

```text
/plugin marketplace add chrisbanes/skills
/plugin install chrisbanes-skills@chrisbanes-skills
/plugin marketplace add android/skills
/plugin install android-skills@android-skills
/plugin marketplace add edivad1999/stuc-stack
/plugin install stuc-stack@stuc-stack
```

Codex:

```text
codex plugin marketplace add edivad1999/stuc-stack --ref main
codex plugin add stuc-stack@stuc-stack
```

Cursor has no `dependencies` field in `plugin.json`.

## Pick your models and doctor

```text
/setup-stuc
```

[`/setup-stuc`](../../skills/setup-stuc/SKILL.md) writes `~/.cursor/rules/stuc-stack-models.mdc` and checks that the installed chrisbanes router `using-chrisbanes-skills` (not this plugin's `stuc-chrisbanes` glue), `compose-state-and-effects`, `edge-to-edge`, the official `android-cli` skill, and the `android` binary resolve (`which android` / `android -V`). That doctor is not a device proof.

You only override what you care about. `inherit-parent` or `auto` means the subagent inherits the parent chat model.

## Accept the verification offer, or don't

If the project has no `verify-*` skill, setup offers [`/create-verification-skill`](../../skills/create-verification-skill/SKILL.md) once. For Android apps, generated Drive calls **android-verify** (Gradle assemble, then the `android` CLI). It does not copy the android-cli skill into the repo.

After setup, start a new chat. The model rule applies to new sessions.

## Run your first task

```text
/stuc-mode the snackbar never shows after save. fix it and prove it on a device.
```

Watch the todo list. First item is the Principles section (and `references/android-opinions.md` for architecture taste). Follow the repo in front of you; do not invent a module graph.

Next: [Route work through `/stuc-mode`](./02-stuc-mode.md).
