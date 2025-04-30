const fs = require("fs")
const path = require("path")

async function main() {
  const { posts, tags } = await getPostsAndTags()

  fs.writeFileSync(
    path.join(".", "_generated", "posts.json"),
    JSON.stringify(posts, null, 2),
  )
  console.log("create _generated/posts.json")
  fs.writeFileSync(
    path.join(".", "_generated", "tags.json"),
    JSON.stringify(tags, null, 2),
  )
  console.log("create _generated/tags.json")
}

main()
  .then(() => {})
  .catch(e => console.error(e))

async function getPostsAndTags() {
  try {
    const postsDir = path.resolve(".", "posts-meta")

    const fileNames = fs.readdirSync(postsDir)

    let posts = []
    let tagMap = {}
    for (const fileName of fileNames) {
      const { meta } = require(`../posts-meta/${fileName}`)
      posts.push({
        ...meta,
        id: fileName.replace(/.ts$/, ""),
      })

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
    posts = posts
      .slice()
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    return {
      posts,
      tags: tagMap,
    }
  } catch (e) {
    console.error(e)
    throw e
  }
}
