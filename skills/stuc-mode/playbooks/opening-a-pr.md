### Opening a PR

Invoked at the end of every other playbook.

**Worktree.** Interactive work stays in the main checkout on the current branch and never switches branches unasked. (P47) Autonomous runs the user launched work from a git worktree off main. Subagents inherit it. Multiple `Task` calls on the same branch each get their own worktree, or `git fetch && git reset --hard origin/<branch>` between them. Dirty branch with unrelated work: patch out, fresh worktree, apply. Snarled worktree: reset from main, redo minimally.

**Commits.** Commit liberally. Rebase into small, ordered commits before opening PRs **only with explicit permission**. (P26) The user is the author. Never add `Co-authored-by`. (P27) Each commit is a future PR: landable, ordered to tell the story. Amend when the fix belongs in a just-made commit. New commit when separable. Commit bodies don't restate the subject.

**PRs.** Run `/unslop` over the diff before commit (code slop and commit prose) and `/no-comments` before review. Do not call `/deslop` or `cursor-team-kit`. Write every PR title, description, and commit body with `/technical-writing` (every layer except Diátaxis, and apply the STE vocabulary rules: one word per action, keep articles, a plain verb over `-ing` where one works), then apply `/unslop`.

**Titles.** Conventional Commits `type(scope): subject`, no trailing period. Type such as `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, or `perf`. Scope is the area, such as `stuc-stack` or `stuc-mode`. Subject is short, imperative, and names a real symbol when one carries the change, for example `fix(stuc-stack): retarget opening-a-pr babysit trigger`.

**Descriptions.** The PR body is a one-minute briefing, not a lab notebook, for a reviewer who has the diff. It says why the change exists, what it leaves out, what it could break, and how you proved it works. Write short, simple sentences with few identifiers, no walls of text. The body becomes the squash commit body, so keep that commit under about 40 lines. Use `##` headings, not bold lead-ins, in this order, and drop a section with nothing to say:

- `## Why`: the problem and approach, 1–3 short sentences. No SHAs, rebase genealogy, or "based on main" preamble.
- `## What changed`: 1–3 short bullets. Name a real symbol or path only when it carries the change. Name both sides of a rename or retarget.
- `## Scope`: always. 1–3 short items on what it covers and what it deliberately leaves out (a follow-up, a known gap). No symbols, paths, or file-by-file essay.
- `## Tradeoffs`: only rejected alternatives a reviewer would otherwise ask about. Skip when there was no real choice.
- `## Blast Radius`: 1–2 sentences on who or what it touches and why that is safe or risky. If main is red, state the cost of leaving it red.
- `## Verification`: 1–3 bullets, each a real run path and its outcome. Name the real path (`android-verify`, a named Gradle task, `docs/verify-<app>/`). Do not claim checks that were not run. (P18) Perf: one primary number with its unit, `before → after`, and a link to the arena or swarm directory for the rest. No sample-size methodology, swarm recitals, or metric tables.

After the sections, attach videos or screenshots when they prove a claim. Full SHAs, swarm or arena lane recitals, lever-correction essays, file-by-file checklists, and "CLEAN" verdicts go in a linked artifact, not the body.

**Forge.** Detect the git host from remotes before the first PR operation and keep that choice for create, edit, view, watch, and merge. GitHub uses `gh`. GitLab uses `glab`. Use `origin pr ...` only if `command -v origin` succeeds and Origin resolves the repository. Use Graphite (`gt`) only if the repo already uses it. Never introduce it. Record any fallback.

**Built-in PR tool.** When the run provides a built-in PR tool, create, edit, retarget, and mark ready through it, never through a forge CLI. A CLI-made PR misses what the tool tracks. Use the resolved forge for everything the tool does not cover, and for every PR operation when the run has no such tool.

**Size and stacks.** Prefer five narrow PRs to one large PR. A stack is a base-branch chain. The root PR targets trunk. Each child branch sits on its parent's exact tip and its PR targets the parent branch. As a parent merges, move its child onto trunk per `playbooks/shipping.md` step 4. Without a built-in PR tool, per the resolved forge, create a child with `gh pr create --base <parent-branch>` or `glab mr create --target-branch <parent-branch>`, and retarget one with `gh pr edit <pr> --base <parent-branch>` or `glab mr update <mr> --target-branch <parent-branch>`. Branch from trunk only for independent work. Rebase on trunk only with explicit permission. (P26)

**Readiness.** Interactive work opens the PR or MR as a draft with no reviewers, unless the user says otherwise. (P49) An autonomous run the user launched to merge (autopilot, orchestrate, shipping) opens every PR ready, never as a draft. A built-in PR tool can default to draft, so set `draft: false` on every creation call through it in that case. With `gh` or `glab`, omit `--draft`. If a PR still opens as a draft, mark it ready through the PR tool, or run the host's ready command (`gh pr ready <number>`, `glab mr update <number> --ready`). Run `gh pr view <number>` or `glab mr view <number>` before you refer to PR status.

**Babysit.** Opening a PR does not start a babysit. Post the URL and keep building. Finish the phase or stack first. Run a separate babysit pass only when the user asks for one after the whole stack exists. A babysit for each new PR stalls the build and spends checks on commits later waves restart. Push back when feedback drifts from intent.

A subagent that opens a PR runs `/unslop` and `/no-comments`, and posts the URL. It returns to the parent without babysitting, unless it is an Autopilot-full or Autopilot-stack owner. That owner's brief assigns the babysit loop and is the ask `playbooks/babysit.md` waits for. The owner starts the loop after its code-ready report, reports merge-ready, and is exempt from the rules here and in `playbooks/babysit.md` that hold babysitting until a whole stack is built.
