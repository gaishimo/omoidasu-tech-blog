const fs = require("fs")
const path = require("path")

const SITE_NAME = "Omoidasu Tech Blog"
const SITE_URL = "https://blog.omoidasu.dev"
const OUTPUT_PATH = path.join(".", "public", "llms.txt")
const ROBOTS_OUTPUT_PATH = path.join(".", "public", "robots.txt")
const POSTS_DIR = path.resolve(".", "posts-meta")

function loadPosts() {
  const fileNames = fs
    .readdirSync(POSTS_DIR)
    .filter(fileName => fileName.endsWith(".ts"))
    .sort()

  return fileNames
    .map(fileName => {
      const { meta } = require(path.join(POSTS_DIR, fileName))

      return {
        id: fileName.replace(/\.ts$/, ""),
        ...meta,
      }
    })
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

function formatDate(date) {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Tokyo",
  }).format(date)
}

function escapeMarkdownText(text) {
  return text.replace(/\r?\n/g, " ").replace(/\s+/g, " ").trim()
}

function toPostLine(post) {
  const title = escapeMarkdownText(post.title)
  const description = escapeMarkdownText(post.description)
  const tags = (post.tagNames || []).join(", ")
  const updatedAt = formatDate(post.lastUpdatedAt)
  const notes = [`Updated: ${updatedAt}`]

  if (tags.length > 0) {
    notes.push(`Tags: ${tags}`)
  }

  notes.push(description)

  return `- [${title}](${SITE_URL}/posts/${post.id}): ${notes.join(" / ")}`
}

function createLlmsTxt(posts) {
  const latestUpdatedAt =
    posts.length > 0
      ? posts.reduce(
          (latest, post) =>
            post.lastUpdatedAt.getTime() > latest.getTime()
              ? post.lastUpdatedAt
              : latest,
          new Date(1900, 0, 1),
        )
      : new Date()

  const latestPosts = posts.slice(0, 12)
  const evergreenPosts = posts.filter(post => (post.priority || 0) >= 0.6)

  return [
    `# ${SITE_NAME}`,
    "",
    "> Omoidasu, Inc.の技術ブログです。React Native、Expo、Skia、iOS/Androidアプリ開発まわりの実装知見を中心に、日本語で公開しています。",
    "",
    `Site: ${SITE_URL}`,
    `Language: ja`,
    `Last-Updated: ${formatDate(latestUpdatedAt)}`,
    "",
    "このファイルは、AIアシスタントやクローラがこのサイトの主要コンテンツを素早く把握できるようにするための案内です。",
    "記事本文は各URL先を参照してください。サイト全体の更新検知には sitemap.xml と feed.xml も利用できます。",
    "",
    "## Key Pages",
    "",
    `- [Home](${SITE_URL}/): 技術ブログのトップページ。新着記事一覧があります。`,
    `- [Sitemap](${SITE_URL}/sitemap.xml): すべての主要ページの一覧。`,
    `- [Feed](${SITE_URL}/feed.xml): 更新検知向けのAtomフィード。`,
    "",
    "## Recent Posts",
    "",
    ...latestPosts.map(toPostLine),
    "",
    "## Featured Posts",
    "",
    ...evergreenPosts.map(toPostLine),
    "",
    "## Optional",
    "",
    `- [Tags index](${SITE_URL}/): 各記事ページやタグページから関連記事を辿れます。`,
  ].join("\n")
}

function createRobotsTxt() {
  return [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
  ].join("\n")
}

function main() {
  const posts = loadPosts()

  fs.writeFileSync(OUTPUT_PATH, `${createLlmsTxt(posts)}\n`)
  console.log(`create ${OUTPUT_PATH}`)

  fs.writeFileSync(ROBOTS_OUTPUT_PATH, `${createRobotsTxt()}\n`)
  console.log(`create ${ROBOTS_OUTPUT_PATH}`)
}

main()
