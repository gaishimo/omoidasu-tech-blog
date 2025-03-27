import {
  Skia,
  drawAsImage,
  Group,
  Rect,
  Canvas,
  Atlas,
  rect,
} from "@shopify/react-native-skia"

const size = { width: 25, height: 11.25 }
const strokeWidth = 2
const imageSize = {
  width: size.width + strokeWidth,
  height: size.height + strokeWidth,
}
const image = drawAsImage(
  <Group>
    <Rect
      rect={rect(strokeWidth / 2, strokeWidth / 2, size.width, size.height)}
      color="cyan"
    />
    <Rect
      rect={rect(strokeWidth / 2, strokeWidth / 2, size.width, size.height)}
      color="blue"
      style="stroke"
      strokeWidth={strokeWidth}
    />
  </Group>,
  imageSize,
)

export default function AtlasHelloWorldWithScale() {
  const numberOfBoxes = 200
  const pos = { x: 128, y: 128 }
  const width = 256
  const scale = 0.7
  const sprites = new Array(numberOfBoxes)
    .fill(0)
    .map(() => rect(0, 0, imageSize.width, imageSize.height))
  const transforms = new Array(numberOfBoxes).fill(0).map((_, i) => {
    const tx = 5 + ((i * size.width) % width)
    const ty = 25 + Math.floor(i / (width / size.width)) * size.width
    const r = Math.atan2(pos.y - ty, pos.x - tx)
    const scos = Math.cos(r) * scale
    const ssin = Math.sin(r) * scale
    return Skia.RSXform(scos, ssin, tx, ty)
  })

  return (
    <Canvas style={{ width: 256, height: 256 }}>
      <Atlas image={image} sprites={sprites} transforms={transforms} />
    </Canvas>
  )
}
