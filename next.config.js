const withPlugins = require("next-compose-plugins")
const withMDX = require("@next/mdx")({
  extension: /\.mdx$/,
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
