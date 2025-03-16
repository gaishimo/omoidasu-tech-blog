import { Blur, Canvas, Circle } from "@shopify/react-native-skia"
import {
  Easing,
  interpolate,
  useSharedValue,
  useDerivedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated"
import { useEffect } from "react"

type Props = {
  radius: number
  color: string
}

export function ShrinkingCircle(props: Props) {
  const canvasSize = { width: props.radius * 4, height: props.radius * 4 }
  const center = { x: canvasSize.width / 2, y: canvasSize.height / 2 }

  const progress = useSharedValue(0)

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        easing: Easing.inOut(Easing.ease),
        duration: 2200,
      }),
      -1,
      true,
    )
  }, [])

  const outerRadius = useDerivedValue(() => {
    return interpolate(
      progress.value,
      [0, 1],
      [props.radius * 1.5, props.radius * 1.9],
    )
  }, [props.radius])

  return (
    <Canvas style={canvasSize}>
      {/* Outer Circle */}
      <Circle
        cx={center.x}
        cy={center.y}
        r={outerRadius}
        color={props.color}
        opacity={0.3}
      >
        <Blur blur={1} />
      </Circle>

      {/* Inner Circle */}
      <Circle
        cx={center.x}
        cy={center.y}
        r={props.radius}
        color={props.color}
      />
      {/* Inner Circle (ぼかし効果) */}
      <Circle cx={center.x} cy={center.y} r={props.radius} color={props.color}>
        <Blur blur={2} />
      </Circle>
    </Canvas>
  )
}
