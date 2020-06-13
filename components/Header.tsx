import { css } from "@emotion/core"
import Link from "next/link"
import { mq } from "../libs/mediaQuery"

type Props = {
  useH1?: boolean
}

export function Header(props: Props) {
  return (
    <header css={styles.header}>
      <div />
      {props.useH1 ? (
        <h1 css={styles.title}>
          <img css={styles.logo} src="/omoidasuLogo.png" />
          <img alt="omoidasu" css={styles.titleLogo} src="/titleLogo.png" />>
        </h1>
      ) : (
        <Link href={"/"}>
          <div css={styles.title}>
            <img css={styles.logo} src="/omoidasuLogo.png" />
            <img alt="omoidasu" css={styles.titleLogo} src="/titleLogo.png" />
          </div>
        </Link>
      )}
      <div css={styles.links}>
        {/* <Link css={styles.link} to={"/"}>
          お問い合わせ
        </Link> */}
      </div>
    </header>
  )
}

const styles = {
  header: css({
    position: "relative",
    paddingTop: 12,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
    position: "absolute",
    top: 12,
    right: 20,
    paddingRight: 20,
  }),
  link: css({
    "&:hover": {
      fontWeight: "bold",
    },
  }),
}
