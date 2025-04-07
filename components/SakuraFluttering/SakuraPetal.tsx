import {
  Blur,
  Group,
  LinearGradient,
  Path,
  usePathValue,
  vec,
  type Transforms3d,
} from "@shopify/react-native-skia"
import { useEffect, useState, useRef } from "react"
import {
  SharedValue,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated"

type Props = {
  colorId: 0 | 1 | 2
  position: { x: number; y: number }
  size: { width: number; height: number }
  opacity?: number
  animation?: {
    fallSpeed: number
    fallProgress: SharedValue<number>
    fallMaxDistance: number
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
  probability: 0.008,
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

  console.log(props.animation)

  const transform = useDerivedValue<Transforms3d>(() => {
    if (props.animation == null) {
      return []
    }
    const {
      fallProgress,
      fallMaxDistance,
      fallSpeed,
      swayProgress,
      swayAmplitude,
      swayFrequency,
      initialPhase,
      rotationProgress,
      rotationSpeed,
      rotation3dProgress,
      rotation3dSpeed,
    } = props.animation
    // 縦方向の移動（落下）
    let fallingTranslateY = fallProgress.value * fallSpeed
    const actualY = position.y + fallingTranslateY
    if (actualY > fallMaxDistance) {
      fallingTranslateY = (actualY % fallMaxDistance) - props.position.y
    }

    // 横方向の揺れ
    const swayingTranslateX =
      Math.sin(swayProgress.value * swayFrequency + initialPhase) *
      swayAmplitude

    // 平面上の回転
    const rotate =
      Math.sin(rotationProgress.value + initialPhase) * Math.PI * rotationSpeed

    // 3D回転（連続回転するためにsin関数を使わず単純に進行）
    // initialPhaseを使って花びらごとにタイミングをずらす
    const rotation3dAngle =
      rotation3dProgress.value * rotation3dSpeed + initialPhase

    // 回転軸を少し傾ける（Y軸だけでなくX軸も少し回転させる）
    const rotateX3d = Math.sin(rotation3dAngle) * 0.2 // 少しだけX軸回転を加える
    const rotateY3d = Math.sin(rotation3dAngle)

    // スケールの計算（3D効果を強調するため）
    // 回転時に完全に平面にならないよう、最小スケールを制限
    const scaleX = 0.4 + Math.abs(Math.cos(rotation3dAngle)) * 0.6

    return [
      { translateY: fallingTranslateY },
      { translateX: swayingTranslateX },
      // 3D回転のための変換を追加
      { translateX: centerX + position.x },
      { translateY: size.height / 2 + position.y },
      { rotate }, // 平面上の回転
      { rotateY: rotateY3d },
      { rotateX: rotateX3d },
      { scaleX: scaleX },
      { translateX: -(centerX + position.x) },
      { translateY: -(size.height / 2 + position.y) },
    ]
  }, [props.animation])

  useEffect(() => {
    const checkSpecialState = () => {
      const random = Math.random()
      if (random < SHINING_CONFIG.probability) {
        setIsShining(true)

        setTimeout(() => {
          setIsShining(false)
        }, SHINING_CONFIG.durationMs)
      }
    }

    checkSpecialState()

    const intervalId = setInterval(
      checkSpecialState,
      SHINING_CONFIG.checkIntervalMs,
    )

    return () => clearInterval(intervalId)
  }, [])

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
