import fs from "fs"
import path from "path"
import { getAllPosts } from "../libs/posts.js"
import { getTags } from "../libs/tags.js"

async function main() {
  const posts = await getAllPosts()
  const tagsMap = await getTags()

  fs.writeFileSync(
    path.relative("_generated", "posts.json"),
    JSON.stringify(posts, null, 2),
  )
  console.log("create _generated/posts.json")
  fs.writeFileSync(
    path.relative("_generated", "tags.json"),
    JSON.stringify(tagsMap, null, 2),
  )
  console.log("create _generated/tags.json")
}

main()
  .then(() => {})
  .catch(e => console.error(e))

export {}
