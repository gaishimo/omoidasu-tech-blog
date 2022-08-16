const { parse } = require("date-fns")

exports.meta = {
  title: "三角関数計算ツール📐",
  tagNames: ["react-native-skia", "三角関数", "数学"],
  color1: "#7BEAD9",
  color2: "#C1FF93",
  createdAt: parse(
    "2022-08-09 12:00:00 +09:00",
    "yyyy-MM-dd HH:mm:ss XXX",
    new Date(),
  ),
  author: "@gaishimo",
  description:
    "三角関数の計算をおこなうためのツールをSkiaで作成してみました。角度と半径を元にsin, cosの計算を行います。",
  lastUpdatedAt: parse(
    "2022-08-09 12:00:00 +09:00",
    "yyyy-MM-dd HH:mm:ss XXX",
    new Date(),
  ),
}
