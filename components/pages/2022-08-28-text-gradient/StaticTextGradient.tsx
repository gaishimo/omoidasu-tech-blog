import {
  Canvas,
  LinearGradient,
  Text,
  useFont,
} from "@shopify/react-native-skia"
import { StyleSheet } from "react-native"

const canvasSize = { width: 320, height: 160 }
const textPos = { x: 20, y: 90 }

export default function StaticTextGradient() {
  const font = useFont(
    require("../../../assets/fonts/SF-Mono-Semibold.otf"),
    20.5,
  )
  return (
    <Canvas style={styles.canvas}>
      {font != null && (
        <Text {...textPos} font={font} text="Gradient Text by Skia">
          <LinearGradient
            start={{ x: textPos.x, y: textPos.y }}
            end={{ x: canvasSize.width, y: canvasSize.height }}
            colors={["#863FFF", "#FF84D0"]}
          />
        </Text>
      )}
    </Canvas>
  )
}

const styles = StyleSheet.create({
  canvas: { ...canvasSize, borderRadius: 8, backgroundColor: "rgb(0, 0, 30)" },
})
