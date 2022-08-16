// @ts-ignore
const { parse } = require("date-fns")

exports.meta = {
  title: "ExpoのManaged Workflowでアプリ内課金を実装する",
  tagNames: ["expo", "react-native", "eas"],
  color1: "rgb(67,49,230)",
  color2: "rgb(200,50,50)",
  createdAt: parse(
    "2021-09-01 10:35:00 +09:00",
    "yyyy-MM-dd HH:mm:ss XXX",
    new Date(),
  ),
  author: "@gaishimo",
  description:
    "ExpoのEAS Buildで、Managed Workflowプロジェクトに対してアプリ内課金を実装する手順について説明します。",
  imagePath: "/posts/2021-08-28-eas-iap/expo-iap-image.png",
  lastUpdatedAt: parse(
    "2022-01-21 17:00:00 +09:00",
    "yyyy-MM-dd HH:mm:ss XXX",
    new Date(),
  ),
}
