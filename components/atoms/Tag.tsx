import * as React from "react"
import { css } from "@emotion/react"

type Props = {
  name: string
}

export function Tag(props: Props) {
  return <div css={styles.tag}>{props.name}</div>
}

const styles = {
  tag: css({
    padding: "0 8px",
    border: "1px solid #DCDCDC",
    borderRadius: 14,
    backgroundColor: "rgba(250, 250, 250, 0.5)",
    color: "rgb(120, 120, 120)",
    fontSize: "0.8rem",
    lineHeight: 1.7,
  }),
}
