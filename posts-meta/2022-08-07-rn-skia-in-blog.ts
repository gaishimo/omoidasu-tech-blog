// @ts-ignore
const { parse } = require("date-fns")

exports.meta = {
  title: "ブログにreact-native-skiaを導入しました🎨",
  tagNames: [
    "react-native-skia",
    "next.js",
    "react-native",
    "skia",
    "react-native-web",
  ],
  color1: "#4CC8F0",
  color2: "#3B8FFD",
  createdAt: parse(
    "2022-08-07 11:12:00 +09:00",
    "yyyy-MM-dd HH:mm:ss XXX",
    new Date(),
  ),
  author: "@gaishimo",
  description:
    "2DグラフィックライブラリをReact Nativeで扱うためのreact-native-skiaを当ブログに導入しました",
  imagePath: "/posts/2022-08-07-rn-skia-in-blog/image.png",
  priority: 0.8,
  lastUpdatedAt: parse(
    "2022-08-08 09:15:00 +09:00",
    "yyyy-MM-dd HH:mm:ss XXX",
    new Date(),
  ),
}
