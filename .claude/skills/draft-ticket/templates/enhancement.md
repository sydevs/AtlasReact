# Enhancement template

For improvements to existing behavior (perf, UX, refactor with a user-visible
edge). Title: `feat(<scope>): <subject>` or `refactor(<scope>): <subject>` or
`perf(<scope>): <subject>`.

```markdown
## Summary

[One paragraph: what exists today, what's suboptimal about it, and the target
end state. Be concrete about the measurable improvement.]

## Current behavior

[How it works now and why that's a limitation.]

## Proposed improvement

- [Change 1]
- [Change 2]

## Acceptance criteria

- [ ] [Measurable end state — e.g. "map re-renders only when zoom/center change"]
- [ ] No regression to [related behavior]
- [ ] Lint + typecheck + build pass

## Files affected (optional)

- `src/...`

## References (optional)

- Benchmark / profile / related discussion
```
