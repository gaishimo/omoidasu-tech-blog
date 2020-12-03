import * as React from "react"
import { css } from "@emotion/react"

type Props = {
  width: string
  children: React.ReactNode
}

export function ImageWrapper(props: Props) {
  return (
    <div css={[styles.wrapper, css({ width: props.width })]}>
      {props.children}
    </div>
  )
}

const styles = {
  wrapper: css({
    border: "1px solid rgb(230, 230, 230)",
    position: "relative",
    width: "80%",
  }),
}
