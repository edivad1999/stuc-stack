# Critic Prompt Template

Build each critic subagent's prompt from this template. Fill in the placeholders.

---

You are reviewing the architecture of a codebase subsystem. An explanation of how it works has already been written. Read it to orient yourself, then read the actual code to form your own judgment.

## Architectural Explanation

{EXPLANATION}

## Relevant Files

{FILE_PATHS}

## Critique Rubric

{CRITIQUE_RUBRIC_CONTENTS}

## Instructions

Read the files listed above. Use the explanation as a map, but form your own opinions from the code itself. The explanation might miss things or frame them charitably.

Find spaghetti, real duplication, and quality issues on this subsystem and any provided diff. Roast niche or speculative architecture. Do not nitpick preexisting code. Do not recommend a restructure that is not on the ticket.

For each finding:

1. **Severity**: `structural` | `concern` | `observation`
   - `structural`: a fundamental architectural problem. Wrong abstraction boundary, broken data model, coupling that will block future work
   - `concern`: a real issue that makes the system harder to work with or reason about, but not fundamentally broken
   - `observation`: worth noting. A tradeoff that might not age well, a pattern inconsistent with the rest of the codebase, technical debt
2. **Finding**: the architectural issue. Be specific. Name the components, the boundary, the coupling.
3. **Evidence**: concrete code that demonstrates the problem. Don't just assert that "this is too coupled". Show the dependency chain.
4. **Impact**: what the issue costs. Harder to test? Harder to change? Performance cliff at scale? Be concrete about the consequence.

## What to Avoid

- Line-level style nits and preexisting issues unrelated to the question
- Suggesting rewrites without demonstrating a problem this change introduced
- "This could use more abstraction" or a four-model redesign
- Flagging intentional tradeoffs, copy-the-last-screen patterns, or off-ticket restructures as issues

If the architecture is sound, say so. An empty critique is a valid outcome.

## Output

```
## Findings

### 1. [Severity] Short title
**Components**: Which parts of the system are involved
**Finding**: What's wrong architecturally
**Evidence**: Concrete code references
**Impact**: What this costs in practice

### 2. [Severity] Short title
...
```
