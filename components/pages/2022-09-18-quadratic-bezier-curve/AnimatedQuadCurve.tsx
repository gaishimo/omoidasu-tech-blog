import { Canvas, Path, Skia } from "@shopify/react-native-skia"
import {
  useSharedValue,
  useDerivedValue,
  withTiming,
  withRepeat,
} from "react-native-reanimated"
import { useEffect } from "react"
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
  const progress = useSharedValue(0)

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 4000 }), -1, false)
  }, [])

  const curvePath = useDerivedValue(() => {
    const vector1 = getVector(start, control)
    const vector2 = getVector(control, end)
    const point1 = {
      x: start.x + vector1.x * progress.value,
      y: start.y + vector1.y * progress.value,
    }
    const point2 = {
      x: control.x + vector2.x * progress.value,
      y: control.y + vector2.y * progress.value,
    }
    const vector3 = getVector(point1, point2)
    const point3 = {
      x: point1.x + vector3.x * progress.value,
      y: point1.y + vector3.y * progress.value,
    }
    const path = Skia.Path.Make()
    path.moveTo(start.x, start.y)
    path.quadTo(point1.x, point1.y, point3.x, point3.y)
    return path
  }, [])

  return (
    <Canvas style={{ ...styles.canvas, ...canvasSize }}>
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
