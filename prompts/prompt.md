
ここからの指示では、以下の値は都度置き換えた上でお願いします。
$ARTICLE_ID=eas-devclient-testflight
$TITLE=EAS DevClientのTestFlight配布を試してみた

--

以下は前提です。

このプロジェクトは、ブログ用のプロジェクトです。
技術構成は、Next.js、React Native Webを使っています。pages/postsの下にmdxファイルがあり、そこに記事を起きます。mdx内にはReact Nativeのコンポーネントが埋め込めるようになっています。

主に内容はReact Nativeに関わる内容になります。

--

この後指示を出しますのでお待ち下さい。

## 前提




## 記事作成 (1)


新たな記事の雛形を作成したいです。
記事の作成は`yarn create-post $ARTICLE_ID` で行ってください。


## 記事作成 (2)

posts-meta/YYYY-MM-DD-$ARTICLE_IDが生成されました。
そのファイルを編集してください。

titleには、"$TITLE"を指定してください。

その他の内容は、posts-metaの他のファイルを参照し参考にしてください。


## カテゴリの設定

markdownの見出しを元に、このファイルのheadlinesを設定してください。
markdownが以下の見出し構造の場合、


```mdx
## Expo Modulesとはなにか?

## Expo Modulesの特徴

### SwiftとKotlinで記述できる

### 新アーキテクチャへの対応

## まとめ

```

headlinesは以下のような形式になります。

```ts
export const headlines = [
  { title: "Expo Modulesとは何か" },
  {
    title: "Expo Modulesの特徴",
    children: [
      { title: "SwiftとKotlinで記述ができる" },
      { title: "新アーキテクチャへの対応" },
    ]
  },
  { title: "まとめ" },
]
```


