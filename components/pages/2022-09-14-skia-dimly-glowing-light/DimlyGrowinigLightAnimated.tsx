import {
  Blur,
  Canvas,
  Circle,
  Group,
  interpolate,
  RadialGradient,
} from "@shopify/react-native-skia"
import {
  useSharedValue,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import { StyleSheet, View } from "react-native"

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
  const progress = useSharedValue(0)

  const panGesture = Gesture.Pan().onBegin(() => {
    if (progress.value === 0) {
      progress.value = withTiming(1, { duration: 350 })
    } else {
      progress.value = withTiming(0, { duration: 350 })
    }
  })

  return (
    <GestureDetector gesture={panGesture}>
      <View style={styles.container}>
        <Canvas
          style={{
            ...canvasSize,
            backgroundColor: "rgb(0, 0, 70)",
            borderRadius: 8,
          }}
        >
          <Group color={color}>
            {circles.map((c, index) => (
              <Circle
                key={index}
                cx={center.x}
                cy={center.y}
                r={useDerivedValue(() => {
                  return interpolate(progress.value, [0, 1], [0, c.radius])
                }, [])}
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
              opacity={useDerivedValue(() => {
                return interpolate(progress.value, [0, 1], [0.4, 1])
              }, [])}
            >
              <Blur blur={0.7} mode="decal" />
            </Circle>
          </Group>
        </Canvas>
      </View>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  container: {
    width: canvasSize.width,
    height: canvasSize.height,
  },
})
