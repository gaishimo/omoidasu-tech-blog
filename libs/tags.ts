import * as fs from "fs"
import * as path from "path"
import { TagMap } from "../typings/TagMap"

export async function getTags(): Promise<TagMap> {
  const postsDir = path.resolve(".", "posts-meta")
  const mdxFileNames = fs.readdirSync(postsDir)

  let tagMap: TagMap = {}

  for (const fileName of mdxFileNames) {
    const { meta } = await import(`../posts-meta/${fileName}`)
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
  }

  return tagMap
}
