# じゃんけん

- [APIを起動して](./janken-api/README.md)
- [UIを起動して](./janken-ui/README.md)
- じゃんけんぽん！

APIとUIをわざわざ起動するのが面倒な場合は`docker-compose`でもOK。
（`localhost:3000`を開いてじゃんけんぽん！）

```
docker-compose up -d
```

## おまけ

`extras`ディレクトリ以下に[APIのReactiveな実装](./extras/janken-api-reactive/README.md)や[APIのExpress実装](./extras/janken-api-express/README.md)、[UIのクラスを使ったReact実装](./extras/janken-ui-react-class-style/README.md)などがあります。

