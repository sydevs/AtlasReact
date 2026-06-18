---
name: implement-issue
description: Implement and test a GitHub issue end-to-end. Reads the issue, plans the work, implements, validates lint/typecheck/build, and opens a PR. User-invoked only — does not run unless explicitly triggered.
argument-hint: '[issue-number]'
disable-model-invocation: true
effort: max
allowed-tools: Bash(*), Read, Edit, Write, Grep, Glob, Task
---

# Implement Issue

End-to-end implementation of a GitHub issue: read → plan → branch → implement →
validate → simplify → code-review → push → PR → review → verify CI.

## Invocation

```
/implement-issue 42
```

## Workflow

### 1. Verify clean working tree

```bash
git status
```

If there are uncommitted changes that aren't yours, **stop**. Ask the user
whether to stash or proceed. Never silently overwrite their work.

### 2. Fetch the issue

```bash
gh issue view "$ISSUE" --json number,title,body,labels,assignees
```

Read it fully. Identify acceptance criteria, files-affected, and whether UI
changes need manual/visual verification.

If the issue lacks acceptance criteria, **ask the user** what "done" looks like
before starting. Don't guess.

### 3. Plan the work

Lay out the plan in the conversation before touching code: files to
create/modify, order of changes, and how you'll verify (typecheck, and visual
check in the running widget via the Playwright MCP for UI changes). Ask the user
to confirm. Iterate until aligned.

### 4. Create a branch

See `branch-naming.md`. Branch from latest `main`:

```bash
git fetch origin main && git checkout main && git pull && git checkout -b <type>/<slug>
```

### 5. Implement

One unit of change at a time. After each meaningful unit:

```bash
git add <files>
git commit -m "<conventional commit message>"
```

**Commit message rules** (see `.claude/skills/draft-ticket/conventions.md`):

- `<type>(<scope>): <subject>` — imperative mood, ≤ 70 chars, lowercase subject
- Reference the issue in the body: `Closes #42`
- Multi-line bodies via HEREDOC, ending with the Co-Authored-By line:

```bash
git commit -m "$(cat <<'EOF'
feat(map): cluster venues at low zoom

Closes #42

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
EOF
)"
```

The Prettier + ESLint + typecheck PostToolUse hooks run automatically on each
edit; fix surfaced type errors before committing.

### 6. Validate

Run the lean local gate:

```bash
.claude/skills/implement-issue/scripts/validate.sh          # lint + typecheck + unit
.claude/skills/implement-issue/scripts/validate.sh --full   # + production build (CI parity)
```

If anything fails: fix it, commit the fix separately, re-run. Don't mark the PR
ready while CI is red.

### 7. Simplify the diff

Run `/simplify` against the **entire branch diff** (every commit since `main`).
Review the applied changes; revert any that are undesirable. If it changed
anything, re-run the validation gate (step 6), then commit:

```bash
git commit -am "refactor: simplify per /simplify pass"
```

### 8. Code review (`/code-review`)

After `/simplify`, **dispatch a subagent** (Task tool) to run `/code-review` over
the full branch diff and return findings (severity + `file:line` + fix). Don't
run it inline. Triage every finding, fix the valid ones (each its own commit),
re-run the validation gate. Note dismissed findings with a one-line reason.

### 9. Push the branch

```bash
git push -u origin <branch>
```

### 10. Open the PR

Write the body to a session-unique temp file (preserves markdown), then:

```bash
BODY_FILE=$(mktemp -t pr-body.XXXXXX).md
# write the body (see pr-template.md) to "$BODY_FILE", then:
gh pr create --title "<conventional title>" --body-file "$BODY_FILE" --base main
```

### 11. Review the PR (`/review`)

Once open, **dispatch a subagent** to run `/review` against the PR and return its
findings. Address valid findings (commit + push, which re-triggers CI). Don't
report the PR ready until findings are resolved and CI is green.

### 12. Wait for CI and verify

```bash
gh pr checks <pr-or-branch> --watch
gh pr checks <pr-or-branch>
```

CI (`.github/workflows/ci.yml`) runs **lint + typecheck + test:run + build**
(plus `ladle:build`, and a separate smoke job). On a red check, fetch logs
(`gh run view <run-id> --log-failed`), fix locally, commit, push, re-watch until
green.

### 13. Report

Output the PR URL, confirm CI is green, and note any acceptance criteria that
need manual/visual verification (UI screenshots, map interaction).

## Hard rules

- **Never** force-push `main` or any shared branch
- **Never** skip hooks (`--no-verify`)
- **Never** commit secrets / `.env.local` / `sk.` tokens
- **Never** mark a PR ready while CI is red
- **Always** commit incrementally; never one monolithic commit at the end
- **Always** use `--body-file` (a `mktemp` path) for PR creation
- **Always** run the lean gate before pushing
- **Always** run `/simplify` then `/code-review` (subagent) before pushing, and
  `/review` (subagent) after opening the PR — never inline in the main thread
- **Always** wait for CI to finish and verify green before reporting

## Edge cases

- **Vague issue** — stop at step 3 and ask; don't invent acceptance criteria.
- **Existing PR** — `gh pr list --search "in:title <keyword>"` before branching;
  ask whether to extend or open new.
- **Tests** — a fast node-only unit lane (`pnpm test:run`, co-located
  `src/**/*.test.ts(x)`) runs on the gate; add specs for new logic/contracts
  (schemas, stores, helpers, the api interceptor). For behavioral/UI changes the
  lane can't cover, verify in the running widget (Playwright MCP) and describe
  the manual check in the PR. See `.claude/rules/tests.md`.

## References

- Branch naming: `branch-naming.md`
- PR template: `pr-template.md`
- Validation script: `scripts/validate.sh`
- Repo conventions: `.claude/skills/draft-ticket/conventions.md`
- PR requirements: `.claude/skills/pr-prep/SKILL.md`
