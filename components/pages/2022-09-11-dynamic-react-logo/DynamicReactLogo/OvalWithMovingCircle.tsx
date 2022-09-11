import {
  Circle,
  Oval,
  SkiaMutableValue,
  useComputedValue,
} from "@shopify/react-native-skia"

const radius = 100
const ovalRatio = 0.35

type Props = {
  center: { x: number; y: number }
  color: string
  theta: SkiaMutableValue<number>
}

export function OvalWithMovingCircle(props: Props) {
  const { center, theta } = props
  const ovalRect = {
    x: center.x - radius,
    y: center.y - radius * ovalRatio,
    width: radius * 2,
    height: radius * ovalRatio * 2,
  }

  const cx = useComputedValue(() => {
    const cos = radius * Math.cos(theta.current)
    return center.x + cos
  }, [theta])
  const cy = useComputedValue(() => {
    const sin = radius * Math.sin(theta.current)
    return center.y + sin * ovalRatio
  }, [theta])

  return (
    <>
      <Oval
        rect={ovalRect}
        color={props.color}
        style="stroke"
        strokeWidth={8}
      />
      <Circle cx={cx} cy={cy} r={8} style="fill" color={props.color} />
    </>
  )
}
