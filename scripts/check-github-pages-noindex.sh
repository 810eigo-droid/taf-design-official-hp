#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
failed=0

while IFS= read -r -d '' file; do
  # Root index is the production upload source. Its existing host guard excludes GitHub previews.
  if [[ "$file" == "$repo_root/index.html" ]]; then
    if ! grep -Fq "if (location.hostname.endsWith('github.io')) {" "$file" || ! grep -Fq "mRobots.name = 'robots'; mRobots.content = 'noindex, nofollow';" "$file"; then
      echo "Missing GitHub preview robots guard: index.html" >&2
      failed=1
    fi
    continue
  fi
  if head -n 40 "$file" | grep -Eqi '<!doctype|<html'; then
    if ! grep -Eqi '<meta[[:space:]][^>]*name=["'"'"']robots["'"'"'][^>]*content=["'"'"'][^"'"'"']*noindex' "$file"; then
      echo "Missing robots noindex: ${file#"$repo_root"/}" >&2
      failed=1
    fi
  fi
done < <(find "$repo_root" -type f \( -name '*.html' -o -name '*.htm' \) -print0)

exit "$failed"
