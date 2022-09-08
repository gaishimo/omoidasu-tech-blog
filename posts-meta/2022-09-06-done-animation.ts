// @ts-ignore
const { parse } = require("date-fns")

exports.meta = {
  id: "2022-09-06-done-animation",
  title: "react-native-skiaでチェックマークアニメーションを実装する",
  tagNames: [
    "react-native",
    "skia",
    "react-native-skia",
    "アニメーション",
    "アニメーション再現",
    "模倣してみる",
  ],
  color1: "#7CA2FF",
  color2: "#0091FF",
  createdAt: parse(
    "2022-09-06 16:08:00 +09:00",
    "yyyy-MM-dd HH:mm:ss XXX",
    new Date(),
  ),
  author: "@gaishimo",
  description:
    "iOSでの購入時等に表示される、チェックマークが描かれるアニメーションを再現してみたいと思います。",
  imagePath: "/posts/2022-09-06-done-animation/check-mark.png",
  priority: 0.7,
  relatedPosts: ["2022-08-17-skia-arc", "2022-08-24-shrinking-circle"],
  lastUpdatedAt: parse(
    "2022-09-07 12:13:00 +09:00",
    "yyyy-MM-dd HH:mm:ss XXX",
    new Date(),
  ),
}
