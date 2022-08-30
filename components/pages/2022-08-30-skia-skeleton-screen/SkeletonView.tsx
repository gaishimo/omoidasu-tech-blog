import { RoundedRect } from "@shopify/react-native-skia"
import { SkeletonViewContainer } from "./SkeletonViewContainer"

const canvasSize = { width: 280, height: 160 }

export function SkeletonView() {
  return (
    <SkeletonViewContainer
      basicColor="rgb(245, 245, 245)"
      accentColor="rgb(225, 225, 225)"
      canvasSize={canvasSize}
    >
      <RoundedRect x={0} y={0} r={8} width={70} height={70} />
      <RoundedRect x={80} y={17} r={8} width={250} height={13} />
      <RoundedRect x={80} y={40} r={8} width={250} height={10} />
      <RoundedRect x={0} y={80} r={8} width={330} height={10} />
      <RoundedRect x={0} y={100} r={8} width={200} height={10} />
      <RoundedRect x={0} y={120} r={8} width={330} height={10} />
    </SkeletonViewContainer>
  )
}
