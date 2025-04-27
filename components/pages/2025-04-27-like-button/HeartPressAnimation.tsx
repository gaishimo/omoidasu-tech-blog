import { Canvas } from "@shopify/react-native-skia"
import { useSharedValue, withSpring, withTiming } from "react-native-reanimated"
import { Heart } from "../../LikeButton/Heart"
import { Pressable } from "react-native"
import { useCallback } from "react"

export default function HeartPressAnimation() {
  const heartScale = useSharedValue(1)
  const heartOpacity = useSharedValue(1)
  const handlePressIn = useCallback(() => {
    heartScale.value = withTiming(0.9, { duration: 300 })
  }, [heartScale])

  const handlePressOut = useCallback(() => {
    heartOpacity.value = withTiming(0, { duration: 2500 }, () => {
      heartOpacity.value = withTiming(1, { duration: 2500 })
    })
    heartScale.value = withSpring(
      1.3,
      {
        mass: 0.4,
        stiffness: 700,
        damping: 2.5,
        velocity: 0,
      },
      () => {
        heartScale.value = withTiming(1, { duration: 2500 })
      },
    )
  }, [heartScale])

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Canvas style={{ width: 100, height: 100 }}>
        <Heart
          x={0}
          y={16}
          size={80}
          scale={heartScale}
          opacity={heartOpacity}
        />
      </Canvas>
    </Pressable>
  )
}
