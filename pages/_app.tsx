import Head from "next/head"
import "raf/polyfill"
import "../styles/global.css"

// if (typeof window === "undefined") {
//   global.window = {}
// }

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
