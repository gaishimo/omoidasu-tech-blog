import { NextPageContext } from "next"
import { js2xml } from "xml-js"
import { getAllPosts } from "../libs/posts"
import { format } from "date-fns"

export default function sitemapXml() {
  return null
}

const BASE_URL = "https://blog.omoidasu.dev"

export async function getServerSideProps({ req, res }: NextPageContext) {
  const posts = await getAllPosts()

  const data = {
    declaration: {
      attributes: {
        version: "1.0",
        encoding: "utf-8",
      },
    },
    elements: [
      {
        type: "element",
        name: "urlset",
        attributes: { xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9" },
        elements: posts.map(post => ({
          type: "element",
          name: "url",
          elements: [
            {
              type: "element",
              name: "loc",
              elements: [
                { type: "text", text: `${BASE_URL}/posts/${post.id}` },
              ],
            },
            {
              type: "element",
              name: "lastmod",
              elements: [
                {
                  type: "text",
                  text: format(post.lastUpdatedAt, "yyyy-MM-dd HH:mm:ss XXX"),
                },
              ],
            },
            {
              type: "element",
              name: "priority",
              elements: [{ type: "text", text: "0.5" }],
            },
          ],
        })),
      },
    ],
    urlset: {
      _attributes: { xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9" },
    },
  }

  const xml = js2xml(data, { compact: false })
  res.setHeader("content-type", "application/xml")
  res.write(xml)
  res.end()

  return { props: {} }
}
