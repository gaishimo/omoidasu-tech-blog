import { Canvas, Circle, Group } from "@shopify/react-native-skia"
import { useCallback, useMemo } from "react"
import { Button, View } from "react-native"
import { range } from "../../../utils/arrayUtils"
import {
  useSharedValue,
  useDerivedValue,
  withTiming,
  Easing,
  interpolate,
} from "react-native-reanimated"

const ballRadius = 20

const canvasSize = { width: 340, height: 600 }

export default function ParabolaMove() {
  const startPos = { x: ballRadius, y: canvasSize.height - 30 }

  // 0° -> PI (180°)
  const pos = useSharedValue(0)
  const isRunning = useSharedValue(false)

  const curveYPath = useMemo(() => {
    const curveHeight = canvasSize.height - 200

    return range(0, 100)
      .map(i => (Math.PI / 100) * i)
      .map(theta => {
        const sin = Math.sin(theta) * curveHeight
        return -sin
      })
  }, [])

  const run = useCallback(() => {
    if (isRunning.value) return

    isRunning.value = true
    pos.value = withTiming(
      Math.PI,
      { duration: 3000, easing: Easing.linear },
      finished => {
        if (finished) {
          setTimeout(() => {
            pos.value = 0
            isRunning.value = false
          }, 1000)
        }
      },
    )
  }, [pos, isRunning])

  // Reanimatedを使用して変換を計算
  const transform = useDerivedValue(() => {
    return [
      {
        translateX: interpolate(
          pos.value,
          [0, Math.PI],
          [0, canvasSize.width - ballRadius * 2],
        ),
      },
      {
        translateY: interpolate(
          pos.value,
          range(0, 100).map(i => (Math.PI / 100) * i),
          curveYPath,
        ),
      },
    ]
  })

  return (
    <View
      style={{
        width: canvasSize.width + 16,
        borderWidth: 1,
        borderColor: "lightblue",
        padding: 8,
      }}
    >
      <Button title="RUN" onPress={run} />
      <Canvas style={canvasSize}>
        <Group transform={transform}>
          <Circle
            r={ballRadius}
            cx={startPos.x}
            cy={startPos.y}
            color="lightblue"
            style="fill"
          />
        </Group>
      </Canvas>
    </View>
  )
}
