import { Canvas } from "@shopify/react-native-skia"
import { SakuraPetal } from "../../SakuraFluttering/SakuraPetal"
import SakuraFlutteringAtlas from "../../SakuraFluttering/SakuraFlutteringAtlas"
import { View } from "react-native"
import SakuraFluttering from "../../SakuraFluttering/SakuraFluttering"

export default function NoAtlasExample() {
  return (
    <View style={{ top: 40 }}>
      <SakuraFluttering
        canvasSize={{ width: 300, height: 400 }}
        canvasStyle={{
          backgroundColor: "white",
          borderWidth: 2,
          borderRadius: 8,
        }}
      />
    </View>
  )
}
