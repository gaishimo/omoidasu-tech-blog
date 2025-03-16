import { Canvas, Path, Skia } from "@shopify/react-native-skia"
import { StyleSheet } from "react-native"

const canvasSize = { width: 300, height: 300 }

const start = { x: 10, y: 150 }
const distance = 40
const waveHeight = 20

const path = Skia.Path.Make()
path.moveTo(start.x, start.y)

for (const i of [0, 1, 2, 3, 4, 5, 6]) {
  path.rQuadTo(distance / 2, waveHeight * (i % 2 === 0 ? -1 : 1), distance, 0)
}

export default function QuadCurve3() {
  return (
    <Canvas style={{ ...styles.canvas, ...canvasSize }}>
      <Path path={path} style="stroke" color="lightblue" strokeWidth={3} />
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
