import {
  Canvas,
  LinearGradient,
  RoundedRect,
  vec,
} from "@shopify/react-native-skia"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default function LinearGradientButton() {
  return (
    <TouchableOpacity>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: 256,
          height: 48,
        }}
      >
        <Canvas style={StyleSheet.absoluteFill}>
          <RoundedRect x={0} y={0} width={256} height={48} r={8}>
            <LinearGradient
              start={vec(0, 10)}
              end={vec(256, 38)}
              colors={["#10408E", "#11A4FF"]}
            />
          </RoundedRect>
        </Canvas>
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "500",
              fontSize: 16,
              letterSpacing: 2,
            }}
          >
            SIGN IN
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
