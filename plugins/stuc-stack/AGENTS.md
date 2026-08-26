# stuc-stack

Enable this plugin, then install upstreams. Do not copy those trees into git.

Required:

- `npx skills add chrisbanes/skills`
- `android init` and `android skills add --all`
- `android` on PATH (https://developer.android.com/tools/agents/android-cli)

Cursor has no plugin-to-plugin dependencies. Claude Code can declare `chrisbanes-skills` and `android-skills`.

Entry: `/stuc-mode` (or the `stuc-mode` skill). Verification of Android UI: `android-verify`. Setup/doctor: `setup-stuc`.

The human is the git author. Never add `Co-authored-by`. (P27) Rebase only with explicit permission. (P26)
