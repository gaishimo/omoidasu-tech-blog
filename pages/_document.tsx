import { Html, Head, Main, NextScript } from "next/document"
import { Children } from "react"
import { AppRegistry } from "react-native"
import config from "../app.json"
const normalizeNextElements = `
  #__next {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`

function MyDocument({ styles }) {
  return (
    <Html style={{ height: "100%" }}>
      <Head />
      <body style={{ height: "100%", overflow: "hidden" }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

MyDocument.getInitialProps = async ({ renderPage }) => {
  AppRegistry.registerComponent(config.name, () => Main)
  // @ts-ignore
  const { getStyleElement } = AppRegistry.getApplication(config.name)
  const page = await renderPage()
  const styles = [
    <style
      key="normalize"
      dangerouslySetInnerHTML={{ __html: normalizeNextElements }}
    />,
    getStyleElement(),
  ]
  return { ...page, styles: Children.toArray(styles) }
}

export default MyDocument
