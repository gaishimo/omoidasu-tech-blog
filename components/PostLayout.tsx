import { ReactNode } from "react"
import { MDXProvider } from "@mdx-js/react"
import { motion } from "framer-motion"
import { BaseLayout } from "./BaseLayout"
import { css } from "@emotion/core"

type Props = {
  children: ReactNode
  description?: string
  title?: string
}

export function PostLayout(props: Props) {
  return (
    <MDXProvider>
      <BaseLayout>
        <div css={styles.container}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            transition={{ duration: 1.2 }}
          >
            {props.children}
          </motion.div>
        </div>
      </BaseLayout>
    </MDXProvider>
  )
}

const styles = {
  container: css({
    width: 720,
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: 80,
    paddingBottom: 200,
  }),
  content: css({
    opacity: 0,
  }),
}
