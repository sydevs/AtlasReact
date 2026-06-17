# Bug template

Title: `fix(<scope>): <subject>`

```markdown
## Summary

[One sentence: what's broken and the impact.]

## Observed behavior

[What happens now. Include the smallest reproduction path.]

1. [step]
2. [step]
3. [observed result]

**Context:** [browser / embedded vs standalone / locale / which entity / zoom level]

## Expected behavior

[What should happen instead.]

## Acceptance criteria

- [ ] The reproduction above no longer occurs
- [ ] [Any regression guard / edge case to cover]
- [ ] Lint + typecheck + build pass

## Files affected (optional)

- `src/...`

## References (optional)

- Console error / screenshot / related issue
```
