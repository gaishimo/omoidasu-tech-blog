// @ts-ignore
const { parse } = require("date-fns")

exports.meta = {
  id: "2022-08-22-custom-font-weight",
  title: "React Nativeでカスタムフォントのweight設定をする",
  tagNames: ["react-native", "font", "カスタムフォント"],
  color1: "rgb(220, 220, 220)",
  color2: "rgb(120, 120, 120)",
  createdAt: parse(
    "2022-08-22 10:30:00 +09:00",
    "yyyy-MM-dd HH:mm:ss XXX",
    new Date(),
  ),
  author: "@gaishimo",
  description:
    "React Nativeでカスタムフォントを利用した時に、Textに指定したweightに応じて変化させる方法です。",
  imagePath: "/posts/2022-08-22-custom-font-weight/font-weights.jpeg",
  priority: 0.7,
  relatedPosts: ["2020-08-04-custom-font-line-gap"],
  lastUpdatedAt: parse(
    "2022-08-23 10:05:00 +09:00",
    "yyyy-MM-dd HH:mm:ss XXX",
    new Date(),
  ),
}
