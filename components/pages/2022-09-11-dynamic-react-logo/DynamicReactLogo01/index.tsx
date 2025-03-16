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

  const thetas = [theta1, theta2, theta3]

  const startAnimations = useCallback(async () => {
    for (const theta of thetas) {
      theta.value = withRepeat(
        withTiming(Math.PI * 2, { duration: 8000, easing: Easing.linear }),
        -1,
        false,
      )
    }
  }, [])

  useEffect(() => {
    startAnimations()
  }, [startAnimations])

  return (
    <View style={[styles.container, canvasSize]}>
      <Canvas style={canvasSize}>
        <Group>
          <Circle cx={center.x} cy={center.y} r={12} color={colors[0]}></Circle>
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
            color={colors[0]}
            theta={theta2}
          />
        </Group>
        <Group origin={center} transform={[{ rotate: -Math.PI / 3 }]}>
          <OvalWithMovingCircle
            center={center}
            color={colors[0]}
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
