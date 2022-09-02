import {
  Canvas,
  Circle,
  Group,
  RoundedRect,
  rrect,
  useTouchHandler,
  useValue,
} from "@shopify/react-native-skia"

const canvasSize = { width: 320, height: 140 }
const buttonSize = { width: 300, height: 100 }
const buttonPos = {
  x: (canvasSize.width - buttonSize.width) / 2,
  y: (canvasSize.height - buttonSize.height) / 2,
}
const buttonRadius = 50
const rippleColor = "rgb(100, 200, 255)"

export default function RippleEffect02() {
  const cx = useValue<number>(canvasSize.width / 2)
  const cy = useValue<number>(canvasSize.height / 2 + buttonSize.height / 3)

  const touchHandler = useTouchHandler({
    onStart: ({ x, y }) => {
      cx.current = x
      cy.current = y
    },
  })

  return (
    <Canvas style={[canvasSize]} onTouch={touchHandler}>
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
          cx={cx || 0}
          cy={cy || 0}
          r={30}
          opacity={0.2}
          color={rippleColor}
        />
      </Group>
    </Canvas>
  )
}
