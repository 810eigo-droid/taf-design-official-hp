## HP本体の最新版（2026-09-26・この案内を優先）

**リポジトリ直下の [index.html](index.html) が本番アップロード用の正本です。**
ダウンロードして `public_html/index.html` へ反映してください。
最新6件の画像カードと「知りたいことから探す」を含みます。
GitHub確認用ホストだけ検索除外。本番に静的noindexはありません。
`docs/wp-blocks/homepage-live-blog-update.html` は旧作業控えです。今後HPを編集する際は直下index.htmlを更新してください。
以下の過去記録にある「Git直下を本番に転送しない」は撤回します。

# TAF Design 司令塔README(統合リポジトリ)

追加です
「GitHubのmainにある最新のREADMEと docs/blog-workflow/homepage-blog-feed.md を確認してください。ブログ自動表示は作成済み、本番未反映です。今回の変更を引き継いで作業してください。」
ここに書いていいかよくわかりません。まちがっていたら適切な場所に書いておいてください。

> **このファイルだけ見れば「今の状態・次にやること・実行手順」が全部わかる。**
> 最終更新: 2026-08-25 ｜ 更新ルール: 変更コミットと同じコミットでこのREADMEの「今の状態」「チェックリスト」を必ず更新する
> 旧 TAF-V2meta-LP リポジトリの内容は 2026-08-25 に本リポジトリへ統合済み

---

## 0. GitHubへの反映について(2026-08-25更新: 大村さんの操作は不要になりました)

> **AIが直接pushできるようになりました。** AIに作業を頼めば、そのままGitHub本体(main)に反映されます。
> 以前必要だった「PowerShellの4コマンド」は不要です。

### 万一、AIが「pushできない」と言ったときだけ(予備手順)

AI側の権限が一時的に切れた場合は、AIがバックアップブランチ(TAF-V2meta-LPの backup/unified-official-hp-20260825)に退避pushするので、以下をPowerShellで1行ずつ実行すれば反映できる:

```powershell
cd $env:USERPROFILE\Desktop\taf-official-push
```
```powershell
git fetch https://github.com/810eigo-droid/TAF-V2meta-LP.git backup/unified-official-hp-20260825
```
```powershell
git merge --ff-only FETCH_HEAD
```
```powershell
git push origin main
```

(成功のサイン: `Fast-forward` → `main -> main`。フォルダが無ければ `git clone https://github.com/810eigo-droid/taf-design-official-hp.git $env:USERPROFILE\Desktop\taf-official-push` で自動作成。エラー時は何もせずAIに画面を見せる)

## 1. リポジトリの構成(どこに何があるか)

| 場所 | 中身 |
|---|---|
| `index.html` + `css/` + `js/` + `images/` | **公式HPトップ(公開中=v1)**。Xserver `/public_html/` に手動アップ |
| `lp/` | **サーバーの `/public_html/lp/` と完全に同じ中身だけ**(index.html・css・js・images・service-guide.html・PDF2つ)。**丸ごとアップしてOK** |
| `lp/service-guide.html` | 資料の原本(現行v29) |
| `docs/originals/` | **金庫と原稿置き場**(v1金庫・v2素材・印刷原稿・旧版)。lp/から移動(2026-08-25整理)。v1系は**編集禁止** |
| `docs/originals/service-guide-print.html` | A4印刷原稿。**PDFはここから大村さんが生成** |
| `docs/wp-blocks/` | WordPress貼り付け用の控え(order・price-block1〜3 ほか) |
| `docs/wp-blocks/v2_新/` | **切り替え当日に貼るv2ファイル**(orderフォーム・offer2フォーム) |
| `docs/wp-blocks/price-compare-coconala.html` | /price/の直販/ココナラ比較セクション(現行・price-block1の直下に設置) |
| `docs/wp-blocks/coconala-intro-block.html` | ココナラ案内の汎用ブロック(/budget/等どのページにも貼れる) |
| `docs/mail_v1_coconala以前/` | メール原稿の金庫(改稿前の全9ファイル・**編集禁止**) |
| `docs/wp-blocks/budget-welcome-block.html` | /budget/最上部の「ようこそ」ブロック(名刺QRからの初見対応) |
| `docs/wp-blocks/v1_現行/` | WPブロックの金庫(**編集禁止**) |
| `docs/price-master.md` | **価格の原本(唯一の正)**。価格を書くときは必ずここに同期 |
| `docs/` その他 | 引き継ぎ資料・ブログ原稿・メルマガ・法務など |
| `AGENTS.md` | AI向けの最上位作業ルール(ブログ品質基準など) |

