import {
  Canvas,
  Easing,
  interpolate,
  LinearGradient,
  Text,
  useComputedValue,
  useFont,
  useTiming,
} from "@shopify/react-native-skia"
import { StyleSheet } from "react-native"

const canvasSize = { width: 320, height: 160 }
const textPos = { x: 20, y: 90 }

export default function DynamicTextGradient() {
  const font = useFont(
    require("../../../assets/fonts/SF-Mono-Semibold.otf"),
    20.5,
  )
  const progress = useTiming(
    { loop: true, yoyo: false },
    { easing: Easing.inOut(Easing.ease), duration: 2500 },
  )

  const positions = useComputedValue(() => {
    return [
      interpolate(progress.current, [0, 0.25, 0.5, 0.75, 1], [0, 0, 0, 0.5, 1]),
      interpolate(progress.current, [0, 0.25, 0.5, 0.75, 1], [0, 0, 0.5, 1, 1]),
      interpolate(progress.current, [0, 0.25, 0.5, 0.75, 1], [0, 0.5, 1, 1, 1]),
    ]
  }, [progress])

  return (
    <Canvas style={styles.canvas}>
      {font != null && (
        <>
          <Text {...textPos} font={font} text="Gradient Text by Skia">
            <LinearGradient
              start={{ x: 0, y: textPos.y }}
              end={{ x: canvasSize.width, y: textPos.y }}
              colors={["#863FFF", "#FF84D0", "#863FFF"]}
              positions={positions}
            />
          </Text>
        </>
      )}
    </Canvas>
  )
}

const styles = StyleSheet.create({
  canvas: { ...canvasSize, borderRadius: 8, backgroundColor: "rgb(0, 0, 30)" },
})
