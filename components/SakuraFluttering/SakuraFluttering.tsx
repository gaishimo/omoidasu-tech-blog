import { Canvas } from "@shopify/react-native-skia"
import { useWindowDimensions } from "react-native"
import {
  Easing,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated"
import { SakuraPetal } from "./SakuraPetal"
import { useEffect, useMemo } from "react"

const elementBaseSize = { width: 18, height: 24 }

export default function SakuraFluttering() {
  const window = useWindowDimensions()
  const canvasSize = { width: window.width, height: window.height + 40 }
  const numOfSprites = window.width < 500 ? 30 : 70

  const animations = {
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
          swayAmplitude: 15 + Math.random() * 60, // 揺れの振幅
          swayFrequency: 0.6 + Math.random() * 1.2, // 揺れの周波数
          // 回転速度（正負の方向に0.2〜0.5の間）
          rotationSpeed:
            (Math.random() > 0.5 ? 1 : -1) * (0.2 + Math.random() * 0.3),
          rotation3dSpeed:
            (Math.random() > 0.5 ? 1 : -1) * (0.2 + Math.random() * 0.3),
        }
      }),
    [numOfSprites, canvasSize],
  )

  useEffect(() => {
    animations.falling.value = withRepeat(
      withTiming(100, { duration: 1000 * 60 * 5, easing: Easing.linear }),
      -1,
      false,
    )

    animations.sway.value = withRepeat(
      withTiming(Math.PI * 2, { duration: 20000, easing: Easing.linear }),
      -1,
      true,
    )

    animations.rotation.value = withRepeat(
      withTiming(Math.PI * 2, { duration: 20000, easing: Easing.linear }),
      -1,
      false,
    )

    animations.rotation3d.value = withRepeat(
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
      }}
    >
      {initialValues.map((item, i) => (
        <SakuraPetal
          key={i}
          position={item.position}
          colorId={Math.floor(i % 3) as 0 | 1 | 2}
          opacity={0.8}
          size={item.size}
          animation={{
            fallProgress: animations.falling,
            fallSpeed: item.fallSpeed,
            fallMaxDistance: canvasSize.height,
            initialPhase: Math.random() * Math.PI * 2,
            swayProgress: animations.sway,
            swayAmplitude: item.swayAmplitude,
            swayFrequency: item.swayFrequency,
            rotationProgress: animations.rotation,
            rotationSpeed: item.rotationSpeed,
            rotation3dProgress: animations.rotation3d,
            rotation3dSpeed: item.rotation3dSpeed,
          }}
        />
      ))}
    </Canvas>
  )
}
