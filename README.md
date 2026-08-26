# stuc

Host repo for the **stuc-stack** Android/Kotlin agent skill plugin.

See [plugins/stuc-stack/README.md](plugins/stuc-stack/README.md) for install, use, and the major/minor diff versus upstream.

Credit: tailored from the [pstack](https://github.com/cursor/plugins/tree/main/pstack) engineering stack (MIT, Lauren Tan). Verification skill + feature-map layout follows [poteto/verification-skill-example](https://github.com/poteto/verification-skill-example), remapped to Android (`android` CLI, not Node).

This tree does not vendor chrisbanes/skills, android/skills, or the android CLI. Those stay upstream. `.agents/skills/` is gitignored (install location).
