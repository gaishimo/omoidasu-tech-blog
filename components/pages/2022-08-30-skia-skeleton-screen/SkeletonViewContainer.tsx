import {
  Canvas,
  Easing,
  interpolate,
  LinearGradient,
  Paint,
  useComputedValue,
  useTiming,
} from "@shopify/react-native-skia"
import { PaintNode } from "@shopify/react-native-skia/lib/typescript/src/dom/nodes/PaintNode"
import { ReactNode, RefObject } from "react"

type Props = {
  paintRef: RefObject<PaintNode>
  basicColor: string
  accentColor: string
  canvasSize: { width: number; height: number }
  children: ReactNode
}

export function SkeletonViewContainer(props: Props) {
  const progress = useTiming(
    { loop: true, yoyo: false },
    { easing: Easing.inOut(Easing.ease), duration: 2300 },
  )
  const positions = useComputedValue(() => {
    return [
      interpolate(progress.current, [0, 0.25, 0.5, 0.75, 1], [0, 0, 0, 0.5, 1]),
      interpolate(progress.current, [0, 0.25, 0.5, 0.75, 1], [0, 0, 0.5, 1, 1]),
      interpolate(progress.current, [0, 0.25, 0.5, 0.75, 1], [0, 0.5, 1, 1, 1]),
    ]
  }, [progress])
  return (
    <Canvas style={props.canvasSize}>
      <Paint ref={props.paintRef}>
        <LinearGradient
          start={{ x: 0, y: props.canvasSize.height % 2 }}
          end={{ x: props.canvasSize.width, y: props.canvasSize.height % 2 }}
          colors={[props.basicColor, props.accentColor, props.basicColor]}
          positions={positions}
        />
      </Paint>
      {props.children}
    </Canvas>
  )
}
