const withPlugins = require("next-compose-plugins")
// const withTM = require("next-transpile-modules")(["remark-slug"])
const rehypePrism = require("@mapbox/rehype-prism")
const remarkSlug = require("remark-slug")
const remarkAutolinkHeadings = require("remark-autolink-headings")

const withMDX = require("@next/mdx")({
  extension: /\.mdx$/,
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
            tagName: "img",
            properties: {
              alt: "header link",
              src: "/linkGreyIcon.png",
              className: ["header-link-icon"],
            },
          },
        },
      ],
    ],
  },
})

module.exports = withPlugins([withMDX], {
  pageExtensions: ["tsx", "mdx"],
  webpack: config => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Transform all direct `react-native` imports to `react-native-web`
      "react-native$": "react-native-web",
    }
    config.resolve.extensions = [
      ".web.js",
      ".web.ts",
      ".web.tsx",
      ...config.resolve.extensions,
    ]
    return config
  },
})
