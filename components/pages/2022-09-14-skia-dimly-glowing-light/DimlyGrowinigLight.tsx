import {
  Blur,
  Canvas,
  Circle,
  RadialGradient,
} from "@shopify/react-native-skia"

const canvasSize = { width: 300, height: 450 }
const center = { x: canvasSize.width / 2, y: canvasSize.height / 2 }
const color = "rgb(255, 255, 100)"
const colorAlpha = "rgba(255, 255, 100, 0.5)"
// const color = "lightblue"

const blurredCircles = [
  { radius: 40, blur: 40 },
  { radius: 50, blur: 60 },
  { radius: 60, blur: 80 },
  { radius: 70, blur: 100 },
]

export default function DimlyGrowingLight() {
  return (
    <Canvas
      style={{
        ...canvasSize,
        backgroundColor: "rgb(0, 0, 70)",
        borderRadius: 8,
      }}
    >
      {blurredCircles.map((c, i) => (
        <Circle key={i} cx={center.x} cy={center.y} r={c.radius}>
          <RadialGradient
            c={center}
            r={c.radius}
            colors={[color, colorAlpha]}
          />
          <Blur blur={c.blur} mode="decal" />
        </Circle>
      ))}
      <Circle cx={center.x} cy={center.y} r={30} color={color}>
        <Blur blur={0.7} mode="decal" />
      </Circle>
    </Canvas>
  )
}
