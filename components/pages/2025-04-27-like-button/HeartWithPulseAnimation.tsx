import { Canvas } from "@shopify/react-native-skia"
import { Heart } from "../../LikeButton/Heart"
import { useSharedValue, withSpring, withTiming } from "react-native-reanimated"
import { useCallback, useEffect } from "react"

export default function HeartWithPulseAnimation() {
  const heartScale = useSharedValue(1)

  const doPulseAnimation = useCallback(() => {
    heartScale.value = withSpring(
      1.175,
      {
        mass: 0.3,
        stiffness: 600,
        damping: 2,
        velocity: 0.3,
      },
      () => {
        heartScale.value = withTiming(1, { duration: 200 })
      },
    )
  }, [heartScale])

  useEffect(() => {
    const interval = setInterval(doPulseAnimation, 2000)
    return () => {
      clearInterval(interval)
    }
  }, [heartScale])

  return (
    <Canvas style={{ width: 100, height: 80 }}>
      <Heart
        x={0}
        y={0}
        size={80}
        scale={heartScale}
        opacity={useSharedValue(1)}
      />
    </Canvas>
  )
}
