import { Canvas, Path, Skia } from "@shopify/react-native-skia"
import {
  useSharedValue,
  useDerivedValue,
  withTiming,
  runOnJS,
} from "react-native-reanimated"
import { useCallback, useEffect } from "react"
import { StyleSheet, View } from "react-native"

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

export default function CheckMark2() {
  const progress1 = useSharedValue(0)
  const progress2 = useSharedValue(0)

  const line1Path = useDerivedValue(() => {
    const path = Skia.Path.Make()
    if (progress1.value === 0) {
      return path
    }
    path.moveTo(checkMarkPoints[0].x, checkMarkPoints[0].y)
    const vector = getVector(checkMarkPoints[0], checkMarkPoints[1])
    path.rLineTo(vector.x * progress1.value, vector.y * progress1.value)
    return path
  }, [])

  const line2Path = useDerivedValue(() => {
    const path = Skia.Path.Make()
    if (progress2.value === 0) {
      return path
    }
    path.moveTo(checkMarkPoints[1].x, checkMarkPoints[1].y)
    const vector = getVector(checkMarkPoints[1], checkMarkPoints[2])
    path.rLineTo(vector.x * progress2.value, vector.y * progress2.value)
    return path
  }, [])

  const animateLine2 = useCallback(() => {
    progress2.value = withTiming(1, { duration: 700 })
  }, [])

  const runAnimation = useCallback(() => {
    progress1.value = 0
    progress2.value = 0
    progress1.value = withTiming(1, { duration: 500 }, finished => {
      if (finished) {
        runOnJS(animateLine2)()
      }
    })
  }, [animateLine2])

  useEffect(() => {
    const interval = setInterval(() => runAnimation(), 4000)
    return () => clearInterval(interval)
  }, [runAnimation])

  return (
    <View style={[styles.container, canvasSize]}>
      <Canvas style={canvasSize}>
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
