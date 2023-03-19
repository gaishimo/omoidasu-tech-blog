import {
  Canvas,
  Group,
  Rect,
  rect,
  Text,
  useComputedValue,
  useFont,
  useTiming,
} from "@shopify/react-native-skia"
import { StyleSheet } from "react-native"

const canvasSize = { width: 200, height: 240 }
const center = { x: canvasSize.width / 2, y: canvasSize.height / 2 }
const fontSize = 120

export default function InvertedTextExample2() {
  const progress = useTiming({ loop: true }, { duration: 3000 })

  const font = useFont(require("../../../assets/fonts/Roboto400.ttf"), fontSize)

  const upperRect = useComputedValue(
    () => rect(0, 0, canvasSize.width, canvasSize.height * progress.current),
    [progress],
  )
  const lowerRect = useComputedValue(
    () =>
      rect(
        0,
        canvasSize.height * progress.current,
        canvasSize.width,
        canvasSize.height - canvasSize.height * progress.current,
      ),
    [progress],
  )

  const textProps = {
    x: canvasSize.width / 2 - fontSize / 2 - 8,
    y: canvasSize.height / 2 + fontSize / 2 - 16,
    text: "80",
    font,
  }

  if (font == null) return null

  return (
    <Canvas style={[styles.canvas, canvasSize]}>
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