## 1.5 公開ページのURL一覧(リンク控え・忘れたらここを見る)

### よく使うページ
| URL | 何のページか | 原本ファイル |
|---|---|---|
| https://taf-design.com/ | 公式トップ | `index.html`(静的・Xserver直置き) |
| https://taf-design.com/lp/ | 広告LP(Meta広告の飛び先) | `lp/index.html`(静的) |
| https://taf-design.com/lp/service-guide.html | サービス資料(Web版・現行v28) | `lp/service-guide.html`(静的) |
| https://taf-design.com/lp/service-guide.pdf | サービス資料(PDF版) | `lp/service-guide-print.html`から生成 |
| https://taf-design.com/price/ | 料金表 | `docs/wp-blocks/price-block1-plans.html`+比較+block2+block3 |
| https://taf-design.com/order/ | 簡単見積もり | `docs/wp-blocks/v2_新/wp-order-form_v2.html`(v2)/現行は`order.html` |
| https://taf-design.com/budget/ | 予算から選ぶ(※名刺QRの飛び先) | `docs/wp-blocks/budget.html`+先頭に`budget-welcome-block.html` |
| https://taf-design.com/offer2/ | 無料相談・資料請求フォーム | `docs/wp-blocks/v2_新/wp-offer2-form_v2.html`(v2)/現行は`offer2.html` |
| https://coconala.com/users/5777255 | ココナラ(プロフィール・全リンクの飛び先) | — |

### プラン詳細ページ(料金表の「詳しくはこちら」の先)
| URL | 何のページか | 原本ファイル |
|---|---|---|
| https://taf-design.com/lp-hp2/ | LP・HP制作プラン(2万円〜) | `docs/wp-blocks/lp-hp2.html` |
| https://taf-design.com/hp3/ | WordPress HP制作プラン(3.3万円〜) | `docs/wp-blocks/hp3.html` |
| https://taf-design.com/app2_9/ | 専用AIアプリ制作(2.9万円〜) ⚠️アンダースコア。app2-9はリンク切れ | `docs/wp-blocks/app2_9.html` |
| https://taf-design.com/lp7/ | 成約特化LP・プロ制作(7万円〜) | `docs/wp-blocks/lp7.html` |
| https://taf-design.com/lp15/ | ファネル一元化(15万円〜) | `docs/wp-blocks/lp15.html` |
| https://taf-design.com/ad/ | 広告運用・集客サポート | `docs/wp-blocks/ad.html` ※価格表記の修正が宿題 |

### その他のページ
| URL | 何のページか | 原本ファイル |
|---|---|---|
| https://taf-design.com/backup/ | サイトまるごとバックアップパック | `docs/wp-blocks/backup.html` |
| https://taf-design.com/maintenance/ | 保守・管理プラン | `docs/wp-blocks/maintenance.html` |
| https://taf-design.com/pdf-backup/ | 購入者向けマニュアル(パスワード保護) | `docs/wp-blocks/pdf-backup.html` |
| https://taf-design.com/contact/ | お問い合わせ(窓口の振り分けハブ) | `docs/wp-blocks/contact.html` |
| https://taf-design.com/coupon/ | クーポンページ ⚠️クーポンは終了済み。ページの非公開化を検討 | `docs/wp-blocks/coupon.html` |
| https://taf-design.com/kiyaku/ | 利用規約 | WP直接編集(Git管理外) |
| https://taf-design.com/tokushoho/ | 特定商取引法に基づく表記 | WP直接編集(Git管理外) |
| https://taf-design.com/privacy-policy/ | プライバシーポリシー | WP直接編集(Git管理外) |
| https://lin.ee/pqfXTUJ | 公式LINE | — |

