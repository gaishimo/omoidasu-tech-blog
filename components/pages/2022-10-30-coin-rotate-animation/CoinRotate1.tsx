import { useEffect } from "react"
import { StyleSheet, View } from "react-native"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated"

export function CoinRotate1() {
  const progress = useSharedValue(0)
  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [{ rotateY: `${progress.value}deg` }],
    }),
    [progress],
  )

  useEffect(() => {
    progress.value = withRepeat(withTiming(360, { duration: 3000 }), -1, false)
  }, [])

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{
          uri: "/posts/2022-10-30-coin-rotate-animation/coinHead.png",
        }}
        resizeMode="contain"
        style={[styles.image, animatedStyle]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 160,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    position: "absolute",
    width: 120,
    height: 120,
  },
})
