# CYRA Official Site

CYRA（Cybernetic Youth Reality Agency）は、近未来の東京、ネオン街の片隅にある小さなAIアーティスト事務所兼クリエイティブスタジオの公式サイトです。

巨大企業や超高層本社ではなく、少人数のクリエイターが夜遅くまで制作しているような、リアルな規模感の未来的な音楽レーベル／AIアーティスト事務所として運用します。

CYRAは単なるAI画像置き場ではありません。AIアーティストが所属し、NEWS、SNS、LIVE SCREEN、プロフィール、世界観を通して「本当に存在していそうな事務所兼スタジオ感」を作るプロジェクトです。

## Current Status

- GitHub Pages公開用の静的サイト
- TOPには `CYRA LIVE SCREEN` を配置済み
- LIVE SCREEN動画パス: `assets/video/cyra-live-screen.mp4`
- NEWSは `data/news.js` で管理
- アーティスト情報は `data/talents.js` で管理
- HTMLへアーティストやNEWSを直接追加しない

LIVE SCREENの `video` タグでは、以下の属性を維持してください。

```html
autoplay muted loop playsinline preload="metadata"
```

`controls` は表示しない方針です。

## Main Files

```text
.
├── index.html
├── news.html
├── news-detail.html
├── styles.css
├── script.js
├── README.md
├── data/
│   ├── talents.js
│   └── news.js
└── assets/
    ├── images/
    └── video/
```

## Pages

- `index.html`
  - TOP
  - ARTISTS
  - PROFILE
  - NEWS
  - ACCOUNT / SIGNAL ID
- `news.html`
  - NEWS ARCHIVE
  - 全NEWS一覧
- `news-detail.html`
  - NEWS DETAIL
  - URL例: `news-detail.html?id=news-004`

PROFILEはレイナ専用ページではなく、`data/talents.js` の情報を使ってアーティストごとに表示を切り替える共通プロフィール表示です。

## Asset Folders

```text
assets/images/
├── logo/
├── backgrounds/
├── headquarters/
├── news/
├── talents/
└── upcoming/
```

### `assets/images/logo/`

CYRAロゴ用です。ヘッダーなど、ブランド表示に使う画像を置きます。

### `assets/images/backgrounds/`

TOP背景、ページ背景、装飾背景用です。NEWS記事サムネイルやアーティスト個別画像とは混在させません。

### `assets/images/headquarters/`

CYRA事務所・スタジオ・MISSION画像用です。

現在のCYRAは「未来都市の片隅にある小さなAIアーティスト事務所兼スタジオ」という方向性です。打ちっぱなしコンクリート、ネオン、ガラス会議室、撮影スペース、衣装ラック、少人数のクリエイター感、音楽レーベル感を重視します。

避ける方向性:

- 巨大本社
- 超巨大企業感
- 秘密基地すぎる雰囲気
- ハッカー集団感
- 巨大ホログラム本社感

### `assets/images/news/`

NEWSサムネイル専用です。

- 横長16:9推奨
- 縦画像はNEWSサムネイルに使わない
- `data/news.js` の `thumbnail` にパスを登録する
- ページ背景画像とは混在させない

例:

```js
thumbnail: "./assets/images/news/news-004.png";
```

### `assets/images/talents/`

各アーティスト画像用です。アーティストごとにフォルダを分けます。

例:

```text
assets/images/talents/reina/website/
assets/images/talents/neo/website/
```

サイト表示に使う画像は `website/` に置きます。制作資料や参考画像を置く場合は、サイト表示から参照しないようにしてください。

`webside`、`rerference`、`headuarters` などの旧誤字フォルダ名は使用しません。

### `assets/images/upcoming/`

将来アーティスト用です。COMING SOONアーティストの画像を追加する場合のみ使います。

現在は画像がない場合、COMING SOONはテキスト表示のみで問題ありません。既存アーティスト画像の流用はしません。

### `assets/video/`

LIVE SCREEN用の動画を置きます。

```text
assets/video/cyra-live-screen.mp4
```

このファイルを差し替えるだけで、TOPのライブスクリーンに反映される設計です。

## Current Artists

