import * as React from "react"
import { css } from "@emotion/react"
import { range, random } from "../utils/numUtils"
import { getScrollHeight, getWindowWidth } from "../utils/domUtils"
import MovingShape from "./atoms/MovingShape"

type Props = {}

const styles = {
  container: css({
    width: "100%",
    height: getScrollHeight(),
    position: "relative",
  }),
  overlay: css({
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 0,
  }),
}

type ShapeData = {
  size: number
  color: string
  position: { x: number; y: number }
  angle: number
}

const SIZES = [
  [80, 60], // layer1
  [60, 48], // layer2
  [30, 24], // layer3
]

const COLORS = ["#FF5031", "#FFE641", "#FF83BA", "#6BD63E", "#00D5FF"]

/**
 * 面積に応じて表示するシェイプの数を決める
 */
function calcShapeNums(windowWidth: number, windowHeight: number): number[] {
  const area = windowWidth * windowHeight
  return [
    Math.floor(area / 1200000),
    Math.floor(area / 600000),
    Math.floor(area / 400000),
  ]
}

function calcShapeSize(windowWidth: number, layer: number) {
  const largeWindow = windowWidth >= 600
  return SIZES[layer][largeWindow ? 0 : 1]
}

function getRandomPosition(
  windowWidth: number,
  windowHeight: number,
  size: number,
) {
  return {
    x: random(size, windowWidth - size * 2),
    y: random(size, windowHeight - size),
  }
}

function getWindowSize() {
  return {
    width: getWindowWidth(),
    height: getScrollHeight(),
  }
}

export default function BackgroundShapes(props: Props) {
  const [shapeGroups, setShapeGroups] = React.useState<ShapeData[][]>([
    [],
    [],
    [],
  ])

  function generateShapes() {
    const windowSize = getWindowSize()
    const shapeNums = calcShapeNums(windowSize.width, windowSize.height)
    const shapeGroups = shapeNums.map(
      (shapeNumOnLayer: number, layer: number) => {
        const size = calcShapeSize(windowSize.width, layer)
        return range(shapeNumOnLayer).map(n => ({
          size,
          color: COLORS[random(0, 4)],
          position: getRandomPosition(
            windowSize.width,
            windowSize.height,
            size,
          ),
          angle: random(0, 359),
        }))
      },
    )
    setShapeGroups(shapeGroups)
  }

  React.useEffect(() => {
    window.addEventListener("resize", generateShapes)

    generateShapes()

    return () => {
      window.removeEventListener("resize", generateShapes)
    }
  }, [])

  const windowSize = getWindowSize()

  return (
    <div css={styles.container}>
      {/* layer3 */}
      {shapeGroups[2].map((shape, i) => (
        <MovingShape
          key={`layer3-${i}`}
          {...shape}
          opacity={0.05}
          windowSize={windowSize}
        />
      ))}
      {/* layer2 */}
      {shapeGroups[1].map((shape, i) => (
        <MovingShape
          key={`layer3-${i}`}
          {...shape}
          opacity={0.07}
          windowSize={windowSize}
        />
      ))}
      {/* layer1 */}
      {shapeGroups[0].map((shape, i) => (
        <MovingShape
          key={`layer3-${i}`}
          {...shape}
          opacity={0.12}
          windowSize={windowSize}
        />
      ))}
      <div css={styles.overlay} />
    </div>
  )
}
