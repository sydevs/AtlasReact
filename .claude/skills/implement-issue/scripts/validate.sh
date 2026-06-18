#!/bin/bash
#
# Validate that the current branch is ready to open a PR.
#
# Default (lean local gate): lint + typecheck + unit tests. Fast feedback.
# --full: reproduce CI locally — + the production build.
#
# Usage:
#   .claude/skills/implement-issue/scripts/validate.sh           # lint + typecheck + unit
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

echo "=== Unit tests ==="
if ! pnpm test:run; then
  echo
  echo "❌ Unit tests failed. Fix them before continuing."
  exit 1
fi
echo "✓ Unit tests passed"
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
  echo "ℹ Lean gate only (lint + typecheck + unit). Run --full to also reproduce"
  echo "  the production build (CI runs lint + typecheck + test:run + build)."
  echo
fi

END_TIME=$(date +%s)
ELAPSED=$((END_TIME - START_TIME))

echo "=== ✓ Checks passed — ${ELAPSED}s ==="
