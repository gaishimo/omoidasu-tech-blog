import Image from "next/image"
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"

type Props = {
  src: string
  imageSize: { width: number; height: number }
  withBorder?: boolean
  alt?: string
  style?: StyleProp<ViewStyle>
}

export function NextImageWrapper(props: Props) {
  return (
    <View
      style={[
        {
          marginBottom: 40,
          maxWidth: props.imageSize.width,
        },
        props.withBorder && styles.containerWithBorder,
        props.style,
      ]}
    >
      <Image
        {...props.imageSize}
        alt={props.alt}
        style={{ objectFit: "contain" }}
        src={props.src}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  containerWithBorder: {
    borderWidth: 1,
    borderColor: "rgb(220, 220, 220)",
    borderRadius: 8,
    padding: 8,
  },
})
