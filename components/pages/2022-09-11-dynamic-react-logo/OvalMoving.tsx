import {
  Canvas,
  Circle,
  Oval,
  useComputedValue,
  useTiming,
} from "@shopify/react-native-skia"

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
  const theta = useTiming(
    { to: Math.PI * 2, loop: true, yoyo: false },
    { duration: 8000 },
  )

  const cx = useComputedValue(() => {
    const cos = radius * Math.cos(theta.current)
    return center.x + cos
  }, [theta])
  const cy = useComputedValue(() => {
    const sin = radius * Math.sin(theta.current)
    return center.y + sin * 0.35
  }, [theta])

  return (
    <Canvas style={[canvasSize]}>
      <Oval rect={ovalRect} color="lightblue" style="stroke" strokeWidth={3} />
      <Circle cx={cx} cy={cy} r={6} color="lightblue" />
    </Canvas>
  )
}