> 詳しい対応表(部品ファイル・リネーム履歴含む)は `docs/wp-page-map.md`

## 2. 今の状態(2026-08-25時点)

### ブログ追記（2026-09-26）

記事05「会員サイトを作る前に決めたい5つのこと」のHTML・画像2枚・WP設定・投稿手順を保存。公開は未確認。重複防止の一覧は [ブログ記事台帳](docs/blog-posts/README.md)。同じ番号の下書き・noteは別テーマとして数えない。


| ページ | 公開中 | v2の状態 |
|---|---|---|
| 公式トップ taf-design.com | **リポジトリ=v2済み**。Xserverアップ待ち | 🔄 切り替え実行中(2026-08-25) |
| 資料 /lp/service-guide.html | 公開中=v27。**リポジトリ=v44**(検索案内は広告LPのみ・資料は据え置き)。Xserverアップ待ち | 🔄 lp/service-guide.html をアップすれば完了 |
| 資料PDF /lp/service-guide.pdf | 現行版 | ⏳ 未生成(大村さんがprint_v2から生成) |
| /order/(WP) | `docs/wp-blocks/order.html` 相当(電話相談入り) | ✅ 準備完了・未実行(`v2_新/wp-order-form_v2.html`・フォーム下にココナラ案内入り) |
| /price/(WP) | 4ブロック構成で公開中(料金プラン+比較+共通事項+FAQ) | ✅ 比較セクション設置済み(2026-08-25)。ページ本体v2はチャット側Claude担当 |
| /offer2/(WP) | `docs/wp-blocks/offer2.html` 相当 | ✅ 準備完了・未実行(`v2_新/wp-offer2-form_v2.html`) |
| /budget/ ほかWP下層 | 現行のまま | ⏳ ようこそブロック準備済み(名刺QR対応・`budget-welcome-block.html`)。ページ本体v2はチャット側Claude担当 |
| 広告LP /lp/index.html | 現行のまま | v2対象外(Meta広告改善は別途) |

**v2の中身**: ①ココナラをしっかり宣伝(全レビュー星5・最高ランク/決済はココナラが納品まで預かる/購入者手数料注記) ②直販優先(「HP・LP・仕組みを育てたい方は直接ご依頼・優先対応」) ③新料金体系(LP2万(税込)=基本7セクション・メニュー/簡易フォーム/WP納品標準込み、HP3.3万=検索・AI検索対策の基本込み、24hラフ案+5,000円(税込)、Google解析セット+5,000円(税込)) ④クーポン記述の全削除

## 3. 次にやることチェックリスト(上から順に)

- [x] ブログ05の投稿セットと記事台帳を作成（2026-09-26）
- [ ] ブログ05をWPで公開し、実URL・画像URL・日時を記事台帳と原稿へ反映
- [ ] ブログ05の公開後SEO・構造化データ・Search Console確認


