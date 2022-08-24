import {
  Blur,
  Canvas,
  Circle,
  Easing,
  interpolate,
  useComputedValue,
  useTiming,
} from "@shopify/react-native-skia"

type Props = {
  radius: number
  color: string
}

export function ShrinkingCircle(props: Props) {
  const canvasSize = { width: props.radius * 4, height: props.radius * 4 }
  const center = { x: canvasSize.width / 2, y: canvasSize.height / 2 }

  const progress = useTiming(
    { loop: true, yoyo: true },
    { easing: Easing.inOut(Easing.ease), duration: 2200 },
  )

  return (
    <Canvas style={canvasSize}>
      {/* Outer Circle */}
      <Circle
        cx={center.x}
        cy={center.y}
        r={useComputedValue(() => {
          return interpolate(
            progress.current,
            [0, 1],
            [props.radius * 1.5, props.radius * 1.9],
          )
        }, [progress, props.radius])}
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
