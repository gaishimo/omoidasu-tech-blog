import { Canvas } from "@shopify/react-native-skia"
import { StyleProp, useWindowDimensions, ViewStyle } from "react-native"
import {
  Easing,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated"
import { SakuraPetal } from "./SakuraPetal"
import { useEffect, useMemo } from "react"

const elementBaseSize = { width: 18, height: 24 }

type Props = {
  canvasSize: { width: number; height: number }
  canvasStyle?: StyleProp<ViewStyle>
}

export default function SakuraFluttering(props: Props) {
  const window = useWindowDimensions()
  const canvasSize = props.canvasSize ?? {
    width: window.width,
    height: window.height + 40,
  }
  const numOfSprites = window.width < 500 ? 30 : 70

  const progresses = {
    falling: useSharedValue(0),
    sway: useSharedValue(0),
    rotation: useSharedValue(0),
    rotation3d: useSharedValue(0),
  }

  const initialValues = useMemo(
    () =>
      Array.from({ length: numOfSprites }).map((_, i) => {
        const scale = 0.7 + Math.random() * 0.5
        return {
          position: {
            x: Math.random() * canvasSize.width,
            y: Math.random() * canvasSize.height,
          },
          size: {
            width: elementBaseSize.width * scale,
            height: elementBaseSize.height * scale,
          },
          fallSpeed: (100 + Math.random() * 100) * (0.5 + scale * 0.8),
          swayAmplitude: 15 + Math.random() * 70,
          swayFrequency: 0.6 + Math.random() * 1.3,
          rotationSpeed:
            (Math.random() > 0.5 ? 1 : -1) * (0.2 + Math.random() * 0.3),
          rotation3dSpeed:
            (Math.random() > 0.5 ? 1 : -1) * (0.2 + Math.random() * 0.3),
        }
      }),
    [numOfSprites, canvasSize],
  )

  useEffect(() => {
    progresses.falling.value = withRepeat(
      withTiming(100, { duration: 1000 * 60 * 5, easing: Easing.linear }),
      -1,
      false,
    )

    progresses.sway.value = withRepeat(
      withTiming(Math.PI * 2, { duration: 20000, easing: Easing.linear }),
      -1,
      true,
    )

    progresses.rotation.value = withRepeat(
      withTiming(Math.PI * 2, { duration: 20000, easing: Easing.linear }),
      -1,
      false,
    )

    progresses.rotation3d.value = withRepeat(
      withTiming(Math.PI * 2 * 40, { duration: 100000, easing: Easing.linear }),
      -1,
      false,
    )
  }, [])

  return (
    <Canvas
      style={{
        bottom: 40,
        borderColor: "rgb(255, 230, 245)",
        ...canvasSize,
        ...(props.canvasStyle as ViewStyle),
      }}
    >
      {initialValues.map((item, i) => (
        <SakuraPetal
          key={i}
          position={item.position}
          colorId={Math.floor(i % 3) as 0 | 1 | 2}
          opacity={0.6}
          size={item.size}
          shiningEnabled
          animation={{
            fallProgress: progresses.falling,
            fallSpeed: item.fallSpeed,
            areaSize: {
              x: canvasSize.width,
              y: canvasSize.height,
            },
            initialPhase: Math.random() * Math.PI * 2,
            swayProgress: progresses.sway,
            swayAmplitude: item.swayAmplitude,
            swayFrequency: item.swayFrequency,
            rotationProgress: progresses.rotation,
            rotationSpeed: item.rotationSpeed,
            rotation3dProgress: progresses.rotation3d,
            rotation3dSpeed: item.rotation3dSpeed,
          }}
        />
      ))}
    </Canvas>
  )
}
