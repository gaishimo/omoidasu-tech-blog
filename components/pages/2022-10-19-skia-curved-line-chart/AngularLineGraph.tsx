import { Canvas, Path, Skia } from "@shopify/react-native-skia"
import { StyleSheet } from "react-native"

const canvasSize = { width: 300, height: 200 }
const hPadding = 20
const yScale = 2

const data = [35, 75, 45, 60, 40]

const xPointsDistance = (canvasSize.width - hPadding * 2) / (data.length - 1)

console.log("xPointsDistance:", xPointsDistance)

const path = Skia.Path.Make()

for (let i = 0; i < data.length; i++) {
  if (i === 0) {
    path.moveTo(hPadding, canvasSize.height - data[0])
  } else {
    path.lineTo(
      hPadding + i * xPointsDistance,
      canvasSize.height - data[i] * yScale,
    )
  }
}

export default function AngularLineGraph() {
  return (
    <Canvas style={{ ...styles.canvas, ...canvasSize }}>
      <Path path={path} color="lightblue" strokeWidth={2} style="stroke" />
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
