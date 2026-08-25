# TAF Design 司令塔README(統合リポジトリ)

> **このファイルだけ見れば「今の状態・次にやること・実行手順」が全部わかる。**
> 最終更新: 2026-08-25 ｜ 更新ルール: 変更コミットと同じコミットでこのREADMEの「今の状態」「チェックリスト」を必ず更新する
> 旧 TAF-V2meta-LP リポジトリの内容は 2026-08-25 に本リポジトリへ統合済み

---

## 0. 【いちばん使う】AIの作業をGitHubに反映する4コマンド(大村さん用)

> AIが作業を終えるたびに、これをPowerShellで実行するとGitHub本体(このリポジトリのmain)に反映される。
> **必ず1行ずつ**貼り付けてEnter(まとめて貼るとコマンドがくっついて失敗しやすい)。
> 貼り付け時に警告ダイアログが出たら「強制的に貼り付け」でOK。

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

**成功のサイン**: 3行目で `Fast-forward`、4行目で `main -> main` と表示される。
(4行目が `Everything up-to-date` の場合は、3行目のFast-forwardが実行されていない。3行目からやり直す)

- デスクトップに `taf-official-push` フォルダが無いときは、先にこれ1行でGitHubから自動作成される:
  `git clone https://github.com/810eigo-droid/taf-design-official-hp.git $env:USERPROFILE\Desktop\taf-official-push`
- エラーが出たら、**何もせず画面をそのままAIに見せる**(強制push等は絶対にしない)
- ※これはAIの直接push権限が復旧するまでの中継手順。復旧後はAIが直接pushするので不要になる

## 1. リポジトリの構成(どこに何があるか)

| 場所 | 中身 |
|---|---|
| `index.html` + `css/` + `js/` + `images/` | **公式HPトップ(公開中=v1)**。Xserver `/public_html/` に手動アップ |
| `index_v2.html` | トップのココナラ対応版(**準備完了・未実行**) |
| `index_v1_coconala以前.html` | v1の金庫(**編集禁止**) |
| `lp/` | **広告LP+サービス資料一式**。Xserver `/public_html/lp/` と1:1対応 |
| `lp/service-guide.html` | 公開中の資料(v25) |
| `lp/service-guide_v2.html` | 資料のココナラ対応版・v26(**準備完了・未実行**) |
| `lp/service-guide-print_v2.html` | A4印刷原稿のv2。**PDFはここから大村さんが生成** |
| `lp/◯◯_v1_coconala以前.html` | v1の金庫(**編集禁止**) |
| `docs/wp-blocks/` | WordPress貼り付け用の控え(order・price-block1〜3 ほか) |
| `docs/wp-blocks/v2_新/` | **切り替え当日に貼るv2ファイル**(orderフォーム・offer2フォーム) |
| `docs/wp-blocks/price-compare-coconala.html` | /price/の直販/ココナラ比較セクション(現行・price-block1の直下に設置) |
| `docs/wp-blocks/v1_現行/` | WPブロックの金庫(**編集禁止**) |
| `docs/price-master.md` | **価格の原本(唯一の正)**。価格を書くときは必ずここに同期 |
| `docs/` その他 | 引き継ぎ資料・ブログ原稿・メルマガ・法務など |
| `AGENTS.md` | AI向けの最上位作業ルール(ブログ品質基準など) |

## 2. 今の状態(2026-08-25時点)

| ページ | 公開中 | v2の状態 |
|---|---|---|
| 公式トップ taf-design.com | **リポジトリ=v2済み**。Xserverアップ待ち | 🔄 切り替え実行中(2026-08-25) |
| 資料 /lp/service-guide.html | **リポジトリ=v27済み**(ココナラ誘導バナー・戻るボタン入り)。Xserverアップ待ち | 🔄 切り替え実行中(2026-08-25) |
| 資料PDF /lp/service-guide.pdf | 現行版 | ⏳ 未生成(大村さんがprint_v2から生成) |
| /order/(WP) | `docs/wp-blocks/order.html` 相当(電話相談入り) | ✅ 準備完了・未実行(`v2_新/wp-order-form_v2.html`) |
| /price/(WP) | `price-block1〜3` | ⏳ 比較セクションのみ準備済み。ページ本体v2はチャット側Claude担当 |
| /offer2/(WP) | `docs/wp-blocks/offer2.html` 相当 | ✅ 準備完了・未実行(`v2_新/wp-offer2-form_v2.html`) |
| /budget/ ほかWP下層 | 現行のまま | 対象外(必要になったら計画) |
| 広告LP /lp/index.html | 現行のまま | v2対象外(Meta広告改善は別途) |

