import { SkFont } from "@shopify/react-native-skia"
import { useMemo } from "react"
import { SharedValue } from "react-native-reanimated"
import { Constants } from "./Constants"
import { MessageGroup } from "./MessageGroup"

type Props = {
  direction: "right" | "left"
  baseY: number
  font: SkFont
  numOfLogo: number
  progress: SharedValue<number>
}

export function Row(props: Props) {
  const { direction, progress, font, numOfLogo } = props
  const logoGroupWidth = useMemo(
    () => Constants.messageGroupWidth * numOfLogo,
    [],
  )

  const x1 = props.direction === "right" ? -logoGroupWidth : 0
  const x2 = props.direction === "right" ? 0 : logoGroupWidth

  return (
    <>
      <MessageGroup
        basePosition={{ x: x1, y: props.baseY }}
        {...{ direction, progress, font, numOfLogo }}
      />
      <MessageGroup
        basePosition={{ x: x2, y: props.baseY }}
        {...{ direction, progress, font, numOfLogo }}
      />
    </>
  )
}
