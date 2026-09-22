# stuc-stack

This repository is the plugin. Skills, agents, and Cursor/Claude/Codex manifests live at the repo root. Consumers install from the public GitHub repo; commands are in `README.md` (Install).

Install upstreams, then enable this plugin. Do not copy those trees into git. `.agents/skills/` is an install location and must stay gitignored.

Required:

```
npx skills add chrisbanes/skills
android init
android skills add --all
```

Put `android` on PATH (https://developer.android.com/tools/agents/android-cli).

Cursor has no plugin-to-plugin dependencies. `.cursor/settings.json` enables `stuc-stack`. Local load: symlink this directory to `~/.cursor/plugins/local/stuc-stack`. Claude Code: add `chrisbanes/skills` and `android/skills` first, then this marketplace; `dependencies` are `chrisbanes-skills@chrisbanes-skills` and `android-skills@android-skills` (not `@stuc-stack`). Codex: `.agents/plugins/marketplace.json` points at `.`.

```
codex plugin marketplace add chrisbanes/skills --ref main
codex plugin add chrisbanes-skills@chrisbanes-skills
android skills add --agent=codex --all
```

chrisbanes HEAD clusters include `compose-state-and-effects`, `compose-performance`, `compose-component-design`, `kotlin-concurrency-and-flow`, `kotlin-api-design`, `kotlin-control-flow`, `gradle-run`. This plugin's glue is `stuc-chrisbanes` (require install, fail closed, when). Leaf/cluster routing is the installed chrisbanes skill `using-chrisbanes-skills`. `/setup-stuc` fails closed if `compose-state-and-effects` or that installed router does not resolve.

Unknown-path device exploration is `stuc-artemis` (Google ARTEMIS MCP, installed separately, fail closed for that step). Do not copy https://github.com/google/artemis into git. Device proof stays `android-verify`. `/setup-stuc` doctors Artemis as optional. Missing MCP does not make the stack not ready.

Entry: `/stuc-mode` (or the `stuc-mode` skill). Verification of Android UI: `android-verify`. Setup/doctor: `setup-stuc`. Exploration: `stuc-artemis`.

The human is the git author. Never add `Co-authored-by`. (P27) Rebase only with explicit permission. (P26)
