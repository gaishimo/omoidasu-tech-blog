import React from "react"
import Head from "next/head"
import { ReactNode } from "react"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { css } from "@emotion/react"
import { getScrollHeight, isBrowser } from "../utils/domUtils"
import BackgroundShapes from "./BackgroundShapes"
import { Constants } from "../libs/Constants"

type Props = {
  children: ReactNode
  description?: string
  title?: string
  imagePath?: string
}

// OGPのボット等からリクエストがきた場合windowが無いので注意
const currentHostName = isBrowser()
  ? window.location.hostname
  : Constants.SITE_HOSTNAME

const DEFAULT_TITLE = "Omoidasu Tech Blog"
const DEFAULT_DESC = "Omoidasu, Inc.の技術ブログです。"

const WEB_FONT_URL =
  "https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@400;700&display=swap"
const PRISM_CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/prism/1.9.0/themes/prism.min.css"

export function BaseLayout(props: Props) {
  const ogImageUrl = props.imagePath
    ? `https://${currentHostName}${props.imagePath}`
    : `https://${currentHostName}/ogImage.png`

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
        <meta name="og:image" content={ogImageUrl} />
        <meta name="og:locale" content="ja_JP" />
        <meta name="og:url" content={`https://${currentHostName}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={props.title || DEFAULT_TITLE} />
        <meta
          name="twitter:description"
          content={props.description || DEFAULT_DESC}
        />
        <meta name="twitter:image" content={ogImageUrl} />
        <meta name="theme-color" content="#00D5FF" />

        {Constants.GA_TRACKING_ID != null && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${Constants.GA_TRACKING_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${Constants.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
              }}
            />
          </>
        )}

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
