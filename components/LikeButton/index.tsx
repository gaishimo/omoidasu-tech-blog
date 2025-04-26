import { Canvas, Group } from "@shopify/react-native-skia"
import { useCallback, useEffect, useRef, useState } from "react"
import { Pressable, StyleSheet, View } from "react-native"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated"
import { wait } from "../../utils/wait"
import { Heart } from "./Heart"
import { Particle } from "./Particle"

const heartSize = 60
const heartPos = { x: 8, y: 24 }

const colors = ["#FF4276", "#FFDE43", "#5CE9D9", "#A258B1"]

type Props = {
  onPress?: () => void
}

export default function LikeButton(props: Props) {
  const buttonOpacity = useSharedValue(1)
  const heartScale = useSharedValue(1)
  const heartOpacity = useSharedValue(1)
  const particleProgress = useSharedValue(0)
  const pressStartedTime = useSharedValue<number | null>(null)
  const pulseIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const handlePressIn = () => {
    if (pulseIntervalRef.current) {
      clearInterval(pulseIntervalRef.current)
    }
    pressStartedTime.value = Date.now()
    heartScale.value = withTiming(0.9, { duration: 300 })

    buttonOpacity.value = withTiming(0, { duration: 1000 })
  }

  const handlePressOut = async () => {
    const timeFromPressStarted =
      Date.now() - (pressStartedTime.value ?? Date.now())

    particleProgress.value = withTiming(1, {
      duration: 2500,
    })

    await wait(timeFromPressStarted + 300)

    heartOpacity.value = withTiming(0, { duration: 2500 })
    heartScale.value = withSequence(
      withSpring(1.3, {
        mass: 0.4,
        stiffness: 700,
        damping: 2.5,
        velocity: 0,
      }),
    )

    props.onPress?.()
  }

  const doPulseAnimation = useCallback(() => {
    if (pressStartedTime.value != null) return

    heartScale.value = withSpring(
      1.175,
      {
        mass: 0.3,
        stiffness: 600,
        damping: 2,
        velocity: 0.3,
      },
      () => {
        if (!pressStartedTime.value) {
          heartScale.value = withTiming(1, { duration: 200 })
        }
      },
    )
  }, [heartScale, pressStartedTime, heartOpacity])

  useEffect(() => {
    pulseIntervalRef.current = setInterval(doPulseAnimation, 3000)

    return () => {
      if (pulseIntervalRef.current) {
        clearInterval(pulseIntervalRef.current)
      }
    }
  }, [heartScale, pressStartedTime, heartOpacity])

  const center = {
    x: heartPos.x + heartSize / 2,
    y: heartPos.y + heartSize * 0.35,
  }

  const particleGroups = Array.from({ length: 6 }).map((_, index) => {
    const angle = (index * Math.PI * 2) / 6
    const distance = 28

    const particleAngleOffset = Math.PI / 15

    const particles = [
      {
        angleRadian: angle - particleAngleOffset / 2,
        distanceFromCenter: distance,
        color: colors[index % colors.length],
      },
      {
        angleRadian: angle + particleAngleOffset / 2,
        distanceFromCenter: distance,
        color: colors[(index + 1) % colors.length],
      },
    ]

    return { particles }
  })

  return (
    <Pressable
      delayLongPress={50}
      style={styles.button}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[
          styles.button,
          useAnimatedStyle(() => ({
            backgroundColor: `rgba(255, 100, 100, ${0.05 * buttonOpacity.value})`,
          })),
        ]}
      >
        <Canvas style={styles.canvas}>
          <Heart
            {...heartPos}
            size={heartSize}
            scale={heartScale}
            opacity={heartOpacity}
          />
          <Group>
            {particleGroups.map((group, groupIndex) => (
              <Group key={`group-${groupIndex}`}>
                {group.particles.map((particle, particleIndex) => (
                  <Particle
                    key={`particle-${groupIndex}-${particleIndex}`}
                    color={particle.color}
                    centerOrigin={center}
                    initialPosition={particle}
                    progress={particleProgress}
                  />
                ))}
              </Group>
            ))}
          </Group>
        </Canvas>
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  pressed: {
    borderWidth: 0,
    backgroundColor: "transparent",
  },
  canvas: {
    bottom: 6,
    left: 2,
    width: 200,
    height: 200,
  },
})
