import { Canvas, Circle, Path, Skia } from "@shopify/react-native-skia"
import { StyleSheet } from "react-native"

const canvasSize = { width: 300, height: 300 }

function getVector(p1: { x: number; y: number }, p2: { x: number; y: number }) {
  return {
    x: p2.x - p1.x,
    y: p2.y - p1.y,
  }
}

const start1 = { x: 10, y: 50 }
const end1 = { x: 150, y: 140 }
const control1 = { x: 160, y: 10 }
const control2 = { x: 40, y: 120 }

const control2ToEnd1 = getVector(control2, end1)

const control3 = {
  x: end1.x + control2ToEnd1.x,
  y: end1.y + control2ToEnd1.y,
}

const control4 = { x: 280, y: 180 }
const end2 = { x: 200, y: 250 }

const path1 = Skia.Path.Make()
path1.moveTo(start1.x, start1.y)
path1.cubicTo(control1.x, control1.y, control2.x, control2.y, end1.x, end1.y)

const path2 = Skia.Path.Make()
path2.moveTo(end1.x, end1.y)
path2.cubicTo(control3.x, control3.y, control4.x, control4.y, end2.x, end2.y)

const subPath = Skia.Path.Make()
subPath.moveTo(start1.x, start1.y)
subPath.lineTo(control1.x, control1.y)
subPath.lineTo(control2.x, control2.y)
subPath.lineTo(end1.x, end1.y)
subPath.lineTo(control3.x, control3.y)
subPath.lineTo(control4.x, control4.y)
subPath.lineTo(end2.x, end2.y)

export default function QubicBezierCurve3() {
  return (
    <Canvas style={[styles.canvas, canvasSize]}>
      <Path path={path1} style="stroke" color="lightblue" strokeWidth={2} />
      <Path path={path2} style="stroke" color="lightgreen" strokeWidth={2} />
      <Path path={subPath} style="stroke" color="lightgray" strokeWidth={1} />
      <Circle cx={control1.x} cy={control1.y} r={2} color="lightgray" />
      <Circle cx={control2.x} cy={control2.y} r={2} color="lightgray" />
      <Circle cx={end1.x} cy={end1.y} r={2} color="lightgray" />
      <Circle cx={control3.x} cy={control3.y} r={2} color="lightgray" />
      <Circle cx={control4.x} cy={control4.y} r={2} color="lightgray" />
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
