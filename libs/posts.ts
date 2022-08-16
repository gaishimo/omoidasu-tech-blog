import * as fs from "fs"
import * as path from "path"

export async function getAllPosts(): Promise<Post[]> {
  try {
    const postsDir = path.resolve(".", "posts-meta")

    const fileNames = fs.readdirSync(postsDir)
    const posts = fileNames
      .map(fileName => {
        const { meta } = require(`../posts-meta/${fileName}`)
        return {
          ...meta,
          id: fileName.replace(/.ts$/, ""),
        }
      })
      .slice()
      .sort(
        (a: PostMeta, b: PostMeta) =>
          b.createdAt.getTime() - a.createdAt.getTime(),
      )
    return posts
  } catch (e) {
    console.error(e)
    throw e
  }
}
