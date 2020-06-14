import Head from "next/head"
import { ReactNode } from "react"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { css } from "@emotion/core"
import { getScrollHeight } from "../utils/domUtils"
import BackgroundShapes from "./BackgroundShapes"

type Props = {
  children: ReactNode
  description?: string
  title?: string
}

// OGPのボット等からリクエストがきた場合windowが無いので注意
// const currentHostName = isBrowser()
//   ? window.location.hostname
//   : Constants.SITE_HOSTNAME

const DEFAULT_TITLE = "Omoidasu Tech Blog"
const DEFAULT_DESC = "Omoidasu, Inc.の技術ブログです。"

const WEB_FONT_URL =
  "https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@400;700&display=swap"
const PRISM_CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/prism/1.9.0/themes/prism.min.css"

export function BaseLayout(props: Props) {
  return (
    <div>
      <Head>
        <title>{props.title || DEFAULT_TITLE}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={props.description || DEFAULT_DESC} />
        <meta name="og:title" content={props.title || DEFAULT_TITLE} />
        <meta name="og:type" content="website" />
        <meta name="og:site_name" content="Omoidasu Tech Blog" />
        <meta
          name="og:description"
          content={props.description || DEFAULT_DESC}
        />
        <meta name="og:image" content="/ogImage.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.png" />
        {/* render-blockingを防ぐため2つ記述する */}
        {/* https://qiita.com/rana_kualu/items/95a7adf8420ea2b9f657 */}
        <link rel="preload" href={WEB_FONT_URL} as="style" />
        <link
          rel="stylesheet"
          href={WEB_FONT_URL}
          media="print"
          // @ts-ignore
          onLoad="this.media = 'all'"
        />

        <link href={PRISM_CSS_URL} rel="preload" as="style" />
        <link
          rel="stylesheet"
          href={PRISM_CSS_URL}
          media="print"
          // @ts-ignore
          onLoad="this.media = 'all'"
        />
      </Head>
      <Header />
      <main>
        <div css={styles.background}>
          <BackgroundShapes />
        </div>
        <div>{props.children}</div>
      </main>

      <Footer />
    </div>
  )
}

const styles = {
  main: css({
    position: "relative",
  }),
  background: css({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: -10,
  }),
}
