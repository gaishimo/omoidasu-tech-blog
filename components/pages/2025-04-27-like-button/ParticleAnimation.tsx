import { Canvas, Group } from "@shopify/react-native-skia"
import { useEffect } from "react"
import { useSharedValue, withRepeat, withTiming } from "react-native-reanimated"
import { Particle } from "../../LikeButton/Particle"

const colors = ["#FF4276", "#FFDE43", "#5CE9D9", "#A258B1"]

export default function ParticleAnimation() {
  const center = {
    x: 50,
    y: 35,
  }

  const particleMoveProgress = useSharedValue(0)

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

  useEffect(() => {
    particleMoveProgress.value = withRepeat(
      withTiming(1, { duration: 4000 }),
      -1,
      false,
    )
  }, [particleMoveProgress])

  return (
    <Canvas style={{ width: 100, height: 100 }}>
      <Group>
        {particleGroups.map((group, groupIndex) => (
          <Group key={`group-${groupIndex}`}>
            {group.particles.map((particle, particleIndex) => (
              <Particle
                key={`particle-${groupIndex}-${particleIndex}`}
                color={particle.color}
                centerOrigin={center}
                initialPosition={particle}
                progress={particleMoveProgress}
              />
            ))}
          </Group>
        ))}
      </Group>
    </Canvas>
  )
}
