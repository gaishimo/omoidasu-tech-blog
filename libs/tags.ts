import { TagMap } from "../typings/TagMap"
const postsData = require("../_generated/posts.json")

export async function getTags(): Promise<TagMap> {
  const ids = postsData.map(d => d.id)

  let tagMap: TagMap = {}

  for (const id of ids) {
    const { meta } = await import(`../posts-meta/${id}`)
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
