import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native"
import { Post } from "../typings/Post"
import { ShapeSymbol } from "./atoms/ShapeSymbol"

const posts = require("../_generated/posts.json") as Post[]

type Props = {
  style?: StyleProp<ViewStyle>
}

export function RecentPostsPanel(props: Props) {
  return (
    <View style={[styles.panel, props.style]}>
      <View style={styles.header}>
        <Text style={styles.titleText}>最近の記事</Text>
      </View>
      <View style={styles.body}>
        {posts.slice(0, 12).map(post => (
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
