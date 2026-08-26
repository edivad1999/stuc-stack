# stuc-stack

Enable this plugin, then install upstreams. Do not copy those trees into git. `.agents/skills/` (if present in a host repo) is an install location and must stay gitignored.

Required:

```
npx skills add chrisbanes/skills
android init
android skills add --all
```

Put `android` on PATH (https://developer.android.com/tools/agents/android-cli).

Cursor has no plugin-to-plugin dependencies. Local load: symlink this directory to `~/.cursor/plugins/local/stuc-stack`. Claude Code can declare `chrisbanes-skills` and `android-skills`. Codex:

```
codex plugin marketplace add chrisbanes/skills --ref main
codex plugin add chrisbanes-skills@chrisbanes-skills
android skills add --agent=codex --all
```

chrisbanes HEAD clusters include `compose-state-and-effects`, `compose-performance`, `compose-component-design`, `kotlin-concurrency-and-flow`, `kotlin-api-design`, `kotlin-control-flow`, `gradle-run`. This plugin's glue is `stuc-chrisbanes` (require install, fail closed, when). Leaf/cluster routing is the installed chrisbanes skill `using-chrisbanes-skills`. `/setup-stuc` fails closed if `compose-state-and-effects` or that installed router does not resolve.

Entry: `/stuc-mode` (or the `stuc-mode` skill). Verification of Android UI: `android-verify`. Setup/doctor: `setup-stuc`.

The human is the git author. Never add `Co-authored-by`. (P27) Rebase only with explicit permission. (P26)
