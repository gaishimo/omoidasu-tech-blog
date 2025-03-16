// @ts-ignore
const { parse } = require("date-fns")

exports.meta = {
  id: "2021-06-04-hello-eas-build-managed",
  title: "Hello EAS Build! (Managed Workflow)",
  tagNames: ["expo", "react-native", "EAS Build"],
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
  relatedPosts: [
    "2021-08-29-eas-iap",
    "2022-07-25-eas-widget",
    "2022-10-05-eas-managed-os-versions",
    "2022-09-27-eas-managed-exo-player",
  ],
  lastUpdatedAt: parse(
    "2022-10-07 10:45:04 +09:00",
    "yyyy-MM-dd HH:mm:ss XXX",
    new Date(),
  ),
}