CYRAは人間アイドルの代替ではなく、AIアーティスト事務所兼クリエイティブスタジオです。各アーティストは個人活動を基本とし、将来的にコラボや共演が発生する構造です。

- `001` 夜永レイナ
- `002` 星環ネオ
- `003` COMING SOON
- `004` COMING SOON

### Artist Data

アーティスト情報は `data/talents.js` に追加します。HTMLへ直接カードやプロフィールを増やさないでください。

主な項目:

- `id`
- `name`
- `romaji`
- `color`
- `status`
- `image`
- `mainImage`
- `cardImage`
- `profile`
- `intro`
- `details`
- `sns`
- `gallery`

画像を追加・差し替えた場合は、実際のファイル名と `data/talents.js` のパスを必ず一致させてください。

### Artist Addition Policy

003以降を追加する場合は、名前決定前にSNS IDの空き確認を行います。

IDは可能なら以下のように統一感を優先します。

- `@cyra_名前`
- `@cyra.名前`

アーティストごとに世界観や役割を分け、夜永レイナや星環ネオのコピーにならないようにします。

## SNS Links

レイナ・ネオのTikTokとXはサイトからリンク済みです。

InstagramとYouTubeは将来用として `url: "#"` のまま残しています。存在しないSNS導線は急いで削除しなくて構いません。運用できるものから順次URLを差し替えます。

SNSリンクは `data/talents.js` の各アーティストの `sns` 配列で管理します。

## NEWS Operation

NEWSは `data/news.js` に追加します。HTMLへ直接NEWSカードを追加しないでください。

主な項目:

- `id`
- `date`
- `displayDate`
- `title`
- `body`
- `detailBody`
- `tag`
- `thumbnail`

`detailBody` はNEWS詳細ページ用の本文です。文字列配列で段落ごとに管理します。

```js
detailBody: [
  "段落1",
  "段落2",
  "段落3"
]
```

NEWS一覧や詳細ページは `data/news.js` の順番を基準に表示します。最新記事を上に出したい場合は、配列の上に追加してください。

### NEWS Thumbnail Rules

- NEWSサムネイルは `assets/images/news/` に置く
- 横長16:9推奨
- 縦画像は使わない
- ファイル名と `thumbnail` パスを一致させる

### TOP NEWS Policy

TOPにはNEWSカードを戻しません。TOPはCYRAの世界観とLIVE SCREENを優先します。

NEWSはNEWSセクション、NEWS ARCHIVE、NEWS DETAILで見られるようにします。

## ACCOUNT / SIGNAL ID

ACCOUNTは本物のログイン機能ではなく、将来的な会員機能へ拡張するための見た目と導線です。

現在はSIGNAL IDカード風の表示のみです。

- メール入力欄は作らない
- パスワード入力欄は作らない
- 登録処理は作らない
- データ保存処理は作らない
- Supabase / Firebase / 認証処理はまだ実装しない

将来、SIGNAL ID、限定コンテンツ、SIGNAL LOG、メンバーアクセスなどへ拡張する想定です。

## Design Direction

基本トーン:

- 黒背景
- ネオンピンク
- ネオンブルー
- ネオンパープル
- サイバーパンク × 可愛い
- AIアーティスト事務所兼クリエイティブスタジオ感
- 近未来の東京
- 雨上がりの夜
- 濡れた路面に反射するネオン

CYRAは「大企業の公式サイト」ではなく、「夜の都市に実在していそうな小さなAIアーティスト事務所／音楽レーベル／クリエイティブスタジオ」の空気を大切にします。

## Codex Operation Rules

Codexで作業する場合の基本ルールです。

- 変更箇所だけ反映する
- 既存レイアウト・デザイン・フォルダ構造を不用意に変更しない
- 必要な参照パスのみ更新する
- アーティスト追加は `data/talents.js` を使う
- NEWS追加は `data/news.js` を使う
- HTMLにアーティストやNEWSを直接増やさない
- 画像の役割を混在させない
- `webside`、`rerference`、`headuarters` などの旧誤字フォルダ名を復活させない

## Local Check

静的サイトなので、基本的にはブラウザで `index.html` を開いて確認できます。

ローカルサーバーで確認する場合:

```bash
python -m http.server 4174
```

その後、以下を開きます。

```text
http://127.0.0.1:4174/
```
