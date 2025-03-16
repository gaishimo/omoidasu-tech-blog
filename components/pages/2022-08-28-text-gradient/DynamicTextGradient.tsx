import {
  Canvas,
  LinearGradient,
  Text,
  useFont,
} from "@shopify/react-native-skia"
import {
  Easing,
  interpolate,
  useSharedValue,
  useDerivedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated"
import { StyleSheet } from "react-native"
import { useEffect } from "react"

const canvasSize = { width: 320, height: 160 }
const textPos = { x: 20, y: 90 }

export default function DynamicTextGradient() {
  const font = useFont(
    require("../../../assets/fonts/SF-Mono-Semibold.otf"),
    20.5,
  )

  const progress = useSharedValue(0)

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        easing: Easing.inOut(Easing.ease),
        duration: 2500,
      }),
      -1,
      false,
    )
  }, [])

  const positions = useDerivedValue(() => {
    return [
      interpolate(progress.value, [0, 0.25, 0.5, 0.75, 1], [0, 0, 0, 0.5, 1]),
      interpolate(progress.value, [0, 0.25, 0.5, 0.75, 1], [0, 0, 0.5, 1, 1]),
      interpolate(progress.value, [0, 0.25, 0.5, 0.75, 1], [0, 0.5, 1, 1, 1]),
    ]
  }, [])

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
