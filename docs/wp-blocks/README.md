# WPブロック管理表(GitファイルとWordPressページの対応)

> 更新日: 2026-07-19
> WordPressページのタイトルはこの表の「ページタイトル」に合わせて付ける。
> 価格をタイトルに含めることで、管理画面でもお客様にも判別しやすくする。

## 固定ページ(1ファイル=1ページ)

| Gitファイル | WordPressページタイトル | URL | 基本価格 |
|---|---|---|---|
| `wp-lp-price-swell.html` | LP・HPデザイン制作プラン(2万円〜) | `https://taf-design.com/lp-hp2/` | 2万円〜(5セクション・スマホ重視) |
| `wp-hp-lp-plan.html` | WordPress HP/LP制作プラン(3万円〜) | `https://taf-design.com/hp3/` | 3万円〜(3〜4セクション) |
| `wp-ai-app-plan.html` | 専用AIアプリ制作プラン(2.9万円〜) | `https://taf-design.com/app2_9/` | 2.9万円〜(公式HPは3万円表記・要統一) |
| `wp-lp-hp-pro-70k.html` | プロ制作プラン(7万円〜)リスト取り特化 | `https://taf-design.com/lp7/` | 7万円〜(構成・文章・画像込み) |
| `wp-funnel-plan.html` | HP/LP+セールスファネル一元化(15万円〜) | `https://taf-design.com/lp15/` | 15万円〜(工程少なら10万円〜) |
| `wp-ad-operation-plan.html` | 広告運用・集客サポート(月1.8万円〜) | `https://taf-design.com/ad/` | 月1.8万円〜(標準は広告費の20%) |
| `wp-budget-selector.html` | 先に、ご予算を教えてください(予算から選ぶ) | `https://taf-design.com/budget/` | — |
| `wp-order-estimate-form.html` | 簡単見積もり-order(フォーム完成版・料金目安アコーディオン込み) | `https://taf-design.com/order/` | — |

※ **スラッグ(URL)は変更しないこと**。変えると設置済みのボタン・リンクが切れる。変更するのはページタイトルのみ。
※ 2026-07-19 WP管理画面でタイトル付け替え・実URL確認済み。

## その他の主要ページ(このリポジトリのブロック管理外・リンク先として使用)

| WordPressページタイトル | URL | 役割 |
|---|---|---|
| お問い合わせV2 | `https://taf-design.com/offer2/` | 相談・資料DLの導線先 |
| 料金表 | `https://taf-design.com/price/` | 料金の総合ページ |
| 5,000円OFFクーポン(5万円以上ご利用) | `https://taf-design.com/coupon/` | クーポン配布 |
| クーポン受け取りTHANKYOUV2 | `https://taf-design.com/coupon-thanks/` | クーポンのサンクスページ |
| Privacy-policy | `https://taf-design.com/privacy-policy/` | プライバシーポリシー |
| 利用規約 | `https://taf-design.com/kiyaku/` | 利用規約 |
| 特定商取引法に基づく表記 | `https://taf-design.com/tokushoho/` | 特商法表記 |

## 部品(ページに埋め込むパーツ・単体ページではない)

| Gitファイル | 役割 | 設置先 |
|---|---|---|
| `wp-quick-estimate-button.html` | 簡単見積もりボタン(→/order/) | 全個別料金ページの上下 |
| `wp-order-price-accordion.html` | 料金の目安の開閉表(to-price-linkと置換) | /order/ フォーム内 |

## 共通ルール

- リンク: 見積もり=`https://taf-design.com/order/` / 相談・資料=`https://taf-design.com/offer2/`
- 価格の原本: `810eigo-droid/TAF-V2meta-LP` の `docs/price-master.md`(照合状況は各ファイル冒頭のコメント参照)
- ブロックを更新したら: WordPressに貼り直し+このリポジトリの該当ファイルも更新(二重編集しない)
- /order/ フォームの完成版控えは `wp-order-estimate-form.html`(原本管理はTAF-V2meta-LP。更新したら両方に反映)
