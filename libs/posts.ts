import * as fs from "fs"
import * as path from "path"

export async function getAllPosts(): Promise<Post[]> {
  const mdxFileNames = fs.readdirSync(path.resolve(".", "pages", "posts"))
  const posts = mdxFileNames
    .map(fileName => {
      const { meta } = require(`../pages/posts/${fileName}`)
      return {
        ...meta,
        id: fileName.replace(/.mdx$/, ""),
      }
    })
    .sort((a: PostMeta, b: PostMeta) =>
      a.createdAt.getTime() > b.createdAt.getTime() ? 0 : 1,
    )
  return posts
}
