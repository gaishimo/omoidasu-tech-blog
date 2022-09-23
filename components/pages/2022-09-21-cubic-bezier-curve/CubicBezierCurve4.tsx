import { Canvas, Circle, Path, Skia } from "@shopify/react-native-skia"
import { StyleSheet } from "react-native"

const canvasSize = { width: 300, height: 300 }

function getVector(p1: { x: number; y: number }, p2: { x: number; y: number }) {
  return {
    x: p2.x - p1.x,
    y: p2.y - p1.y,
  }
}

const progress = 0.4

const start = { x: 10, y: 100 }
const end = { x: 290, y: 200 }
const control1 = { x: 290, y: 20 }
const control2 = { x: 140, y: 240 }

const startToControl1 = getVector(start, control1)
const control1To2 = getVector(control1, control2)
const control2ToEnd = getVector(control2, end)

const point1 = {
  x: start.x + startToControl1.x * progress,
  y: start.y + startToControl1.y * progress,
}
const point2 = {
  x: control1.x + control1To2.x * progress,
  y: control1.y + control1To2.y * progress,
}
const point3 = {
  x: control2.x + control2ToEnd.x * progress,
  y: control2.y + control2ToEnd.y * progress,
}

const point1To2 = getVector(point1, point2)
const point2To3 = getVector(point2, point3)

const point4 = {
  x: point1.x + point1To2.x * progress,
  y: point1.y + point1To2.y * progress,
}
const point5 = {
  x: point2.x + point2To3.x * progress,
  y: point2.y + point2To3.y * progress,
}

const point4To5 = getVector(point4, point5)
const point6 = {
  x: point4.x + point4To5.x * progress,
  y: point4.y + point4To5.y * progress,
}

// 途中までの曲線
const linePath = Skia.Path.Make()
linePath.moveTo(start.x, start.y)
linePath.cubicTo(point1.x, point1.y, point4.x, point4.y, point6.x, point6.y)

// 曲線全体
const subPath = Skia.Path.Make()
subPath.moveTo(start.x, start.y)
subPath.cubicTo(control1.x, control1.y, control2.x, control2.y, end.x, end.y)

// 始点・終点・制御点を結ぶ線
const subPath2 = Skia.Path.Make()
subPath2.moveTo(start.x, start.y)
subPath2.lineTo(control1.x, control1.y)
subPath2.lineTo(control2.x, control2.y)
subPath2.lineTo(end.x, end.y)

const subPath3 = Skia.Path.Make()
subPath3.moveTo(point1.x, point1.y)
subPath3.lineTo(point2.x, point2.y)
subPath3.lineTo(point3.x, point3.y)

const subPath4 = Skia.Path.Make()
subPath4.moveTo(point4.x, point4.y)
subPath4.lineTo(point5.x, point5.y)

export default function QubicBezierCurve4() {
  return (
    <Canvas style={[styles.canvas, canvasSize]}>
      <Path
        path={subPath}
        style="stroke"
        color="rgb(240, 240, 240)"
        strokeWidth={3}
      />
      <Path path={linePath} style="stroke" color="lightblue" strokeWidth={3} />
      <Path
        path={subPath2}
        style="stroke"
        color="rgb(230, 230, 230)"
        strokeWidth={1.5}
      />
      <Path path={subPath3} style="stroke" color="lightgreen" strokeWidth={1} />
      <Path path={subPath4} style="stroke" color="orange" strokeWidth={1} />
      <Circle cx={point1.x} cy={point1.y} r={2.5} color="lightgreen" />
      <Circle cx={point2.x} cy={point2.y} r={2.5} color="lightgreen" />
      <Circle cx={point3.x} cy={point3.y} r={2.5} color="lightgreen" />
      <Circle cx={point4.x} cy={point4.y} r={2.5} color="orange" />
      <Circle cx={point5.x} cy={point5.y} r={2.5} color="orange" />
      <Circle cx={point6.x} cy={point6.y} r={2.5} color="red" />
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
