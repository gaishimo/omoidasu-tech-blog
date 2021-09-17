import { StyleSheet, Text, View } from "react-native"
import { Colors } from "../../libs/colors"

type Props = {
  name: string
}

export function Tag(props: Props) {
  return (
    <View style={styles.tag}>
      <Text style={styles.text}>{props.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.lightGray1,
    borderRadius: 16,
    backgroundColor: "rgba(250, 250, 250, 0.5)",
  },
  text: { color: Colors.textColor3 },
})
