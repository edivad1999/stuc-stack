# Flash vs Pro

Pick from the task. Do not default to Pro.

## Flash

Use for a short, deterministic UI path you could have tapped if you knew the screens. One model observes, thinks, and acts. No planner, no pre-touch safety net, no Checker, no ADB shell.

Typical cost is about 3 to 5 seconds per step. History is compressed, not capped.

Skip Flash when you need a living plan, checkpoint asserts, a written report, ADB or logcat, video analysis, or a multi-hour soak.

## Pro

Use for long or branching work, continuous monitoring, crash/logcat diagnosis, verified checkpoints, or a written report.

Planner keeps a Markdown plan. Operator executes. A safety net checks single actions (XML first, pixel fallback). Fast-action bursts skip that net so transient UI can be hit. Checker is read-only. `verification_level` sets how hard it audits.

Typical cost is about 15 to 40 seconds per step.

## vs android-cli

Known Compose screen, mapped feature, or pixel baseline. Use **android-verify** (`layout`, `screen`, journeys, named Gradle screenshot task). Faster, inspectable, and it is the proof contract.

Natural-language journey XML is already in official `android-cli`. Artemis is not required to get English-ish Drive. It is required when you cannot write the journey yet because you have not seen the UI.
