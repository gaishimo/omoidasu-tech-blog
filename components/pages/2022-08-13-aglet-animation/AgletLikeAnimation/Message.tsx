import { Circle, SkFont, Text, Vector } from "@shopify/react-native-skia"
import { Constants } from "./Constants"

type Props = {
  basePos: Vector
  font: SkFont
}

export function Message(props: Props) {
  return (
    <>
      <Circle
        color="rgba(255, 255, 255, 0.9)"
        cx={props.basePos.x + 26}
        cy={props.basePos.y + 19}
        r={10}
      />
      <Text
        x={props.basePos.x + 40}
        y={props.basePos.y + Constants.fontSize}
        font={props.font}
        color="rgba(255, 255, 255, 0.9)"
        text="HAPPY"
      />
    </>
  )
}
