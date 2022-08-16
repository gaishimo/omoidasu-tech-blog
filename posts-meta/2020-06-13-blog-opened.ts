import { parse } from "date-fns"

export const meta = {
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
  lastUpdatedAt: parse(
    "2021-09-18 17:00:00 +09:00",
    "yyyy-MM-dd HH:mm:ss XXX",
    new Date(),
  ),
}
