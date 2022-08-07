import {
  Blur,
  Canvas,
  Group,
  LinearGradient,
  Path,
  runTiming,
  useTouchHandler,
  useValue,
  vec,
} from "@shopify/react-native-skia"
import { Text, View } from "react-native"

type Props = {
  showGuideText?: boolean
}

export default function SkiaStar(props: Props) {
  const value = useValue(0)

  const onTouch = useTouchHandler({
    onStart: () => {
      runTiming(value, 10, {
        duration: 600,
      })
    },
    onEnd: () => {
      runTiming(value, 0, {
        duration: 1000,
      })
    },
  })

  return (
    <View>
      <Canvas style={{ height: 300 }} onTouch={onTouch}>
        <Group>
          <Path
            strokeCap={"round"}
            strokeWidth={10}
            style="fill"
            path="M 128 0 L 168 80 L 256 93 L 192 155 L 207 244 L 128 202 L 49 244 L 64 155 L 0 93 L 88 80 L 128 0 Z"
          >
            <Blur blur={value} />
            <LinearGradient
              start={vec(0, 0)}
              end={vec(280, 280)}
              colors={["#30cfd0", "#330867"]}
            />
          </Path>
        </Group>
      </Canvas>
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
