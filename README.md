# hotaru — ポートフォリオ

ホタルのポートフォリオサイトです。HTML / CSS / JavaScript だけで作った静的サイトで、ビルドや依存パッケージは不要です。

## 開き方

`index.html` をブラウザーで開いてください。

## 内容の差し替え

- `index.html`: 自己紹介、スキル、連絡先
- `script.js`: 制作物（`works` 配列）。現在はサンプルです
- `style.css`: 色（`:root` の変数）、レイアウト

制作物をクリックすると詳細ダイアログが開きます（×ボタン・Escape・背景クリックで閉じる）。背景のホタルの光は、OSの「視差効果を減らす」設定がオンのときは表示されません。

## 公開

`main` へ push すると GitHub Actions（`.github/workflows/pages.yml`）が GitHub Pages へ自動公開します。

- URL: https://moai-okinawa.github.io/portfolio-hotaru/
- 公開対象: `index.html` `style.css` `script.js` `assets/`
