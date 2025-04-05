import { View, StyleSheet, useWindowDimensions } from "react-native"
import { WithSkia } from "./WithSkia"

export function Background() {
  return (
    <View style={{ ...StyleSheet.absoluteFillObject }}>
      <WithSkia
        delay={1150}
        getComponent={() => import("./SakuraFluttering/SakuraFlutteringAtlas")}
        fallback={() => <View />}
      />
    </View>
  )
}
