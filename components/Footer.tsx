import { css } from "@emotion/react"

export function Footer() {
  return (
    <footer>
      <div css={styles.footer}>
        <div css={styles.copyRight}>
          <div css={styles.copyRightText}>
            <small>&copy; 2020 Omoidasu, Inc. All rights reserved.</small>
          </div>
        </div>
      </div>
    </footer>
  )
}

const styles = {
  footer: css({
    borderTop: "1px solid rgb(200, 200, 200)",
    padding: "6px 0",
  }),
  copyRight: css({
    marginTop: 8,
  }),
  copyRightText: css({
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    fontSize: "0.9rem",
    letterSpacing: "0.05rem",
  }),
}
