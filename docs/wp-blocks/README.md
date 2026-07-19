# WPブロック管理表(GitファイルとWordPressページの対応)

> 更新日: 2026-07-19
> WordPressページのタイトルはこの表の「ページタイトル」に合わせて付ける。
> 価格をタイトルに含めることで、管理画面でもお客様にも判別しやすくする。

## 固定ページ(1ファイル=1ページ)

| Gitファイル | WordPressページタイトル | スラッグ | 基本価格 |
|---|---|---|---|
| `wp-lp-price-swell.html` | LP・HPデザイン制作プラン(2万円〜) | `/price-lp2/` 推奨 | 2万円〜(5セクション・スマホ重視) |
| `wp-hp-lp-plan.html` | WordPress HP/LP制作プラン(3万円〜) | `/price-wp3/` 推奨 | 3万円〜(3〜4セクション) |
| `wp-ai-app-plan.html` | 専用AIアプリ制作プラン(2.9万円〜) | `/price-ai/` 推奨 | 2.9万円〜(公式HPは3万円表記・要統一) |
| `wp-lp-hp-pro-70k.html` | プロ制作プラン(7万円〜) | `/price-pro7/` 推奨 | 7万円〜(構成・文章・画像込み) |
| `wp-funnel-plan.html` | HP/LP+セールスファネル一元化(15万円〜) | `/price-funnel15/` 推奨 | 15万円〜(工程少なら10万円〜) |
| `wp-ad-operation-plan.html` | 広告運用・集客サポート(月1.8万円〜) | `/price-ad/` 推奨 | 月1.8万円〜(標準は広告費の20%) |
| `wp-budget-selector.html` | 先に、ご予算を教えてください(予算から選ぶ) | `/budget/`(設置済み) | — |

※ すでに他ページからリンク済みのページは、スラッグは変えずタイトルだけ変更する(URLが変わるとリンク切れになるため)。

## 部品(ページに埋め込むパーツ・単体ページではない)

| Gitファイル | 役割 | 設置先 |
|---|---|---|
| `wp-quick-estimate-button.html` | 簡単見積もりボタン(→/order/) | 全個別料金ページの上下 |
| `wp-order-price-accordion.html` | 料金の目安の開閉表(to-price-linkと置換) | /order/ フォーム内 |

## 共通ルール

- リンク: 見積もり=`https://taf-design.com/order/` / 相談・資料=`https://taf-design.com/offer2/`
- 価格の原本: `810eigo-droid/TAF-V2meta-LP` の `docs/price-master.md`(照合状況は各ファイル冒頭のコメント参照)
- ブロックを更新したら: WordPressに貼り直し+このリポジトリの該当ファイルも更新(二重編集しない)
- /order/ ブロック本体はTAF-V2meta-LPの管理(ここにあるのは置き換え部品のみ)
