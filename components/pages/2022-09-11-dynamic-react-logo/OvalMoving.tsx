import { Canvas, Circle, Oval } from "@shopify/react-native-skia"
import {
  useSharedValue,
  useDerivedValue,
  withTiming,
  withRepeat,
  Easing,
} from "react-native-reanimated"
import { useEffect } from "react"

const canvasSize = { width: 120, height: 120 }
const center = { x: canvasSize.width / 2, y: canvasSize.height / 2 }

const radius = 40

const ovalRect = {
  x: center.x - radius,
  y: center.y - radius * 0.35,
  width: radius * 2,
  height: radius * 0.35 * 2,
}

export default function OvalMoving() {
  const theta = useSharedValue(0)

  useEffect(() => {
    theta.value = withRepeat(
      withTiming(Math.PI * 2, { duration: 4000, easing: Easing.linear }),
      -1,
      false,
    )
  }, [])

  const cx = useDerivedValue(() => {
    const cos = radius * Math.cos(theta.value)
    return center.x + cos
  }, [])

  const cy = useDerivedValue(() => {
    const sin = radius * Math.sin(theta.value)
    return center.y + sin * 0.35
  }, [])

  return (
    <Canvas style={canvasSize}>
      <Oval rect={ovalRect} color="lightblue" style="stroke" strokeWidth={3} />
      <Circle cx={cx} cy={cy} r={6} color="lightblue" />
    </Canvas>
  )
}
