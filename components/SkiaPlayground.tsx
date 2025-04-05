import { Canvas } from "@shopify/react-native-skia"
import { SakuraPetal } from "./SakuraFluttering/SakuraPetal"

export default function SkiaPlayground() {
  return (
    <Canvas style={{ flex: 1 }}>
      <SakuraPetal
        colorId={0}
        position={{ x: 100, y: 100 }}
        size={{ width: 100, height: 140 }}
      />
    </Canvas>
  )
}
