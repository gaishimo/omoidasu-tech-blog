import {
  Canvas,
  Circle,
  Group,
  interpolate,
  runTiming,
  useComputedValue,
  useValue,
} from "@shopify/react-native-skia"
import { useCallback, useMemo } from "react"
import { Button, View } from "react-native"
import { range } from "../../../utils/arrayUtils"

const ballRadius = 20

const canvasSize = { width: 340, height: 700 }

export default function ParabolaMove() {
  const startPos = { x: ballRadius, y: canvasSize.height - 30 }

  // 0° -> PI (180°)
  const pos = useValue(0)
  const isRunning = useValue(false)

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
    if (isRunning.current) return

    runTiming(pos, Math.PI, { duration: 3000 }, () => {
      setTimeout(() => {
        pos.current = 0
        isRunning.current = false
      }, 1000)
    })
  }, [pos, isRunning])

  return (
    <View
      style={{
        width: canvasSize.width + 16,
        height: 700,
        borderWidth: 1,
        borderColor: "lightblue",
        padding: 8,
      }}
    >
      <Button title="RUN" onPress={run} />
      <Canvas style={{ flex: 1 }}>
        <Group
          transform={useComputedValue(() => {
            return [
              {
                translateX: interpolate(
                  pos.current,
                  [0, Math.PI],
                  [0, canvasSize.width - ballRadius * 2],
                ),
              },
              {
                translateY: interpolate(
                  pos.current,
                  range(0, 100).map(i => (Math.PI / 100) * i),
                  curveYPath,
                ),
              },
            ]
          }, [pos])}
        >
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
