import dynamic from "next/dynamic"
import { LoadingRect } from "../../LoadingRect"

export const ReanimatedSampleDemo = dynamic(
  () => import("./ReanimatedSample").then(mod => mod.ReanimatedSample),
  {
    ssr: false,
    loading: () => (
      <LoadingRect
        width={120}
        height={160}
        textColor="lightblue"
        bgColor={"rgb(240, 240, 240)"}
      />
    ),
  },
)
