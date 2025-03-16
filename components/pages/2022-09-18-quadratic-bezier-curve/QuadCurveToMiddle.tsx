import { Canvas, Circle, Path, Skia } from "@shopify/react-native-skia"
import { StyleSheet } from "react-native"

const canvasSize = { width: 300, height: 300 }

const start = { x: 20, y: 150 }
const control = { x: 150, y: 50 }
const end = { x: 280, y: 210 }

const path = Skia.Path.Make()
path.moveTo(start.x, start.y)
path.quadTo(control.x, control.y, end.x, end.y)

const progress = 0.6
const vector1 = getVector(start, control)
const vector2 = getVector(control, end)

const point1 = {
  x: start.x + vector1.x * progress,
  y: start.y + vector1.y * progress,
}
const point2 = {
  x: control.x + vector2.x * progress,
  y: control.y + vector2.y * progress,
}
const vector3 = getVector(point1, point2)
const point3 = {
  x: point1.x + vector3.x * progress,
  y: point1.y + vector3.y * progress,
}

const path2 = Skia.Path.Make()
path2.moveTo(start.x, start.y)
path2.quadTo(point1.x, point1.y, point3.x, point3.y)

const subPath1 = Skia.Path.Make()
subPath1.moveTo(start.x, start.y)
subPath1.lineTo(control.x, control.y)
subPath1.lineTo(end.x, end.y)

const subPath2 = Skia.Path.Make()
subPath2.moveTo(point1.x, point1.y)
subPath2.lineTo(point2.x, point2.y)

export default function QuadCurveToMiddle() {
  return (
    <Canvas style={{ ...styles.canvas, ...canvasSize }}>
      <Path
        path={subPath1}
        style="stroke"
        color="rgb(230, 230, 230)"
        strokeWidth={1.5}
      />
      <Path
        path={path}
        style="stroke"
        color="rgb(240, 250, 255)"
        strokeWidth={2.5}
      />
      <Path path={path2} style="stroke" color="lightblue" strokeWidth={2.5} />
      <Path
        path={subPath2}
        style="stroke"
        color="lightgreen"
        strokeWidth={1.5}
      />
      <Circle cx={point1.x} cy={point1.y} r={2.5} color="lightgreen" />
      <Circle cx={point2.x} cy={point2.y} r={2.5} color="lightgreen" />
      <Circle cx={point3.x} cy={point3.y} r={2.5} color="black" />
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

function getVector(p1: { x: number; y: number }, p2: { x: number; y: number }) {
  return {
    x: p2.x - p1.x,
    y: p2.y - p1.y,
  }
}
