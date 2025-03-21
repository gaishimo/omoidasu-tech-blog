// @ts-ignore
const { parse } = require("date-fns")

exports.meta = {
  title: "AndroidのExpo ClientアプリをAPKで直接インストールする",
  tagNames: ["expo", "react-native"],
  color1: "#1364B1",
  color2: "#52BEC7",
  createdAt: parse(
    "2020-12-04 12:10:00 +09:00",
    "yyyy-MM-dd HH:mm:ss XXX",
    new Date(),
  ),
  author: "@gaishimo",
  description:
    "AndroidのExpo Clientアプリを、CLI(expo client:install:android)ではなく、APKを直接インストールする方法です。",
  imagePath: null,
  lastUpdatedAt: parse(
    "2022-08-16 15:16:06 +09:00",
    "yyyy-MM-dd HH:mm:ss XXX",
    new Date(),
  ),
}
