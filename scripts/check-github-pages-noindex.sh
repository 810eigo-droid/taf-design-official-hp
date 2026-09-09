#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
failed=0

while IFS= read -r -d '' file; do
  if head -n 40 "$file" | grep -Eqi '<!doctype|<html'; then
    if ! grep -Eqi '<meta[[:space:]][^>]*name=["'"'"']robots["'"'"'][^>]*content=["'"'"'][^"'"'"']*noindex' "$file"; then
      echo "Missing robots noindex: ${file#"$repo_root"/}" >&2
      failed=1
    fi
  fi
done < <(find "$repo_root" -type f \( -name '*.html' -o -name '*.htm' \) -print0)

exit "$failed"
