import { View } from "react-native"
import Shape from "./Shape"

type Props = {
  color1: string
  color2: string
  baseSize?: number
}

export function ShapeSymbol(props: Props) {
  return (
    <View style={styles.symbol}>
      <Shape
        color={props.color1}
        size={props.baseSize || 30}
        opacity={0.5}
        style={styles.shape1}
      />
      <Shape
        color={props.color2}
        size={props.baseSize ? props.baseSize * 0.7 : 22}
        opacity={0.5}
        style={[
          styles.shape2,
          props.baseSize && {
            top: props.baseSize * 0.5,
            left: props.baseSize * 0.5,
          },
        ]}
      />
    </View>
  )
}

const styles = {
  symbol: {},
  shape1: {},
  shape2: {
    position: "absolute" as const,
    top: 12,
    left: 12,
  },
}
