import { Canvas, Path, Skia } from "@shopify/react-native-skia"
import { StyleSheet } from "react-native"
import { toRadian } from "../../../utils/mathUtils"

const canvasSize = { width: 280, height: 280 }
const radius = 80
const centerPos = { x: canvasSize.width / 2, y: canvasSize.height / 2 }

export default function StaticArc() {
  // const path = useMemo(() => {
  const path = Skia.Path.Make()
  // path.moveTo(centerPos.x, centerPos.y)

  const startDegree = 90
  const arcStartPos = {
    x: centerPos.x + Math.cos(toRadian(startDegree)) * radius,
    y: centerPos.y - Math.sin(toRadian(startDegree)) * radius,
  }

  // path.lineTo(arcStartPos.x, arcStartPos.y)
  const arcRect = {
    x: centerPos.x - radius,
    y: centerPos.y - radius,
    width: radius * 2,
    height: radius * 2,
  }
  path.addArc(arcRect, 0, 360)
  // path.lineTo(centerPos.x, centerPos.y).close()
  // }, [])

  return (
    <Canvas style={[styles.canvas, { ...canvasSize }]}>
      {/* <Circle
        cx={centerPos.x}
        cy={centerPos.y}
        r={radius}
        color="lightblue"
        style="stroke"
        strokeWidth={2}
      /> */}
      <Path path={path} color="lightblue" style="stroke" strokeWidth={2} />
    </Canvas>
  )
}

const styles = StyleSheet.create({
  canvas: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    borderColor: "rgb(220, 220, 220)",
  },
})
