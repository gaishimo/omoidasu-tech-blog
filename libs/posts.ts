import * as fs from "fs"
import * as path from "path"

export async function getAllPosts(): Promise<Post[]> {
  try {
    const postsDir = path.resolve(process.cwd(), "pages", "posts")
    console.log("postsDir:", postsDir)
    const mdxFileNames = fs.readdirSync(postsDir)
    const posts = mdxFileNames
      .map(fileName => {
        const { meta } = require(`../pages/posts/${fileName}`)
        return {
          ...meta,
          id: fileName.replace(/.mdx$/, ""),
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
