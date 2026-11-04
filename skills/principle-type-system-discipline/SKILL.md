---
name: principle-type-system-discipline
description: "Apply when designing types, reviewing a function signature, or writing code in any statically-typed language. Make illegal states unrepresentable, brand semantic primitives, parse external data at boundaries, exhaust variants, derive from authoritative schemas."
disable-model-invocation: true
---

# Type System Discipline

Make the compiler reject impossible states, mismatched primitives, and unhandled variants. Prefer defining errors and special cases out of existence over proliferating handlers. For Kotlin syntax, see chrisbanes `kotlin-api-design` and the **kotlin-best-practices** skill.

- **Make illegal states unrepresentable.** Model variants as sum types (sealed classes and sealed interfaces in Kotlin), not a bag of optional fields where contradictory combinations compile. `isComplete: Boolean` plus `completedAt: Instant?` admits `isComplete == true && completedAt == null`. Derive the boolean from `completedAt != null`, or model the variants:

  ```kotlin
  sealed interface Work {
      data object Open : Work
      data class Done(val at: Instant) : Work
  }
  ```
- **Exhaustive matching is the compiler's job.** `when` on a sealed type with no `else`, so a new variant fails compilation until handled. Casts, `as`, and `!!` bypass the compiler. Prove the fact (validate, narrow, refine the model) instead.
- **Brand semantic primitives.** `UserId` and `OrderId` are strings underneath but should not be interchangeable. Give each its own type, such as a `@JvmInline value class` in Kotlin or a newtype elsewhere. Validate once at creation, trust the type downstream. If two arguments share a primitive type but mean different things, brand them.
- **External data is untyped until parsed.** RPC payloads, JSON, IPC messages, CLI args, config files, environment variables, database rows. Have a parse function at every boundary that turns unstructured input into the typed model. The **boundary-discipline** principle skill says where to put validation.
- **Derive types from authoritative schemas.** When a protocol buffer, OpenAPI spec, GraphQL schema, database migration, design-token file, or another file owns a shape, derive from it instead of hand-rolling a parallel type. See the **encode-lessons-in-structure** principle skill.
