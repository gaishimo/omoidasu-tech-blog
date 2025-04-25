import { Canvas, Group } from "@shopify/react-native-skia"
import { useRef } from "react"
import { Pressable, StyleSheet, View } from "react-native"
import {
  useAnimatedReaction,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated"
import { wait } from "../../utils/wait"
import { Heart } from "./Heart"
import { Particle } from "./Particle"

const heartSize = 80
const heartPos = { x: 0, y: 0 }

const colors = ["#FF4276", "#FFDE43", "#5CE9D9", "#A258B1"]

type Props = {
  onPress?: () => void
}

export default function LikeButton(props: Props) {
  const heartScale = useSharedValue(1)
  const pressProgress = useSharedValue(0)
  const heartOpacity = useSharedValue(1)
  const particleProgress = useSharedValue(0)

  const shrinkTimerRef = useRef<NodeJS.Timeout | null>(null)

  const handlePress = () => {
    pressProgress.value = withTiming(1, { duration: 150 })
  }

  const handleLongPress = () => {
    pressProgress.value = withTiming(1, { duration: 200 })
  }

  const handlePressOut = async () => {
    if (shrinkTimerRef.current) {
      clearInterval(shrinkTimerRef.current)
      shrinkTimerRef.current = null
    }
    particleProgress.value = withTiming(1, {
      duration: 2500,
    })

    heartOpacity.value = withTiming(0, { duration: 2500 })

    await wait(200)

    heartScale.value = withSpring(1.15, {
      mass: 0.4,
      stiffness: 700,
      damping: 5,
      velocity: 0.7,
    })

    props.onPress?.()
  }

  useAnimatedReaction(
    () => pressProgress.value,
    value => {
      heartScale.value = value > 0 ? Math.max(0.9, 1 - 0.15 * value) : 1
    },
  )

  const center = {
    x: heartPos.x + heartSize / 2,
    y: heartPos.y + heartSize * 0.35,
  }

  const particleGroups = Array.from({ length: 6 }).map((_, index) => {
    const angle = (index * Math.PI * 2) / 6
    const distance = 24

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
    <View style={styles.container}>
      <Pressable
        delayLongPress={50}
        onPress={handlePress}
        onLongPress={handleLongPress}
        onPressOut={handlePressOut}
        style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
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
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  pressable: {},
  pressed: {
    opacity: 1,
  },
  canvas: {
    width: 200,
    height: 200,
  },
})
