import { FlatList, StyleSheet, Text, View } from "react-native"
import { BaseLayout } from "../components/BaseLayout"
import { PostItem } from "../components/PostItem"
import { Colors } from "../libs/colors"
import { getAllPosts } from "../libs/posts"
import { Post } from "../typings/Post"

type Props = {
  posts: Post[]
}

export async function getStaticProps() {
  const posts = await getAllPosts()
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  }
}

export default function IndexPage(props: Props) {
  return (
    <BaseLayout>
      <View style={styles.container}>
        <View style={styles.desc}>
          <Text style={styles.descText}>
            {
              "Omoidasu, Incの技術ブログです。\nReact NativeやSkiaについての記事が中心です。"
            }
          </Text>
        </View>
        <View style={styles.body}>
          <FlatList
            data={props.posts}
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
  desc: {},
  descText: { textAlign: "center", color: Colors.textColor1 },
  body: {},
  item: { marginBottom: 40 },
  list: { marginTop: 40 },
})
