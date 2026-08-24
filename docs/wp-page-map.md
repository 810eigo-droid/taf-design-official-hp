# WordPress固定ページ ⇄ GitHubファイル 対応表(全18ページ)

> **ファイル名はWordPressのスラッグと同じ名前に統一しました(2026-08-05)。**
> 例: スラッグ `budget` のページ → ファイルは `budget.html`。迷ったらスラッグで探せばOK。
> WP管理画面の公開済み18ページ(2026-08-05スクショ)と完全対応。
> 最終更新: 2026-08-05

---

## 全ページ対応表(WP管理画面の並び順)

| スラッグ | WPページのタイトル | 原本ファイル(リポジトリ) |
|---|---|---|
| `offer2` | お問い合わせ2-renew | **official-hp** `docs/wp-blocks/offer2.html`(+CF7側の電話項目手順 `offer2-cf7-phone-fields.md`) |
| `backup` | サイトまるごとバックアップパック | **V2meta-LP** `wordpress/backup.html` |
| `maintenance` | サイト安心保守管理プラン | **V2meta-LP** `wordpress/maintenance.html` |
| `price` | 料金表 | **V2meta-LP** `wordpress/price-block1-plans.html` + `price-block2-consultation.html` + `price-block3-faq.html`(3ブロックを上から順に) |
| `order` | 簡単見積もり-order | **V2meta-LP** `wordpress/order.html` ★正はこちら(電話相談の条件分岐入り)。official-hp側の `order-old.html` は電話相談なしの旧版 — 使わない |
| `budget` | 先に、ご予算を教えてください(予算から選ぶ) | **official-hp** `docs/wp-blocks/budget.html` |
| `lp-hp2` | LP・HPデザイン制作プラン(2万円〜) | **official-hp** `docs/wp-blocks/lp-hp2.html` |
| `hp3` | WordPress HP/LP制作プラン(3万円〜) | **official-hp** `docs/wp-blocks/hp3.html` |
| `app2_9` | 専用AIアプリ制作プラン(2.9万円〜) | **official-hp** `docs/wp-blocks/app2_9.html` |
| `lp7` | プロ制作プラン(7万円〜)リスト取り特化 | **official-hp** `docs/wp-blocks/lp7.html` |
| `lp15` | HP/LP+セールスファネル一元化(15万円〜) | **official-hp** `docs/wp-blocks/lp15.html` |
| `ad` | 広告運用・集客サポート(月1.8万円〜) | **official-hp** `docs/wp-blocks/ad.html` ※タイトル・中身とも「広告費の20%/月・最低月11,000円」への修正が宿題 |
| `coupon` | 5,000円OFFクーポン(5万円以上ご利用) | **V2meta-LP** `wordpress/coupon.html`(BLOCK1→CF7→BLOCK3の3構成) |
| `coupon-thanks` | クーポン受け取りTHANKYOUV2 | Git管理外(WP直接編集) |
| `pdf-backup` | PDF-backup — パスワード保護中 | **V2meta-LP** `wordpress/pdf-backup.html`(購入者向け・パスワード保護済み。print版 `backup-manual-print.html` はA4 PDF専用でWPに貼ると崩れる) |
| `privacy-policy` | Privacy-policy | Git管理外(法務・WP直接編集) |
| `kiyaku` | 利用規約 | Git管理外(法務・WP直接編集) |
| `tokushoho` | 特定商取引法に基づく表記 | Git管理外(法務・WP直接編集) |

**リポジトリ略称**: official-hp = `810eigo-droid/taf-design-official-hp` / V2meta-LP = `810eigo-droid/TAF-V2meta-LP`

## ページ内に組み込む「部品」(1ページ=1ファイルではないもの・official-hp側)

| ファイル | 用途 |
|---|---|
| `docs/wp-blocks/parts-quick-estimate-button.html` | 簡単見積もりボタン。各プランページ(lp-hp2/hp3/app2_9/lp7/lp15/ad)の上下に設置済み |
| `docs/wp-blocks/order-parts-price-accordion.html` | /order/ フォーム内の「料金の目安」開閉アコーディオン |
| `docs/wp-blocks/parts-selfkeep-pack.html` | 保守の2択「任せる vs 自分で守る」。/price/ 保守セクション付近など |

**サービス資料**(固定ページではなくサーバー直置き):
| 用途 | 公開場所 | GitHubファイル |
|---|---|---|
| サービス資料 | taf-design.com/lp/service-guide.html | **V2meta-LP** `service-guide.html`(エックスサーバーへ直接アップ) |
| 同PDF原稿 | taf-design.com/lp/service-guide.pdf | **V2meta-LP** `service-guide-print.html` → PDF生成 |
| 広告LP | taf-design.com/lp/ | **V2meta-LP** `index.html` |

## 重要メモ(スラッグの罠)

- AIアプリは **`app2_9`(アンダースコア)**。ハイフンの `app2-9` はリンク切れになる
- 法務3ページの実スラッグは **`kiyaku` / `tokushoho` / `privacy-policy`**
- **スラッグ(URL)は変更しないこと**。変えると設置済みのボタン・リンクが切れる
- タイトルに旧価格が入るページ(/lp-hp2/ /hp3/ /ad/)は税込統一への修正が宿題(price-master.md 準拠)

## 旧ファイル名 → 新ファイル名(2026-08-05リネーム記録)

| 旧 | 新 |
|---|---|
| V2meta-LP `order-page-block.html` | `order.html` |
| V2meta-LP `coupon-page-blocks.html` | `coupon.html` |
| V2meta-LP `backup-pack-page.html` | `backup.html` |
| V2meta-LP `maintenance-plan-page.html` | `maintenance.html` |
| V2meta-LP `backup-manual-page.html` | `pdf-backup.html` |
| official-hp `wp-budget-selector.html` | `budget.html` |
| official-hp `wp-offer2-contact-form.html` | `offer2.html` |
| official-hp `wp-ad-operation-plan.html` | `ad.html` |
| official-hp `wp-ai-app-plan.html` | `app2_9.html` |
| official-hp `wp-funnel-plan.html` | `lp15.html` |
| official-hp `wp-hp-lp-plan.html` | `hp3.html` |
| official-hp `wp-lp-hp2-plan.html` | `lp-hp2.html` |
| official-hp `wp-lp-hp-pro-70k.html` | `lp7.html` |
| official-hp `wp-order-estimate-form.html` | `order-old.html`(旧版・正はV2meta-LPの`order.html`) |
| official-hp `wp-order-price-accordion.html` | `order-parts-price-accordion.html` |
| official-hp `wp-quick-estimate-button.html` | `parts-quick-estimate-button.html` |
| official-hp `wp-selfkeep-pack.html` | `parts-selfkeep-pack.html` |
