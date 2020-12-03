module.exports = {
  presets: ["next/babel", "@emotion/babel-preset-css-prop"],
  plugins: [],
}


// 以下にするとエラーになる
// importSource cannot be set when runtime is classic
/*
module.exports = {
  presets: [
    [
      "next/babel",
      {
        "preset-react": {
          runtime: "automatic",
          importSource: "@emotion/react",
        },
      },
    ],
  ],
  plugins: ["@emotion/babel-plugin"],
}

*/