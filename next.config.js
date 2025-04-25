const rehypePrism = require("@mapbox/rehype-prism")
const remarkSlug = require("remark-slug")
const remarkAutolinkHeadings = require("remark-autolink-headings")
const CopyPlugin = require("copy-webpack-plugin")
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const path = require("path")
const webpack = require("webpack")
const dotenv = require("dotenv")

// Load environment variables
let envVars = {}

// Try to load from .env.local in development
if (process.env.NODE_ENV !== "production") {
  try {
    const result = dotenv.config({ path: ".env.local" })

    if (result.error) {
      console.error("Error loading .env.local:", result.error)
    } else {
      console.log("Loaded environment variables from .env.local")

      if (result.parsed) {
        envVars = { ...result.parsed }
      }

      console.log("Loaded environment variable keys:", Object.keys(envVars))
    }
  } catch (error) {
    console.error("Error loading environment variables:", error)
  }
} else {
  envVars = {
    LIKE_SLACK_WEBHOOK_URL: process.env.LIKE_SLACK_WEBHOOK_URL,
  }
}

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

const nextConfig = {
  transpilePackages: [
    "react-native-reanimated",
    "@shopify/react-native-skia",
    "@miblanchard/react-native-slider",
  ],
  pageExtensions: ["ts", "tsx", "mdx"],
  typescript: {
    ignoreBuildErrors: true,
  },
  // Always include environment variables in Next.js config
  env: {
    ...envVars,
  },
  webpack: config => {
    const originEntry = config.entry
    config.entry = async () => {
      const entryConfig = await originEntry()
      return {
        ...entryConfig,
      }
    }
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "react-native$": "react-native-web",
      react: path.resolve(__dirname, "./node_modules/react"),
    }
    config.resolve.extensions = [
      ".web.js",
      ".web.ts",
      ".web.tsx",
      ...config.resolve.extensions,
    ]

    // Required for canvaskit-wasm
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

    // Define plugin options for environment variables
    const definePluginOptions = {
      __DEV__: JSON.stringify(true),
    }

    // Add environment variables to webpack define plugin
    Object.keys(envVars).forEach(key => {
      definePluginOptions[`process.env.${key}`] = JSON.stringify(envVars[key])
    })

    config.plugins = [
      ...config.plugins,
      new CopyPlugin({
        patterns: [
          {
            from: "node_modules/canvaskit-wasm/bin/full/canvaskit.wasm",
            to: "static/chunks/canvaskit.wasm",
          },
        ],
      }),
      new webpack.DefinePlugin(definePluginOptions),
      new NodePolyfillPlugin(),
    ]
    return config
  },
}

module.exports = withMDX(nextConfig)
