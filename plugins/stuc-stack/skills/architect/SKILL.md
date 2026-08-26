---
name: architect
description: >-
  Use for /architect, "architect this", or novel ownership/layering with no
  in-repo precedent. Do not use for copy-the-last-screen work, smallest-diff
  bug fixes, or a change that merely crosses a function boundary.
disable-model-invocation: true
---

# Architect

Design before implementing **only when the shape is actually unsettled**. Copy the last similar screen. Smallest diff. Extra layers need a demonstrated duplication problem. (P1, P8, P30)

## When to run

Run this skill when **any** of these is true:

- The user invoked `/architect` or asked to design the shape first.
- Ownership or layering is novel: no in-repo precedent, no last similar screen to copy, and the change would invent a new module or boundary.
- A written plan in the repo says to settle the shape before coding.

## When not to run

Do **not** run this skill when:

- The work is "copy the last screen" or "only migrate this viewholder."
- The change merely crosses a function or file boundary.
- The ticket is a small bug fix, rename, or local Compose tweak.
- You would only be baking off four models to feel thorough.

If a playbook listed architect and none of the "when to run" bullets apply, skip with `architect skipped: copy last similar screen` (or the real reason) and implement.

## Start

Open a todolist with one entry per phase you will actually run.

1. Ground
2. Sketch
3. Agree (opt-in)
4. Implement
5. Scrap

Skip Phase B arena unless two real alternatives compete (see below).

## Phase A: Ground the problem

Build a mental model of the systems the new code touches. Run the **how** skill over the relevant subsystems. Critique mode only if existing structure is the constraint.

Naming a file isn't grounding. Produce the traced model `how` prescribes. If the design redefines ownership or layering, also run the **why** skill on the existing shape so the rationale becomes a constraint, not a guess.

Skip Phase A only when the work is genuinely greenfield with no surrounding system to integrate.

## Phase B: Sketch

Default: **one** sketch that copies the last similar screen or module in this repo. Kotlin types, signatures, and Gradle module map. Caller's usage first. Prefer sealed classes and existing design-system composables over a new architecture. (P8, P9)

Do **not** require `not implemented` bodies as theater. A short type/signature sketch is enough when the rest copies an in-repo pattern.

Run the **arena** skill only when:

- The user asked to compare designs, or
- Two structurally different patterns already exist in this repo and the choice is load-bearing (new ownership, new module, irreversible layering).

Never a four-model bakeoff for a small change. Two candidates is the maximum unless the user asked for more. Whole-shape alternatives, not point fixes inside one shape. This is **exhaust-the-design-space** only for novel work with no precedent.

If you do run arena, pass `references/runner-prompt.md` as each runner's prompt. Each candidate produces a design package shaped per `references/rationale-template.md`. Use your configured architect runners only for those competing candidates (do not spawn four by default).

Screen every candidate against [`references/design-red-flags.md`](references/design-red-flags.md) before synthesis. Reject shallow modules, information leakage, and pass-through methods.

Prefer the design that matches this repo and hides complexity behind a smaller public surface. Do not invent a new Compose architecture per screen. (P8)

Pause and ask before picking a module-graph / extraction-shape / flavor-policy fork. Those are preference calls, not folklore. See `stuc-mode` autonomy and `references/android-opinions.md`.

## Phase C: Agree (opt-in)

Default: proceed to implementation with the sketch. No human checkpoint.

Opt in to a checkpoint when the invoker explicitly asks: "/architect with checkpoint," "stop and show me before implementing," or similar. Then surface the sketch and pause for sign-off.

If the human pushes back on the shape, treat that as Phase A evidence. Re-ground before writing more code.

## Phase D: Implement against the sketch

Fill in the sketch. The sketch is the contract. Deviations are signal: ask whether the sketch was wrong, the requirement was missed, or the implementation is overreaching. Surface it; don't bolt it on.

## Phase E: Scrap when the architecture is wrong

If implementation keeps producing friction the sketch can't absorb, throw the sketch out. Don't bolt fixes onto a wrong design, per the **redesign-from-first-principles** and **fix-root-causes** principle skills.

The signal is a *pattern*, not single instances. Tells:

- The same shape of workaround appearing repeatedly across unrelated code.
- Multiple unrelated edge cases that all need special-case branches.
- Types that need escape hatches to compile.
- Callers having to know the abstraction's internal rules to use it.

A few edge cases don't condemn an architecture. When you scrap:

1. Re-run the **how** skill over what's been built.
2. Redesign as if the new constraints had been day-one assumptions.
3. Subtract before adding. The new sketch should be smaller than the old one before it grows.
4. Return to Phase B. Still no four-model bakeoff unless the work is novel.

## Outputs

The caller's usage is written first and the type sketch derived from it. One file with new types and signatures for small changes; module map plus type definitions for larger work. The rationale ships alongside, shaped per `references/rationale-template.md`, including the usage sketch and (if arena ran) the synthesis decision.
