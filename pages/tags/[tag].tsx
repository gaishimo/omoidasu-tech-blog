import { useRouter } from "next/router"
import { useMemo } from "react"
import { FlatList, StyleSheet, Text, View } from "react-native"
import { BaseLayout } from "../../components/BaseLayout"
import { PostItem } from "../../components/PostItem"
import { Colors } from "../../libs/colors"
import { getAllPosts } from "../../libs/posts"
import { getTags } from "../../libs/tags"
import { Post } from "../../typings/Post"

export async function getStaticProps() {
  const posts = await getAllPosts()
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  }
}

export async function getStaticPaths() {
  const tags = await getTags()
  return {
    paths: Object.keys(tags).map(tag => `/tags/${tag}`),
    fallback: true,
  }
}

type Props = {
  posts: Post[]
}

export default function TagPage(props: Props) {
  const router = useRouter()
  const { tag } = router.query

  const filteredPosts = useMemo(
    () =>
      (props.posts || []).filter(post =>
        post.tagNames.includes(tag.toString()),
      ),
    [],
  )

  return (
    <BaseLayout>
      <View style={styles.container}>
        <View style={styles.desc}>
          <Text style={styles.descText}>
            <Text style={styles.tagNameText}>{tag}</Text>
            に関する記事
          </Text>
        </View>
        <View style={styles.body}>
          <FlatList
            data={filteredPosts}
            style={styles.list}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <PostItem post={item} />
              </View>
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </BaseLayout>
  )
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 500,
    paddingTop: 40,
    paddingHorizontal: 8,
  },
  desc: { alignItems: "center" },
  descText: { color: Colors.textColor1 },
  tagNameText: { fontWeight: "bold", marginHorizontal: 8 },
  body: {},
  item: { marginBottom: 40 },
  list: { marginTop: 40 },
})
