import {
  Canvas,
  Path,
  Skia,
  useComputedValue,
  useValue,
} from "@shopify/react-native-skia"
import { StyleSheet, View } from "react-native"

const canvasSize = { width: 100, height: 100 }
const center = { x: canvasSize.width / 2, y: canvasSize.height / 2 }
const radius = 30

export default function CircleProgress1() {
  const progress = useValue(0)
  const activeArcPath = useComputedValue(() => {
    const path = Skia.Path.Make()
    const arcRect = {
      x: center.x - radius,
      y: center.y - radius,
      width: radius * 2,
      height: radius * 2,
    }
    path.addArc(arcRect, progress.current * 360, 300)

    return path
  }, [progress])

  return (
    <View style={[styles.container, canvasSize]}>
      <Canvas style={[canvasSize]}>
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
