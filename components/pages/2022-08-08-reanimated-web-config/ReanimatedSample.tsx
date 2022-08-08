import { useCallback } from "react"
import { Button, StyleSheet, View } from "react-native"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"

export function ReanimatedSample() {
  const offset = useSharedValue(0)

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    }
  }, [offset])

  return (
    <View>
      <Animated.View style={[styles.box, animatedStyles]} />
      <View style={styles.buttonWrapper}>
        <Button
          title="Move"
          onPress={useCallback(() => {
            console.log("onPress()")
            offset.value = withSpring(Math.random() * 255)
          }, [offset])}
        />
      </View>
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
  buttonWrapper: { marginTop: 24, width: 100 },
})
