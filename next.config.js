const withPlugins = require("next-compose-plugins")
// const withTM = require("next-transpile-modules")(["remark-slug"])
const rehypePrism = require("@mapbox/rehype-prism")
const remarkSlug = require("remark-slug")
const remarkAutolinkHeadings = require("remark-autolink-headings")
const CopyPlugin = require("copy-webpack-plugin")
const path = require("path")

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
  experimental: { nftTracing: true },
  pageExtensions: ["ts", "tsx", "mdx"],
  webpack: config => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Transform all direct `react-native` imports to `react-native-web`
      "react-native$": "react-native-web",
      // The next line is to be able to correctly resolve react dependencies
      // in the library (package folder) avoiding the dreaded error
      // "Hooks can only be called inside the body of a function component"
      // where we end up with two different react modules. This should
      // NOT be necessary in production when installing from NPM.
      react: path.resolve(__dirname, "./node_modules/react"),
      "react-native-web": path.resolve(
        __dirname,
        "./node_modules/react-native-web",
      ),
    }
    config.resolve.extensions = [
      ".web.js",
      ".web.ts",
      ".web.tsx",
      ...config.resolve.extensions,
    ]
    config.resolve.fallback = {
      fs: false,
      path: false,
    }
    config.plugins = [
      ...config.plugins,
      new CopyPlugin({
        patterns: [
          {
            from: "node_modules/canvaskit-wasm/bin/full/canvaskit.wasm",
          },
        ],
      }),
    ]
    // config.externals = {
    //   // ...config.externals,
    //   "react-native-reanimated": "require('react-native-reanimated')",
    //   "react-native-reanimated/lib/reanimated2/core":
    //     "require('react-native-reanimated/lib/reanimated2/core')",
    // }
    return config
  },
})
