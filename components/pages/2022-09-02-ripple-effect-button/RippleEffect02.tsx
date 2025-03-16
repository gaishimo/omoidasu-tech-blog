import {
  Canvas,
  Circle,
  Group,
  RoundedRect,
  rrect,
} from "@shopify/react-native-skia"
import { useSharedValue, runOnJS } from "react-native-reanimated"
import { Gesture, GestureDetector } from "react-native-gesture-handler"

const canvasSize = { width: 320, height: 140 }
const buttonSize = { width: 300, height: 100 }
const buttonPos = {
  x: (canvasSize.width - buttonSize.width) / 2,
  y: (canvasSize.height - buttonSize.height) / 2,
}
const buttonRadius = 50
const rippleColor = "rgb(100, 200, 255)"

export default function RippleEffect02() {
  const cx = useSharedValue<number>(canvasSize.width / 2)
  const cy = useSharedValue<number>(
    canvasSize.height / 2 + buttonSize.height / 3,
  )

  const panGesture = Gesture.Pan().onBegin(({ x, y }) => {
    cx.value = x
    cy.value = y
  })

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
          <Circle cx={cx} cy={cy} r={30} opacity={0.2} color={rippleColor} />
        </Group>
      </Canvas>
    </GestureDetector>
  )
}
