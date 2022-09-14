import {
  Blur,
  Canvas,
  Circle,
  Group,
  interpolate,
  RadialGradient,
  runTiming,
  useComputedValue,
  useTouchHandler,
  useValue,
} from "@shopify/react-native-skia"

const canvasSize = { width: 300, height: 450 }
const center = { x: canvasSize.width / 2, y: canvasSize.height / 2 }
const color = "rgb(255, 255, 100)"
const colorAlpha = "rgba(255, 255, 100, 0.5)"

// const color = "lightblue"

const circles = [
  { radius: 40, blur: 40 },
  { radius: 50, blur: 60 },
  { radius: 60, blur: 80 },
  { radius: 70, blur: 100 },
  // { radius: 80, blur: 120 },
]

export default function DimlyGrowingLight() {
  const progress = useValue(0)

  const touchHandler = useTouchHandler({
    onStart: () => {
      if (progress.current === 0) {
        runTiming(progress, { to: 1 }, { duration: 350 })
      } else {
        runTiming(progress, { to: 0 }, { duration: 350 })
      }
    },
  })

  return (
    <Canvas
      onTouch={touchHandler}
      style={[
        canvasSize,
        { backgroundColor: "rgb(0, 0, 70)", borderRadius: 8 },
      ]}
    >
      <Group color={color}>
        {circles.map(c => (
          <Circle
            cx={center.x}
            cy={center.y}
            r={useComputedValue(() => {
              return interpolate(progress.current, [0, 1], [0, c.radius])
            }, [progress])}
          >
            <RadialGradient
              c={center}
              r={c.radius}
              colors={[color, colorAlpha]}
            />
            <Blur blur={c.blur} mode="decal" />
          </Circle>
        ))}
        <Circle
          cx={center.x}
          cy={center.y}
          r={30}
          color={color}
          opacity={useComputedValue(() => {
            return interpolate(progress.current, [0, 1], [0.4, 1])
          }, [progress])}
        >
          <Blur blur={0.7} mode="decal" />
        </Circle>
      </Group>
    </Canvas>
  )
}