- [x] ~~GitHubへpush~~(2026-08-25 完了。大村さんがローカル経由で反映)
- [x] ~~ココナラURLの確定~~(2026-08-25 プロフィールページで確定・全箇所反映済み)
- [x] ~~オプション+5,000円の表記~~(2026-08-25 「5,000円(税込)」で確定。ココナラと同条件・比較表と一致)
- [x] ~~wp-offer2-form_v2.html~~(2026-08-25 AIが新規作成。現行offer2+はじめての方へブロック+クーポン文言削除)
- [ ] **v2の内容最終確認**(大村さん: index_v2 / service-guide_v2 をブラウザで確認)
- [ ] **PDF v2生成**(大村さん: `lp/service-guide-print_v2.html` から。手順は下記5)
- [ ] **切り替え実行中(2026-08-25開始)**: 静的の中身入れ替え済み(AI)。残り→ ①大村さん: index.html と lp/service-guide.html をXserverへアップ ②PDF生成してアップ ③WPの3ブロック貼り替え(order/price比較/offer2) ④v30確認・スマホテスト
- [ ] **メールの貼り替え(大村さん・MailPoet/CF7)**: 2026-08-25にメール原稿を全改稿済み(クーポン記述の全削除+ココナラ案内追加)。以下を新原稿で貼り替え→ ①CF7自動返信(原稿: docs/email-service-guide-allin1.md セクション4) ②MailPoetステップメール1〜3(docs/step-mail-01-03.md) ③メルマガ03は「注文方法」テーマに刷新(docs/newsletter/03-newsletter-order-methods-mailpoet-copy.md)。旧版は docs/mail_v1_coconala以前/ に保存済み
- [ ] **/budget/ 最上部に「ようこそブロック」を貼る(大村さん)**: `docs/wp-blocks/budget-welcome-block.html` をカスタムHTMLブロックとして1つ目に追加(グループに入れない)。名刺QRからの初見の方向け
- [ ] 切り替え後: `docs/price-master.md` にv2料金体系を反映(AI)
- [ ] /price/ /budget/ ページ本体のv2(チャット側Claude担当。二重作業防止のためこのセッションでは作らない)
- [ ] **TAF-V2meta-LPのArchive化**(下記7。統合に問題がないと確認できてから)
- [ ] (任意)`images/hero-01〜05`・`hero-bg-texture`(未使用素材)を使うか判断

### 2026-08-25の教訓メモ(/price/ 左寄り問題の顛末)
- 料金プランブロックが広い画面で左に寄る症状は、ブロック内のCSSではなく、**WPエディタ上で料金ブロックだけ「グループ(全幅/幅広)」に3重に入れ子**になっていたのが原因。リスト表示→グループ解除で解決済み
- 料金プランのデザインCSS(SWELL干渉リセット版)は、WPCodeや追加CSSではなく**/price/ページのブロック内**にある
- 今後ブロックを貼るときは、**グループに入れず、他ブロックと同じ階層に置く**こと

## 4. v2切り替え実行手順(当日、上から実行するだけ)

> **鉄則: 公開URL・ファイル名は絶対に変えない。「中身を入れ替える」方式のみ。**(ファイル名での切り替えはURL・SEOが壊れるので禁止)

### 静的ページ(Xserver)
> ⚠️ **アップ前に必ず**: PowerShellで `cd $env:USERPROFILE\Desktop\taf-official-push` → `git pull origin main` を実行して、フォルダを最新にすること(AIの直接push分はこれをしないとPCに降りてこない)

1. AIに「v2切り替えを実行して」と言う → AIが `index_v2.html` の中身を `index.html` へ、`service-guide_v2.html` の中身を `service-guide.html` へコピーしてコミット(v1金庫はそのまま残る)
2. 大村さん: `index.html` を `/public_html/` へ、`lp/service-guide.html` を `/public_html/lp/` へ上書きアップロード
3. 大村さん: 生成済みの新 `service-guide.pdf` を `/public_html/lp/` へ上書きアップロード
4. 確認: 資料ページの表紙下部に **「v44」** が見えたら反映成功

