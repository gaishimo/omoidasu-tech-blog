// @ts-ignore
const { parse } = require("date-fns")

exports.meta = {
  title: "Hello EAS Build! (Managed Workflow)",
  tagNames: ["expo", "react-native"],
  color1: "#6855F9",
  color2: "rgb(220, 220, 220)",
  createdAt: parse(
    "2021-06-04 17:05:00 +09:00",
    "yyyy-MM-dd HH:mm:ss XXX",
    new Date(),
  ),
  author: "@gaishimo",
  description:
    "最近サポートされた、EAS BuildのManaged Workflowビルドを試してみます。",
  imagePath: "/posts/2021-06-04-hello-eas-build-managed/updatedApp.jpeg",
  lastUpdatedAt: parse(
    "2021-09-18 17:00:00 +09:00",
    "yyyy-MM-dd HH:mm:ss XXX",
    new Date(),
  ),
}