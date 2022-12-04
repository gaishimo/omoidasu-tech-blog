import {
  Canvas,
  Circle,
  Group,
  SweepGradient,
  Text,
  useFont,
} from "@shopify/react-native-skia"

const canvasSize = { width: 300, height: 300 }
const center = { x: canvasSize.width / 2, y: canvasSize.height / 2 }

export default function CircleGradient3() {
  const font = useFont(
    require("../../../assets/fonts/SF-Mono-Semibold.otf"),
    44,
  )
  if (font == null) return null
  return (
    <Canvas style={[canvasSize]}>
      <Group>
        <Circle
          cx={center.x}
          cy={center.y}
          r={100}
          strokeWidth={20}
          style="stroke"
        />
        <Text font={font} x={center.x - 56} y={center.y + 12} text="Skia" />
        <SweepGradient
          c={center}
          colors={["cyan", "magenta", "yellow", "cyan"]}
        />
      </Group>
    </Canvas>
  )
}
