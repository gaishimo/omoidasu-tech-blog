import { Canvas, Circle, Group, interpolate } from "@shopify/react-native-skia"
import {
  useSharedValue,
  useDerivedValue,
  withTiming,
  withRepeat,
  useAnimatedReaction,
  Easing,
} from "react-native-reanimated"
import { useCallback, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { OvalWithMovingCircle } from "./OvalWithMovingCircle"

const canvasSize = { width: 240, height: 240 }
const center = { x: canvasSize.width / 2, y: canvasSize.height / 2 }
const colors = ["#ADD8E6", "#B1D6FC", "#AABAF2"]

export default function DynamicReactLogo() {
  const [started, setStarted] = useState(false)
  const theta1 = useSharedValue(0)
  const theta2 = useSharedValue(0)
  const theta3 = useSharedValue(0)
  const shrinking = useSharedValue(0)
  const color = useSharedValue(colors[0])

  const thetas = [theta1, theta2, theta3]

  const startEllipticalMotion = useCallback((index: number) => {
    const value = thetas[index]
    const reversed = Math.random() < 0.5
    const duration = 4000 + Math.random() * 4000

    if (reversed) {
      value.value = Math.PI * 2
      value.value = withRepeat(
        withTiming(0, { duration, easing: Easing.linear }),
        -1,
        false,
      )
    } else {
      value.value = 0
      value.value = withRepeat(
        withTiming(Math.PI * 2, { duration, easing: Easing.linear }),
        -1,
        false,
      )
    }
  }, [])

  const startAnimations = useCallback(async () => {
    setStarted(true)
    startEllipticalMotion(0)
    startEllipticalMotion(1)
    startEllipticalMotion(2)
  }, [])

  const centerCircleRadius = useDerivedValue(() => {
    return interpolate(shrinking.value, [0, 1], [14, 18])
  }, [])

  const shrinkCircleWithColorChange = useCallback(
    (value: number, index: number) => {
      const v = Math.min(
        Math.abs(value - Math.PI / 2),
        Math.abs(value - Math.PI * 1.5),
      )
      if (v <= Math.PI / 90) {
        color.value = colors[index]
        shrinking.value = 0
        shrinking.value = withTiming(1, { duration: 150 }, finished => {
          if (finished) {
            shrinking.value = withTiming(0, { duration: 150 })
          }
        })
      }
    },
    [],
  )

  useAnimatedReaction(
    () => theta1.value,
    currentValue => {
      shrinkCircleWithColorChange(currentValue, 0)
    },
  )

  useAnimatedReaction(
    () => theta2.value,
    currentValue => {
      shrinkCircleWithColorChange(currentValue, 1)
    },
  )

  useAnimatedReaction(
    () => theta3.value,
    currentValue => {
      shrinkCircleWithColorChange(currentValue, 2)
    },
  )

  return (
    <View style={[styles.container, canvasSize]}>
      <Canvas style={canvasSize}>
        <Group>
          <Circle
            cx={center.x}
            cy={center.y}
            r={centerCircleRadius}
            color={color}
          ></Circle>
        </Group>
        <Group>
          <OvalWithMovingCircle
            center={center}
            color={colors[0]}
            theta={theta1}
          />
        </Group>
        <Group origin={center} transform={[{ rotate: Math.PI / 3 }]}>
          <OvalWithMovingCircle
            center={center}
            color={colors[1]}
            theta={theta2}
          />
        </Group>
        <Group origin={center} transform={[{ rotate: -Math.PI / 3 }]}>
          <OvalWithMovingCircle
            center={center}
            color={colors[2]}
            theta={theta3}
          />
        </Group>
      </Canvas>
      {!started && (
        <TouchableOpacity
          onPress={startAnimations}
          style={[StyleSheet.absoluteFill, styles.overlay]}
        >
          <Text style={styles.startText}>START</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgb(240, 240, 240)",
  },
  overlay: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(250, 250, 250)",
    borderRadius: 8,
  },
  startText: { color: "rgb(100, 180, 180)", fontSize: 18 },
})
