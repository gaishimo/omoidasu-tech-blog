import { format } from "date-fns"
import { StyleSheet, Text, View } from "react-native"
import { Colors } from "../libs/colors"
import { ShapeSymbol } from "./atoms/ShapeSymbol"
import { Tag } from "./atoms/Tag"

type Props = {
  title: string
  color1: string
  color2: string
  tagNames: string[]
  createdAt: Date
}

export function PostHeader(props: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.creationTime}>
        <Text style={styles.creationTimeText}>
          {format(props.createdAt, "yyyy-MM-dd")}
        </Text>
      </View>
      <View accessibilityRole="header" style={styles.header}>
        <View style={styles.symbol}>
          <ShapeSymbol color1={props.color1} color2={props.color2} />
        </View>
        <Text style={styles.titleText}>{props.title}</Text>
      </View>
      <View style={styles.tags}>
        {props.tagNames.map((tagName, i) => (
          <View
            key={i}
            style={styles.tag}
            accessibilityRole="link"
            href={`/tags/${tagName}`}
          >
            <Tag name={tagName} />
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { marginBottom: 24, paddingTop: 48 },
  creationTime: { marginBottom: 16 },
  creationTimeText: {
    color: Colors.textColor2,
    fontSize: 13,
  },
  header: { marginBottom: 16, flexDirection: "row", alignItems: "center" },
  symbol: { marginRight: 12 },
  titleText: { fontWeight: "bold", fontSize: 24, letterSpacing: 0.6 },
  tags: { marginLeft: 12, flexDirection: "row", alignItems: "center" },
  tag: { marginRight: 16 },
})
