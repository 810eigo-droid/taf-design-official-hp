# taf-design.com DNSレコード台帳(だいちょう)

> 管理場所: エックスサーバー サーバーパネル >「DNSレコード設定」> taf-design.com
> ネームサーバー: エックスサーバー(NS向き先=エックスサーバー。設定状況「正常」)
> このファイルの目的: **どのDNSレコードが何用で、消していいか**を一覧で分かるようにする
> 更新ルール: DNSに行を足したり消したりしたら、ここも必ず更新する

---

## 関連アカウント(メール到達まわり)

| 用途 | サービス | 使用アカウント | メモ |
|---|---|---|---|
| Postmaster Tools | Google Postmaster Tools | **810eigo@gmail.com** | 2026-07-22 登録・ドメイン所有権確認済み |
| サーバー/DNS | エックスサーバー | (契約1つ) | taf-design.com はこの契約に載っている |
| DMARCレポート受信 | info@taf-design.com | → **810eigo@gmail.com** へ転送済み | レポートはいつものGmailに届く |
| メール配信SMTP | Brevo(外部SMTP) | 登録アドレス **info@taf-design.com** | 2026-07-22 アカウント作成。会社名「TAF design」/ サイト taf-design.com |

> ※ このファイルは Public リポジトリに置いています。アドレスを伏せたい場合は
> `810eigo[at]gmail.com` のような表記に変更可。

---

## 現在のDNS TXTレコード一覧(メール認証・所有権)

### ① Postmaster Tools 所有権確認用

| 項目 | 値 |
|---|---|
| ホスト名 | (空欄 = taf-design.com 自体) |
| 種別 | TXT |
| 内容 | `google-site-verification=bREIECxwLfXhaR3-o38eqohdTrgyO6U5a760XVUvqss` |
| TTL | 3600 / 優先度 0 |
| 追加日 | 2026-07-22 |
| 用途 | Google Postmaster Tools のドメイン所有権確認 |
| **消していい?** | ❌ **絶対に消さない**(消すとPostmasterの認証が外れる) |

### ② SPF(メール送信元の認証)

| 項目 | 値 |
|---|---|
| ホスト名 | (空欄) |
| 種別 | TXT |
| 内容 | `v=spf1 ... ~all`(エックスサーバー標準。元からある行) |
| 用途 | このドメインのメールを「どのサーバーから送るか」の宣言 |
| **消していい?** | ❌ 消さない。**1ドメインに1行だけ**(2行あると逆にエラー) |

> 将来Brevo等の外部送信を足すときは、この行を**新規追加せず**、既存の行に
> `include:spf.brevo.com` を書き足す。

### ③ DKIM(電子署名)

| 項目 | 値 |
|---|---|
| ホスト名 | `<セレクタ名>._domainkey`(DKIM設定ONで自動追加) |
| 種別 | TXT |
| 内容 | `v=DKIM1; k=rsa; p=MIIB...`(公開鍵。自動生成) |
| 用途 | メール1通ごとの署名を受信側が照合するための公開鍵 |
| 設定方法 | サーバーパネル >「DKIM設定」で ON にする(手動レコード追加は不要) |
| 状態 | ☑ **ON(2026-07-22 確認。過去に設定済みだった)** |
| **消していい?** | ❌ 消さない |

### ④ DMARC(認証失敗時のポリシー+レポート)

| 項目 | 値 |
|---|---|
| ホスト名 | `_dmarc` |
| 種別 | TXT |
| 内容 | `v=DMARC1; p=none; rua=mailto:info@taf-design.com`(観測モード) |
| 用途 | SPF/DKIMに失敗したメールの扱い + レポートの受け取り |
| 設定方法 | サーバーパネル >「DMARC設定」機能を使う(手書き不要) |
| レポート届け先 | info@taf-design.com → 810eigo@gmail.com へ転送 |
| 状態 | ☑ **設定済み(2026-07-22 / ポリシー=何もしない p=none / レポートON)** |
| 段階 | **現在 p=none(観測)** → 1〜2ヶ月後 quarantine → reject |
| **消していい?** | ❌ 消さない |

---

---

## Brevo(外部SMTP)用に追加したDNSレコード(2026-07-22)

MailPoetの送信をBrevo経由にするため、Brevoの「ドメイン認証」で指示された
レコードをエックスサーバーに追加。**送信サブドメインは `send.taf-design.com`**。

| # | ホスト名 | 種別 | 内容(Value) | 状態 |
|---|---|---|---|---|
| 1 | `send` | CNAME | `send-taf-design-com.brand.brevosend.com` | ✅ 認証OK |
| 2 | (空欄=本体) | TXT | `brevo-code:5bea61c625b1d2214506166fb7228cf5` | ⏳ 反映待ち(本体TXTのTTL1h) |
| 3 | `brevo1._domainkey` | CNAME | `b1.taf-design-com.dkim.brevo.com` | ✅ 認証OK(Brevo DKIM) |
| 4 | `brevo2._domainkey` | CNAME | `b2.taf-design-com.dkim.brevo.com` | ✅ 認証OK(Brevo DKIM) |
| 5 | `img.send` | CNAME | `send-taf-design-com.img.brand.brevosend.com` | ✅ 認証OK(画像リダイレクト) |
| 6 | `r.send` | CNAME | `send-taf-design-com.r.brand.brevosend.com` | ✅ 認証OK(リンクリダイレクト) |

