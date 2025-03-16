#!/usr/bin/env node
const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")
const { parse, format } = require("date-fns")

const POSTS_META_DIR = path.resolve(__dirname, "../posts-meta")
const PAGES_DIR = path.resolve(__dirname, "../pages/posts")

function getAllPostIds() {
  try {
    const entries = fs.readdirSync(PAGES_DIR)
    return entries.filter(entry => {
      const stat = fs.statSync(path.join(PAGES_DIR, entry))
      return !stat.isDirectory()
    })
  } catch (error) {
    console.error("Error reading posts directory:", error)
    return []
  }
}

function getLastCommitDate(postId) {
  try {
    const postPath = path.join(PAGES_DIR, postId)
    const output = execSync(
      `git log -1 --format="%ad" --date=iso -- "${postPath}"`,
    )
      .toString()
      .trim()
    if (!output) return null

    const date = new Date(output)
    return date
  } catch (error) {
    console.error(`Error getting last commit date for post ${postId}:`, error)
    return null
  }
}

function updateMetaFile(postId, commitDate) {
  const cleanPostId = postId.replace(/\.mdx?$/, "")
  const metaFilePath = path.join(POSTS_META_DIR, `${cleanPostId}.ts`)

  if (!fs.existsSync(metaFilePath)) {
    console.log(`Metadata file not found: ${metaFilePath}`)
    return false
  }

  let content = fs.readFileSync(metaFilePath, "utf8")

  const formattedDate = format(commitDate, "yyyy-MM-dd HH:mm:ss +09:00")

  // 現在のlastUpdatedAtを取得
  const currentDateMatch = content.match(/lastUpdatedAt:\s*parse\(\s*"([^"]+)"/)
  if (!currentDateMatch) {
    console.log(`lastUpdatedAt not found in metadata file: ${metaFilePath}`)
    return false
  }

  const currentDateStr = currentDateMatch[1]
  const currentDate = parse(
    currentDateStr,
    "yyyy-MM-dd HH:mm:ss XXX",
    new Date(),
  )

  if (commitDate > currentDate) {
    const updatedContent = content.replace(
      /lastUpdatedAt:\s*parse\(\s*"([^"]+)"/,
      `lastUpdatedAt: parse(\n    "${formattedDate}"`,
    )

    fs.writeFileSync(metaFilePath, updatedContent)
    console.log(
      `Updated metadata for: ${cleanPostId} (${currentDateStr} -> ${formattedDate})`,
    )
    return true
  } else {
    console.log(`Metadata is up to date: ${cleanPostId}`)
    return false
  }
}

function main() {
  const postIds = getAllPostIds()
  let updatedCount = 0

  for (const postId of postIds) {
    const lastCommitDate = getLastCommitDate(postId)
    if (lastCommitDate) {
      const updated = updateMetaFile(postId, lastCommitDate)
      if (updated) updatedCount++
    }
  }

  if (updatedCount > 0) {
    console.log(`Updated ${updatedCount} metadata files`)
  } else {
    console.log("No metadata files needed updating")
  }
}

main()
