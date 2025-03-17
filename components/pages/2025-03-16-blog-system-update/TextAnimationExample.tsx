import { Canvas, Text, useFont } from "@shopify/react-native-skia"
import {
  useSharedValue,
  useDerivedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated"
import { useEffect } from "react"
import { StyleSheet } from "react-native"

const canvasSize = { width: 200, height: 40 }
const fontSize = 24

export default function TextAnimationExample() {
  const font = useFont(
    require("../../../assets/fonts/NotoSansJP-Bold.ttf"),
    fontSize,
  )

  const progress = useSharedValue(0)

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        duration: 3000,
      }),
      -1,
      false,
    )
  }, [])

  const xPosition = useDerivedValue(() => {
    return canvasSize.width - progress.value * (canvasSize.width + 300)
  }, [])

  if (font == null) return null

  return (
    <Canvas style={styles.canvas}>
      <Text
        x={xPosition}
        y={canvasSize.height / 2 + fontSize / 3}
        text="ブログを更新しました"
        font={font}
        color="rgb(250, 150, 0)"
      />
    </Canvas>
  )
}

const styles = StyleSheet.create({
  canvas: {
    width: canvasSize.width,
    height: canvasSize.height,
    backgroundColor: "white",
  },
})
