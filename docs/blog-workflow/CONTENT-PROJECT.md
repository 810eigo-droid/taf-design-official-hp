# TAF DESIGN コンテンツ運用プロジェクト

このプロジェクトは、TAF DESIGN公式HPの集客コンテンツを継続的に作成・投稿・再利用するための運用場所です。

対象は、ブログ記事だけではありません。

- WordPressブログ
- note投稿
- メルマガ
- 投稿用画像
- Search Console確認
- SEOタイトル・ディスクリプション
- GitHubでの原稿・素材管理

これらを1つの流れとして管理します。

## 結論

新しいGitHubリポジトリを別に作るより、まずは既存の公式HPリポジトリ内にまとめる方がよいです。

理由:

- ブログは公式HPの集客導線だから
- 画像・HTML・note原稿・運用メモを同じ場所で追えるから
- すでに `taf-design-official-hp` に `docs/blog-posts` として保存し始めているから
- WordPress投稿内容とHP改善内容のつながりが見えやすいから

ただし、作業場所としてはPC内の以下フォルダを使います。

```text
C:\Users\maste\Downloads\ブログ-TAF-HP
```

GitHub保存先は以下です。

```text
taf-design-official-hp/docs/
```

## プロジェクトの目的

TAF DESIGNのWeb制作・メール到達改善・SEO支援につながるコンテンツを継続的に投稿し、検索流入と相談導線を増やすこと。

主な導線:

- 無料相談・お問い合わせ
- 自動見積もり
- 予算から選ぶページ
- WordPress制作・保守相談
- メール到達設定・フォーム改善相談

## コンテンツの種類

### 1. WordPressブログ

検索流入を狙う本体記事です。

特徴:

- SEOキーワードを狙う
- 手順を詳しく書く
- 画像・図解を入れる
- CTAを入れる
- Search Consoleでインデックス登録を確認する

保存例:

```text
docs/blog-posts/01-form-mail-todokanai/
docs/blog-posts/02-mailpoet-brevo/
```

### 2. note

WordPress記事と同じ内容をそのまま転載しません。

noteでは、以下のどちらかに寄せます。

- 体験談・失敗談
- 初心者向けの考え方・チェックリスト

目的:

- WordPressブログへの自然な誘導
- 読み物としての接点作り
- 体験ベースで信頼感を出す

保存例:

```text
docs/blog-posts/note/01-note-01-form-mail-failure-story.md
docs/blog-posts/note/01-note-02-form-mail-checklist.md
```

### 3. メルマガ

ブログ・noteで扱ったテーマを、既存顧客や見込み客向けに短く届けます。

目的:

- 相談のきっかけを作る
- サイト改善の必要性を思い出してもらう
- ブログ記事への再訪を促す

今後の保存先案:

```text
docs/newsletter/
```

命名例:

```text
01-newsletter-form-mail.md
02-newsletter-mailpoet-brevo.md
```

## 記事番号ルール

すべての記事に番号を付けます。

```text
01-
02-
03-
```

同じテーマのWordPress・note・画像・メルマガは、同じ番号でそろえます。

例:

```text
01-form-mail-todokanai-wp-block.html
01-form-mail-eyecatch.png
01-note-01-form-mail-failure-story.md
01-newsletter-form-mail.md
```

## 1記事あたりの標準セット

1つのテーマにつき、基本的に以下を作ります。

```text
01-topic/
├─ 01-topic-wp-block.html
├─ 01-topic-eyecatch.png
├─ 01-topic-figure-01.png
├─ 01-topic-figure-02.png
```

note用:

```text
note/
├─ 01-note-01-topic-story.md
├─ 01-note-02-topic-checklist.md
```

メルマガ用:

```text
newsletter/
├─ 01-newsletter-topic.md
```

## WordPress投稿チェックリスト

投稿前:

- [ ] タイトルを設定
- [ ] スラッグを英数字にする
- [ ] カテゴリーを設定
- [ ] アイキャッチ画像を設定
- [ ] HTMLブロックに本文を貼る
- [ ] 本文内画像が表示されるか確認
- [ ] 内部リンクを確認
- [ ] CTAリンクを確認
- [ ] SEOタイトルを設定
- [ ] メタディスクリプションを設定

投稿後:

- [ ] 表示崩れを確認
- [ ] スマホ表示を確認
- [ ] Search ConsoleでURL検査
- [ ] インデックス登録をリクエスト
- [ ] note用原稿を投稿または予約
- [ ] メルマガ用に短く再編集

## note投稿チェックリスト

- [ ] WordPress記事の丸写しにしない
- [ ] 体験談または考え方に寄せる
- [ ] 画像を1〜2枚だけ使う
- [ ] 最後にWordPress記事へのリンクを入れる
- [ ] タグを設定
- [ ] 公開前にスマホ表示を確認

おすすめタグ:

```text
#WordPress #Web制作 #メール配信 #SEO #メルマガ #お問い合わせフォーム
```

## メルマガ化の方針

メルマガは短く、読み切りやすくします。

基本構成:

```text
件名
導入
今回の気づき
確認ポイント3つ
詳しい記事へのリンク
相談導線
```

長い手順はブログへ誘導します。

## Search Console運用メモ

登録すべきURLは通常の記事URLです。

例:

```text
https://taf-design.com/form-mail-todokanai/
https://taf-design.com/mailpoet-brevo-setup/
```

RSSフィードURLは基本的に登録不要です。

例:

```text
https://taf-design.com/category/uncategorized/feed/
```

このような `/feed/` URLが「クロール済み - インデックス未登録」に出ても、通常はSEO上の問題ではありません。

## Git運用

GitHubには、完成した原稿・画像・運用メモだけを入れます。

保存先:

```text
docs/blog-workflow/
docs/blog-posts/
docs/newsletter/
```

コミット例:

```text
docs: add note drafts for form mail article
docs: add newsletter draft for mailpoet brevo article
docs: update content workflow
```

## 今後の進め方

まずはこのまま既存リポジトリ内で運用します。

別リポジトリを作るのは、以下の状態になってからで十分です。

- 記事数が30本以上になる
- メルマガ原稿が増える
- 外注や共同編集者が増える
- WordPress投稿管理とHPコード管理を完全に分けたくなる

現時点では、新しいプロジェクトとして考えつつ、GitHub上は `taf-design-official-hp/docs` にまとめるのが一番わかりやすいです。

