#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../../..");

const problems = [];
const fail = (file, message) => problems.push(`${file}: ${message}`);

const read = (rel) => {
	const abs = path.join(root, rel);
	if (!fs.existsSync(abs)) {
		fail(rel, "missing");
		return null;
	}
	return fs.readFileSync(abs, "utf8");
};

const mustExist = [
	"skills/stuc-artemis/SKILL.md",
	"skills/stuc-artemis/references/mcp-tools.md",
	"skills/stuc-artemis/references/profiles.md",
];

const mustNotExist = [
	"artemis/__init__.py",
	"mcp_server/server.py",
	"packages/artemis-client",
	"skills/stuc-artemis/rules.md",
];

const mustContain = [
	["skills/stuc-artemis/SKILL.md", ["name: stuc-artemis", "Fail closed", "mobile_run_task", "mobile_diagnose", "android-verify", "Flash", "Pro"]],
	["skills/stuc-mode/SKILL.md", ["stuc-artemis"]],
	["skills/android-verify/SKILL.md", ["stuc-artemis", "Done (UI/device)", "android run"]],
	["skills/setup-stuc/SKILL.md", ["stuc-artemis", "mobile_run_task"]],
	["skills/stuc-mode/playbooks/bug-fix.md", ["stuc-artemis"]],
	["skills/stuc-mode/playbooks/runtime-forensics.md", ["stuc-artemis"]],
	["skills/stuc-mode/playbooks/visual-parity.md", ["stuc-artemis"]],
	["skills/stuc-mode/playbooks/shipping.md", ["stuc-artemis"]],
	["skills/stuc-mode/playbooks/opening-a-pr.md", ["stuc-artemis"]],
	["skills/create-verification-skill/SKILL.md", ["stuc-artemis"]],
	["skills/stuc-chrisbanes/SKILL.md", ["stuc-artemis"]],
	["skills/principle-separate-before-serializing-shared-state/SKILL.md", ["Artemis"]],
	["AGENTS.md", ["stuc-artemis"]],
	["README.md", ["stuc-artemis"]],
	["docs/guide/01-setup.md", ["stuc-artemis"]],
	["docs/guide/06-verify-and-ship.md", ["stuc-artemis"]],
	["docs/guide/README.md", ["stuc-artemis"]],
];

for (const rel of mustExist) read(rel);
for (const rel of mustNotExist) {
	if (fs.existsSync(path.join(root, rel))) fail(rel, "vendored Artemis tree or pasted rules.md");
}

for (const [rel, needles] of mustContain) {
	const text = read(rel);
	if (text === null) continue;
	for (const needle of needles) {
		if (!text.includes(needle)) fail(rel, `missing "${needle}"`);
	}
}

const skill = read("skills/stuc-artemis/SKILL.md");
if (skill) {
	const lines = skill.split(/\n/).length;
	if (lines > 500) fail("skills/stuc-artemis/SKILL.md", `${lines} lines, 500 max`);
	if (/[\u2013\u2014]/.test(skill)) fail("skills/stuc-artemis/SKILL.md", "long dash");
	if (skill.includes("Closed-Loop Architecture Mastery")) {
		fail("skills/stuc-artemis/SKILL.md", "looks like pasted Artemis rules.md");
	}
}

if (problems.length) {
	for (const p of problems) console.error(p);
	console.error(`${problems.length} problems`);
	process.exit(1);
}

console.log("stuc-artemis glue check passed");
process.exit(0);
