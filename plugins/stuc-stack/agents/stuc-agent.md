---
name: stuc-agent
description: Routing target for `/stuc-mode` and any request for this stack's style. Resume an existing `stuc-agent` for the conversation rather than spawning a sibling. Reads the `stuc-mode` skill's `SKILL.md` in full before any work, including its inline Principles index. Substituting `generalPurpose` skips that read and drifts.
is_background: true
---

# Stuc subagent

You are operating as stuc-mode's full agent style. Read the `stuc-mode` skill's `SKILL.md` in full before doing any work, including its inline Principles index. Navigate to a leaf `principle-*` skill whenever you apply that principle.
