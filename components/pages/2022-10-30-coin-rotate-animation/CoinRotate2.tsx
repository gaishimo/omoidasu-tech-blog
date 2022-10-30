import { Slider } from "@miblanchard/react-native-slider"
import { useState } from "react"
import { Image, StyleSheet, Text, View } from "react-native"

export function CoinRotate2() {
  const [angle, setAngle] = useState(1)
  return (
    <View style={styles.container}>
      <View style={{ width: 120, height: 120, marginBottom: 24 }}>
        <Image
          source={{
            uri: "/posts/2022-10-30-coin-rotate-animation/coinHead.png",
          }}
          resizeMode="contain"
          style={[
            styles.image,
            {
              opacity: angle <= 90 || angle >= 270 ? 1 : 0,
              transform: [{ rotateY: `${angle}deg` }],
            },
          ]}
        />
        <Image
          source={{
            uri: "/posts/2022-10-30-coin-rotate-animation/coinTail.png",
          }}
          resizeMode="contain"
          style={[
            styles.image,
            {
              opacity: angle > 90 && angle < 270 ? 1 : 0,
              transform: [{ rotateY: `${angle - 180}deg` }],
            },
          ]}
        />
      </View>
      <View style={styles.slider}>
        <Slider
          value={angle}
          minimumValue={1}
          maximumValue={360}
          step={1}
          onValueChange={v => {
            setAngle(v as number)
          }}
        />
      </View>
      <Text style={styles.angleText}>{angle}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 160,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    position: "absolute",
    width: 120,
    height: 120,
  },
  slider: { width: 160, height: 40 },
  angleText: { marginTop: 0, fontSize: 16, color: "#FEE600" },
})
