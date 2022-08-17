import {
  Canvas,
  Circle,
  Path,
  runTiming,
  Skia,
  useComputedValue,
  useValue,
} from "@shopify/react-native-skia"
import { useCallback, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

const canvasSize = { width: 280, height: 280 }
const radius = 80
const centerPos = { x: canvasSize.width / 2, y: canvasSize.height / 2 }

export default function DynamicArc() {
  const [animating, setAnimating] = useState(false)
  const progress = useValue(0)

  const path = useComputedValue(() => {
    const path = Skia.Path.Make()
    path.moveTo(centerPos.x, centerPos.y)

    const arcRect = {
      x: centerPos.x - radius,
      y: centerPos.y - radius,
      width: radius * 2,
      height: radius * 2,
    }
    const startDegree = -90
    path.addArc(arcRect, startDegree, progress.current)
    path.lineTo(centerPos.x, centerPos.y).close()
    return path
  }, [progress])

  const start = useCallback(() => {
    if (animating) return
    setAnimating(true)
    runTiming(progress, 360, { duration: 6000 }, () => {
      setTimeout(() => {
        progress.current = 0
        setAnimating(false)
      }, 500)
    })
  }, [progress, animating])

  return (
    <View style={[styles.container, canvasSize]}>
      <Canvas style={[styles.canvas, { ...canvasSize }]}>
        <Circle
          cx={centerPos.x}
          cy={centerPos.y}
          r={radius}
          color="lightblue"
          style="stroke"
          strokeWidth={2}
        />
        <Path path={path} color="lightblue" style="fill" strokeWidth={2} />
      </Canvas>
      {!animating && (
        <TouchableOpacity
          onPress={start}
          style={[StyleSheet.absoluteFill, styles.overlay]}
        >
          <Text style={styles.startText}>START</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { borderRadius: 8 },
  canvas: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    borderColor: "rgb(220, 220, 220)",
  },
  overlay: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(250, 250, 250)",
    borderRadius: 8,
  },
  startText: { color: "rgb(100, 180, 180)", fontSize: 18 },
})
