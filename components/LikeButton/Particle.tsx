import { Circle, Group } from "@shopify/react-native-skia"
import { useMemo } from "react"
import {
  interpolate,
  SharedValue,
  useDerivedValue,
} from "react-native-reanimated"

type Props = {
  color: string
  centerOrigin: {
    x: number
    y: number
  }
  initialPosition: {
    angleRadian: number
    distanceFromCenter: number
  }
  progress?: SharedValue<number>
}

export function Particle(props: Props) {
  const initialPosition = useMemo(() => {
    return {
      cx:
        props.centerOrigin.x +
        props.initialPosition.distanceFromCenter *
          Math.cos(props.initialPosition.angleRadian),
      cy:
        props.centerOrigin.y +
        props.initialPosition.distanceFromCenter *
          Math.sin(props.initialPosition.angleRadian),
    }
  }, [props.centerOrigin, props.initialPosition])

  const transform = useDerivedValue(() => {
    const { centerOrigin, initialPosition, progress } = props
    const initialPos = initialPosition

    if (!progress) return []

    const currentProgress = progress.value
    const distanceMultiplier = 1 + currentProgress * 0.7

    const currentDistance = initialPos.distanceFromCenter * distanceMultiplier
    const currentX =
      centerOrigin.x + currentDistance * Math.cos(initialPos.angleRadian)
    const currentY =
      centerOrigin.y + currentDistance * Math.sin(initialPos.angleRadian)

    const dx =
      currentX -
      (centerOrigin.x +
        initialPos.distanceFromCenter * Math.cos(initialPos.angleRadian))
    const dy =
      currentY -
      (centerOrigin.y +
        initialPos.distanceFromCenter * Math.sin(initialPos.angleRadian))

    const scale = interpolate(currentProgress, [0, 0.1, 0.7, 1], [0, 1, 1, 0])

    return [{ translateX: dx }, { translateY: dy }, { scale }]
  }, [props.centerOrigin, props.initialPosition, props.progress])

  const opacity = useDerivedValue(() => {
    const { progress } = props
    if (!progress) return 1
    return interpolate(progress.value, [0, 0.2, 0.7, 1], [0, 1, 1, 0])
  }, [props.progress])

  return (
    <Group
      origin={{ x: initialPosition.cx, y: initialPosition.cy }}
      transform={transform}
      opacity={opacity}
    >
      <Circle
        cx={initialPosition.cx}
        cy={initialPosition.cy}
        color={props.color}
        r={1.5}
      />
    </Group>
  )
}
