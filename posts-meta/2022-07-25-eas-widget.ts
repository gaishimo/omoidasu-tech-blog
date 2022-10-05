// @ts-ignore
const { parse } = require("date-fns")

exports.meta = {
  id: "2022-07-25-eas-widget",
  title: "Expo (EAS Build)でAndroid・iOSのWidgetを作成した",
  tagNames: ["react-native", "expo", "EAS Build", "widget", "extension"],
  color1: "#1977f2",
  color2: "rgb(100, 120, 180)",
  createdAt: parse(
    "2022-07-24 11:45:00 +09:00",
    "yyyy-MM-dd HH:mm:ss XXX",
    new Date(),
  ),
  author: "@gaishimo",
  description:
    "ExpoのManaged WorkflowでWidget(iOS / Android)を作成する方法について説明します。",
  imagePath: "/posts/2022-07-25-eas-widget/widget_image.webp",
  priority: 0.8,
  relatedPosts: [
    "2021-08-29-eas-iap",
    "2022-10-05-eas-managed-os-versions",
    "2021-06-04-hello-eas-build-managed",
  ],
  lastUpdatedAt: parse(
    "2022-08-25 10:05:00 +09:00",
    "yyyy-MM-dd HH:mm:ss XXX",
    new Date(),
  ),
}
