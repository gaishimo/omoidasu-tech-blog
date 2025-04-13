import {
  Atlas,
  Canvas,
  Group,
  rect,
  useRSXformBuffer,
  useTexture,
} from "@shopify/react-native-skia"
import { SakuraPetal } from "./SakuraPetal"
import {
  useSharedValue,
  withTiming,
  withRepeat,
  Easing,
} from "react-native-reanimated"
import { useEffect } from "react"
import { StyleProp, useWindowDimensions, ViewStyle } from "react-native"

const elementSize = { width: 40, height: 60 }

type Props = {
  canvasSize?: { width: number; height: number }
  canvasStyle?: StyleProp<ViewStyle>
}

export default function SakuraFlutteringAtlas(props: Props) {
  const window = useWindowDimensions()
  const canvasSize = props.canvasSize ?? {
    width: window.width,
    height: window.height + 40,
  }
  const numOfSprites = window.width < 500 ? 30 : 70

  const progresses = {
    falling: useSharedValue(0),
    sway: useSharedValue(0),
    rotation: useSharedValue(0),
    flutter: useSharedValue(0),
  }

  const texture = useTexture(
    <Group>
      {Array.from({ length: 3 }).map((_, i) => (
        <SakuraPetal
          key={i}
          colorId={(i % 3) as 0 | 1 | 2}
          size={elementSize}
          position={{ x: elementSize.width * i, y: 0 }}
          opacity={window.width < 500 ? 0.5 : 0.7}
        />
      ))}
    </Group>,
    { width: elementSize.width * 3, height: elementSize.height },
  )

  const sprites = Array.from({ length: numOfSprites }).map((_, i) =>
    rect(elementSize.width * (i % 3), 0, elementSize.width, elementSize.height),
  )

  const itemConfigList = useSharedValue(
    Array.from({ length: numOfSprites }).map(() => {
      return {
        x: Math.random() * canvasSize.width,
        y: Math.random() * canvasSize.height,
        scale: 0.2 + Math.random() * 0.3,
        rotation: Math.random() * Math.PI * 2,
        swayAmplitude: 15 + Math.random() * 70,
        swayFrequency: 0.6 + Math.random() * 0.7,
        fallSpeed: 0.8 + Math.random() * 1,
        initialPhase: Math.random() * Math.PI * 2,
        rotationSpeed:
          (Math.random() > 0.5 ? 1 : -1) * (0.2 + Math.random() * 0.3),
      }
    }),
  )

  useEffect(() => {
    progresses.falling.value = 0
    progresses.falling.value = withRepeat(
      withTiming(100, {
        duration: 1000 * 60 * 5,
        easing: Easing.linear,
      }),
      -1,
      false,
    )

    progresses.sway.value = 0
    progresses.sway.value = withRepeat(
      withTiming(Math.PI * 2, {
        duration: 20000,
        easing: Easing.linear,
      }),
      -1,
      true,
    )

    progresses.rotation.value = 0
    progresses.rotation.value = withRepeat(
      withTiming(Math.PI * 2, {
        duration: 25000,
        easing: Easing.linear,
      }),
      -1,
      false,
    )
  }, [])

  const transforms = useRSXformBuffer(numOfSprites, (val, i) => {
    "worklet"

    const {
      x,
      y,
      scale,
      rotation,
      swayAmplitude,
      swayFrequency,
      fallSpeed,
      initialPhase,
      rotationSpeed,
    } = itemConfigList.value[i]

    const fallOffset =
      (progresses.falling.value / 100) * canvasSize.height * fallSpeed * 15

    const currentY = (y + fallOffset) % canvasSize.height

    const swayOffset =
      Math.sin(progresses.sway.value * swayFrequency + initialPhase) *
      swayAmplitude

    const currentX = x + swayOffset

    const continuousRotation = progresses.rotation.value * rotationSpeed

    const swayRotationOffset =
      Math.sin(progresses.sway.value * 0.5 + initialPhase) * 0.2

    const currentRotation = rotation + continuousRotation + swayRotationOffset
    const sn = Math.sin(currentRotation)
    const cs = Math.cos(currentRotation)

    val.set(scale * cs, scale * sn, currentX, currentY)
  })

  return (
    <Canvas
      style={{
        bottom: 40,
        borderWidth: 1,
        borderColor: "rgb(255, 230, 245)",
        ...canvasSize,
        // @ts-ignore
        ...props.canvasStyle,
      }}
    >
      <Atlas image={texture} sprites={sprites} transforms={transforms} />
    </Canvas>
  )
}
