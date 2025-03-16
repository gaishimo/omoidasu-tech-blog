// @ts-ignore
const { parse } = require("date-fns")

exports.meta = {
  id: "2020-06-13-blog-opened",
  title: "Omoidasu Techブログを開設しました!",
  tagNames: ["blog", "next.js", "mdx"],
  color1: "#00D5FF",
  color2: "#FFE641",
  createdAt: parse(
    "2020-06-13 00:00:00 +09:00",
    "yyyy-MM-dd HH:mm:ss XXX",
    new Date(),
  ),
  author: "@gaishimo",
  description: "ブログを新たに開設しました。",
  imagePath: "/ogImage.png",
  relatedPosts: ["2021-09-24-blog-rn-web", "2022-08-07-rn-skia-in-blog"],
  lastUpdatedAt: parse(
    "2022-08-16 15:16:06 +09:00",
    "yyyy-MM-dd HH:mm:ss XXX",
    new Date(),
  ),
}
