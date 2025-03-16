import { Canvas, Circle, Path, Skia } from "@shopify/react-native-skia"
import { StyleSheet } from "react-native"

const canvasSize = { width: 280, height: 280 }
const radius = 80
const centerPos = { x: canvasSize.width / 2, y: canvasSize.height / 2 }

export default function StaticArc() {
  const path = Skia.Path.Make()
  path.moveTo(centerPos.x, centerPos.y)

  const arcRect = {
    x: centerPos.x - radius,
    y: centerPos.y - radius,
    width: radius * 2,
    height: radius * 2,
  }
  const startDegree = -90
  path.addArc(arcRect, startDegree, 60)
  path.lineTo(centerPos.x, centerPos.y).close()

  return (
    <Canvas style={{ ...styles.canvas, ...canvasSize }}>
      <Circle
        cx={centerPos.x}
        cy={centerPos.y}
        r={radius}
        color="lightblue"
        style="stroke"
        strokeWidth={2}
      />
      <Path path={path} color="lightblue" style="fill" strokeWidth={2} />
    </Canvas>
  )
}

const styles = StyleSheet.create({
  canvas: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    borderColor: "rgb(220, 220, 220)",
  },
})
