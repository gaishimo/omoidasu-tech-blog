import * as React from "react"
import { css } from "@emotion/core"
import { format } from "date-fns"
import { ShapeSymbol } from "./atoms/ShapeSymbol"
import { Tag } from "./atoms/Tag"
import { mq } from "../libs/mediaQuery"

type Props = {
  post: Post
}

export function PostItem({ post }: Props) {
  return (
    <div css={styles.container}>
      <div css={styles.symbol}>
        <ShapeSymbol color1={post.color1} color2={post.color2} />
      </div>
      <div css={styles.post}>
        <a href={`/posts/${post.id}`} css={styles.link}>
          <div css={styles.title}>{post.title}</div>
        </a>
        <div css={styles.meta}>
          <div css={styles.creationTime}>
            {format(new Date(post.createdAt), "yyyy-MM-dd")}
          </div>
          <div css={styles.tags}>
            {post.tagNames.map((tagName, i) => (
              <div key={i} css={styles.tag}>
                <Tag name={tagName} />
              </div>
            ))}
          </div>
        </div>
        <a href={`/posts/${post.id}`} css={styles.link}>
          <div css={styles.desc}>{post.description} ...</div>
        </a>
      </div>
    </div>
  )
}

const styles = {
  container: css({
    display: "flex",
    flexDirection: "row",
  }),
  symbol: css({
    paddingTop: 4,
    width: 60,
    display: "flex",
    justifyContent: "center",
  }),
  post: css({
    flex: 1,
    [mq.sp]: {
      maxWidth: "70%",
    },
  }),
  title: css({
    fontSize: "1.1rem",
    fontWeight: "bold",
    [mq.sp]: {
      fontSize: "1rem",
    },
  }),
  meta: css({
    marginTop: 6,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  }),
  creationTime: css({
    marginRight: 16,
    color: "#787878",
    fontSize: "0.85rem",
  }),
  tags: css({
    display: "flex",
    flexDirection: "row",
  }),
  tag: css({
    marginRight: 10,
  }),
  desc: css({
    marginTop: 16,
    fontSize: "0.8rem",
  }),
  link: css({
    textDecoration: "none",
    color: "#4A4A4A",
    "&:hover": {
      color: "#28608E",
    },
  }),
}
