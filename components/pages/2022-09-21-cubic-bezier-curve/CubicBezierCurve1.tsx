import { Canvas, Path, Skia } from "@shopify/react-native-skia"
import { StyleSheet } from "react-native"

const canvasSize = { width: 300, height: 300 }

const start = { x: 10, y: 100 }
const end = { x: 290, y: 200 }
const control1 = { x: 290, y: 20 }
const control2 = { x: 140, y: 240 }

const path = Skia.Path.Make()
path.moveTo(start.x, start.y)
path.cubicTo(control1.x, control1.y, control2.x, control2.y, end.x, end.y)

export default function QubicBezierCurve1() {
  return (
    <Canvas style={[styles.canvas, canvasSize]}>
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
