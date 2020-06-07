import "../styles/global.css"
import { ParallaxProvider } from "react-scroll-parallax"

export default function MyApp({ Component, pageProps }) {
  return (
    <ParallaxProvider>
      <Component {...pageProps} />
    </ParallaxProvider>
  )
}
