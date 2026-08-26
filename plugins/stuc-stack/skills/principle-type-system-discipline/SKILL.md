---
name: principle-type-system-discipline
description: "Apply when designing types, reviewing a function signature, or writing code in any statically-typed language. Make illegal states unrepresentable, brand semantic primitives, parse external data at boundaries, refuse to lie to the compiler, exhaust variants, derive from authoritative schemas."
disable-model-invocation: true
---

# Type System Discipline

The type checker is a proof assistant. Use it to eliminate impossible states, mismatched primitives, and unhandled variants at compile time. A case the types let you ignore becomes a runtime failure the compiler could have stopped. Prefer defining errors and special cases out of existence over proliferating handlers.

Kotlin syntax and value-class / expect-actual rules are chrisbanes `kotlin-api-design` (load via **kotlin-best-practices** / **using-chrisbanes-skills**). App/data, JSON stack, and handler-name overlays live in **kotlin-best-practices**, not here.

**The patterns:**

- **Make illegal states unrepresentable.** Model variants as sum types. In Kotlin: a `sealed class` / `sealed interface` with data-carrying subtypes, not a bag of nullable fields. Don't model state as `isComplete: Boolean` plus `completedAt: Instant?` where `isComplete == true && completedAt == null` compiles. Derive the boolean from a single source, or write:

  ```kotlin
  sealed interface Work {
      data object Open : Work
      data class Done(val at: Instant) : Work
  }
  ```

  Exhaust with `when (work) { is Work.Open -> ...; is Work.Done -> ... }` and no `else` on a sealed type. If a bug forces "wait, can this combination actually happen?", the type is too loose.

- **Types are constructions, not restrictions.** Build the type up from the values you want instead of carving them out of a looser type with checks. A non-empty list is a head plus a rest, not a list with a length check. A valid time range is a start plus a duration, not two timestamps you must keep ordered.

- **Brand semantic primitives.** `UserId` and `OrderId` are strings underneath but should not be interchangeable. In Kotlin, `@JvmInline value class` (see `kotlin-api-design`). Validate once at creation, trust the type downstream.

- **External data is untyped until parsed.** RPC payloads, JSON, IPC messages, CLI args, config files, environment variables, database rows. Have a parse function at every boundary that turns unstructured input into the typed model. See the **boundary-discipline** principle skill for where to put validation.

- **Don't lie to the type system.** Casts, `as`, `!!`, and assertion functions that bypass the compiler are runtime crashes waiting to happen. If the compiler can't prove a fact, prove it (validate, narrow, refine the model) or accept that the cast is a hazard.

- **Exhaustive matching is the compiler's job.** When you match on a sealed type, the compiler must fail compilation if a new variant is added without handling. Kotlin: `when` on a sealed type with no `else`. Load chrisbanes `kotlin-control-flow` for `when` shape.

- **Derive types from authoritative schemas.** When an OpenAPI spec, protocol buffer, GraphQL schema, database migration, or design-system token file defines a shape, derive from it instead of hand-rolling a parallel type. Manual duplication drifts. Product specs beat invented UX. See the **encode-lessons-in-structure** principle skill.

- **Strengthen a type only where partiality appears.** A runtime assertion, null check, or "this should never happen" throw marks the place a type is too weak. Push that check up into the type. Then stop. Prefer total functions. Extra precision costs reuse and ceremony and buys no safety.

**The tests:**

- "Can I write a comment explaining when this combination of fields is valid?" If yes, the type is too loose. Split it into a sealed type.
- "Do two of my function arguments share a primitive type but mean different things?" Brand them.
- "Where did this `as`, this `!!`, this `checkNotNull` come from?" Trace it to the boundary and validate there instead.
- "If a new variant is added next month, will the compiler tell the next agent where to add a case?" If no, the `when` isn't exhaustive.
- "Is this type duplicating a shape another file owns?" Derive instead.
- "Am I strengthening this type to keep an operation total, or just to be more precise?" If nothing would otherwise panic, keep the plain type.
