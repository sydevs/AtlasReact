---
name: draft-ticket
description: Draft a GitHub issue from a feature request, bug report, or enhancement. Creates a formatted issue body with acceptance criteria and verification notes. User-invoked only — does not create the issue without explicit approval.
disable-model-invocation: true
allowed-tools: Bash(gh issue create:*), Bash(gh issue view:*), Bash(gh issue list:*), Bash(gh pr list:*), Bash(gh pr view:*), Bash(git log:*), Bash(git diff:*), Bash(mktemp:*), Read, Grep, Glob
---

# Draft Ticket

Draft a well-formed GitHub issue for the Sahaj Atlas repo, matching its
conventional-commits + acceptance-criteria style.

## Workflow

1. **Classify the request.** Feature / bug / refactor / enhancement / docs.
2. **Gather context.** Read related code, recent PRs (`gh pr list --limit 20`),
   similar past issues (`gh issue list --search "<keyword>"`). Don't draft blindly.
3. **Ask clarifying questions** when scope is ambiguous. Common gaps: which
   entity (country/region/area/venue/event), which locale, expected vs. actual
   behavior, what "done" looks like.
4. **Choose a template** from `templates/` (feature, bug, enhancement) and adapt.
5. **Write the title** using conventional commit format. See `conventions.md`.
6. **Write the body.** Be specific. Use `file:line` refs. Avoid vague language
   ("improve X", "make Y better").
7. **Plan-mode approval is the sign-off.** The user reviews the title + body and
   approves via `ExitPlanMode`. No separate "ready to create?" prompt after that.
8. **Create the issue.** Stage the body to a **session-unique** temp file — never
   a fixed path:
   ```bash
   BODY_FILE=$(mktemp -t gh-issue-body.XXXXXX).md
   # write the body (Write tool) to "$BODY_FILE", then:
   gh issue create --title "<title>" --body-file "$BODY_FILE"
   ```
   (File-based preserves markdown — `--body` mangles backticks and indentation.)
9. **Return the issue URL.**

## Title format

```
<type>(<scope>): <subject>
```

Title ≤ 70 chars. Subject in imperative mood ("add", not "added"/"adds"). See
`conventions.md` for types and scopes.

## Body structure

See `templates/<type>.md`. All issues should have:

- `## Summary` — one paragraph: what + why
- Either `## Proposed changes` (features/refactors) or `## Observed behavior` /
  `## Expected behavior` (bugs)
- `## Acceptance criteria` — markdown checklist of testable conditions
- `## Files affected` (optional)
- `## References` (optional)

## Quality bar

A good ticket can be implemented by someone who wasn't in the room when it was
discussed. Watch for:

- "Improve X" — what's the measurable end state?
- Missing acceptance criteria — how does the implementer know they're done?
- No reproduction steps (bugs) — describe the smallest path to the symptom
- Scope creep — if the body covers 3 features, draft 3 tickets

## References

- Conventional commit scopes: `conventions.md`
- Verification format expected in PRs: `.claude/skills/pr-prep/SKILL.md`
