import { Canvas } from "@shopify/react-native-skia"
import { Heart } from "../../LikeButton/Heart"
import { useSharedValue } from "react-native-reanimated"

export default function HeartExample() {
  return (
    <Canvas style={{ width: 100, height: 80 }}>
      <Heart
        x={0}
        y={0}
        size={80}
        scale={useSharedValue(1)}
        opacity={useSharedValue(1)}
      />
    </Canvas>
  )
}
