import { StyleSheet, Text, View } from "react-native"

type Props = {
  width: number
  height: number
  bgColor: string
}

export function LoadingRect(props: Props) {
  console.log("LoadingRect render()")
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
      <Text style={styles.text}>Loading Skia..</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  rect: { borderRadius: 16, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 16, color: "white" },
})