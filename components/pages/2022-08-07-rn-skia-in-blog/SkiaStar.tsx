import {
  Blur,
  Canvas,
  Group,
  LinearGradient,
  Path,
  vec,
} from "@shopify/react-native-skia"
import { Text, View } from "react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import { useSharedValue, withTiming } from "react-native-reanimated"

type Props = {
  showGuideText?: boolean
}

export default function SkiaStar(props: Props) {
  const progress = useSharedValue(0)

  const gesture = Gesture.LongPress()
    .onStart(() => {
      progress.value = withTiming(10, { duration: 600 })
    })
    .onEnd(() => {
      progress.value = withTiming(0, { duration: 1000 })
    })

  return (
    <View>
      <GestureDetector gesture={gesture}>
        <Canvas style={{ height: 300 }}>
          <Group>
            <Path
              strokeCap={"round"}
              strokeWidth={10}
              style="fill"
              path="M 128 0 L 168 80 L 256 93 L 192 155 L 207 244 L 128 202 L 49 244 L 64 155 L 0 93 L 88 80 L 128 0 Z"
            >
              <Blur blur={progress} />
              <LinearGradient
                start={vec(0, 0)}
                end={vec(280, 280)}
                colors={["#30cfd0", "#330867"]}
              />
            </Path>
          </Group>
        </Canvas>
      </GestureDetector>

      {props.showGuideText && (
        <View style={{ top: -32 }}>
          <Text style={{ fontSize: 12, opacity: 0.5 }}>
            react-native-skiaのサンプル。長押しするとぼかし効果が入ります。
          </Text>
        </View>
      )}
    </View>
  )
}
