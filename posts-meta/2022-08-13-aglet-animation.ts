// @ts-ignore
const { parse } = require("date-fns")

exports.meta = {
  id: "2022-08-13-aglet-animation",
  title: "Agletの無限に斜め横に移動するアニメーションを再現してみる",
  tagNames: [
    "react-native-skia",
    "アニメーション",
    "アニメーション再現",
    "模倣してみる",
  ],
  color1: "#A615FF",
  color2: "rgb(210, 210, 210)",
  createdAt: parse(
    "2022-08-13 17:05:00 +09:00",
    "yyyy-MM-dd HH:mm:ss XXX",
    new Date(),
  ),
  author: "@gaishimo",
  description:
    "スニーカーを集めるアプリAgletで使われているアニメーションをreact-native-skiaで再現してみます。",
  lastUpdatedAt: parse(
    "2022-08-23 10:07:00 +09:00",
    "yyyy-MM-dd HH:mm:ss XXX",
    new Date(),
  ),
}
