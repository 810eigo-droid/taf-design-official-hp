# 引き継ぎ:現在の状況(2026-08-04時点)

> 新しいClaude Codeチャットの冒頭にこのファイルを見てもらう用。
> **最初に「810eigo-droid/taf-design-official-hp を追加して」と頼む。**
> 価格・広告LP・見積もりは TAF-V2meta-LP(別リポジトリ)も参照。CodexさんもこのHPを触るので二重編集注意(編集前に git pull・--force禁止)。

## リポジトリ
- 公式HP: **810eigo-droid/taf-design-official-hp**(index.html + css/override.css + images)
- LP/資料/WPブロック/price-master: **810eigo-droid/TAF-V2meta-LP**
- 公開方法: Gitで編集→プッシュ→オーナーがエックスサーバーへ手動アップロード(GitHub Pagesではない)

## この2日で完了した主なこと
- メール到達性: SPF/DKIM/DMARC(mail-tester 10/10)・Postmaster・Brevo・MailPoet自動ステップメール(CF7→MailPoet自動登録スニペット稼働)
- SEO: Search Console稼働・主要ページのメタ設定・記事1本目公開(/form-mail-todokanai/)・記事2〜5の原稿(docs/blog-drafts, docs/blog-posts)
- トップのtitle/description確定(docs/title-ideas.md・「2万円から」は集客用にtitleのみ据置)
- 価格税込統一: 本文/ビジュアルを LP2.2万・HP3.3万・AIアプリ2.9万/29,000に(titleのSEOは「2万円」維持)
- 保守/backup: /maintenance/ ・ /backup/ ページ作成、料金導線3か所に買い切り案内
- WORKS: 作品を8→16枚に拡張(全カード外部リンク・新タブ)。台帳=docs/works-links.md

## 重要ドキュメント(docs/)
- handoff-official-hp.md … 公式HP全体の引き継ぎ(価格基準・宿題元ネタ)
- seo-plan.md … SEO戦略と記事プラン
- title-ideas.md … トップtitle/descriptionの決定履歴
- works-links.md … WORKS 16件のリンク・名称台帳
- taf-design-dns-records.md … メール認証/Brevo/MailPoetの全設定台帳
- step-mail-01-03.md … ステップメール3通
- blog-drafts/ , blog-posts/ … ブログ記事原稿(Codexさんが blog-posts でHTML化)

## 残タスク(未完了)
- [ ] **本番反映**:今日のindex.html+css/override.css+images(work-09〜16.jpg)をエックスサーバーへアップ
- [ ] 06 WORKSの画像を仮想通貨アプリ画像に差し替え(work-06.jpg 同名上書きでOK)
- [ ] スマホのクロージング(SECTION15)崩れ修正(ボタン折返し・見積もり導線・上に戻るボタン重なり)
- [ ] /budget/ に電話相談バナー追加(docs/wp-blocks/wp-budget-selector.html)
- [ ] WordPress固定ページの価格税込同期(/lp-hp2/ /hp3/ /ad/ /app2_9/)※このGit外
- [ ] fv-bg.webp / fv-bg-sp.webp のAI生成・配置
- [ ] 既存リードへのフォローメール送信(docs/manual-followup-existing-leads.md)
- [ ] 記事2〜5の公開・Search Consoleインデックス依頼
- [ ] /lp-hp2/ の中身刷新(税込表記)

## 運用ルール(重要)
- リンクルール: 見積もり=/order/ 相談・資料=/offer2/ 予算=/budget/。同一ドメインは target="_blank" 禁止(外部サイトは新タブOK)
- 価格は TAF-V2meta-LP/docs/price-master.md が原本
- 表示確認はPlaywright(Chromium)でスクショ検証してから渡す
- CodexさんとGit二重編集に注意(編集前pull・--force禁止・別ファイル/別領域で分担)
