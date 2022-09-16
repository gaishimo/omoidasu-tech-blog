import {
  Canvas,
  Circle,
  Group,
  interpolate,
  Oval,
  Paint,
  runTiming,
  useComputedValue,
  usePaintRef,
  useValue,
} from "@shopify/react-native-skia"
import { useCallback, useEffect } from "react"
import { wait } from "../../../utils/wait"

const canvasSize = { width: 120, height: 120 }
const center = { x: canvasSize.width / 2, y: canvasSize.height / 2 }
const baseRadius = 50
const ovalRect = {
  x: center.x - baseRadius,
  y: center.y - baseRadius * 0.35,
  width: baseRadius * 2,
  height: baseRadius * 0.35 * 2,
}

export default function ReactLogo01() {
  const ovalPaint = usePaintRef()
  const circleOpacity = useValue(0)
  const ovalOpacity = useValue(0)
  const ovalRotation = useValue(0)

  const animate = useCallback(async () => {
    circleOpacity.current = 0
    ovalOpacity.current = 0
    ovalRotation.current = 0

    runTiming(circleOpacity, 1, { duration: 700 })
    await wait(1500)
    runTiming(ovalOpacity, 1, { duration: 2000 })
    await wait(2000)
    runTiming(ovalRotation, 1, { duration: 2000 })
  }, [])

  useEffect(() => {
    animate()
    setInterval(() => animate(), 9000)
  }, [])

  return (
    <Canvas style={[canvasSize]}>
      <Circle
        cx={center.x}
        cy={center.y}
        r={8}
        color="lightblue"
        opacity={circleOpacity}
      />
      <Paint
        ref={ovalPaint}
        color="lightblue"
        style="stroke"
        strokeWidth={4}
        opacity={ovalOpacity}
      />
      <Group>
        <Oval rect={ovalRect} paint={ovalPaint} />
      </Group>
      <Group
        origin={center}
        transform={useComputedValue(
          () => [
            {
              rotate: interpolate(
                ovalRotation.current,
                [0, 1],
                [0, Math.PI / 3],
              ),
            },
          ],
          [ovalRotation],
        )}
      >
        <Oval rect={ovalRect} paint={ovalPaint} />
      </Group>
      <Group
        strokeWidth={8}
        origin={center}
        transform={useComputedValue(
          () => [
            {
              rotate: interpolate(
                ovalRotation.current,
                [0, 1],
                [0, -Math.PI / 3],
              ),
            },
          ],
          [ovalRotation],
        )}
      >
        <Oval rect={ovalRect} paint={ovalPaint} />
      </Group>
    </Canvas>
  )
}
