import {
  Canvas,
  Group,
  LinearGradient,
  RoundedRect,
  useFont,
  vec,
} from "@shopify/react-native-skia"
import { useMemo, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { range } from "../../../../utils/arrayUtils"
import { Constants } from "./Constants"
import { Row } from "./Row"
import {
  useSharedValue,
  useDerivedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated"

const windowSize = { width: 320, height: 640 }

export default function AgletLikeAnimation() {
  const [paused, setPaused] = useState(true)
  const font = useFont(
    require("../../../../assets/fonts/AlfaSlabOne-Regular.ttf"),
    Constants.fontSize,
  )

  const numOfGroup = useMemo(() => {
    return (
      Math.floor((windowSize.width * 1.3) / Constants.messageGroupWidth) + 1
    )
  }, [windowSize])

  const numOfRow = useMemo(() => {
    return Math.floor(windowSize.height / Constants.rowHeight) + 2
  }, [])

  // Reanimatedを使用したアニメーション
  const progress = useSharedValue(0)

  // アニメーションの開始/停止を制御
  useMemo(() => {
    if (!paused) {
      progress.value = 0
      progress.value = withRepeat(
        withTiming(1, { duration: 5000 }),
        -1, // 無限ループ
        false, // yoyo効果なし
      )
    }
  }, [paused, progress])

  if (font == null) return null

  return (
    <View style={{ ...windowSize }}>
      <Canvas style={{ ...StyleSheet.absoluteFillObject, ...windowSize }}>
        <RoundedRect
          x={0}
          y={0}
          width={windowSize.width}
          height={windowSize.height}
          r={16}
        >
          <LinearGradient
            start={vec(0, windowSize.height * 0.4)}
            end={vec(windowSize.width * 1.4, windowSize.height / 0.6)}
            colors={["#A614FF", "#5D50FF"]}
          />
        </RoundedRect>
        {paused ? null : (
          <Group transform={[{ rotate: Math.PI / 12 }]} origin={{ x: 0, y: 0 }}>
            {range(0, numOfRow).map(i => (
              <Row
                {...{
                  key: i,
                  direction: i % 2 === 0 ? "left" : "right",
                  baseY: -Constants.rowHeight + i * Constants.rowHeight,
                  font,
                  numOfLogo: numOfGroup,
                  progress,
                }}
              />
            ))}
          </Group>
        )}
      </Canvas>
      <View style={[StyleSheet.absoluteFill]}>
        <TouchableOpacity
          style={[StyleSheet.absoluteFill, styles.cover]}
          onPress={() => setPaused(b => !b)}
        >
          <Text style={styles.startButtonText}>{paused ? "START" : ""}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cover: { justifyContent: "center", alignItems: "center" },
  startButtonText: {
    fontWeight: "bold",
    fontSize: 28,
    color: "white",
    letterSpacing: 4,
  },
})
