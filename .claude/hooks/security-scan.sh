#!/bin/bash

# Security Scanning Hook (PreToolUse / Bash)
#
# Runs before Bash operations to prevent accidental exposure of secrets.
# Blocks git add/commit/push when a staged file contains a likely secret, and
# blocks a few outright-dangerous shell operations.

# Read hook input from stdin
input=$(cat)

# Extract command from JSON input
command=$(echo "$input" | grep -o '"command":"[^"]*"' | sed 's/"command":"//;s/"$//')

# Patterns to detect secrets and sensitive operations. The Atlas widget bundle is
# PUBLIC — a leaked `sk.` Mapbox token or API key is a real exposure.
patterns=(
  "sk\.eyJ"                                    # Mapbox SECRET access token (sk.…)
  "MAPBOX_SECRET"
  "CLOUDFLARE_API_TOKEN"                        # deploy/runtime secret (Cloudflare Pages)
  "AWS_SECRET_ACCESS_KEY"
  "SENTRY_AUTH_TOKEN"
  "-----BEGIN PRIVATE KEY-----"
  "-----BEGIN RSA PRIVATE KEY-----"
  "api[_-]?key.*=.*['\"][a-zA-Z0-9_-]{20,}['\"]"
  "secret.*=.*['\"][a-zA-Z0-9_-]{20,}['\"]"
  "password.*=.*['\"][^'\"]{8,}['\"]"
  "token.*=.*['\"][a-zA-Z0-9_-]{20,}['\"]"
)

# Check if command contains git add/commit/push
if echo "$command" | grep -qE "git\s+(commit|push|add)"; then
  # Get list of staged files
  staged_files=$(cd "$CLAUDE_PROJECT_DIR" && git diff --cached --name-only 2>/dev/null)

  # Check each staged file for secrets
  while IFS= read -r file; do
    if [ -f "$CLAUDE_PROJECT_DIR/$file" ]; then
      for pattern in "${patterns[@]}"; do
        if grep -qE "$pattern" "$CLAUDE_PROJECT_DIR/$file" 2>/dev/null; then
          echo "{\"continue\": false, \"reason\": \"Security scan detected a potential secret in $file. Review it and use a VITE_-prefixed public token or an env var in .env.local (gitignored) instead. Secret tokens (sk.…) must never enter the public bundle.\"}"
          exit 2
        fi
      done
    fi
  done <<< "$staged_files"
fi

# Check if command contains dangerous operations
dangerous_patterns=(
  "rm\s+-rf\s+/"
  "rm\s+-rf\s+\*"
  "chmod\s+-R\s+777"
  "curl.*\|\s*bash"
  "wget.*\|\s*sh"
)

for pattern in "${dangerous_patterns[@]}"; do
  if echo "$command" | grep -qE "$pattern"; then
    echo "{\"continue\": false, \"reason\": \"Blocked potentially dangerous command: $pattern\"}"
    exit 2
  fi
done

# All checks passed
exit 0
