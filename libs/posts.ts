import * as fs from "fs"
import * as path from "path"
import { Post, PostMeta } from "../typings/Post"

export async function getAllPosts(): Promise<Post[]> {
  try {
    const postsDir = path.resolve(".", "posts-meta")

    const fileNames = fs.readdirSync(postsDir)

    const posts: Post[] = []
    for (const fileName of fileNames) {
      const { meta } = await import(`../posts-meta/${fileName}`)
      posts.push({
        ...meta,
        id: fileName.replace(/.ts$/, ""),
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