### WordPress(大村さんが貼る)
5. `/order/` のカスタムHTMLブロックに `docs/wp-blocks/v2_新/wp-order-form_v2.html` の全文を貼り替え
6. `/price/` の料金表の下に、カスタムHTMLブロックを追加して `docs/wp-blocks/price-compare-coconala.html` の全文を貼る(※2026-08-25貼り付け済み)
7. `/offer2/` のカスタムHTMLブロックに `docs/wp-blocks/v2_新/wp-offer2-form_v2.html` の全文を貼り替え
8. スマホ実機で確認: 表示崩れ/orderフォームの送信テスト(LINE・メール両方)/電話相談欄が出ること

## 5. PDF生成の手順(大村さん担当・サーバー生成禁止)

> **理由: サーバーやAI環境で生成するとフォントが変わってしまうため、必ず大村さんのPCで生成する。**

1. `docs/originals/service-guide-print.html` をChromeで開く
2. 印刷(Ctrl+P)→ 送信先「PDFに保存」→ 用紙A4・余白なし・**背景のグラフィック ON**
3. `service-guide.pdf` という名前で保存(ファイル名は変えない)

## 6. ロールバック手順(v2→v1に戻す。所要5分・データ消失なし)

1. AIに「v1に戻して」と言う → AIが `docs/originals/index_v1_coconala以前.html` の中身を `index.html` へ、`docs/originals/service-guide_v1_coconala以前.html` の中身を `service-guide.html` へ戻してコミット
2. 大村さん: 上記2ファイルをXserverへ上書きアップロード(+旧PDFを戻す)
3. WordPress: `/order/` に `docs/wp-blocks/order.html`(現行の正・電話相談入り)を全文貼り直し
   ※注意: `v1_現行/wp-order-form_v1.html` は7/31版(電話相談なし)なので**使わない**
4. `/price/` から比較セクションのブロックを削除

## 7. TAF-V2meta-LPのArchive化手順(統合確認後・大村さん操作)

1. https://github.com/810eigo-droid/TAF-V2meta-LP → Settings
2. 一番下の「Danger Zone」→ **Archive this repository** → リポジトリ名を入力して確定
3. これで読み取り専用になる(削除ではない。いつでも解除可能。過去の履歴・backup/v1-originalブランチも残る)

## 8. 運用ルール(全員・AI含む)

- **編集の起点はGitHub**。AIが編集→push→大村さんがXserver/WPへ反映。二重編集禁止(ローカルで編集した時は必ずAIに伝えてGitへ同期)
- コミットは日本語のわかりやすいメッセージ+**同じコミットでこのREADMEの「今の状態」「チェックリスト」を更新**
- **v1系(_v1_coconala以前・wp-blocks/v1_現行)は編集禁止の金庫**。v2切り替え後も削除しない
- `service-guide.html` は変更のたびにフッターのバージョン印を上げる(反映確認用。原稿=v44)
- リンクは**同一タブが原則**(`target="_blank"`禁止。例外: tel/mailto/sms/LINEのみ)
- **価格の原本は `docs/price-master.md` だけ**。価格を書く時は必ず同期
- **書いてはいけないこと**: クーポン(終了済み)/「返金保証」(正しくは「お支払いはココナラが納品まで預かる仕組み」)/SEO順位や広告成果の保証・誇張/「審査対応」という言葉
- ココナラの手数料は具体的な%を書かない(改定に耐えるよう「所定の購入者手数料」と書く)
- teach-funnel-site リポジトリは対象外(触らない)

<!-- 記事05画像更新 2026-09-26 -->
記事05のWP用画像はWebPへ変更。アイキャッチ180,196 bytes、本文図解120,560 bytes（合計約92%削減）。PNGは原本として保管し、投稿にはWebPを使用。本文の画像参照・投稿手順も更新済み。

記事05：ユーザーから本文図解・アイキャッチのWordPressメディアURLを受領し、本文HTMLの画像srcへ反映（2026-09-26）。投稿の公開は未確認。

記事05デザイン更新：カード型の5項目一覧、クリックできる目次、各章のメモ欄、販売方法の比較カード、相談前チェックリストを追加。PCブラウザで表示と目次リンク動作を確認。600px以下は縦組みになるCSSを実装。実際のWPテーマ上でのプレビューはユーザー確認待ち。投稿済みWebPのURLを継続使用。

