import * as fs from "fs"
import * as path from "path"

export async function getTags(): Promise<TagMap> {
  const postsDir = path.resolve(".", "posts-meta")
  const mdxFileNames = fs.readdirSync(postsDir)

  let tagMap: TagMap = {}

  mdxFileNames.forEach(fileName => {
    const { meta } = require(`../posts-meta/${fileName}`)
    meta.tagNames.forEach(tag => {
      const pages = (tagMap[tag]?.pages || 0) + 1
      const lastUpdatedAt =
        meta.lastUpdatedAt.getTime() > (tagMap[tag]?.lastUpdatedAt || 0)
          ? meta.lastUpdatedAt
          : tagMap[tag]?.lastUpdatedAt
      tagMap = {
        ...tagMap,
        [tag]: {
          ...tagMap[tag],
          pages,
          lastUpdatedAt,
        },
      }
    })
  })
  return tagMap
}
