import { StyleSheet, Text, View } from "react-native"

type Props = {
  width: number
  height: number
  bgColor: string
  textColor?: string
}

export function LoadingRect(props: Props) {
  return (
    <View
      style={[
        styles.rect,
        {
          width: props.width,
          height: props.height,
          backgroundColor: props.bgColor,
        },
      ]}
    >
      <Text
        style={[styles.text, props.textColor && { color: props.textColor }]}
      >
        Loading Skia..
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  rect: { borderRadius: 16, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 16, color: "white" },
})
