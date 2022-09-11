import {
  Canvas,
  Circle,
  useComputedValue,
  useTiming,
} from "@shopify/react-native-skia"

const canvasSize = { width: 120, height: 120 }
const center = { x: canvasSize.width / 2, y: canvasSize.height / 2 }

const radius = 40

export default function CircleMoving() {
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
    return center.y + sin
  }, [theta])

  return (
    <Canvas style={[canvasSize]}>
      <Circle
        cx={center.x}
        cy={center.y}
        r={radius}
        color="lightblue"
        style="stroke"
        strokeWidth={3}
      />
      <Circle cx={cx} cy={cy} r={6} color="lightblue" />
    </Canvas>
  )
}
