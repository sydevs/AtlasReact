#!/bin/bash
#
# Validate that the current branch is ready to open a PR.
#
# Default (lean local gate): lint + typecheck. Fast feedback.
# --full: reproduce CI locally — lint + typecheck + production build.
#
# Usage:
#   .claude/skills/implement-issue/scripts/validate.sh           # lint + typecheck
#   .claude/skills/implement-issue/scripts/validate.sh --full    # + pnpm build

set -u

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"
MODE="${1:-}"

cd "$PROJECT_DIR" || exit 1

START_TIME=$(date +%s)

echo "=== Lint ==="
if ! pnpm lint; then
  echo
  echo "❌ Lint failed. Fix lint errors before continuing."
  exit 1
fi
echo "✓ Lint passed"
echo

echo "=== Typecheck ==="
if ! pnpm typecheck; then
  echo
  echo "❌ Typecheck failed. Fix type errors before continuing."
  exit 1
fi
echo "✓ Typecheck passed"
echo

if [[ "$MODE" == "--full" ]]; then
  echo "=== Build (CI parity) ==="
  if ! pnpm build; then
    echo
    echo "❌ Build failed."
    exit 1
  fi
  echo "✓ Build passed"
  echo
else
  echo "ℹ Lean gate only (lint + typecheck). Run --full to also reproduce the"
  echo "  production build (CI runs lint + typecheck + build on the PR)."
  echo
fi

END_TIME=$(date +%s)
ELAPSED=$((END_TIME - START_TIME))

echo "=== ✓ Checks passed — ${ELAPSED}s ==="
