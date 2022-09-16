import {
  Canvas,
  Circle,
  Group,
  Oval,
  Paint,
  usePaintRef,
} from "@shopify/react-native-skia"

const canvasSize = { width: 240, height: 240 }
const center = { x: canvasSize.width / 2, y: canvasSize.height / 2 }
const baseRadius = 100
const ovalRect = {
  x: center.x - baseRadius,
  y: center.y - baseRadius * 0.35,
  width: baseRadius * 2,
  height: baseRadius * 0.35 * 2,
}

export default function StaticReactLogo() {
  const ovalPaint = usePaintRef()
  return (
    <Canvas style={[canvasSize]}>
      <Circle cx={center.x} cy={center.y} r={16} color="lightblue" />
      <Paint ref={ovalPaint} color="lightblue" style="stroke" strokeWidth={8} />
      <Group strokeWidth={8}>
        <Oval rect={ovalRect} paint={ovalPaint} />
      </Group>
      <Group origin={center} transform={[{ rotate: Math.PI / 3 }]}>
        <Oval rect={ovalRect} paint={ovalPaint} />
      </Group>
      <Group
        strokeWidth={8}
        origin={center}
        transform={[{ rotate: -Math.PI / 3 }]}
      >
        <Oval rect={ovalRect} paint={ovalPaint} />
      </Group>
    </Canvas>
  )
}
