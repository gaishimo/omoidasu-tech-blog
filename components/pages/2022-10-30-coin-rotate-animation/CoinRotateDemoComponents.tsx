import dynamic from "next/dynamic"
import { LoadingRect } from "../../LoadingRect"

export const CoinRotateAnimationDemo = dynamic(
  () => import("./CoinRotateAnimation").then(mod => mod.CoinRotateAnimation),
  {
    ssr: false,
    loading: () => (
      <LoadingRect
        width={160}
        height={160}
        textColor="lightblue"
        bgColor={"rgb(240, 240, 240)"}
      />
    ),
  },
)

export const CoinRotate1Demo = dynamic(
  () => import("./CoinRotate1").then(mod => mod.CoinRotate1),
  {
    ssr: false,
    loading: () => (
      <LoadingRect
        width={160}
        height={160}
        textColor="lightblue"
        bgColor={"rgb(240, 240, 240)"}
      />
    ),
  },
)

export const CoinRotate2Demo = dynamic(
  () => import("./CoinRotate2").then(mod => mod.CoinRotate2),
  {
    ssr: false,
    loading: () => (
      <LoadingRect
        width={160}
        height={240}
        textColor="lightblue"
        bgColor={"rgb(240, 240, 240)"}
      />
    ),
  },
)
