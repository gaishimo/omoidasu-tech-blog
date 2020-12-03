import * as React from "react"
import { css } from "@emotion/react"
import Shape from "./Shape"

type Props = {
  color1: string
  color2: string
}

export function ShapeSymbol(props: Props) {
  return (
    <div css={styles.symbol}>
      <Shape color={props.color1} size={30} opacity={0.5} />
      <Shape
        color={props.color2}
        size={22}
        opacity={0.5}
        style={styles.shape2}
      />
    </div>
  )
}

const styles = {
  symbol: css({
    position: "relative",
  }),
  shape1: css({
    position: "absolute",
    top: 0,
    left: 0,
  }),
  shape2: css({
    position: "absolute",
    top: 12,
    left: 12,
  }),
}
