import { useMemo } from "react"
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native"
import { TagMap } from "../typings/TagMap"

const tagsMap = require("../_generated/tags.json") as TagMap

type Props = {
  style?: StyleProp<ViewStyle>
}

export function TagsPanel(props: Props) {
  const tags = useMemo(() => {
    return Object.entries(tagsMap)
      .map(([tag, data]) => ({
        id: tag,
        pages: data.pages,
      }))
      .sort((t1, t2) => {
        return t2.pages - t1.pages
      })
  }, [])

  return (
    <View style={[styles.panel, props.style]}>
      <View style={styles.header}>
        <Text style={styles.titleText}>カテゴリ</Text>
      </View>
      <View style={styles.body}>
        {tags.map(tag => (
          <View
            key={tag.id}
            accessibilityRole="link"
            href={`/tags/${tag.id}`}
            style={styles.item}
          >
            <Text style={styles.itemText}>
              {tag.id} ({tag.pages})
            </Text>
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
    paddingHorizontal: 12,
  },
  header: { paddingLeft: 8 },
  titleText: { fontSize: 12 },
  body: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  item: {
    marginHorizontal: 2,
    paddingVertical: 4,
    flexDirection: "row",
  },
  itemText: { marginLeft: 12, fontSize: 12, letterSpacing: -0.2 },
})
