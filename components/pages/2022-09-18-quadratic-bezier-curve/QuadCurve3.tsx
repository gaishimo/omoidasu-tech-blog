import { Canvas, Path, Skia } from "@shopify/react-native-skia"
import { StyleSheet } from "react-native"

const canvasSize = { width: 300, height: 300 }

const start1 = { x: 10, y: 150 }
const control1 = { x: 80, y: 50 }
const end1 = { x: 150, y: 150 }

const path = Skia.Path.Make()
path.moveTo(start1.x, start1.y)
path.quadTo(control1.x, control1.y, end1.x, end1.y)

const control2 = {
  x: control1.x + (end1.x - control1.x) * 2,
  y: control1.y + (end1.y - control1.y) * 2,
}

path.quadTo(control2.x, control2.y, 290, 40)

export default function QuadCurve3() {
  return (
    <Canvas style={{ ...styles.canvas, ...canvasSize }}>
      <Path path={path} style="stroke" color="lightblue" strokeWidth={3} />
    </Canvas>
  )
}

const styles = StyleSheet.create({
  canvas: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "rgb(240, 240, 240)",
  },
})
