import * as React from "react"
import { css } from "@emotion/core"
import { format } from "date-fns"
import { ShapeSymbol } from "./atoms/ShapeSymbol"
import { Tag } from "./atoms/Tag"

type Props = {
  title: string
  color1: string
  color2: string
  tagNames: string[]
  createdAt: Date
}

export function PostHeader(props: Props) {
  return (
    <div css={styles.container}>
      <div css={styles.creationTime}>
        {format(props.createdAt, "yyyy-MM-dd")}
      </div>
      <h1 css={styles.header}>
        <div css={styles.symbol}>
          <ShapeSymbol color1={props.color1} color2={props.color2} />
        </div>
        <span>{props.title}</span>
      </h1>
      <div css={styles.tags}>
        {props.tagNames.map((tagName, i) => (
          <div key={i} css={styles.tag}>
            <Tag name={tagName} />
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  container: css({
    marginBottom: 60,
  }),
  creationTime: css({
    color: "rgb(100, 100, 100)",
    fontSize: "0.9rem",
    marginBottom: 16,
  }),
  header: css({
    display: "flex",
    flexDirection: "row",
    marginBottom: 16,
  }),
  symbol: css({
    paddingTop: 4,
    paddingRight: 12,
  }),
  tags: css({
    display: "flex",
    flexDirection: "row",
  }),
  tag: css({
    marginRight: 8,
    marginLeft: 8,
  }),
}
