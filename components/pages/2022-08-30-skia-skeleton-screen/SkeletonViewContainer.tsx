import { Canvas, LinearGradient, Group } from "@shopify/react-native-skia"
import {
  Easing,
  interpolate,
  useSharedValue,
  useDerivedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated"
import { ReactNode, useEffect } from "react"

type Props = {
  basicColor: string
  accentColor: string
  canvasSize: { width: number; height: number }
  children: ReactNode
}

export function SkeletonViewContainer(props: Props) {
  const progress = useSharedValue(0)

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        easing: Easing.inOut(Easing.ease),
        duration: 2300,
      }),
      -1,
      false,
    )
  }, [])

  const positions = useDerivedValue(() => {
    return [
      interpolate(progress.value, [0, 0.25, 0.5, 0.75, 1], [0, 0, 0, 0.5, 1]),
      interpolate(progress.value, [0, 0.25, 0.5, 0.75, 1], [0, 0, 0.5, 1, 1]),
      interpolate(progress.value, [0, 0.25, 0.5, 0.75, 1], [0, 0.5, 1, 1, 1]),
    ]
  }, [])

  return (
    <Canvas style={props.canvasSize}>
      <Group>
        <LinearGradient
          start={{ x: 0, y: props.canvasSize.height % 2 }}
          end={{ x: props.canvasSize.width, y: props.canvasSize.height % 2 }}
          colors={[props.basicColor, props.accentColor, props.basicColor]}
          positions={positions}
        />
        {props.children}
      </Group>
    </Canvas>
  )
}
