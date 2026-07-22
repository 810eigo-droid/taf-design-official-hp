# 📋 チャット役割分担表(迷ったらまずここ)

> 更新日: 2026-07-20
> このフォルダ(docs/)は、TAF Designの全チャット・全リポジトリの「案内所」。
> どのチャットで何を頼むか分からなくなったら、この表を見る。

## チャットの役割分担

| チャット | 担当する内容 | リポジトリ | 冒頭に貼る引き継ぎ資料 |
|---|---|---|---|
| **① 公式HPチャット** | taf-design.comトップ(index.html/CSS/画像)・WPカスタムHTMLブロック全般(料金ページ・/budget/・order/offer2フォーム)・導線設計 | `taf-design-official-hp` | TAF-V2meta-LP の `docs/handoff-official-hp.md` |
| **② LP-V2チャット** | **価格の原本 price-master.md**・広告LP・/order/フォームの原本管理・WPブロックの大元 | `TAF-V2meta-LP` | (メインの継続チャット) |
| **③ 資料ページチャット** | /lp/service-guide.html(資料ページ)の編集 | (LP-V2側) | このフォルダの `handoff-budget-links.md` |
| **④ メール配信チャット** | MailPoet・ステップメール・メール到達率(SPF/DKIM/DMARC)・LINE配信ネタ | docs/はこのリポジトリを使用 | このフォルダの `handoff-email-marketing.md` |
| **⑤ 見積もりアシスタント** | claude.aiプロジェクト(完成・運用中) | — | `TAF-V2meta-LP/docs/estimate-assistant-context.md` |

## 使い方(3ステップ)

1. やりたいことが上の表のどれに当たるか確認
2. そのチャットを開く(新規なら「引き継ぎ資料」列のMDを丸ごと貼り付け)
3. 作業後の成果物は必ずGitに保存してもらう(口癖:「Gitに上げて」)

## このフォルダ(docs/)のファイル一覧

| ファイル | 内容 | 使うチャット |
|---|---|---|
| `README.md` | この案内所 | 全部 |
| `wp-blocks/` | WordPressブロックの原本置き場(ページ・部品の完成HTML+管理表README) | ①公式HP |
| `price-sync-checklist.md` | 公式HP内で価格が登場する全20箇所の地図(価格改定時の同期用) | ①公式HP |
| `handoff-budget-links.md` | /budget/への導線追加アイデア+スマホ「戻るで帰れる」ルール | ③資料ページ |
| `handoff-self-maintenance-pack.md` | 新商品セルフ保守パック(16,500円税込)のprice-master追記依頼書 | ②LP-V2 |
| `handoff-email-marketing.md` | メール配信チャットの立ち上げ資料(決定事項・ロードマップ・タスク) | ④メール配信 |

## 全チャット共通ルール

- **価格の原本は1つだけ**: `TAF-V2meta-LP/docs/price-master.md`。価格を書く時は必ずこれに同期
- **リンクルール**: 見積もり=`/order/`/相談・資料=`/offer2/`/予算=`/budget/`
- **スマホ優先**: 同一ドメインのリンクに `target="_blank"` を使わない(戻るボタンで帰れるように)。PDF・印刷も同様
- **二重編集禁止**: WordPress・Git・ローカルのどれかを直したら、必ず他にも反映
- **広告系の表現**: 「審査対応」という言葉は使わない
- コミット名義: `810eigo-droid / caucasus189@gmail.com`
