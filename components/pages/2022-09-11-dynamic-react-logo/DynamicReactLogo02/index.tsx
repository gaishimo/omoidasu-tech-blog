import { Canvas, Circle, Group } from "@shopify/react-native-skia"
import {
  useSharedValue,
  withTiming,
  withRepeat,
  Easing,
} from "react-native-reanimated"
import { useCallback, useEffect } from "react"
import { StyleSheet, View } from "react-native"
import { OvalWithMovingCircle } from "./OvalWithMovingCircle"

const canvasSize = { width: 240, height: 240 }
const center = { x: canvasSize.width / 2, y: canvasSize.height / 2 }
const colors = ["#ADD8E6", "#B1D6FC", "#AABAF2"]

export default function DynamicReactLogo() {
  const theta1 = useSharedValue(0)
  const theta2 = useSharedValue(0)
  const theta3 = useSharedValue(0)
  const color = useSharedValue(colors[0])

  const thetas = [theta1, theta2, theta3]

  const startEllipticalMotion = useCallback((index: number) => {
    const value = thetas[index]
    const reversed = Math.random() < 0.5
    const duration = 2000 + Math.random() * 2000

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
    startEllipticalMotion(0)
    startEllipticalMotion(1)
    startEllipticalMotion(2)
  }, [])

  useEffect(() => {
    startAnimations()
  }, [startAnimations])

  return (
    <View style={[styles.container, canvasSize]}>
      <Canvas style={canvasSize}>
        <Group>
          <Circle cx={center.x} cy={center.y} r={12} color={color}></Circle>
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgb(240, 240, 240)",
  },
})
