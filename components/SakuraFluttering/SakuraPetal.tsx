import {
  Blur,
  Fill,
  Group,
  LinearGradient,
  Paint,
  Path,
  Skia,
  vec,
} from "@shopify/react-native-skia"

type Props = {
  colorId: 0 | 1 | 2
  position: { x: number; y: number }
  size: { width: number; height: number }
  opacity?: number
}

const COLORS = [
  [`rgba(250, 210, 220, 0.8)`, "rgba(255, 200, 220, 0.7)"],
  ["rgba(255, 240, 240, 0.9)", "rgba(255, 240, 245, 0.9)"],
  ["rgba(245, 220, 230, 0.7)", "rgba(255, 230, 240, 0.7)"],
]

export function SakuraPetal(props: Props) {
  const { size, position } = props
  const path = Skia.Path.Make()
  const centerX = size.width * 0.5
  path.moveTo(centerX, size.height)
  path.quadTo(-size.width * 0.2, size.height * 0.6, size.width * 0.35, 0)
  path.lineTo(centerX, size.height * 0.15)
  path.lineTo(centerX + size.width * 0.15, 0)
  path.quadTo(
    centerX + size.width * 0.7,
    size.height * 0.6,
    centerX,
    size.height,
  )
  path.close()
  return (
    <Group transform={[{ translate: [position.x, position.y] }]}>
      <Path path={path} style="fill" opacity={props.opacity}>
        <LinearGradient
          start={vec(centerX * 0.8, 0)}
          end={vec(centerX * 1.2, size.height * 1.2)}
          colors={COLORS[props.colorId]}
        />
        <Blur blur={1} />
      </Path>
    </Group>
  )
}
