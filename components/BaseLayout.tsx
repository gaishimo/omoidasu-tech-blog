import Head from "next/head"
import { ReactNode } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { Constants } from "../libs/Constants"
import { isBrowser } from "../utils/domUtils"
import { Footer } from "./Footer"
import { Header } from "./Header"

type Props = {
  children: ReactNode
  description?: string
  title?: string
  imagePath?: string
}

const DEFAULT_TITLE = "Omoidasu Tech Blog"
const DEFAULT_DESC = "Omoidasu, Inc.の技術ブログです。"

const WEB_FONT_URL =
  "https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@400;700&display=swap"
const PRISM_CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/prism/1.9.0/themes/prism.min.css"

// OGPのボット等からリクエストがきた場合windowが無いので注意
const currentHostName = isBrowser()
  ? window.location.hostname || Constants.SITE_HOSTNAME
  : Constants.SITE_HOSTNAME

export function BaseLayout(props: Props) {
  const ogImageUrl = props.imagePath
    ? `https://${currentHostName}${props.imagePath}`
    : `https://${currentHostName}/ogImage.png`
  return (
    <View style={styles.container}>
      <Head>
        <title>{props.title || DEFAULT_TITLE}</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, maximum-scale=1, width=device-width"
        />
        <meta name="description" content={props.description || DEFAULT_DESC} />
        <meta property="og:title" content={props.title || DEFAULT_TITLE} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Omoidasu Tech Blog" />
        <meta
          property="og:description"
          content={props.description || DEFAULT_DESC}
        />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:url" content={`https://${currentHostName}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={props.title || DEFAULT_TITLE} />
        <meta
          name="twitter:description"
          content={props.description || DEFAULT_DESC}
        />
        <meta name="twitter:image" content={ogImageUrl} />
        <meta name="theme-color" content="#00D5FF" />

        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.png" />
        {/* render-blockingを防ぐため2つ記述する */}
        {/* https://qiita.com/rana_kualu/items/95a7adf8420ea2b9f657 */}
        {/* <link rel="preload" href={WEB_FONT_URL} as="style" />
        <link
          rel="stylesheet"
          href={WEB_FONT_URL}
          media="print"
          // @ts-ignore
          onLoad="this.media = 'all'"
        /> */}

        <link href={PRISM_CSS_URL} rel="stylesheet" as="style" />
      </Head>

      {/* <div css={styles.background}>
          <BackgroundShapes />
        </div> */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}
      >
        <Header />
        <View style={styles.body}>{props.children}</View>

        <Footer />
      </ScrollView>

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
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flex: 1 },
  contentContainer: {},
  body: { alignItems: "center" },
})
