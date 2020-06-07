const rehypePrism = require("@mapbox/rehype-prism")
const remarkSlug = require("remark-slug")
const remarkAutolinkHeadings = require("remark-autolink-headings")

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [rehypePrism],
    remarkPlugins: [
      remarkSlug,
      [
        remarkAutolinkHeadings,
        {
          behavior: "prepend",
          content: {
            type: "element",
            tagName: "i",
            properties: { className: ["fas", "fa-link", "fa-sm"] },
          },
        },
      ],
    ],
  },
})
module.exports = withMDX({
  pageExtensions: ["tsx", "mdx"],
})
