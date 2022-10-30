const withPlugins = require("next-compose-plugins")
// const withTM = require("next-transpile-modules")(["remark-slug"])
const rehypePrism = require("@mapbox/rehype-prism")
const remarkSlug = require("remark-slug")
const remarkAutolinkHeadings = require("remark-autolink-headings")
const CopyPlugin = require("copy-webpack-plugin")
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const path = require("path")
const webpack = require("webpack")

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

const withTM = require("next-transpile-modules")([
  "react-native-reanimated",
  "@shopify/react-native-skia",
  "@miblanchard/react-native-slider",
])

module.exports = withPlugins([withTM, withMDX], {
  experimental: { nftTracing: true },
  pageExtensions: ["ts", "tsx", "mdx"],
  webpack: config => {
    const originEntry = config.entry
    config.entry = async () => {
      const entryConfig = await originEntry()
      return {
        // ["babel-polyfill"]: [],
        ...entryConfig,
      }
    }
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

    config.module.rules.push({
      test: /\.(jpe?g|png|svg|gif|ico|eot|ttf|woff|woff2|mp4|pdf|webm|otf)$/,
      type: "asset",
      generator: {
        filename: "static/chunks/[path][name].[hash][ext]",
      },
    })

    config.plugins = [
      ...config.plugins,
      new CopyPlugin({
        patterns: [
          {
            from: "node_modules/canvaskit-wasm/bin/full/canvaskit.wasm",
            to: "static/chunks/pages/posts/canvaskit.wasm",
          },
        ],
      }),
      /* for reanimated */
      new webpack.DefinePlugin({
        // See: <https://github.com/necolas/react-native-web/issues/349>
        __DEV__: JSON.stringify(true),
      }),
      new NodePolyfillPlugin(),
    ]
    return config
  },
})
