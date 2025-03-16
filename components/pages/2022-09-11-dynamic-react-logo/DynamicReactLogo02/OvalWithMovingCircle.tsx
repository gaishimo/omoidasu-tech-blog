import { Circle, Oval } from "@shopify/react-native-skia"
import { SharedValue, useDerivedValue } from "react-native-reanimated"

const radius = 100
const ovalRatio = 0.35

type Props = {
  center: { x: number; y: number }
  color: string
  theta: SharedValue<number>
}

export function OvalWithMovingCircle(props: Props) {
  const { center, theta } = props
  const ovalRect = {
    x: center.x - radius,
    y: center.y - radius * ovalRatio,
    width: radius * 2,
    height: radius * ovalRatio * 2,
  }

  const cx = useDerivedValue(() => {
    const cos = radius * Math.cos(theta.value)
    return center.x + cos
  }, [])

  const cy = useDerivedValue(() => {
    const sin = radius * Math.sin(theta.value)
    return center.y + sin * ovalRatio
  }, [])

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
