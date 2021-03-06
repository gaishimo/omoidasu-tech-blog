import { css } from "@emotion/react"
import { BaseLayout } from "../components/BaseLayout"
import { PostItem } from "../components/PostItem"
import { mq } from "../libs/mediaQuery"
import { getAllPosts } from "../libs/posts"

type Props = {
  posts: Post[]
}

export default function Home(props: Props) {
  return (
    <BaseLayout>
      <div css={styles.page}>
        <div css={styles.siteDesc}>Omoidasu, Incの技術ブログです。</div>
        <div css={styles.body}>
          <div css={styles.posts}>
            {props.posts.map(post => (
              <div key={post.id} css={styles.postItem}>
                <PostItem post={post} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}

const styles = {
  page: css({
    width: 500,
    minHeight: 700,
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: 60,
    paddingBottom: 100,
    [mq.sp]: {
      width: "100%",
      marginLeft: 0,
      marginRight: 0,
    },
  }),
  siteDesc: css({
    textAlign: "center",
    color: "#323232",
    fontSize: "0.9rem",
  }),
  body: css({
    marginTop: 50,
    display: "flex",
    flexDirection: "row",
  }),
  posts: css({
    width: 600,
    [mq.sp]: {
      width: "100%",
    },
  }),
  postItem: css({
    marginBottom: 40,
  }),
}

export async function getStaticProps() {
  const posts = await getAllPosts()
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  }
}
