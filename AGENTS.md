# Agent notes

This repository hosts the `stuc-stack` plugin at `plugins/stuc-stack/`.

- Cursor: `.cursor/settings.json` enables `stuc-stack`. Load the plugin from `~/.cursor/plugins/local/stuc-stack` (symlink) or reload after enabling third-party plugins.
- Claude Code: `.claude/settings.json` registers the local marketplace and enables `stuc-stack@stuc-stack`.
- Codex: `.agents/plugins/marketplace.json` points at `./plugins/stuc-stack`. See `plugins/stuc-stack/AGENTS.md`.

Requires chrisbanes/skills, android/skills, and `android` on PATH. Those trees are not in this git repo. `.agents/skills/` is gitignored (install location). Remaining enable steps: `.agents/stuc-stack-intake/design/install-status.md`.
