// @ts-ignore
const { parse } = require("date-fns")

exports.meta = {
  id: "2022-10-05-eas-managed-os-versions",
  title:
    "ExpoのManaged Workflowでビルド時の設定値(ターゲットOSバージョン等)を変更する",
  tagNames: [
    "react-native",
    "expo",
    "EAS Build",
    "Config Plugin",
    "Managed Workflow",
  ],
  color1: "#D2CAFD",
  color2: "#392AC4",
  createdAt: parse(
    "2022-10-05 09:15:44 +09:00",
    "yyyy-MM-dd HH:mm:ss XXX",
    new Date(),
  ),
  author: "@gaishimo",
  description:
    "ExpoのManaged Workflowにおいてexpo-build-propertiesでAndroidのminSdkVersionやiOSのターゲットバージョンを設定する方法です。",
  imagePath:
    "/posts/2022-10-05-eas-managed-os-versions/exo-build-properties.png",
  priority: 0.7,
  relatedPosts: [
    "2022-10-16-eas-config-plugin-podfile",
    "2022-09-27-eas-managed-exo-player",
    "2022-07-25-eas-widget",
    "2021-06-04-hello-eas-build-managed",
  ],
  lastUpdatedAt: parse(
    "2022-10-05 09:15:44 +09:00",
    "yyyy-MM-dd HH:mm:ss XXX",
    new Date(),
  ),
}
