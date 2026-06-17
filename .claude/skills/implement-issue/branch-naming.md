# Branch naming

## Format

```
<type>/<short-kebab-slug>
```

`<type>` matches the conventional commit type (`feat`, `fix`, `refactor`,
`chore`, `docs`, `test`, `perf`).

`<short-kebab-slug>` is 2–5 words drawn from the issue title.

## Examples

| Issue title                                          | Branch                       |
| ---------------------------------------------------- | ---------------------------- |
| `feat(map): cluster venues at low zoom`              | `feat/cluster-venues`        |
| `fix(api): handle empty events response`             | `fix/empty-events-response`  |
| `feat(i18n): add German locale`                      | `feat/german-locale`         |
| `refactor(store): split view state selectors`        | `refactor/view-state-selectors` |
| `chore(claude): add hooks + rules config`            | `chore/claude-config`        |

## Rules

- Lowercase, kebab-case
- No issue numbers in the branch name (they go in the commit body)
- 2–5 words from the title — recognizable but short to type
- Drop articles ("the", "a") and filler words
- If the issue has no clear scope, use the area (`map`, `api`, `i18n`, `event`, …)

## Branch from where

Always from latest `main` unless the user says otherwise:

```bash
git fetch origin main
git checkout main
git pull
git checkout -b <type>/<slug>
```

## When the branch name is taken

- **Local exists, no commits:** delete it (`git branch -d`) and re-create
- **Local exists with commits:** ask the user — they may have unfinished work
- **Remote exists:** ask the user — may be an existing PR

Never silently force-overwrite an existing branch.
