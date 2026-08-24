# TAF-V2meta-LP

Meta広告用LP(無料相談・資料請求オファー版)。

- トンマナ: 白×薄いブルーグレー基調のSaaS系デザイン
  - ブルー `#00A2DE` = 機能・仕組み / オレンジ `#F6AC0E` = CTA・メリット / ピンク `#E82E6C` = 結果・感情訴求
- フォント: Noto Sans JP + Roboto Mono(英語ラベル用)
- フレームワーク不使用(HTML + Vanilla CSS + Vanilla JS)

## ファイル構成

```
├── index.html      … LP本体
├── css/style.css   … スタイル(冒頭の :root にデザイントークン)
├── js/main.js      … フェードイン / 追従CTAバー / 画像エラー処理
└── images/         … 制作実績画像(work-01〜11)ほか
```

## 公開前に差し替えが必要な箇所

1. **Meta Pixel**: `index.html` の `<!-- ▼▼ Meta Pixel -->` ブロックに正式なPixelスクリプトを挿入(noscriptのみ設置済み・ID: 1427280391720324)
2. **CTAリンク**: 現在すべて `https://taf-design.com/offer/` (無料相談ページ)に向けています。資料DL専用ページができたら差し替え
3. **OGP画像**: 旧クーポン版のFV画像を指定中。新トンマナ用の画像ができたら `og:image` を差し替え
