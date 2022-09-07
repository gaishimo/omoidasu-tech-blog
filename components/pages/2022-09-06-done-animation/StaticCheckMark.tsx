import { Canvas, Path, Skia } from "@shopify/react-native-skia"
import { useMemo } from "react"
import { StyleSheet, View } from "react-native"

const canvasSize = { width: 100, height: 100 }
const center = { x: canvasSize.width / 2, y: canvasSize.height / 2 }
const radius = 40

const checkMarkPoints = [
  { x: center.x - radius * 0.35, y: center.y + radius * 0.1 },
  { x: center.x - radius * 0.05, y: center.y + radius * 0.45 },
  { x: center.x + radius * 0.4, y: center.y - radius * 0.35 },
]

export default function CircleProgress() {
  const checkMarkPath = useMemo(() => {
    const path = Skia.Path.Make()
    path.moveTo(checkMarkPoints[0].x, checkMarkPoints[0].y)
    path.lineTo(checkMarkPoints[1].x, checkMarkPoints[1].y)
    path.lineTo(checkMarkPoints[2].x, checkMarkPoints[2].y)
    return path
  }, [])

  return (
    <View style={[styles.container, canvasSize]}>
      <Canvas style={[canvasSize]}>
        <Path
          path={checkMarkPath}
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
