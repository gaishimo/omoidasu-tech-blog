// @ts-ignore
const { parse } = require("date-fns")

exports.meta = {
  id: "2020-12-03-vercel-error",
  title:
    "Next.js Vercelデプロイ時にエラー should NOT have fewer than 1 properties",
  tagNames: ["vercel", "next.js"],
  color1: "#000000",
  color2: "rgb(150, 150, 150)",
  createdAt: parse(
    "2020-12-03 15:40:00 +09:00",
    "yyyy-MM-dd HH:mm:ss XXX",
    new Date(),
  ),
  author: "@gaishimo",
  description:
    "Vercelでデプロイした時にshould NOT have fewer than 1 propertiesと謎のエラーが出た場合の対処法です。",
  imagePath: null,
  lastUpdatedAt: parse(
    "2022-08-16 15:16:06 +09:00",
    "yyyy-MM-dd HH:mm:ss XXX",
    new Date(),
  ),
}
