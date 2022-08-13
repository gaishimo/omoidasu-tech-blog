import { StyleSheet, View } from "react-native"
import { useAnimatedStyle, useSharedValue } from "react-native-reanimated"

export default function SamplePage() {
  const offset = useSharedValue(10)

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    }
  }, [offset])

  return (
    <View>
      {/* <WithSkia
        fallback={<Text>Loading Skia...</Text>}
        getComponent={() =>
          import(
            "../components/pages/2022-08-13-aglet-animation/AgletLikeAnimation/index"
          )
        }
      /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    borderRadius: 16,
    backgroundColor: "lightblue",
  },
  buttonWrapper: { marginTop: 24 },
})
