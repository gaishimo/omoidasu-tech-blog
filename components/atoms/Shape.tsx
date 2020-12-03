import * as React from "react"
import { css, SerializedStyles } from "@emotion/react"

type Props = {
  color: string
  size: number
  opacity: number
  style?: SerializedStyles
}

const styles = {
  shape: css({}),
}

export default function Shape(props: Props) {
  return (
    <div
      css={[
        styles.shape,
        css({
          width: props.size,
          height: props.size,
          opacity: props.opacity,
          backgroundColor: props.color,
          borderRadius: props.size / 2,
        }),
        props.style,
      ]}
    />
  )
}
