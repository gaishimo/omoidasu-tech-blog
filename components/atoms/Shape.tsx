import * as React from "react"
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"

type Props = {
  color: string
  size: number
  opacity: number
  style?: StyleProp<ViewStyle>
}

export default function Shape(props: Props) {
  return (
    <View
      style={[
        styles.shape,
        {
          width: props.size,
          height: props.size,
          opacity: props.opacity,
          backgroundColor: props.color,
          borderRadius: props.size / 2,
        },
        props.style,
      ]}
    />
  )
}

const styles = StyleSheet.create({
  shape: {},
})
