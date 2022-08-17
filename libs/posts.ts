import { Post, PostMeta } from "../typings/Post"
const postsData = require("../_generated/posts.json")

export async function getAllPosts(): Promise<Post[]> {
  try {
    // const postsDir = path.resolve(".", "posts-meta")
    // const fileNames = fs.readdirSync(postsDir)

    const ids = postsData.map(d => d.id)

    const posts: Post[] = []
    for (const id of ids) {
      const { meta } = await import(`../posts-meta/${id}`)
      posts.push({
        ...meta,
        id: id.replace(/.ts$/, ""),
      })
    }
    return posts
      .slice()
      .sort(
        (a: PostMeta, b: PostMeta) =>
          b.createdAt.getTime() - a.createdAt.getTime(),
      )
  } catch (e) {
    console.error(e)
    throw e
  }
}
