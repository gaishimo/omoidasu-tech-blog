import { Canvas, Path } from "@shopify/react-native-skia"
import * as shape from "d3-shape"
import { StyleSheet } from "react-native"

const canvasSize = { width: 300, height: 200 }
const hPadding = 8
const yScale = 2

const data = [5, 75, 25, 60, 35]
const xPointsDistance = (canvasSize.width - hPadding * 2) / (data.length - 1)

const points: [number, number][] = data.map((d, i) => [
  hPadding + i * xPointsDistance,
  canvasSize.height - d * yScale,
])
console.log("points:", points)

const lineGenerator = shape.line().curve(shape.curveCardinal.tension(0.1))
const pathData = lineGenerator(points)

console.log("pathData:", pathData)

export default function CurvedLineGraph() {
  return (
    <Canvas style={[styles.canvas, canvasSize]}>
      <Path path={pathData} style="stroke" color="lightblue" strokeWidth={2} />
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