> **重要メモ:**
> - Brevoは `_dmarc`(`rua=mailto:rua@dmarc.brevo.com`)の追加も提案してきたが、
>   **追加しない**。DMARCは1ドメイン1レコードで、既存の④(info@宛)で
>   Brevoの要件も満たせている(Brevo画面で _dmarc は✅判定)。
> - **SPFは変更不要**。Brevoの新方式は送信サブドメイン(send)+CNAME型DKIMで
>   完結するため、ルートのSPFに `include:spf.brevo.com` を足す必要はない。既存SPFは触らない。
> - brevo-code だけ反映が遅いのは、ドメイン本体TXT(SPF等)の既存キャッシュ(TTL3600)が
>   切れるのを待つため。入力は正しい。約1時間後に Brevo で Verify → Authenticate。

---

## MailPoet ⇄ Brevo 接続設定(2026-07-22 動作確認済み)

WordPress管理画面 > MailPoet > 設定 > 送信方法 =「その他 → カスタムSMTP」で以下を設定。

| 項目 | 値 |
|---|---|
| 方法 | SMTPポート(その他) |
| SMTPホスト名 | `smtp-relay.brevo.com` |
| **SMTPポート** | **`465`**(587はエラー「Could not connect」。465で成功) |
| ログイン | `b2d340001@smtp-brevo.com`(Brevoが割当てたSMTP専用ログイン) |
| パスワード | Brevoの **SMTPキー**(`mailpoet-WIP2`)※秘密情報のため本ファイルには非記載 |
| 安全な接続 | SSL/TLS |
| 認証 | はい |
| 送信者アドレス | **info@taf-design.com**(gmail.comは絶対NG=DMARCで弾かれる) |

- ✅ テストメール送信成功(2026-07-22)。
- ⚠️ **送信頻度に注意**:MailPoet既定は 25通/5分=7,200通/日 だが、**Brevo無料枠は300通/日**。
  リストが300人を超えたら、MailPoetの送信頻度を下げる or 送信を分割する必要あり。現状(数件)は問題なし。
- 🔑 セキュリティ:設定中にチャットへ露出した旧SMTPキー `mailpoet`(古い方)はBrevoで削除し、
  `mailpoet-WIP2` のみ使用。SMTPキーはパスワード同等のためGit・公開の場には残さない。

## メモの書き方(今後この台帳を更新するときのコツ)

DNSは行がどんどん増えるので、1行ごとに **「用途」と「消していいか」をセット**で書く。
そうすれば後から「これ何の行だっけ?消していい?」で迷わない。

新しい行を足したら:
1. エックスサーバーのDNSレコード設定で追加
2. この台帳に ①②③④ と同じ形式で追記
3. Gitにコミット

---

## 更新履歴

- 2026-07-22 台帳作成。① Postmaster所有権TXT を追加(810eigo@gmail.com で登録)。
- 2026-07-22 ②SPF確認済み・③DKIM=ON確認・④DMARC=p=none設定完了。
  **SPF/DKIM/DMARC 3点セット完了。** DMARCレポートは info@→810eigo@gmail.com に届く。
  次アクション:1〜2ヶ月レポート観測 → 問題なければ p=quarantine へ引き上げ判断。
- 2026-07-22 **mail-tester で 10/10 満点**(SPF/DKIM/DMARC すべてPASS実測)。到達率の土台OK。
- 2026-07-22 Brevo 無料アカウント作成(会社名 TAF design / 登録 info@taf-design.com)。
  ※ 登録者氏名は公開リポジトリのため未記載(必要なら非公開メモへ)。
- 2026-07-22 Brevo用DNSレコード6件を追加(send/brevo1/brevo2/img.send/r.send + brevo-code)。
  6件中5件は即✅、brevo-code(本体TXT)のみ反映待ち。1時間後にVerify→Authenticate予定。
- 2026-07-22 Brevoドメイン認証完了(Authenticated + Branded)。
- 2026-07-22 **MailPoet ⇄ Brevo SMTP接続 完了・テスト送信成功**(ポート465/SSL-TLS)。
  送信者 info@taf-design.com。タスク3(MailPoet導入+Brevo接続)完了。
- 2026-07-22 Gmail(810eigo@gmail.com)の「info@taf-design.comとして送信」も
  mail-tester **10/10** で認証確認済み。手打ちメールも自動メールも満点体制。
- 2026-07-22 DMARCレポート(google.com発)が info@ 経由でGmailに届き始めた=レポート設定も稼働確認。
