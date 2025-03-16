import {
  Canvas,
  Circle,
  DashPathEffect,
  Path,
} from "@shopify/react-native-skia"
import { useCallback, useMemo, useState } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"

const canvasHeight = 400

export default function TrigonometricTool() {
  const [toolWidth, setToolWidth] = useState(340)
  const center = { x: toolWidth / 2, y: 200 }

  const [radius, setRadius] = useState<number | null>(100)
  const [degree, setDegree] = useState<number | null>(60)

  const actualRadius = radius * 1.3

  const lineEndPos = useMemo(() => {
    const sin = actualRadius * Math.sin((degree * Math.PI) / 180)
    const cos = actualRadius * Math.cos((degree * Math.PI) / 180)
    return { x: center.x + cos, y: center.y - sin }
  }, [degree, actualRadius, center])

  const { sin, cos } = useMemo(() => {
    const sin = radius * Math.sin((degree * Math.PI) / 180)
    const cos = actualRadius * Math.cos((degree * Math.PI) / 180)
    return { sin: sin.toFixed(3), cos: cos.toFixed(3) }
  }, [radius, degree])

  const xyLineProps = {
    color: "rgb(150, 150, 150)",
    style: "stroke" as const,
    strokeWidth: 0.5,
  }
  const supportLineProps = {
    color: "lightblue",
    style: "stroke" as const,
    strokeWidth: 1.5,
  }

  return (
    <View style={{ width: toolWidth }}>
      <Canvas style={styles.canvas}>
        {/* X, Y軸 */}

        <Path
          {...xyLineProps}
          path={`M 0 ${center.y} L ${toolWidth} ${center.y}`}
        >
          <DashPathEffect intervals={[3, 3]} />
        </Path>
        <Path
          {...xyLineProps}
          path={`M ${toolWidth / 2} 0 L ${toolWidth / 2} ${canvasHeight}`}
        >
          <DashPathEffect intervals={[3, 3]} />
        </Path>

        {/* 中心から伸びる線 (角度により変わる) */}
        <Path
          color="lightblue"
          style="stroke"
          strokeWidth={2}
          path={`M ${center.x} ${center.y} L ${lineEndPos.x} ${lineEndPos.y}`}
        />

        {/* sinとcosの補助線 */}
        <Path
          {...supportLineProps}
          path={`M ${lineEndPos.x} ${lineEndPos.y} ${lineEndPos.x} ${center.y}`}
        />
        <Path
          {...supportLineProps}
          path={`M ${lineEndPos.x} ${lineEndPos.y} ${center.x} ${lineEndPos.y}`}
        />

        <Circle
          cx={center.x}
          cy={center.y}
          r={actualRadius}
          style="stroke"
          strokeWidth={2}
          color="lightblue"
        />
      </Canvas>
      <View style={styles.infoPanel}>
        <View style={styles.infoRow}>
          <Text>sinθ:</Text>
          <Text>{sin}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text>cosθ:</Text>
          <Text>{cos}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text>ラジアン:</Text>
          <Text>
            {((degree * Math.PI) / 180).toFixed(3)} (
            {((degree * Math.PI) / 180 / Math.PI).toFixed(3)}π)
          </Text>
        </View>
      </View>
      <View style={styles.settings}>
        <View style={styles.settingRow}>
          <Text>半径(1 - 100):</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={radius?.toString() || ""}
              onChangeText={useCallback(s => {
                if (s.trim() === "") {
                  setRadius(null)
                  return
                }
                try {
                  const i = parseInt(s, 10)
                  if (i > 100 || i < 1) return
                  setRadius(i)
                } catch (e) {}
              }, [])}
            />
            <Text style={{ marginLeft: 4, width: 14 }}></Text>
          </View>
        </View>
        <View style={styles.settingRow}>
          <Text>角度(0 - 360):</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={degree?.toString() || ""}
              onChangeText={useCallback(s => {
                if (s.trim() === "") {
                  setDegree(null)
                  return
                }
                try {
                  const i = parseInt(s, 10)
                  if (i > 360 || i < 1) return
                  setDegree(i)
                } catch (e) {}
              }, [])}
            />
            <Text style={{ marginLeft: 4 }}>度</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  canvas: { height: canvasHeight },
  infoPanel: {
    marginTop: 24,
    marginHorizontal: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "lightgray",
    padding: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  settings: { marginTop: 24, paddingHorizontal: 16 },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  textInput: {
    width: 80,
    height: 40,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 4,
    textAlign: "right",
    paddingHorizontal: 8,
  },
})