記事04：指定された理由図解を税込20,000円に修正。新画像と記録は docs/blog-posts/04-homepage-20000-yen/04-price-image-update.md。WP差し替え未実施。

記事04：ユーザー提供HTMLを税込20,000円へ改訂し目次追加。本文内の旧価格画像はHTML図解へ置換。WPのアイキャッチ・OG差し替えと公開確認は未完了。

記事04の理由図解：ユーザー提供のアップロード済みURL https://taf-design.com/wp-content/uploads/2026/09/04-homepage-20000-reason.webp を本文へ反映。代替HTML図解を画像に置換。アイキャッチ・OGは別画像のため未更新。WP公開未確認。

## 2026-09-26 HPブログ自動表示

- [x] HP下部に最新6件と全記事一覧を作成。プラグイン追加不要。
- [x] 公開済み5記事をREST APIで確認・台帳JSONへ記録。
- [ ] 本番へ配布版4ファイルを反映し、PC・スマホを確認。
- 詳細: [反映手順](docs/blog-workflow/homepage-blog-feed.md)。本番HPとGitトップに差分があるため配布版は本番取得HTMLを使用。

2026-09-26表示改訂：ブログをPC3列×最大2行・スマホ2列に変更。CSS/JSをHTMLにも内蔵。公開HPではブログ欄未反映を確認。本番アップロード待ち。

## 知りたいことから探す（2026-09-26追加）
画像は最新6件、その下に全公開記事へのタイトルリンクを表示。既存5記事は内容に合う短いラベルを指定（Postmaster記事は迷惑メール率の確認）。新記事は公開時に投稿タイトルで自動追加される。短い専用ラベルを付ける場合は js/blog-feed.js のtopicLabelsとHTML内蔵版を同期。APIは100件ずつ全ページ取得し、成功時のみ一覧を更新。通信失敗時は既存リンクを維持。PCはタイトル一覧2列・スマホ1列（画像カードは3列・2列のまま）。本番反映は未実施。
アップロードするHPは配布フォルダ直下のindex.html。一覧ページ用はarticles/index.html。両者を取り違えないこと。

## 2026-09-26 記事04・無料URL公開の追記
正本: docs/blog-posts/04-homepage-20000-yen/04-homepage-22000-wordpress.html。
HTML版限定で初回設置3,300円（税込）、制作20,000円からと合わせて23,300円（税込）から。無料URLと公開スペースは無料プラン条件内で月額0円。お客様名義のアカウントを利用。WordPress版は対象外。独自ドメイン費・追加修正等は別途。
冒頭・料金表・新章・目次・FAQ・まとめを同期。公開日は2026-08-13のまま、APIで確認済みの時刻にJSON-LDを合わせた。既存URLは変更しない。WPへの反映は未実施。
永続無料の保証と誤解されないよう「無料プランの条件内で月額0円」と表記。技術名は本文には出さない。
確認資料: https://developers.cloudflare.com/pages/platform/limits/ および https://developers.cloudflare.com/pages/framework-guides/deploy-anything/ （2026-09-26確認）。無料公開条件と付属URLを確認。

## 2026-09-26 料金の見せ方を訂正（本節を優先）
ユーザー指定で合算23,300円の案内を撤回。制作20,000円からと公開代行オプション初回3,300円を分離。冒頭は制作価格と公開作業別料金のみ。無料URLの月額0円と任意の設置代行を独立した枠で案内。旧合算は履歴としてのみ扱い再利用しない。WP反映は未実施。

2026-09-26復旧：ユーザー提供の正常版indexOLD.htmlを土台に、ブログのタイトル一覧・対応CSS/JSのみ追加して直下index.htmlを再作成。警告文混入なしを確認。ほかのHP構成は正常版を維持。
