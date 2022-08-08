import Head from "next/head"
import "raf/polyfill"
import "../styles/global.css"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
      {/* <WithSkiaWeb
        getComponent={() =>
        fallback={
          <>
            <Text>Loading Skia...</Text>
          </>
        }
      /> */}
    </>
  )
}

export default MyApp
