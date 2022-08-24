import { StyleSheet, View } from "react-native"
import { ShrinkingCircle } from "./ShrinkingCircle"

export default function ShrinkingCircles() {
  return (
    <View style={styles.container}>
      <ShrinkingCircle radius={10} color={"#1E73D2"} />
      <ShrinkingCircle radius={10} color={"#0FE0BA"} />
      <ShrinkingCircle radius={10} color={"#EBE933"} />
      <ShrinkingCircle radius={10} color={"#EB3293"} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: 240,
    justifyContent: "space-between",
  },
})
