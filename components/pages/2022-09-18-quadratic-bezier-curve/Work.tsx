import { Canvas, Path, Skia } from "@shopify/react-native-skia"
import { StyleSheet } from "react-native"

const canvasSize = { width: 300, height: 300 }

const path = Skia.Path.Make()
path.moveTo(20, 100)
path.quadTo(180, 20, 280, 170)

export default function Work() {
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
