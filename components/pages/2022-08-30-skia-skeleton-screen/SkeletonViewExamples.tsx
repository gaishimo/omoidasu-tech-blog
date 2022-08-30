import { StyleSheet, View } from "react-native"
import { SkeletonView } from "./SkeletonView"

export default function SkeletonViewExamples() {
  return (
    <View style={styles.container}>
      <SkeletonView />
      <SkeletonView />
      <SkeletonView />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 320,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "rgb(230, 230, 230)",
    padding: 16,
  },
})
