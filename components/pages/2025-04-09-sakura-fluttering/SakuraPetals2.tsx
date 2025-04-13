import { Canvas } from "@shopify/react-native-skia"
import { SakuraPetal } from "../../SakuraFluttering/SakuraPetal"

export default function SakuraPetals2() {
  return (
    <Canvas style={{ width: 300, height: 150 }}>
      {[0, 1, 2].map(i => (
        <SakuraPetal
          key={i}
          colorId={i as 0 | 1 | 2}
          position={{ x: 60 * i, y: 0 }}
          size={{ width: 60, height: 110 }}
          opacity={0.7}
        />
      ))}
    </Canvas>
  )
}
