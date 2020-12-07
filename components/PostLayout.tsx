import { ReactNode, Fragment } from "react"
import { MDXProvider } from "@mdx-js/react"
import { motion } from "framer-motion"
import { BaseLayout } from "./BaseLayout"
import { css } from "@emotion/react"
import { PostHeader } from "./PostHeader"
import { format } from "date-fns"
import { mq } from "../libs/mediaQuery"

type Headline = { title: string; children: Headline[] }

type Props = {
  children: ReactNode
  // description?: string
  headlines: Headline[]
  meta: PostMeta
}

function parseTitleToLinkId(s: string) {
  const parsed = s.toLowerCase().replace(/\s/g, "-").replace(".", "")
  return `#${parsed}`
}

export function PostLayout(props: Props) {
  const renderHeadline = (headline: Headline) => (
    <Fragment key={headline.title}>
      <li css={styles.headlineItem}>
        <a css={styles.headlineLink} href={parseTitleToLinkId(headline.title)}>
          {headline.title}
        </a>
      </li>
      {(headline.children || []).length > 0 ? (
        <ul css={styles.headlineList}>
          {(headline.children || []).map(child => renderHeadline(child))}
        </ul>
      ) : null}
    </Fragment>
  )

  return (
    <MDXProvider>
      <BaseLayout
        title={`${props.meta.title} | Omoidasu Tech Blog`}
        description={props.meta.description}
        imagePath={props.meta.imagePath}
      >
        {/* <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          transition={{ duration: 1.2 }}
          css={styles.container}
        > */}
        <div css={styles.container}>
          <article css={styles.articleWrapper}>
            <div css={styles.article}>
              <PostHeader {...props.meta} />
              {props.children}
            </div>
            <div css={styles.articleFooter}>
              <dl>
                <dt>最終更新:</dt>
                <dd>{format(props.meta.lastUpdatedAt, "yyyy-MM-dd HH:mm")}</dd>
                <dt>作者:</dt>
                <dd>
                  <a href="https://twitter.com/gaishimo">{props.meta.author}</a>
                  <br />
                  主にReact Nativeでのアプリ開発を行っています。
                  <br />
                  <a href="https://omoidasu.co.jp/ja/apps" target="_blank">
                    アプリ
                  </a>
                </dd>
                <dt></dt>
                <dd></dd>
              </dl>
            </div>
          </article>
          <div css={styles.sidebar}>
            <div css={styles.headlinesPanel}>
              <ul css={styles.headlineList}>
                {props.headlines.map((headline: Headline) =>
                  renderHeadline(headline),
                )}
              </ul>
            </div>
          </div>
        </div>
        {/* </motion.div> */}
      </BaseLayout>
    </MDXProvider>
  )
}

const styles = {
  container: css({
    width: 1160,
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: 80,
    paddingBottom: 200,
    display: "flex",
    flexDirection: "row",
    [mq.sp]: {
      width: "100%",
    },
  }),
  articleWrapper: css({
    width: 760,
    paddingLeft: 160,
    [mq.sp]: {
      width: "96%",
      paddingLeft: 0,
      padding: 8,
    },
  }),
  article: css({
    width: "100%",
  }),
  articleFooter: css({
    marginTop: 30,
    paddingTop: 16,
    borderTop: "1px solid #DCDCDC",
    color: "#646464",
    fontSize: "0.8rem",
  }),
  sidebar: css({
    width: 340,
    paddingLeft: 30,
    position: "relative",
    [mq.sp]: {
      display: "none",
      width: 0,
    },
  }),
  headlinesPanel: css({
    [mq.sp]: {
      display: "none",
    },
    border: "1px solid rgba(210, 210, 210, 0.5)",
    borderRadius: 6,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    padding: 8,
    position: "sticky",
    top: 60,
  }),
  headlineList: css({
    listStyleType: "none",
    paddingLeft: 10,
  }),
  headlineItem: css({
    color: "rgb(80, 80, 80)",
    fontSize: "0.8rem",
    marginBottom: 4,
    letterSpacing: 0,
    cursor: "pointer",
  }),
  headlineLink: css({
    color: "rgb(80, 80, 80)",
    textDecoration: "none",
    "&:hover": {
      fontWeight: 600,
    },
  }),
}
