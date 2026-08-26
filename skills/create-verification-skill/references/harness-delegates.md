# Harness delegates (project-local stuc-stack skills)

Canonical skill + feature map live under `docs/`, which every agent can read. Harness-specific skill folders only **register** the skill so `/verify-<app>` works. They do not own Launch/Doctor/Drive.

## Canonical path

```text
docs/verify-<app>/SKILL.md
docs/verify-<app>/features/
```

Frontmatter on the canonical skill **must** include `stuc-stack: true` so `/setup-stuc` can tell these apart from chrisbanes, android/skills, or anything else.

## Delegate path (current harness only, unless that dir already exists)

| Harness | Delegate file |
|---|---|
| Cursor | `.cursor/skills/verify-<app>/SKILL.md` |
| Claude Code | `.claude/skills/verify-<app>/SKILL.md` |
| Codex | `.codex/skills/verify-<app>/SKILL.md` |

Do **not** write delegates into `.agents/skills/`. That directory is the upstream **install** location (`npx skills add`, Codex plugin cache) and must not mix with project-local skills.

If the project already has `.cursor/`, `.claude/`, or `.codex/` as a skills host, keep those delegates in sync. Do not create a second harness tree just in case.

## Delegate body

Copy `name`, `description`, and `disable-model-invocation` from the canonical skill. Add `stuc-stack: true`. Body is only a pointer:

```markdown
# verify-<app>

Harness delegate. Source of truth is `docs/verify-<app>/SKILL.md` and `docs/verify-<app>/features/`.
Read those files and follow them. If this file and the docs skill disagree, the docs skill wins.
```

Sample: [`harness-delegate.SKILL.md`](verify-notes-example/harness-delegate.SKILL.md).

## What `/setup-stuc` may associate

Only project files with `stuc-stack: true` (today: `docs/verify-*/SKILL.md`). Never copy or symlink chrisbanes clusters, android/skills leaves, `android-cli`, or personal `*-mode` skills into harness folders.

## Migration

If `.cursor/skills/verify-<app>/` (or another harness dir) is a **full** skill (Launch/Doctor/Drive sections, not a pointer to `docs/`), move `SKILL.md` + `features/` to `docs/verify-<app>/`, add `stuc-stack: true`, then replace the old directory with a delegate.
