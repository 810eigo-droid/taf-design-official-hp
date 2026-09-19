#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
failed=0

while IFS= read -r -d '' file; do
  if head -n 40 "$file" | grep -Eqi '<!doctype|<html'; then
    # 合格条件は2通り:
    #  (a) 静的な <meta name="robots" content="noindex"> がある(アーカイブ・非公開ページ用)
    #  (b) GitHub Pages(github.io)のときだけ noindex を付ける条件付きスクリプトがある(本番 taf-design.com に上げるページ用)
    # 本番に上げる index.html / lp/*.html に静的noindexを入れると本番サイトが検索から消えるので、(b)を使うこと。
    if ! grep -Eqi '<meta[[:space:]][^>]*name=["'"'"']robots["'"'"'][^>]*content=["'"'"'][^"'"'"']*noindex' "$file" \
       && ! { grep -q "github.io" "$file" && grep -qi "noindex" "$file"; }; then
      echo "Missing robots noindex: ${file#"$repo_root"/}" >&2
      failed=1
    fi
  fi
done < <(find "$repo_root" -type f \( -name '*.html' -o -name '*.htm' \) -print0)

exit "$failed"
