# TAFブログ制作ワークフロー

このフォルダは、TAF DESIGN公式HPのブログ記事・画像・note流用原稿を管理するための作業場所です。

## 基本ルール

記事ごとに番号を付けて管理します。

- 1本目: `01-...`
- 2本目: `02-...`
- 3本目: `03-...`

WordPress、画像、note原稿のすべてで同じ記事番号を使います。

## フォルダ構成

```text
ブログ-TAF-HP/
├─ 01-form-mail-todokanai/
├─ 02-mailpoet-brevo/
├─ note/
├─ _scripts/
└─ _old/
```

### 各フォルダの役割

| フォルダ | 内容 |
|---|---|
| `01-form-mail-todokanai` | 1本目の記事HTML・画像 |
| `02-mailpoet-brevo` | 2本目の記事HTML・画像 |
| `note` | note投稿用の別原稿 |
| `_scripts` | 画像生成用PowerShellスクリプト |
| `_old` | 使わなくなった旧ファイルの退避先 |

## ファイル命名ルール

### WordPress用HTML

```text
01-form-mail-todokanai-wp-block.html
02-mailpoet-brevo-wp-block-final.html
03-example-slug-wp-block.html
```

WordPressの「カスタムHTML」ブロックに貼る本文です。

### 画像

```text
01-form-mail-eyecatch.png
01-form-mail-figure-01.png
01-form-mail-figure-02.png

02-mailpoet-brevo-eyecatch.png
02-mailpoet-brevo-role-flow.png
02-mailpoet-brevo-smtp-checklist.png
```

画像名には必ず記事番号を付けます。

## WordPress投稿時のルール

### 1. HTMLブロック

WordPress投稿本文には、記事フォルダ内の `*-wp-block*.html` の中身を貼り付けます。

貼り付け先:

```text
投稿編集画面 → ブロック追加 → カスタムHTML
```

### 2. アイキャッチ画像

投稿ごとに必ずアイキャッチ画像を設定します。

設定場所:

```text
投稿編集画面 → 右サイドバー → 投稿 → アイキャッチ画像
```

アイキャッチを設定しないと、投稿下部の「前の記事 / 次の記事」ナビゲーションで `NO IMAGE AVAILABLE` が表示されることがあります。

### 3. 本文画像

本文中の図解画像は、WordPressメディアにアップロードしたURLをHTML内の `<img src="...">` に入れます。

例:

```html
<img src="https://taf-design.com/wp-content/uploads/2026/07/02-mailpoet-brevo-role-flow.png" alt="MailPoetとBrevoの役割分担を説明する図解" loading="lazy" decoding="async">
```

### 4. 前の記事・次の記事の画像対策

投稿下部に出る「前の記事 / 次の記事」の画像は、各投稿のアイキャッチ画像が使われます。

そのため、今後の記事では必ず以下を用意します。

```text
記事番号-slug-eyecatch.png
記事番号-slug-figure-01.png
記事番号-slug-figure-02.png
記事番号-slug-wp-block.html
```

## note流用ルール

WordPress記事をそのままnoteに転載しません。

noteでは、重複を避けるために以下のどちらかの角度で書き直します。

### A案: 体験談・失敗談

例:

```text
メルマガ設定で587番ポートにハマった話。MailPoet×Brevoは465で通った
```

向いている内容:

- 実際にハマったこと
- 解決した手順
- 学び
- 詳細ブログへの誘導

### B案: 初心者向けの判断基準

例:

```text
WordPressでメルマガを始めるなら、最初はMailPoet×Brevoで十分かもしれない
```

向いている内容:

- どんな人に向いているか
- 何に注意すべきか
- 無料で始めるメリット
- 詳細ブログへの誘導

## note投稿手順

1. noteにログイン
2. 「記事を書く」を開く
3. `note` フォルダ内のMarkdown原稿を開く
4. 本文をコピーしてnoteに貼り付ける
5. 見出し・箇条書きが崩れていないか確認する
6. 必要に応じて画像を挿入する
7. 最後にWordPress記事へのリンクを入れる
8. タグを設定する
9. プレビュー確認
10. 公開

おすすめタグ:

```text
#WordPress #メルマガ #MailPoet #Brevo #メール配信 #Web制作
```

## Gitに入れる場合

このフォルダをGit管理する場合は、以下のような構成でコミットします。

```text
docs/blog-workflow/BLOG-WORKFLOW.md
docs/blog-posts/01-form-mail-todokanai/
docs/blog-posts/02-mailpoet-brevo/
```

ただし、現在の `ブログ-TAF-HP` フォルダ自体がGitリポジトリでない場合、先にリポジトリへコピーするか、GitHubの対象リポジトリをローカルにcloneする必要があります。

## 現在の公開済み画像URL

### 1本目

```text
https://taf-design.com/wp-content/uploads/2026/07/form-mail-eyecatch.png
https://taf-design.com/wp-content/uploads/2026/07/form-mail-auth-flow.png
https://taf-design.com/wp-content/uploads/2026/07/form-mail-xserver-checklist.png
```

### 2本目

```text
https://taf-design.com/wp-content/uploads/2026/07/02-mailpoet-brevo-eyecatch.png
https://taf-design.com/wp-content/uploads/2026/07/02-mailpoet-brevo-role-flow.png
https://taf-design.com/wp-content/uploads/2026/07/02-mailpoet-brevo-smtp-checklist.png
```
