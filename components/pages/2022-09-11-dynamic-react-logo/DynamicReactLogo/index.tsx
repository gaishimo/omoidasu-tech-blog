import {
  Canvas,
  Circle,
  Group,
  interpolate,
  runTiming,
  useComputedValue,
  useValue,
  useValueEffect,
} from "@shopify/react-native-skia"
import { useCallback, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { OvalWithMovingCircle } from "./OvalWithMovingCircle"

const canvasSize = { width: 240, height: 240 }
const center = { x: canvasSize.width / 2, y: canvasSize.height / 2 }
const colors = ["#ADD8E6", "#B1D6FC", "#AABAF2"]

export default function DynamicReactLogo() {
  const [started, setStarted] = useState(false)
  const theta1 = useValue(0)
  const theta2 = useValue(0)
  const theta3 = useValue(0)
  const shrinking = useValue(0)
  const color = useValue(colors[0])

  const thetas = [theta1, theta2, theta3]

  const startEllipticalMotion = useCallback((index: number) => {
    const value = thetas[index]
    const reversed = Math.random() < 0.5
    const timingOptions = reversed
      ? { from: Math.PI * 2, to: 0 }
      : { from: 0, to: Math.PI * 2 }
    runTiming(
      value,
      { ...timingOptions, loop: true },
      { duration: 4000 + Math.random() * 4000 },
    )
  }, [])

  const startAnimations = useCallback(async () => {
    setStarted(true)
    startEllipticalMotion(0)
    startEllipticalMotion(1)
    startEllipticalMotion(2)
  }, [])

  const centerCircleRadius = useComputedValue(() => {
    return interpolate(shrinking.current, [0, 1], [14, 18])
  }, [shrinking])

  const shrinkCircleWithColorChange = useCallback((value, index) => {
    const v = Math.min(
      Math.abs(value.current - Math.PI / 2),
      Math.abs(value.current - Math.PI * 1.5),
    )
    if (v <= Math.PI / 90) {
      color.current = colors[index]
      runTiming(shrinking, { from: 0, to: 1 }, { duration: 150 }, () => {
        runTiming(shrinking, { from: 1, to: 0 }, { duration: 150 })
      })
    }
  }, [])

  useValueEffect(theta1, () => {
    shrinkCircleWithColorChange(theta1, 0)
  })
  useValueEffect(theta2, () => {
    shrinkCircleWithColorChange(theta2, 1)
  })
  useValueEffect(theta3, () => {
    shrinkCircleWithColorChange(theta3, 2)
  })

  return (
    <View style={[styles.container, canvasSize]}>
      <Canvas style={[canvasSize]}>
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
