// @ts-ignore
const { parse } = require("date-fns")

exports.meta = {
  title: "当ブログにReact Native for Webを導入しました",
  tagNames: ["react-native", "react-native-web", "next.js"],
  color1: "#1977f2",
  color2: "rgb(100, 120, 180)",
  createdAt: parse(
    "2021-09-25 10:50:00 +09:00",
    "yyyy-MM-dd HH:mm:ss XXX",
    new Date(),
  ),
  author: "@gaishimo",
  description: "当ブログ(Next.js)にReact Native for Webを導入しました。",
  imagePath: "/posts/2021-09-23-blog-rn-web/pressableExample.gif",
  lastUpdatedAt: parse(
    "2022-01-21 17:00:00 +09:00",
    "yyyy-MM-dd HH:mm:ss XXX",
    new Date(),
  ),
}