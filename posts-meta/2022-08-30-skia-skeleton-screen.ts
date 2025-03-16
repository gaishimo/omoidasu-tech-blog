// @ts-ignore
const { parse } = require("date-fns")

exports.meta = {
  id: "2022-08-30-skia-skeleton-screen",
  title: "react-native-skiaでSkeleton Screenを作成する",
  tagNames: [
    "react-native",
    "react-native-skia",
    "アニメーション",
    "グラデーション",
    "Skeleton Screen",
  ],
  color1: "rgb(220, 220, 220)",
  color2: "rgb(200, 200, 200)",
  createdAt: parse(
    "2022-08-30 11:40:00 +09:00",
    "yyyy-MM-dd HH:mm:ss XXX",
    new Date(),
  ),
  author: "@gaishimo",
  description:
    "react-native-skiaのグラデーションとアニメーションを使い、ロード中表示用のSkeleton Screenを実装します。",
  imagePath: "/posts/2022-08-30-skia-skeleton-screen/skeleton-screen.png",
  priority: 0.7,
  relatedPosts: [
    "2022-08-28-text-gradient",
    "2022-08-24-shrinking-circle",
    "2022-08-20-rn-skia-shadow",
  ],
  lastUpdatedAt: parse(
    "2025-03-16 16:39:22 +09:00",
    "yyyy-MM-dd HH:mm:ss XXX",
    new Date(),
  ),
}
