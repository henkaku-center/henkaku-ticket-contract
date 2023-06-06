# web3-ticket-contract

このレポジトリはコントラクトのレポジトリです。[フロントエンドのレポジトリはこちら](https://github.com/yu23ki14/TicketFrontend)。

[LiveDemo のリンクはこちら](https://ticket-frontend-nine.vercel.app/)

### LiveDemo を触るための準備（PolygonMumbai）

１．PolygonMumbai をメタマスクに追加する
https://chainlist.org/chain/80001

２．PolygonMumbai の Matic を取得する
https://mumbaifaucet.com/

３．デモ用の ERC20 トークンを自分のアドレスに mint する
https://mumbai.polygonscan.com/address/0xDfd94651F711D42FE3f91b82295e136580E2ae0e#writeContract にアクセスして、mint 関数からテスト用のウォレットにデモ用のコミュニティトークンを mint する。小数点 18 桁に設定しているので、200000000000000000000 で 200DEMO を受け取ることができます。

４．デモ動画のようりょうで、チケットを販売し購入する

５．PushProtocol を用いてメッセージをやり取りするために PushProtocol の Testnet 環境にアクセスする
https://staging.push.org/chat

## 概要

これはチケットの NFT を発行するコントラクトです。

このチケット NFT ではオンライン、オフライン問わずイベントチケットをコントラクトに登録し、それを欲しい人がコミュニティトークンで Mint するようになっています。  
チケットの登録時には供給量（MaxSupply）、価格、収益受け取りアドレスなどを設定できるようになっています。また、NFT を持っている人しか見ることのできないシークレットメッセージを画像として登録できるので、会場の情報などを渡すこともできます。

購入者は主催者とテキストメッセージができるようになっているので、グッズの送付先や質問などのやり取りもできるようになっています。

## 開発について

### 開発環境

- Node.js: v16.x
- Hardhat

ローカルノードでの立ち上げ方法　([リンク](docs/local_node.md))

## ライセンス

本リポジトリは MIT ライセンスの元提供されています。

## コントリビュート

プルリクエスト歓迎です。まず Issue を作成して、提案内容を議論してください。
