import { format } from "date-fns"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { Colors } from "../libs/colors"
import { Post } from "../typings/Post"
import { ShapeSymbol } from "./atoms/ShapeSymbol"
import { Tag } from "./atoms/Tag"

type Props = {
  post: Post
}

export function PostItem(props: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.symbol}>
        <ShapeSymbol color1={props.post.color1} color2={props.post.color2} />
      </View>
      <View style={styles.post}>
        <View
          style={styles.title}
          accessibilityRole="link"
          href={`/posts/${props.post.id}`}
        >
          <Text style={styles.titleText}>{props.post.title}</Text>
        </View>
        <View style={styles.meta}>
          <Text style={styles.creationTimeText}>
            {format(new Date(props.post.createdAt), "yyyy-MM-dd")}
          </Text>
          <ScrollView
            horizontal
            style={styles.tagsScroll}
            contentContainerStyle={styles.tagsContainer}
          >
            {props.post.tagNames.map((tagName, i) => (
              <View
                key={i}
                style={styles.tag}
                accessibilityRole="link"
                href={`/tags/${tagName}`}
              >
                <Tag name={tagName} />
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.desc}>
          <Text style={styles.descText}>{props.post.description}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "flex-start" },
  symbol: { marginRight: 16 },
  post: { flex: 1 },
  title: {},
  titleText: { fontWeight: "bold", fontSize: 18 },
  meta: { marginTop: 8, flexDirection: "row" },
  creationTimeText: { marginTop: 4, color: Colors.textColor3, fontSize: 13 },
  tagsScroll: {
    flex: 1,
    marginLeft: 12,
  },
  tagsContainer: {
    paddingBottom: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  tag: { marginRight: 8, fontSize: 12 },
  desc: { marginTop: 4 },
  descText: { color: Colors.textColor2, flexWrap: "wrap", fontSize: 13 },
})
