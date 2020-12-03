import { css } from "@emotion/core"
import Link from "next/link"
import { mq } from "../libs/mediaQuery"

type Props = {
  useH1?: boolean
}

export function Header(props: Props) {
  return (
    <header css={styles.header}>
      <div css={styles.headerEdge} />
      {props.useH1 ? (
        <h1 css={styles.title}>
          <img alt="omoidasu logo" css={styles.logo} src="/omoidasuLogo.png" />
          <img
            alt="omoidasu title logo"
            css={styles.titleLogo}
            src="/titleLogo.png"
          />
        </h1>
      ) : (
        <Link href={"/"}>
          <div css={styles.title}>
            <img
              alt="omoidasu logo"
              css={styles.logo}
              src="/omoidasuLogo.png"
            />
            <img
              alt="omoidasu title logo"
              css={styles.titleLogo}
              src="/titleLogo.png"
            />
          </div>
        </Link>
      )}
      <div css={[styles.links, styles.headerEdge]}>
        <a css={styles.link} href="/">
          記事一覧
        </a>
        <a
          css={styles.link}
          href="https://omoidasu.co.jp"
          rel="noopener noreferrer"
          target="_blank"
        >
          運用中のアプリ
        </a>
      </div>
    </header>
  )
}

const styles = {
  header: css({
    position: "relative",
    paddingTop: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  }),
  headerEdge: css({
    width: 200,
  }),
  logo: css({
    marginRight: 10,
    width: 42,
    height: 42,
  }),
  title: css({
    marginTop: 6,
    paddingRight: 36,
    [mq.sp]: {
      paddingRight: 20,
    },
    display: "flex",
    flexDirection: "row",
  }),
  titleLogo: css({
    height: 50,
    width: "auto",
    [mq.sp]: {
      height: 40,
    },
  }),
  links: css({
    // position: "absolute",
    // top: 16,
    // right: 20,
    // paddingRight: 20,
  }),
  link: css({
    marginRight: 12,
    marginLeft: 12,
    textDecoration: "none",
    fontSize: "0.8rem",
    color: "rgb(70, 70, 70)",
    "&:hover": {
      color: "black",
    },
  }),
}
