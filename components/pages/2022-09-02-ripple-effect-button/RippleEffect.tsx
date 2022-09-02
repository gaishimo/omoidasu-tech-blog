import {
  Canvas,
  Circle,
  Group,
  interpolate,
  RoundedRect,
  rrect,
  runTiming,
  useComputedValue,
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

type Props = {
  easing?: (t: number) => number
}

/**
 * 波紋が拡がるアニメーション
 */
export default function RippleEffect(props: Props) {
  const cx = useValue<number>(canvasSize.width / 2)
  const cy = useValue<number>(canvasSize.height / 2 + buttonSize.height / 3)
  const rippleProgress = useValue<number>(0)

  const touchHandler = useTouchHandler({
    onStart: ({ x, y }) => {
      cx.current = x
      cy.current = y
      runTiming(
        rippleProgress,
        1,
        { duration: 1000, easing: props.easing },
        () => {
          setTimeout(() => {
            rippleProgress.current = 0
          }, 100)
        },
      )
    },
  })

  const rippleRadius = useComputedValue(() => {
    return interpolate(rippleProgress.current, [0, 1], [0, 300])
  }, [rippleProgress])

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
          cx={cx}
          cy={cy}
          r={rippleRadius}
          opacity={0.2}
          color={rippleColor}
        />
      </Group>
    </Canvas>
  )
}
