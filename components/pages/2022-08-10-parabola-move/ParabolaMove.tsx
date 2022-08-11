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
import { toRadian } from "../../../utils/mathUtils"

const ballRadius = 20

const canvasSize = { width: 340, height: 700 }

export default function ParabolaMove() {
  const startPos = { x: ballRadius, y: canvasSize.height - 30 }

  // 1 -> 180
  const pos = useValue(1)
  const isRunning = useValue(false)

  const curveYPath = useMemo(() => {
    const curveHeight = canvasSize.height - 200
    return range(1, 180 + 1).map(degree => {
      const sin = Math.sin(toRadian(degree)) * curveHeight
      return -sin
    })
  }, [])

  const run = useCallback(() => {
    if (isRunning.current) return
    runTiming(pos, 180, { duration: 3000 }, () => {
      setTimeout(() => {
        pos.current = 1
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
                  [1, 180],
                  [0, canvasSize.width - ballRadius * 2],
                ),
              },
              {
                translateY: interpolate(
                  pos.current,
                  range(1, 180 + 1),
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
