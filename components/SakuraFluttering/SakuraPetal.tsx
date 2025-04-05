import {
  Blur,
  Fill,
  Group,
  Line2DPathEffect,
  LinearGradient,
  Paint,
  Path,
  Path2DPathEffect,
  processTransform2d,
  Skia,
  usePathValue,
  useRawData,
  vec,
  type Transforms3d,
} from "@shopify/react-native-skia"
import { useEffect } from "react"
import {
  Easing,
  SharedValue,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"

type Props = {
  colorId: 0 | 1 | 2
  position: { x: number; y: number }
  size: { width: number; height: number }
  opacity?: number
  rotation?: {
    x: SharedValue<number>
    y: SharedValue<number>
  }
}

const COLORS = [
  [`rgba(250, 210, 220, 0.8)`, "rgba(255, 200, 220, 0.7)"],
  ["rgba(255, 240, 240, 0.9)", "rgba(255, 240, 245, 0.9)"],
  ["rgba(245, 220, 230, 0.7)", "rgba(255, 230, 240, 0.7)"],
]

export function SakuraPetal(props: Props) {
  const { size, position } = props
  const rotation = props.rotation ?? {
    x: useSharedValue(0),
    y: useSharedValue(0),
  }
  const centerX = size.width * 0.5

  const path = usePathValue(p => {
    p.moveTo(centerX, size.height)
    p.quadTo(-size.width * 0.2, size.height * 0.6, size.width * 0.35, 0)
    p.lineTo(centerX, size.height * 0.15)
    p.lineTo(centerX + size.width * 0.15, 0)
    p.quadTo(
      centerX + size.width * 0.7,
      size.height * 0.6,
      centerX,
      size.height,
    )
    p.close()
  })

  const transform = useDerivedValue<Transforms3d>(() => {
    const transforms = [
      { translateX: position.x, translateY: position.y },
      { translateX: centerX, translateY: size.height / 2 },
      { perspective: 300 },
      { rotateY: rotation.y.value },
      { translateX: -centerX, translateY: -size.height / 2 },
    ]
    return transforms
  }, [rotation])

  return (
    <Group transform={transform}>
      <Path path={path} style="fill" opacity={props.opacity}>
        <LinearGradient
          start={vec(centerX * 0.8, 0)}
          end={vec(centerX * 1.2, size.height * 1.2)}
          colors={COLORS[props.colorId]}
        />
      </Path>
    </Group>
  )
}
