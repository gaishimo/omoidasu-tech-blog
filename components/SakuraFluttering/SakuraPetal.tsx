import {
  Blur,
  Group,
  LinearGradient,
  Path,
  usePathValue,
  vec,
  type Transforms3d,
} from "@shopify/react-native-skia"
import { useEffect, useState } from "react"
import { SharedValue, useDerivedValue } from "react-native-reanimated"

type Props = {
  colorId: 0 | 1 | 2
  position: { x: number; y: number }
  size: { width: number; height: number }
  opacity?: number
  shiningEnabled?: boolean
  animation?: {
    fallSpeed: number
    fallProgress: SharedValue<number>
    fallMaxDistance?: number
    fallMaxDistanceX?: number
    areaSize?: { x: number; y: number }
    initialPhase: number
    swayProgress: SharedValue<number>
    swayAmplitude: number
    swayFrequency: number
    rotationProgress: SharedValue<number>
    rotationSpeed: number
    rotation3dProgress: SharedValue<number>
    rotation3dSpeed: number
  }
}

const SHINING_CONFIG = {
  probability: 0.003,
  durationMs: 20000,
  checkIntervalMs: 3000,
}

const COLORS = [
  [`rgba(250, 210, 220, 0.8)`, "rgba(255, 200, 220, 0.7)"],
  ["rgba(255, 240, 240, 0.9)", "rgba(255, 240, 245, 0.9)"],
  ["rgba(245, 220, 230, 0.7)", "rgba(255, 230, 240, 0.7)"],
]

const SHINING_COLOR = ["rgba(255, 235, 235, 1)", "rgba(255, 235, 235, 1)"]

export function SakuraPetal(props: Props) {
  const { size, position } = props
  const centerX = size.width * 0.5
  const [isShining, setIsShining] = useState(false)

  const path = usePathValue(p => {
    p.moveTo(centerX + position.x, size.height + position.y)
    p.quadTo(
      -size.width * 0.2 + position.x,
      size.height * 0.6 + position.y,
      size.width * 0.35 + position.x,
      0 + position.y,
    )
    p.lineTo(centerX + position.x, size.height * 0.15 + position.y)
    p.lineTo(centerX + size.width * 0.15 + position.x, 0 + position.y)
    p.quadTo(
      centerX + size.width * 0.7 + position.x,
      size.height * 0.6 + position.y,
      centerX + position.x,
      size.height + position.y,
    )
    p.close()
  })

  const transform = useDerivedValue<Transforms3d>(() => {
    if (props.animation == null) {
      return []
    }
    const {
      fallProgress,
      fallMaxDistance,
      fallMaxDistanceX,
      fallSpeed,
      areaSize,
      swayProgress,
      swayAmplitude,
      swayFrequency,
      initialPhase,
      rotationProgress,
      rotationSpeed,
      rotation3dProgress,
      rotation3dSpeed,
    } = props.animation
    let fallingTranslateY = fallProgress.value * fallSpeed
    const fallingTranslateX = fallProgress.value * fallSpeed * 0.5

    const maxDistanceY = areaSize?.y ?? fallMaxDistance ?? 0
    const maxDistanceX = areaSize?.x ?? fallMaxDistanceX ?? maxDistanceY

    const actualY = position.y + fallingTranslateY
    if (actualY > maxDistanceY && maxDistanceY > 0) {
      fallingTranslateY = (actualY % maxDistanceY) - props.position.y
    }

    let actualFallingTranslateX = fallingTranslateX
    const actualX = position.x + fallingTranslateX
    if (actualX > maxDistanceX && maxDistanceX > 0) {
      actualFallingTranslateX = (actualX % maxDistanceX) - props.position.x
    }

    const swayingTranslateX =
      Math.sin(swayProgress.value * swayFrequency + initialPhase) *
      swayAmplitude

    const rotate =
      Math.sin(rotationProgress.value + initialPhase) * Math.PI * rotationSpeed

    const rotation3dAngle =
      rotation3dProgress.value * rotation3dSpeed + initialPhase

    const rotateX3d = 0.1
    const rotateY3d = Math.sin(rotation3dAngle)

    const scaleX = 0.4 + Math.abs(Math.cos(rotation3dAngle)) * 0.6

    return [
      { translateY: fallingTranslateY },
      { translateX: swayingTranslateX + actualFallingTranslateX },
      { translateX: centerX + position.x },
      { translateY: size.height / 2 + position.y },
      { rotate },
      { rotateX: rotateX3d },
      { rotateY: rotateY3d },
      { scaleX: scaleX },
      { translateX: -(centerX + position.x) },
      { translateY: -(size.height / 2 + position.y) },
    ]
  }, [props.animation])

  useEffect(() => {
    const checkSpecialState = () => {
      if (props.shiningEnabled !== true) return
      const random = Math.random()
      if (random < SHINING_CONFIG.probability) {
        setIsShining(true)

        setTimeout(() => {
          setIsShining(false)
        }, SHINING_CONFIG.durationMs)
      }
    }

    const intervalId = setInterval(
      checkSpecialState,
      SHINING_CONFIG.checkIntervalMs,
    )

    return () => clearInterval(intervalId)
  }, [props.shiningEnabled])

  return (
    <Group transform={transform}>
      {isShining && (
        <Path path={path} style="fill" color="rgba(255, 255, 150, 1)">
          <Blur blur={8} />
        </Path>
      )}
      <Path path={path} style="fill" opacity={props.opacity}>
        <LinearGradient
          start={vec(centerX * 0.8 + position.x, 0 + position.y)}
          end={vec(centerX * 1.2 + position.x, size.height * 1.2 + position.y)}
          colors={isShining ? SHINING_COLOR : COLORS[props.colorId]}
        />
      </Path>
    </Group>
  )
}
