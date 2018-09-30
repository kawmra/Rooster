# Rooster

タスク管理と日報生成を同時に行うやつ

## 使い方

1. このリポジトリをクローンします。
2. 全ての依存関係をインストールするために `yarn` コマンドを実行します。
3. `yarn start` コマンドで開発を開始するか、 `yarn build` コマンドでプロダクション版のバンドルを作成し、 `build/` ディレクトリをデプロイします。

## テンプレート

日報はテンプレートを使って生成します。

日報を生成する際に、以下のキーワードが対応する値に置き換えられます:

- `[[date]]`: 今日の日付 (yyyy/MM/dd)
- `[[dailyprojects]]`: 今日のタスク一覧
- `[[allprojects]]`: タスク一覧
- `[[starttime]]`: 出勤時刻 (HH:mm)
- `[[endtime]]`: 退勤時刻 (HH:mm)
- `[[resthours]]`: 休憩時間 (hours:minutes)
- `[[actualworkinghours]]`: 実働時間 (hours:minutes)
