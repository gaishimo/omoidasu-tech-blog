import {
  Canvas,
  Circle,
  DashPathEffect,
  Path,
  Skia,
} from "@shopify/react-native-skia"
import { StyleSheet } from "react-native"

const canvasSize = { width: 300, height: 300 }

const start = { x: 20, y: 150 }
const controlPoint = { x: 150, y: 50 }
const end = { x: 280, y: 210 }

const middle1 = {
  x: start.x + (controlPoint.x - start.x) * 0.5,
  y: start.y + (controlPoint.y - start.y) * 0.5,
}

const middle2 = {
  x: controlPoint.x + (end.x - controlPoint.x) * 0.5,
  y: controlPoint.y + (end.y - controlPoint.y) * 0.5,
}

const path = Skia.Path.Make()
path.moveTo(start.x, start.y)
path.quadTo(controlPoint.x, controlPoint.y, end.x, end.y)

const subPath1 = Skia.Path.Make()
subPath1.moveTo(start.x, start.y)
subPath1.lineTo(controlPoint.x, controlPoint.y)
subPath1.lineTo(end.x, end.y)

subPath1.moveTo(middle1.x, middle1.y)
subPath1.lineTo(middle2.x, middle2.y)

const subPath2 = Skia.Path.Make()
subPath2.moveTo(start.x, start.y)
subPath2.lineTo(end.x, end.y)

export default function QuadCurve2() {
  return (
    <Canvas style={{ ...styles.canvas, ...canvasSize }}>
      <Path
        path={subPath1}
        style="stroke"
        color="rgb(230, 230, 230)"
        strokeWidth={2}
      />
      <Path
        path={subPath2}
        style="stroke"
        color="rgb(230, 230, 230)"
        strokeWidth={2}
      >
        <DashPathEffect intervals={[2, 2]} />
      </Path>
      <Path path={path} style="stroke" color="lightblue" strokeWidth={3} />
      <Circle cx={controlPoint.x} cy={controlPoint.y} r={3} color="lightgray" />
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
