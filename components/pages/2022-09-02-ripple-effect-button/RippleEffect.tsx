import {
  Canvas,
  Circle,
  Group,
  RoundedRect,
  rrect,
} from "@shopify/react-native-skia"
import {
  interpolate,
  useSharedValue,
  useDerivedValue,
  withTiming,
  runOnJS,
  Easing,
} from "react-native-reanimated"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import { useEffect } from "react"

const canvasSize = { width: 320, height: 140 }
const buttonSize = { width: 300, height: 100 }
const buttonPos = {
  x: (canvasSize.width - buttonSize.width) / 2,
  y: (canvasSize.height - buttonSize.height) / 2,
}
const buttonRadius = 50
const rippleColor = "rgb(100, 200, 255)"

type Props = {
  easing?: (t: number) => number
}

/**
 * 波紋が拡がるアニメーション
 */
export default function RippleEffect(props: Props) {
  const cx = useSharedValue<number>(canvasSize.width / 2)
  const cy = useSharedValue<number>(
    canvasSize.height / 2 + buttonSize.height / 3,
  )
  const rippleProgress = useSharedValue<number>(0)

  const startRipple = () => {
    rippleProgress.value = 0
    rippleProgress.value = withTiming(
      1,
      {
        duration: 1000,
        easing: props.easing || Easing.inOut(Easing.ease),
      },
      () => {
        runOnJS(setTimeout)(() => {
          rippleProgress.value = 0
        }, 100)
      },
    )
  }

  const panGesture = Gesture.Pan().onBegin(({ x, y }) => {
    cx.value = x
    cy.value = y
    runOnJS(startRipple)()
  })

  const rippleRadius = useDerivedValue(() => {
    return interpolate(rippleProgress.value, [0, 1], [0, 300])
  }, [])

  return (
    <GestureDetector gesture={panGesture}>
      <Canvas style={canvasSize}>
        <Group
          clip={rrect(
            { ...buttonPos, ...buttonSize },
            buttonRadius,
            buttonRadius,
          )}
        >
          <RoundedRect
            {...buttonSize}
            {...buttonPos}
            r={buttonRadius}
            color="lightblue"
            style="fill"
          />
          <Circle
            cx={cx}
            cy={cy}
            r={rippleRadius}
            opacity={0.2}
            color={rippleColor}
          />
        </Group>
      </Canvas>
    </GestureDetector>
  )
}
