#!/bin/bash
#
# Pre-PR validation.
#
# Default (lean gate): lint + typecheck. Fast feedback before opening a PR.
# --full: reproduce CI locally — lint + typecheck + production build.
#
# CI (.github/workflows/ci.yml) is the source of truth: lint + typecheck + build.
#
# Usage:
#   .claude/skills/pr-prep/check.sh            # lint + typecheck
#   .claude/skills/pr-prep/check.sh --full     # + pnpm build

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
  echo "ℹ Lean gate only (lint + typecheck). Use --full to also run the"
  echo "  production build. CI runs lint + typecheck + build on the PR."
  echo
fi

END_TIME=$(date +%s)
ELAPSED=$((END_TIME - START_TIME))

echo "=== ✓ Checks passed — ${ELAPSED}s ==="
