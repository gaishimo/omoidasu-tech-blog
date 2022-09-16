// @ts-ignore
const { parse } = require("date-fns")

exports.meta = {
  id: "2022-09-11-dynamic-react-logo",
  title: "Reactのロゴをreact-native-skiaでアニメーションさせてみる",
  tagNames: [
    "react-native",
    "skia",
    "react-native-skia",
    "react",
    "アニメーション",
  ],
  color1: "#B1D6FC",
  color2: "#AABAF2",
  createdAt: parse(
    "2022-09-11 12:00:00 +09:00",
    "yyyy-MM-dd HH:mm:ss XXX",
    new Date(),
  ),
  author: "@gaishimo",
  description:
    "Reactロゴをreact-native-skiaでアニメーションさせて遊んでみました。楕円上を小さな円が周ります。",
  imagePath: "/posts/2022-09-11-dynamic-react-logo/react-logo.png",
  priority: 0.7,
  relatedPosts: [],
  lastUpdatedAt: parse(
    "2022-09-16 09:00:00 +09:00",
    "yyyy-MM-dd HH:mm:ss XXX",
    new Date(),
  ),
}
