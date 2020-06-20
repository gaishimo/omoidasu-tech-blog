import { NextPageContext } from "next"
import { js2xml } from "xml-js"
import { getAllPosts } from "../libs/posts"
import { format } from "date-fns"

export default function FeedXml() {
  return null
}

export async function getServerSideProps({ res }: NextPageContext) {
  const posts = await getAllPosts()
  const latestUpdatedTime = Math.max(
    ...posts.map(p => p.lastUpdatedAt.getTime()),
  )
  const atomData = {
    declaration: {
      attributes: {
        version: "1.0",
        encoding: "utf-8",
      },
    },
    elements: [
      {
        type: "element",
        name: "feed",
        attributes: { xmlns: "http://www.w3.org/2005/Atom", "xml:lang": "ja" },
        elements: [
          {
            type: "element",
            name: "id",
            elements: [{ type: "text", text: "blog.omoidasu.dev.feed" }],
          },
          {
            type: "element",
            name: "title",
            elements: [{ type: "text", text: "Omoidasu Tech Blog" }],
          },
          {
            type: "element",
            name: "updated",
            elements: [
              {
                type: "text",
                text: format(latestUpdatedTime, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"),
              },
            ],
          },
          {
            type: "element",
            name: "link",
            attributes: {
              rel: "self",
              type: "atom+xml",
              href: "https://blog.omoidasu.dev/feed.xml",
            },
          },
          ...posts.map(post => ({
            type: "element",
            name: "entry",
            elements: [
              {
                type: "element",
                name: "id",
                elements: [
                  {
                    type: "text",
                    text: `https://blog.omoidasu.dev/posts/${
                      post.id
                    }#${post.lastUpdatedAt.getTime()}`,
                  },
                ],
              },
              {
                type: "element",
                name: "title",
                elements: [
                  {
                    type: "text",
                    text: post.title,
                  },
                ],
              },
              {
                type: "element",
                name: "summary",
                elements: [
                  {
                    type: "text",
                    text: post.description,
                  },
                ],
              },
              {
                type: "element",
                name: "link",
                attributes: {
                  ref: "alternate",
                  type: "text/html",
                  href: `https://blog.omoidasu.dev/posts/${post.id}`,
                },
              },
              {
                type: "element",
                name: "pubDate",
                elements: [
                  {
                    type: "text",
                    text: format(
                      posts[0].createdAt,
                      "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                    ),
                  },
                ],
              },
              {
                type: "element",
                name: "updated",
                elements: [
                  {
                    type: "text",
                    text: format(
                      posts[0].lastUpdatedAt,
                      "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                    ),
                  },
                ],
              },
              {
                type: "element",
                name: "author",
                elements: [
                  {
                    type: "element",
                    name: "name",
                    elements: [
                      {
                        type: "text",
                        text: "@gaishimo",
                      },
                    ],
                  },
                  {
                    type: "element",
                    name: "uri",
                    elements: [
                      {
                        type: "text",
                        text: "https://twitter.com/gaishimo",
                      },
                    ],
                  },
                ],
              },
            ],
          })),
        ],
      },
    ],
  }
  // console.log(JSON.stringify(atomData, null, 2))
  const xml = js2xml(atomData, { compact: false })
  res.setHeader("content-type", "application/xml")
  res.write(xml)
  res.end()
  return {
    props: {},
  }
}
