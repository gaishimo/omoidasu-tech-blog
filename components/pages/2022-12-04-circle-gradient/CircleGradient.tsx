import { Canvas, Circle, SweepGradient } from "@shopify/react-native-skia"

const canvasSize = { width: 300, height: 300 }
const center = { x: canvasSize.width / 2, y: canvasSize.height / 2 }

export default function CircleGradient() {
  return (
    <Canvas style={canvasSize}>
      <Circle
        cx={center.x}
        cy={center.y}
        r={100}
        strokeWidth={20}
        style="stroke"
      >
        <SweepGradient
          c={center}
          colors={["cyan", "magenta", "yellow", "cyan"]}
        />
      </Circle>
    </Canvas>
  )
}
