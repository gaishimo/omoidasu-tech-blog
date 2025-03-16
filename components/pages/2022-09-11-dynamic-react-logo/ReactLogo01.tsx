import {
  Canvas,
  Circle,
  Group,
  interpolate,
  Oval,
} from "@shopify/react-native-skia"
import {
  useSharedValue,
  useDerivedValue,
  withTiming,
  runOnJS,
} from "react-native-reanimated"
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
  const circleOpacity = useSharedValue(0)
  const ovalOpacity = useSharedValue(0)
  const ovalRotation = useSharedValue(0)

  const animate = useCallback(async () => {
    circleOpacity.value = 0
    ovalOpacity.value = 0
    ovalRotation.value = 0

    circleOpacity.value = withTiming(1, { duration: 700 })
    await wait(1500)
    ovalOpacity.value = withTiming(1, { duration: 2000 })
    await wait(2000)
    ovalRotation.value = withTiming(1, { duration: 2000 })
  }, [])

  useEffect(() => {
    animate()
    const interval = setInterval(() => animate(), 9000)
    return () => clearInterval(interval)
  }, [animate])

  const ovalTransform1 = useDerivedValue(() => {
    return [
      {
        rotate: interpolate(ovalRotation.value, [0, 1], [0, Math.PI / 3]),
      },
    ]
  }, [])

  const ovalTransform2 = useDerivedValue(() => {
    return [
      {
        rotate: interpolate(ovalRotation.value, [0, 1], [0, -Math.PI / 3]),
      },
    ]
  }, [])

  return (
    <Canvas style={canvasSize}>
      <Circle
        cx={center.x}
        cy={center.y}
        r={8}
        color="lightblue"
        opacity={circleOpacity}
      />
      <Group opacity={ovalOpacity}>
        <Oval
          rect={ovalRect}
          color="lightblue"
          style="stroke"
          strokeWidth={4}
        />
      </Group>
      <Group origin={center} transform={ovalTransform1} opacity={ovalOpacity}>
        <Oval
          rect={ovalRect}
          color="lightblue"
          style="stroke"
          strokeWidth={4}
        />
      </Group>
      <Group
        strokeWidth={8}
        origin={center}
        transform={ovalTransform2}
        opacity={ovalOpacity}
      >
        <Oval
          rect={ovalRect}
          color="lightblue"
          style="stroke"
          strokeWidth={4}
        />
      </Group>
    </Canvas>
  )
}
