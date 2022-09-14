const { parse, format } = require("date-fns")
const { writeFileSync } = require("fs")
const { resolve } = require("path")
const { exit, argv } = require("process")

async function createMetaFile(id) {
  const filePath = resolve("posts-meta", `${id}.ts`)
  console.log(`create ${filePath}`)
  writeFileSync(filePath, metaFileBody(id))
}

async function createMdxFile(id) {
  const filePath = resolve("pages", "posts", `${id}.mdx`)
  console.log(`create ${filePath}`)
  writeFileSync(filePath, mdxFileBody(id))
}

async function main(argv) {
  if (argv.length < 2) {
    console.error("Must pass id")
    exit(1)
  }
  const id = argv[2]
  console.log("id:", id)

  await createMetaFile(id)
  await createMdxFile(id)
}

main(process.argv)

function mdxFileBody(id) {
  return `
import { parse, parseISO } from "date-fns"
import Image from "next/image"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { PostLayout } from "../../components/PostLayout"
import { ImageWrapper } from "../../components/atoms/ImageWrapper"
import { WithSkia } from "../../components/WithSkia"
import { LoadingRect } from "../../components/LoadingRect"
import { NextImageWrapper } from "../../components/atoms/NextImageWrapper"

import { meta } from "../../posts-meta/${id}"

export const headlines = [
  { title: "章タイトル1" },
  { title: "章タイトル2" },
]

export default props => (
  <PostLayout headlines={headlines} meta={meta}>
    {props.children}
  </PostLayout>
)



## 章タイトル1

\`\`\`
<View style={{ marginTop: 24, marginBottom: 40 }}>
  <WithSkia
    getComponent={
      () => import("../../components/pages/${id}/Example/index.tsx")
    }
    fallback={() => <LoadingRect width={240} height={240} textColor="lightblue" bgColor={"rgb(240, 240, 240)"} />}
  />
</View>
\`\`\`


## 章タイトル2


\`\`\`
<NextImageWrapper
  imageSize={{ width: 260, height: 220 }}
  alt="画像alt"
  src="/posts/${id}/example.png"
/>
\`\`\`
`
}

function metaFileBody(id) {
  return `// @ts-ignore
const { parse } = require("date-fns")

exports.meta = {
  id: "${id}",
  title: "${id}のタイトル",
  tagNames: [
    "react-native",
    "skia",
    "react-native-skia",
    "react",
    "アニメーション",
  ],
  color1: "yellow",
  color2: "blue",
  createdAt: parse(
    "${format(Date.now(), "yyyy-MM-dd HH:mm:ss XXX")}",
    "yyyy-MM-dd HH:mm:ss XXX",
    new Date(),
  ),
  author: "@gaishimo",
  description:
    "記事に関する概要を記載",
  imagePath: null,
  priority: 0.7,
  relatedPosts: [],
  lastUpdatedAt: parse(
     "${format(Date.now(), "yyyy-MM-dd HH:mm:ss XXX")}",
    "yyyy-MM-dd HH:mm:ss XXX",
    new Date(),
  ),
}

`
}
