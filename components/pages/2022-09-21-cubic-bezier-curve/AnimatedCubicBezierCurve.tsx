import {
  Canvas,
  Path,
  Skia,
  useComputedValue,
  useTiming,
} from "@shopify/react-native-skia"
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

// 曲線全体
const subPath = Skia.Path.Make()
subPath.moveTo(start.x, start.y)
subPath.cubicTo(control1.x, control1.y, control2.x, control2.y, end.x, end.y)

export default function AnimatedQubicBezierCurve4() {
  const progress = useTiming({ loop: true }, { duration: 3500 })
  const curvePath = useComputedValue(() => {
    const point1 = {
      x: start.x + startToControl1.x * progress.current,
      y: start.y + startToControl1.y * progress.current,
    }
    const point2 = {
      x: control1.x + control1To2.x * progress.current,
      y: control1.y + control1To2.y * progress.current,
    }
    const point3 = {
      x: control2.x + control2ToEnd.x * progress.current,
      y: control2.y + control2ToEnd.y * progress.current,
    }

    const point1To2 = getVector(point1, point2)
    const point2To3 = getVector(point2, point3)

    const point4 = {
      x: point1.x + point1To2.x * progress.current,
      y: point1.y + point1To2.y * progress.current,
    }
    const point5 = {
      x: point2.x + point2To3.x * progress.current,
      y: point2.y + point2To3.y * progress.current,
    }

    const point4To5 = getVector(point4, point5)
    const point6 = {
      x: point4.x + point4To5.x * progress.current,
      y: point4.y + point4To5.y * progress.current,
    }

    const path = Skia.Path.Make()
    path.moveTo(start.x, start.y)
    path.cubicTo(point1.x, point1.y, point4.x, point4.y, point6.x, point6.y)
    return path
  }, [progress])

  return (
    <Canvas style={[styles.canvas, canvasSize]}>
      <Path
        path={subPath}
        style="stroke"
        color="rgb(240, 240, 240)"
        strokeWidth={3}
      />
      <Path path={curvePath} style="stroke" color="lightblue" strokeWidth={3} />
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
