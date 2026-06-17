---
name: reflect-session
description: Reflect on the current session and propose improvements to the Claude configuration to prevent problems from recurring. Surveys friction points and suggests changes to rules, skills, hooks, settings, CLAUDE.md, or memory. Proposes only — does not modify anything. User-invoked at end of session.
disable-model-invocation: true
effort: high
allowed-tools: Read, Grep, Glob, Bash(ls:*), Bash(cat:*), Bash(find:*)
---

# Reflect on Session

A meta-skill: at the end of a session, look back at what happened and propose
Claude-config changes that would make future sessions smoother.

**This skill proposes changes only. It does NOT modify any files.** Read-only by
design — the user reviews proposals and decides what to apply.

## Workflow

### 1. Survey what happened

Reconstruct the session from memory:

- What was the user trying to accomplish? What got done? What didn't?
- Where did Claude need correction or guidance?
- Where did Claude do something unexpected, slow, or risky?
- Where did permission prompts interrupt flow?
- Where did Claude read multiple files to figure out something that should have
  been documented?
- Where did the user have to repeat themselves?

Ask the user clarifying questions if specific friction points aren't clear.

### 2. Categorize each friction point

| Category                | Symptom                                                                | Likely intervention                                   |
| ----------------------- | ---------------------------------------------------------------------- | ----------------------------------------------------- |
| **Knowledge gap**       | Claude didn't know a project fact; user had to explain                 | Add to `CLAUDE.md`, a `.claude/rules/*.md`, or memory |
| **Skill gap**           | A multi-step workflow was reconstructed from scratch                   | New `.claude/skills/*` skill                          |
| **Permission friction** | Same Bash/MCP tool prompted for approval repeatedly                    | Add to `.claude/settings.json` permissions allow list |
| **Hook gap**            | A manual step ran after every change that wasn't automated             | New `.claude/hooks/*` PostToolUse hook                |
| **Memory gap**          | A correction or non-obvious decision worth remembering                 | Save to the project memory dir                        |
| **Rule scope wrong**    | A rule loaded when it shouldn't have (token waste) or didn't when needed | Adjust `globs:` frontmatter in the rule file        |
| **Tool gap**            | Claude lacked a useful tool (MCP, etc.)                                | Add to `.mcp.json`                                    |
| **Style mismatch**      | Claude's communication style didn't match the task                    | Use/refine an output style in `.claude/output-styles/` |
| **Documentation drift** | Docs said one thing but reality was another                            | Update the stale doc                                  |

### 3. Propose specific changes

```markdown
### Proposal N: [short title]

- **Friction observed:** [What slowed things down or went wrong]
- **Category:** [from table above]
- **Proposed change:**
  - File: `path/to/file`
  - Change: [specific addition / removal / edit, with content sketch]
- **Why this helps:** [How future sessions benefit]
- **Effort:** [5 min / 30 min / 2 hr]
- **Risk:** [Low / Medium / High — what could go wrong]
```

Order by **(impact / effort) ratio** — quick wins first.

### 4. Identify _non_-actionable observations

Some friction is normal, not config gaps (a one-off task; sloppy first-try code
the user corrected; an existing tool Claude forgot to use). List these briefly so
the user knows they were considered and dismissed.

### 5. Highlight what worked well

Note approaches the user _didn't_ push back on — non-obvious judgment calls they
accepted are worth reinforcing via a feedback memory.

### 6. Present and wait

Output the full list of proposals, then **stop and ask**: which to apply now,
which to defer, which are wrong. Do NOT apply any changes.

## Output format

```markdown
## Session Reflection — <one-line task summary>

### What we worked on
[2-3 sentences]

### Proposals
1. [Proposal #1 in the format above]
2. [...]

### Non-actionable observations
- [Friction that's normal / one-off / already handled]

### Worked well — worth reinforcing
- [Patterns to preserve, possibly via feedback memory]

### What I'd like clarification on (optional)
- [Friction points where I'm not sure what would help]
```

## Quality bar

A useful reflection is **specific**. Bad: "Claude could have been more efficient."
Good: "Claude searched three files to find where the API base URL is configured —
propose noting `src/config/api/fetch.ts` in `.claude/rules/data-layer.md`."

## Hard rules

- **Never** modify any file from this skill. Read-only.
- **Never** propose a change without a specific file path.
- **Never** pad the proposal list — quality over quantity.
- **Always** end with "which of these would you like to apply?"
