// @ts-ignore
const { parse } = require("date-fns")

exports.meta = {
  id: "2020-08-03-expo-config",
  title: "Expoの設定(app.json)をtypescriptで動的に記述する",
  tagNames: ["expo", "react-native", "typescript"],
  color1: "#0887C3",
  color2: "#0DA4D3",
  createdAt: parse(
    "2020-08-03 00:00:00 +09:00",
    "yyyy-MM-dd HH:mm:ss XXX",
    new Date(),
  ),
  author: "@gaishimo",
  description:
    "Expoの設定ファイルをtypescriptで動的に書くやり方について説明します。アプリから環境変数を参照する方法についても記載します。",
  imagePath: "/ogImage.png",
  relatedPosts: [
    "2021-08-29-eas-iap",
    "2022-07-25-eas-widget",
    "2021-06-04-hello-eas-build-managed",
  ],
  lastUpdatedAt: parse(
    "2022-09-25 14:05:00 +09:00",
    "yyyy-MM-dd HH:mm:ss XXX",
    new Date(),
  ),
}
