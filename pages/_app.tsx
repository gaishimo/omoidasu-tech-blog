import "../styles/global.css"
import { ParallaxProvider } from "react-scroll-parallax"
import Router from "next/router"
import { trackPageView } from "../libs/googleAnalytics"

Router.events.on("routeChangeComplete", url => trackPageView(url))

export default function MyApp({ Component, pageProps }) {
  return (
    <ParallaxProvider>
      <Component {...pageProps} />
    </ParallaxProvider>
  )
}
