# CYRA Official Site

AIアイドルプロジェクト「CYRA」の公式サイト用の静的サイト土台です。

## File Structure

```text
.
├── index.html
├── styles.css
├── script.js
├── assets/
│   ├── images/
│   │   └── .gitkeep
│   └── icons/
│       └── .gitkeep
└── data/
    ├── talents.js
    └── news.js
```

## Sections

- TOP
- TALENTS
- REINA
- NEWS

## Design Direction

今後のデザイン基準は、共有された以下の5枚の完成イメージに合わせます。

- HOME
- TALENTS
- REINA PROFILE
- NEWS
- MOBILE VIEW

優先順位は、機能追加よりも以下を上位に置きます。

- レイアウト
- 世界観
- ネオン演出
- 余白感
- スマホ表示対応

## Data

タレント情報は `data/talents.js`、ニュース情報は `data/news.js` に分離しています。
画像を差し替える場合は `assets/images/` に画像を追加し、`image` の値を変更してください。

例:

```js
image: "./assets/images/talents/reina/webside/profile.png.jpg";
```

主な画像差し替え先:

```text
assets/images/logo/cyra-logo.png.png
assets/images/backgrounds/city-wide.png.png
assets/images/backgrounds/city-vertical.png.png
assets/images/headquarters/hp-exterior.png.png
assets/images/headquarters/hp-lobby.png.png
assets/images/news/cyra-official-website-open.png
assets/images/news/reina-profile-release.png
assets/images/news/cyra-project-start.png
assets/images/upcoming/.gitkeep
assets/images/talents/reina/webside/main.png.png
assets/images/talents/reina/webside/card.png.png
assets/images/talents/reina/webside/profile.png.jpg
assets/images/talents/reina/webside/street-01.png.png
assets/images/talents/reina/webside/live-01.png.png
assets/images/talents/reina/webside/live-02.png.png
assets/images/talents/reina/webside/live-03.png.png
```

`assets/images/talents/reina/rerference/` 内の画像は制作資料として保持し、サイト表示には使用しません。
現在の実フォルダ名と実ファイル名に合わせて `webside/*.png.png`、`profile.png.jpg` を参照しています。後で `website/*.png` へ整理する場合は、`data/talents.js`、`data/news.js`、`styles.css`、`index.html` のパスも合わせて変更してください。

`assets/images/headuarters/` に入っていたCYRA紹介素材は、指定フォルダ名に合わせて `assets/images/headquarters/` にコピーしています。サイト表示では `headquarters` 側を使用します。

NEWSサムネイルは `data/news.js` の `thumbnail` にパスを持たせます。NEWS画像は必ず `assets/images/news/` 内の横長画像を使用し、縦画像はNEWSサムネイルには使用しません。未配置の場合はプレースホルダー表示になります。

画像の役割:

- `assets/images/news/`: NEWS記事ごとの横長サムネイル専用
- `assets/images/backgrounds/`: ページ背景、装飾背景、NEWSページ右側ビジュアル背景専用
- `assets/images/upcoming/`: 将来のCOMING SOONタレント用画像置き場

UPCOMINGセクションは、画像が無い間はテキストのみ表示します。将来画像を使う場合も `assets/images/upcoming/` を参照し、タレント個別画像は流用しません。

## Development Notes

今は1ページ構成ですが、各セクションのIDとデータファイルを分けているため、後から以下のようなページ分割に移行しやすい構成です。

```text
pages/
├── talents.html
├── reina.html
└── news.html
```

ローカルで確認する場合は `index.html` をブラウザで開いてください。
