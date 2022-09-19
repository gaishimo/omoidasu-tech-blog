import {
  Canvas,
  Path,
  Skia,
  useComputedValue,
  useTiming,
} from "@shopify/react-native-skia"
import { StyleSheet } from "react-native"

const canvasSize = { width: 300, height: 300 }

const start = { x: 20, y: 150 }
const control = { x: 150, y: 50 }
const end = { x: 280, y: 210 }

const subPath = Skia.Path.Make()
subPath.moveTo(start.x, start.y)
subPath.quadTo(control.x, control.y, end.x, end.y)

function getVector(p1: { x: number; y: number }, p2: { x: number; y: number }) {
  return {
    x: p2.x - p1.x,
    y: p2.y - p1.y,
  }
}

export default function AnimatedQuadCurve() {
  const progress = useTiming({ loop: true }, { duration: 4000 })
  const curvePath = useComputedValue(() => {
    const vector1 = getVector(start, control)
    const vector2 = getVector(control, end)
    const point1 = {
      x: start.x + vector1.x * progress.current,
      y: start.y + vector1.y * progress.current,
    }
    const point2 = {
      x: control.x + vector2.x * progress.current,
      y: control.y + vector2.y * progress.current,
    }
    const vector3 = getVector(point1, point2)
    const point3 = {
      x: point1.x + vector3.x * progress.current,
      y: point1.y + vector3.y * progress.current,
    }
    const path = Skia.Path.Make()
    path.moveTo(start.x, start.y)
    path.quadTo(point1.x, point1.y, point3.x, point3.y)
    return path
  }, [progress])

  return (
    <Canvas style={[styles.canvas, canvasSize]}>
      <Path
        path={subPath}
        style="stroke"
        color="rgb(230, 230, 230)"
        strokeWidth={1.5}
      />
      <Path
        path={curvePath}
        style="stroke"
        color="lightblue"
        strokeWidth={2.5}
      />
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
