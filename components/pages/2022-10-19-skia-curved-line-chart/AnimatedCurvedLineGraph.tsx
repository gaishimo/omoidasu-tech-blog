import { Canvas, Path } from "@shopify/react-native-skia"
import {
  useSharedValue,
  useDerivedValue,
  withTiming,
  Easing,
} from "react-native-reanimated"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import * as shape from "d3-shape"
import { StyleSheet, View } from "react-native"

const canvasSize = { width: 300, height: 200 }
const hPadding = 8
const yScale = 2

const data = [5, 75, 25, 60, 35]
const xPointsDistance = (canvasSize.width - hPadding * 2) / (data.length - 1)

const points: [number, number][] = data.map((d, i) => [
  hPadding + i * xPointsDistance,
  canvasSize.height - d * yScale,
])
const lineGenerator = shape.line().curve(shape.curveCardinal.tension(0.1))
const pathData = lineGenerator(points)

export default function AnimatedCurvedLineGraph() {
  const tension = useSharedValue(1)
  const pathData = useDerivedValue(() => {
    const lineGenerator = shape
      .line()
      .curve(shape.curveCardinal.tension(tension.value))
    const data = lineGenerator(points)
    return data
  }, [])

  const gesture = Gesture.Tap().onStart(() => {
    if (tension.value === 0) {
      tension.value = withTiming(1, {
        easing: Easing.inOut(Easing.ease),
        duration: 1000,
      })
    } else if (tension.value === 1) {
      tension.value = withTiming(0, {
        easing: Easing.inOut(Easing.ease),
        duration: 1000,
      })
    }
  })

  return (
    <GestureDetector gesture={gesture}>
      <View>
        <Canvas style={{ ...styles.canvas, ...canvasSize }}>
          <Path
            path={pathData}
            style="stroke"
            color="lightblue"
            strokeWidth={2}
          />
        </Canvas>
      </View>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  canvas: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "rgb(240, 240, 240)",
  },
})
