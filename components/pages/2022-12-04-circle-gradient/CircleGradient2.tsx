import {
  Canvas,
  Circle,
  Group,
  SweepGradient,
} from "@shopify/react-native-skia"

const canvasSize = { width: 300, height: 300 }
const center = { x: canvasSize.width / 2, y: canvasSize.height / 2 }

export default function CircleGradient2() {
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
        <Circle
          cx={center.x}
          cy={center.y}
          r={60}
          strokeWidth={20}
          style="stroke"
        />
        <SweepGradient
          c={center}
          colors={["cyan", "magenta", "yellow", "cyan"]}
        />
      </Group>
    </Canvas>
  )
}
