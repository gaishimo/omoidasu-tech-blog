import {
  Canvas,
  Group,
  Rect,
  rect,
  Text,
  useFont,
} from "@shopify/react-native-skia"
import {
  useSharedValue,
  useDerivedValue,
  withTiming,
  withRepeat,
} from "react-native-reanimated"
import { useEffect } from "react"
import { StyleSheet } from "react-native"

const canvasSize = { width: 200, height: 240 }
const center = { x: canvasSize.width / 2, y: canvasSize.height / 2 }
const fontSize = 120

export default function InvertedTextExample2() {
  const progress = useSharedValue(0)

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 3000 }), -1, true)
  }, [])

  const font = useFont(require("../../../assets/fonts/Roboto400.ttf"), fontSize)

  const upperRect = useDerivedValue(
    () => rect(0, 0, canvasSize.width, canvasSize.height * progress.value),
    [],
  )
  const lowerRect = useDerivedValue(
    () =>
      rect(
        0,
        canvasSize.height * progress.value,
        canvasSize.width,
        canvasSize.height - canvasSize.height * progress.value,
      ),
    [],
  )

  const textProps = {
    x: canvasSize.width / 2 - fontSize / 2 - 8,
    y: canvasSize.height / 2 + fontSize / 2 - 16,
    text: "80",
    font,
  }

  if (font == null) return null

  return (
    <Canvas style={{ ...styles.canvas, ...canvasSize }}>
      <Rect rect={upperRect} color="black" style="fill" />
      <Rect rect={lowerRect} color="white" style="fill" />
      <Group clip={upperRect}>
        <Text {...textProps} color="white" />
      </Group>
      <Group clip={lowerRect}>
        <Text {...textProps} color="black" />
      </Group>
    </Canvas>
  )
}

const styles = StyleSheet.create({
  canvas: { borderWidth: 1, borderRadius: 2 },
})
