import { Canvas, Circle, Path, Skia } from "@shopify/react-native-skia"
import { StyleSheet } from "react-native"

const canvasSize = { width: 300, height: 300 }

const start1 = { x: 10, y: 150 }
const control1 = { x: 80, y: 50 }
const end1 = { x: 150, y: 150 }

const middle1a = {
  x: start1.x + (control1.x - start1.x) * 0.5,
  y: start1.y + (control1.y - start1.y) * 0.5,
}
const middle1b = {
  x: control1.x + (end1.x - control1.x) * 0.5,
  y: control1.y + (end1.y - control1.y) * 0.5,
}

const path1 = Skia.Path.Make()
path1.moveTo(start1.x, start1.y)
path1.quadTo(control1.x, control1.y, end1.x, end1.y)

const control2 = {
  x: control1.x + (end1.x - control1.x) * 2,
  y: control1.y + (end1.y - control1.y) * 2,
}

const end2 = { x: 290, y: 40 }

const middle2a = {
  x: end1.x + (control2.x - end1.x) * 0.5,
  y: end1.y + (control2.y - end1.y) * 0.5,
}
const middle2b = {
  x: control2.x + (end2.x - control2.x) * 0.5,
  y: control2.y + (end2.y - control2.y) * 0.5,
}

const path2 = Skia.Path.Make()
path2.moveTo(end1.x, end1.y)
path2.quadTo(control2.x, control2.y, end2.x, end2.y)

const subPath = Skia.Path.Make()
subPath.moveTo(start1.x, start1.y)
subPath.lineTo(control1.x, control1.y)
subPath.lineTo(end1.x, end1.y)
subPath.moveTo(middle1a.x, middle1a.y)
subPath.lineTo(middle1b.x, middle1b.y)

subPath.moveTo(end1.x, end1.y)
subPath.lineTo(control2.x, control2.y)
subPath.lineTo(end2.x, end2.y)
subPath.moveTo(middle2a.x, middle2a.y)
subPath.lineTo(middle2b.x, middle2b.y)

export default function QuadCurve4() {
  return (
    <Canvas style={[styles.canvas, canvasSize]}>
      <Path
        path={subPath}
        style="stroke"
        color="rgb(230, 230, 230)"
        strokeWidth={2}
      />
      <Path path={path1} style="stroke" color="lightblue" strokeWidth={3} />
      <Path path={path2} style="stroke" color="lightgreen" strokeWidth={3} />
      <Circle cx={end1.x} cy={end1.y} r={2.5} color="gray" />
      <Circle cx={control1.x} cy={control1.y} r={2.5} color="gray" />
      <Circle cx={control2.x} cy={control2.y} r={2.5} color="gray" />
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
