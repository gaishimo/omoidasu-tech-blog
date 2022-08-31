import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native"
import { Post } from "../typings/Post"
import { ShapeSymbol } from "./atoms/ShapeSymbol"

const posts = require("../_generated/posts.json") as Post[]

type Props = {
  id: string
  style?: StyleProp<ViewStyle>
}

export function RelatedPostsPanel(props: Props) {
  const post = posts.find(p => p.id === props.id)
  const relatedPosts = (post?.relatedPosts || []).map(id =>
    posts.find(p => p.id === id),
  )
  console.log("post?.relatedPosts:", post)
  if (relatedPosts.length === 0) {
    return null
  }
  return (
    <View style={[styles.panel, props.style]}>
      <View style={styles.header}>
        <Text style={styles.titleText}>関連する記事</Text>
      </View>
      <View style={styles.body}>
        {relatedPosts.map(post => (
          <View
            key={post.id}
            accessibilityRole="link"
            href={`/posts/${post.id}`}
            style={styles.item}
          >
            <ShapeSymbol
              color1={post.color1}
              color2={post.color2}
              baseSize={12}
            />
            <Text style={styles.itemText}>{post.title}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  panel: {
    borderWidth: 1,
    borderColor: "rgba(210, 210, 210, 0.5)",
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  header: { paddingLeft: 8 },
  titleText: { fontSize: 12 },
  body: {
    marginTop: 12,
  },
  item: { paddingVertical: 8, flexDirection: "row", alignItems: "center" },
  itemText: { marginLeft: 12, fontSize: 12 },
})
