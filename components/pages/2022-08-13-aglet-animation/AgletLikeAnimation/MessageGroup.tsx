import {
  Group,
  SkFont,
  SkiaValue,
  useComputedValue,
  Vector,
} from "@shopify/react-native-skia"
import { range } from "../../../../utils/arrayUtils"
import { Constants } from "./Constants"
import { Message } from "./Message"

type Props = {
  direction: "right" | "left"
  basePosition: Vector
  font: SkFont
  numOfLogo: number
  progress: SkiaValue<number>
}

export function MessageGroup(props: Props) {
  const { basePosition } = props

  const groupWidth = Constants.messageGroupWidth * props.numOfLogo

  const transform = useComputedValue(() => {
    const distance = props.progress.current * groupWidth
    return [
      {
        translateX: distance * (props.direction === "left" ? -1 : 1),
      },
    ]
  }, [props.progress, props.direction])

  return (
    <Group transform={transform}>
      {range(0, props.numOfLogo).map(i => (
        <Message
          key={i}
          basePos={{
            x: basePosition.x + i * Constants.messageGroupWidth,
            y: basePosition.y,
          }}
          font={props.font}
        />
      ))}
    </Group>
  )
}