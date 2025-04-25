import {
  Group,
  Path,
  usePathValue,
  RadialGradient,
  vec,
  Blur,
  Shadow,
  Transforms3d,
  SweepGradient,
} from "@shopify/react-native-skia"
import { SharedValue, useDerivedValue } from "react-native-reanimated"

type Props = {
  x: number
  y: number
  size: number
  scale: SharedValue<number>
  opacity: SharedValue<number>
}

const DEFAULT_COLORS = ["rgb(255, 66, 118)", "rgb(255, 66, 140)"]

export function Heart(props: Props) {
  const centerX = props.size / 2
  const centerY = props.size / 2
  const x = props.x ?? 0
  const y = props.y ?? 0

  const path = usePathValue(p => {
    p.moveTo(props.x + centerX, centerY * 0.5 + props.y)
    // left
    p.cubicTo(
      centerX - props.size * 0.1 + props.x,
      centerY * 0.1 + props.y,
      centerX - props.size * 0.5 + props.x,
      centerY * 0.5 + props.y,
      centerX + props.x,
      centerY * 1.2 + props.y,
    )
    // right
    p.cubicTo(
      centerX + props.size * 0.5 + props.x,
      centerY * 0.5 + props.y,
      centerX + props.size * 0.1 + props.x,
      centerY * 0.1 + props.y,
      centerX + props.x,
      centerY * 0.5 + props.y,
    )
    p.close()
  })

  const transform = useDerivedValue<Transforms3d>(() => {
    return [
      { translateX: props.x + props.size * 0.5 },
      { translateY: props.y + props.size * 0.5 },
      { scaleX: props.scale.value },
      { scaleY: props.scale.value },
      { translateX: -props.x - props.size * 0.5 },
      { translateY: -props.y - props.size * 0.5 },
    ]
  })

  return (
    <Group
      transform={transform}
      opacity={useDerivedValue(() => props.opacity.value)}
    >
      <Path path={path} style="fill">
        <Shadow dx={0} dy={3} blur={0} color="rgba(235, 150, 50, 0.3)" />
        <RadialGradient
          c={vec(centerX + x, centerY * 0.7 + y)}
          r={props.size * 0.45}
          colors={DEFAULT_COLORS}
        />
      </Path>
    </Group>
  )
}
