import { Canvas, Path, Skia } from "@shopify/react-native-skia"
import {
  useSharedValue,
  useDerivedValue,
  withTiming,
  withRepeat,
} from "react-native-reanimated"
import { useCallback, useEffect, useMemo } from "react"
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
  const progress = useSharedValue(0)
  const totalLinePath = useMemo(() => {
    const path = Skia.Path.Make()
    path.moveTo(checkMarkPoints[0].x, checkMarkPoints[0].y)
    path.lineTo(checkMarkPoints[1].x, checkMarkPoints[1].y)
    return path
  }, [])

  const activeLinePath = useDerivedValue(() => {
    const path = Skia.Path.Make()
    if (progress.value === 0) {
      return path
    }
    path.moveTo(checkMarkPoints[0].x, checkMarkPoints[0].y)
    const vector = getVector(checkMarkPoints[0], checkMarkPoints[1])
    path.rLineTo(vector.x * progress.value, vector.y * progress.value)
    return path
  }, [])

  const runAnimation = useCallback(() => {
    progress.value = withRepeat(withTiming(1, { duration: 2000 }), -1, false)
  }, [])

  useEffect(() => {
    runAnimation()
  }, [runAnimation])

  return (
    <View style={[styles.container, canvasSize]}>
      <Canvas style={canvasSize}>
        <Path
          path={totalLinePath}
          color="rgb(230, 230, 230)"
          style="stroke"
          strokeWidth={6}
          strokeCap="round"
          strokeJoin="round"
        />
        <Path
          path={activeLinePath}
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
