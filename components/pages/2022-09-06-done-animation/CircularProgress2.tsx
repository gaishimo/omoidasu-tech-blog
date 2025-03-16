import { Canvas, Path, Skia } from "@shopify/react-native-skia"
import {
  useSharedValue,
  useDerivedValue,
  withTiming,
  withRepeat,
} from "react-native-reanimated"
import { useCallback, useEffect } from "react"
import { StyleSheet, View } from "react-native"

const canvasSize = { width: 100, height: 100 }
const center = { x: canvasSize.width / 2, y: canvasSize.height / 2 }
const radius = 30

export default function CircleProgress2() {
  const progress = useSharedValue(0)
  const activeArcPath = useDerivedValue(() => {
    const path = Skia.Path.Make()
    const arcRect = {
      x: center.x - radius,
      y: center.y - radius,
      width: radius * 2,
      height: radius * 2,
    }
    path.addArc(arcRect, progress.value * 360, 300)

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
          path={activeArcPath}
          color="#0091FF"
          style="stroke"
          strokeWidth={6}
          strokeCap="round"
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
