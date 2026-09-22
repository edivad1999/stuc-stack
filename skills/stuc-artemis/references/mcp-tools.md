# Artemis MCP tools

Source of names: [google/artemis mcp_server](https://github.com/google/artemis/blob/main/mcp_server/README.md). Inspect the live tool schema in this session before calling. Do not invent arguments.

## mobile_diagnose

Call first when a tool errors, no device is found, or the user says Artemis does not work.

Useful arguments:

- `attempt_fix=true` regenerates corrupted ADB keys, restarts ADB when no ready device is held, clears stale locks
- `verify_credentials=true` live API-key check (slow)
- `probe_device=true` screenshot plus UIAutomator hierarchy (slow)
- `launch_avd` boots an installed AVD in the background. Re-diagnose after about 60s. Do not run `emulator -avd` in the shell (it hangs the session)

Act on `next_steps` in order. `Run:` lines are local commands you may execute. `Guidance:` lines are for the user (unlock, tap Allow, plug in). Reload the MCP server after `.env` or config edits.

## mobile_run_task

Starts an asynchronous Flash or Pro run. Pass `device_serial` when the user picked one or when more than one device is connected.

Pro-only knobs (ignore on Flash):

- `verification_level`: `off` | `final` (default) | `checkpoints` | `strict`
- `explorer_mode`: `flash` | `pro` | `ultra` (perception depth, not the execution profile)

Do not block the chat on the worker. Poll status.

## mobile_manage_task

`status`, `stop`, or `inject_instruction`. Returns state and `device_serial`.

To end a `[Loop:continuous]` soak, pass `release_loop=true` with `inject_instruction`. Wording like "please stop" does not unlock the loop milestone.

## mobile_get_device_state

Live `screenshot` or OCR+XML `hierarchy`. Optional `device_serial`. Use for a quick look. Do not treat a screenshot as android-verify Done.

## mobile_inspect_trace

Trace directory, overlays, reasoning, `device_serial`. Point at this path in the reply as an exploration receipt.
