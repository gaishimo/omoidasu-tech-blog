import { Canvas } from "@shopify/react-native-skia"
import { SakuraPetal } from "../../SakuraFluttering/SakuraPetal"

export default function SakuraPetals() {
  return (
    <Canvas style={{ width: 200, height: 150 }}>
      <SakuraPetal
        colorId={0}
        position={{ x: 0, y: 0 }}
        size={{ width: 100, height: 150 }}
        opacity={0.7}
      />
    </Canvas>
  )
}
