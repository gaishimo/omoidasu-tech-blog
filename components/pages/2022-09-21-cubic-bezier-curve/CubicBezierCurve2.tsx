import { Canvas, Circle, Path, Skia } from "@shopify/react-native-skia"
import { StyleSheet } from "react-native"

const canvasSize = { width: 300, height: 300 }

function getVector(p1: { x: number; y: number }, p2: { x: number; y: number }) {
  return {
    x: p2.x - p1.x,
    y: p2.y - p1.y,
  }
}

const start = { x: 10, y: 100 }
const end = { x: 290, y: 200 }
const control1 = { x: 290, y: 20 }
const control2 = { x: 140, y: 240 }

const startToControl1 = getVector(start, control1)
const control1To2 = getVector(control1, control2)
const control2ToEnd = getVector(control2, end)

const middle1 = {
  x: start.x + startToControl1.x * 0.5,
  y: start.y + startToControl1.y * 0.5,
}
const middle2 = {
  x: control1.x + control1To2.x * 0.5,
  y: control1.y + control1To2.y * 0.5,
}
const middle3 = {
  x: control2.x + control2ToEnd.x * 0.5,
  y: control2.y + control2ToEnd.y * 0.5,
}

const middle1To2 = getVector(middle1, middle2)
const middle2To3 = getVector(middle2, middle3)

const middle4 = {
  x: middle1.x + middle1To2.x * 0.5,
  y: middle1.y + middle1To2.y * 0.5,
}
const middle5 = {
  x: middle2.x + middle2To3.x * 0.5,
  y: middle2.y + middle2To3.y * 0.5,
}

const middle4To5 = getVector(middle4, middle5)
const middle6 = {
  x: middle4.x + middle4To5.x * 0.5,
  y: middle4.y + middle4To5.y * 0.5,
}

const path = Skia.Path.Make()
path.moveTo(start.x, start.y)
path.cubicTo(control1.x, control1.y, control2.x, control2.y, end.x, end.y)

const subPath = Skia.Path.Make()
subPath.moveTo(start.x, start.y)
subPath.lineTo(control1.x, control1.y)
subPath.lineTo(control2.x, control2.y)
subPath.lineTo(end.x, end.y)

const subPath2 = Skia.Path.Make()
subPath2.moveTo(middle1.x, middle1.y)
subPath2.lineTo(middle2.x, middle2.y)
subPath2.lineTo(middle3.x, middle3.y)

const subPath3 = Skia.Path.Make()
subPath3.moveTo(middle4.x, middle4.y)
subPath3.lineTo(middle5.x, middle5.y)

export default function QubicBezierCurve2() {
  return (
    <Canvas style={[styles.canvas, canvasSize]}>
      <Path path={path} style="stroke" color="lightblue" strokeWidth={3} />
      <Path
        path={subPath}
        style="stroke"
        color="lightgray"
        strokeWidth={2}
      ></Path>
      <Path path={subPath2} style="stroke" color="lightgreen" strokeWidth={2} />
      <Path path={subPath3} style="stroke" color="orange" strokeWidth={2} />
      <Circle cx={control1.x} cy={control1.y} r={3} color="black" />
      <Circle cx={control2.x} cy={control2.y} r={3} color="black" />
      <Circle cx={middle1.x} cy={middle1.y} r={3} color="lightgreen" />
      <Circle cx={middle2.x} cy={middle2.y} r={3} color="lightgreen" />
      <Circle cx={middle3.x} cy={middle3.y} r={3} color="lightgreen" />
      <Circle cx={middle4.x} cy={middle4.y} r={3} color="orange" />
      <Circle cx={middle5.x} cy={middle5.y} r={3} color="orange" />
      <Circle cx={middle6.x} cy={middle6.y} r={3} color="red" />
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
