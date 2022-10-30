import { useEffect } from "react"
import { StyleSheet, View } from "react-native"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated"

export function CoinRotateAnimation() {
  const progress = useSharedValue(0)

  const image1AnimatedStyle = useAnimatedStyle(
    () => ({
      opacity: progress.value <= 90 || progress.value >= 270 ? 1 : 0,
      transform: [{ rotateY: `${progress.value}deg` }],
    }),
    [progress],
  )

  const image2AnimatedStyle = useAnimatedStyle(
    () => ({
      opacity: progress.value > 90 && progress.value < 270 ? 1 : 0,
      transform: [{ rotateY: `${progress.value - 180}deg` }],
    }),
    [progress],
  )

  useEffect(() => {
    progress.value = withRepeat(
      withSequence(
        withDelay(400, withTiming(180, { duration: 700 })),
        withDelay(400, withTiming(360, { duration: 700 })),
      ),
      -1,
      true,
    )
  }, [])

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{
          uri: "/posts/2022-10-30-coin-rotate-animation/coinHead.png",
        }}
        resizeMode="contain"
        style={[styles.image, image1AnimatedStyle]}
      />
      <Animated.Image
        source={{
          uri: "/posts/2022-10-30-coin-rotate-animation/coinTail.png",
        }}
        resizeMode="contain"
        style={[styles.image, image2AnimatedStyle]}
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
