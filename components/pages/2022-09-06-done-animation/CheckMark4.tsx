import {
  Canvas,
  Easing,
  Path,
  runTiming,
  Skia,
  useComputedValue,
  useValue,
} from "@shopify/react-native-skia"
import { useCallback, useEffect } from "react"
import { StyleSheet, View } from "react-native"
import { wait } from "../../../utils/wait"

const canvasSize = { width: 100, height: 100 }
const center = { x: canvasSize.width / 2, y: canvasSize.height / 2 }
const radius = 70

const checkMarkPoints = [
  { x: center.x - radius * 0.35, y: center.y + radius * 0.1 },
  { x: center.x - radius * 0.05, y: center.y + radius * 0.45 },
  { x: center.x + radius * 0.4, y: center.y - radius * 0.35 },
]

function getVector(p1: { x: number; y: number }, p2: { x: number; y: number }) {
  return {
    x: p2.x - p1.x,
    y: p2.y - p1.y,
  }
}

export default function CheckMark4() {
  const progress1 = useValue(0)
  const progress2 = useValue(0)

  const line1Path = useComputedValue(() => {
    const path = Skia.Path.Make()
    if (progress1.current === 0) {
      return path
    }
    path.moveTo(checkMarkPoints[0].x, checkMarkPoints[0].y)
    const vector = getVector(checkMarkPoints[0], checkMarkPoints[1])
    path.rLineTo(vector.x * progress1.current, vector.y * progress1.current)
    return path
  }, [progress1])

  const line2Path = useComputedValue(() => {
    const path = Skia.Path.Make()
    if (progress2.current === 0) {
      return path
    }
    path.moveTo(checkMarkPoints[1].x, checkMarkPoints[1].y)
    const vector = getVector(checkMarkPoints[1], checkMarkPoints[2])
    path.rLineTo(vector.x * progress2.current, vector.y * progress2.current)
    return path
  }, [progress2])

  const runAnimation = useCallback(() => {
    progress1.current = 0
    progress2.current = 0
    runTiming(
      progress1,
      1,
      { duration: 300, easing: Easing.out(Easing.sin) },
      async () => {
        await wait(100)
        runTiming(progress2, 1, {
          duration: 500,
          easing: Easing.out(Easing.sin),
        })
      },
    )
  }, [])

  useEffect(() => {
    setInterval(() => runAnimation(), 4000)
  }, [runAnimation])

  return (
    <View style={[styles.container, canvasSize]}>
      <Canvas style={[canvasSize]}>
        <Path
          path={line1Path}
          color="#0091FF"
          style="stroke"
          strokeWidth={6}
          strokeCap="round"
          strokeJoin="round"
        />
        <Path
          path={line2Path}
          color="#0091FF"
          style="stroke"
          strokeWidth={6}
          strokeCap="round"
          strokeJoin="round"
        />
      </Canvas>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgb(240, 240, 240)",
  },
})
