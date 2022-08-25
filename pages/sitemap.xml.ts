import "@mdx-js/react"
import { format } from "date-fns"
import { NextPageContext } from "next"
import "react-native"
import "use-media"
import { js2xml } from "xml-js"
import { getAllPosts } from "../libs/posts"
import { getTags } from "../libs/tags"

// いくつかimportが無いとmdx require時にエラーになるため追加

export default function sitemapXml() {
  return null
}

const BASE_URL = "https://blog.omoidasu.dev"

export async function getServerSideProps({ req, res }: NextPageContext) {
  try {
    const posts = await getAllPosts()
    const tagMap = await getTags()
    const lastUpdated = posts
      .map(post => post.lastUpdatedAt)
      .reduce(
        (a, b) => (a.getTime() <= b.getTime() ? b : a),
        new Date(1900, 0, 1),
      )
    // const lastUpdated = new Date()
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
          elements: [
            {
              type: "element",
              name: "url",
              elements: [
                {
                  type: "element",
                  name: "loc",
                  elements: [{ type: "text", text: `${BASE_URL}` }],
                },
                {
                  type: "element",
                  name: "lastmod",
                  elements: [
                    {
                      type: "text",
                      text: format(lastUpdated, "yyyy-MM-dd"),
                    },
                  ],
                },
                {
                  type: "element",
                  name: "priority",
                  elements: [{ type: "text", text: "0.7" }],
                },
              ],
            },
            ...posts.map(post => ({
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
                      text: format(post.lastUpdatedAt, "yyyy-MM-dd"),
                    },
                  ],
                },
                {
                  type: "element",
                  name: "priority",
                  elements: [
                    {
                      type: "text",
                      text: post.priority ? post.priority.toString() : "0.5",
                    },
                  ],
                },
              ],
            })),
            ...Object.entries(tagMap).map(([tagName, tagData]) => ({
              type: "element",
              name: "url",
              elements: [
                {
                  type: "element",
                  name: "loc",
                  elements: [
                    { type: "text", text: `${BASE_URL}/tags/${tagName}` },
                  ],
                },
                {
                  type: "element",
                  name: "lastmod",
                  elements: [
                    {
                      type: "text",
                      text: format(tagData.lastUpdatedAt, "yyyy-MM-dd"),
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
          ],
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
  } catch (e) {
    console.error(e)
    res.write(e.toString())
    res.end()

    return { props: {} }
  }
}
