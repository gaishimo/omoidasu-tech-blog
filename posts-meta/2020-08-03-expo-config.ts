import { parse } from "date-fns"

export const meta = {
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
    "Expoの設定ファイルをtypescriptで動的に書くやり方について説明します。",
  imagePath: "/ogImage.png",
  lastUpdatedAt: parse(
    "2021-06-04 18:00:00 +09:00",
    "yyyy-MM-dd HH:mm:ss XXX",
    new Date(),
  ),
}