**v2の中身**: ①ココナラをしっかり宣伝(全レビュー星5・最高ランク/決済はココナラが納品まで預かる/購入者手数料注記) ②直販優先(「HP・LP・仕組みを育てたい方は直接ご依頼・優先対応」) ③新料金体系(LP2.2万=基本7セクション・メニュー/簡易フォーム/WP納品標準込み、HP3.3万=検索・AI検索対策の基本込み、24hラフ案+5,000円(税込)、Google解析セット+5,000円(税込)) ④クーポン記述の全削除

## 3. 次にやることチェックリスト(上から順に)

- [x] ~~GitHubへpush~~(2026-08-25 完了。大村さんがローカル経由で反映)
- [x] ~~ココナラURLの確定~~(2026-08-25 プロフィールページで確定・全箇所反映済み)
- [x] ~~オプション+5,000円の表記~~(2026-08-25 「5,000円(税込)」で確定。ココナラと同条件・比較表と一致)
- [x] ~~wp-offer2-form_v2.html~~(2026-08-25 AIが新規作成。現行offer2+はじめての方へブロック+クーポン文言削除)
- [ ] **v2の内容最終確認**(大村さん: index_v2 / service-guide_v2 をブラウザで確認)
- [ ] **PDF v2生成**(大村さん: `lp/service-guide-print_v2.html` から。手順は下記5)
- [ ] **切り替え実行中(2026-08-25開始)**: 静的の中身入れ替え済み(AI)。残り→ ①大村さん: index.html と lp/service-guide.html をXserverへアップ ②PDF生成してアップ ③WPの3ブロック貼り替え(order/price比較/offer2) ④v26確認・スマホテスト
- [ ] 切り替え後: `docs/price-master.md` にv2料金体系を反映(AI)
- [ ] /price/ /budget/ ページ本体のv2(チャット側Claude担当。二重作業防止のためこのセッションでは作らない)
- [ ] **TAF-V2meta-LPのArchive化**(下記7。統合に問題がないと確認できてから)
- [ ] (任意)`images/hero-01〜05`・`hero-bg-texture`(未使用素材)を使うか判断

## 4. v2切り替え実行手順(当日、上から実行するだけ)

> **鉄則: 公開URL・ファイル名は絶対に変えない。「中身を入れ替える」方式のみ。**(ファイル名での切り替えはURL・SEOが壊れるので禁止)

### 静的ページ(Xserver)
1. AIに「v2切り替えを実行して」と言う → AIが `index_v2.html` の中身を `index.html` へ、`service-guide_v2.html` の中身を `service-guide.html` へコピーしてコミット(v1金庫はそのまま残る)
2. 大村さん: `index.html` を `/public_html/` へ、`lp/service-guide.html` を `/public_html/lp/` へ上書きアップロード
3. 大村さん: 生成済みの新 `service-guide.pdf` を `/public_html/lp/` へ上書きアップロード
4. 確認: 資料ページの表紙下部に **「v27」** が見えたら反映成功

### WordPress(大村さんが貼る)
5. `/order/` のカスタムHTMLブロックに `docs/wp-blocks/v2_新/wp-order-form_v2.html` の全文を貼り替え
6. `/price/` の料金表の下に、カスタムHTMLブロックを追加して `docs/wp-blocks/price-compare-coconala.html` の全文を貼る(※2026-08-25貼り付け済み)
7. `/offer2/` のカスタムHTMLブロックに `docs/wp-blocks/v2_新/wp-offer2-form_v2.html` の全文を貼り替え
8. スマホ実機で確認: 表示崩れ/orderフォームの送信テスト(LINE・メール両方)/電話相談欄が出ること

## 5. PDF生成の手順(大村さん担当・サーバー生成禁止)

> **理由: サーバーやAI環境で生成するとフォントが変わってしまうため、必ず大村さんのPCで生成する。**

1. `lp/service-guide-print_v2.html` をChromeで開く
2. 印刷(Ctrl+P)→ 送信先「PDFに保存」→ 用紙A4・余白なし・**背景のグラフィック ON**
3. `service-guide.pdf` という名前で保存(ファイル名は変えない)

## 6. ロールバック手順(v2→v1に戻す。所要5分・データ消失なし)

1. AIに「v1に戻して」と言う → AIが `index_v1_coconala以前.html` の中身を `index.html` へ、`lp/service-guide_v1_coconala以前.html` の中身を `service-guide.html` へ戻してコミット
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
- `service-guide.html` は変更のたびにフッターのバージョン印を上げる(反映確認用。公開原稿=v27)
- リンクは**同一タブが原則**(`target="_blank"`禁止。例外: tel/mailto/sms/LINEのみ)
- **価格の原本は `docs/price-master.md` だけ**。価格を書く時は必ず同期
- **書いてはいけないこと**: クーポン(終了済み)/「返金保証」(正しくは「お支払いはココナラが納品まで預かる仕組み」)/SEO順位や広告成果の保証・誇張/「審査対応」という言葉
- ココナラの手数料は具体的な%を書かない(改定に耐えるよう「所定の購入者手数料」と書く)
- teach-funnel-site リポジトリは対象外(触らない)
