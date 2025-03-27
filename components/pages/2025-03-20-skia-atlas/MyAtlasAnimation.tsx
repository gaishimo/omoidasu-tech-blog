import {
  Skia,
  drawAsImage,
  Group,
  Rect,
  Canvas,
  Atlas,
  rect,
  useTexture,
  useRSXformBuffer,
  Path,
  LinearGradient,
  vec,
  Circle,
  Blur,
  BlurMask,
  Paint,
  rrect,
  RoundedRect,
} from "@shopify/react-native-skia"
import { useSharedValue, useDerivedValue, clamp } from "react-native-reanimated"
import { GestureDetector, Gesture } from "react-native-gesture-handler"

function BlurredCircle(props: { color: string; size: number }) {
  return (
    <Group
      clip={rrect(
        { x: 0, y: 0, width: props.size, height: props.size },
        props.size / 2,
        props.size / 2,
      )}
    >
      {[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7].map((v, index) => (
        <Circle
          key={index}
          cx={props.size / 2}
          cy={props.size / 2}
          r={(props.size / 2) * (1 - v)}
          color={props.color}
          opacity={0.3}
        />
      ))}
      <Blur blur={10} />
    </Group>
  )
}

const sizes = [26, 40, 36, 32]

const config = {
  numberOfShapes: 50,
  canvasSize: 360,
  maxPushDistance: 50,
  pushRadius: 100,
  positionAdjustment: 6,
} as const

export default function MyAtlasAnimation() {
  const touchPos = useSharedValue<{ x: number; y: number } | null>(null)
  const gesture = Gesture.Pan()
    .onStart(e => {
      if (touchPos.value === null) {
        touchPos.value = { x: e.x, y: e.y }
      }
    })
    .onChange(e => {
      if (touchPos.value !== null) {
        touchPos.value = { x: e.x, y: e.y }
      }
    })
    .onEnd(() => {
      touchPos.value = null
    })

  const textures = [
    useTexture(<BlurredCircle color="#FF4276" size={sizes[0]} />, {
      width: sizes[0],
      height: sizes[0],
    }),
    useTexture(<BlurredCircle color="#FFDE43" size={sizes[1]} />, {
      width: sizes[1],
      height: sizes[1],
    }),
    useTexture(<BlurredCircle color="#5CE9D9" size={sizes[2]} />, {
      width: sizes[2],
      height: sizes[2],
    }),
    useTexture(<BlurredCircle color="#A258B1" size={sizes[3]} />, {
      width: sizes[3],
      height: sizes[3],
    }),
  ]

  const sprites = [
    new Array(config.numberOfShapes)
      .fill(0)
      .map(() => rect(0, 0, sizes[0], sizes[0])),
    new Array(config.numberOfShapes)
      .fill(0)
      .map(() => rect(0, 0, sizes[1], sizes[1])),
    new Array(config.numberOfShapes)
      .fill(0)
      .map(() => rect(0, 0, sizes[2], sizes[2])),
    new Array(config.numberOfShapes)
      .fill(0)
      .map(() => rect(0, 0, sizes[3], sizes[3])),
  ]

  const createInitialPositions = (size: number) => {
    return useSharedValue(
      new Array(config.numberOfShapes).fill(0).map(() => {
        const radius = size / 2
        return {
          x: Math.random() * (config.canvasSize - radius * 2),
          y: Math.random() * (config.canvasSize - radius * 2),
        }
      }),
    )
  }

  const initialPositions = sizes.map(createInitialPositions)

  const createTransform = (
    positions: {
      value: Array<{ x: number; y: number }>
    },
    size: number,
  ) => {
    return useRSXformBuffer(config.numberOfShapes, (val, i) => {
      "worklet"
      const tx = positions.value[i].x
      const ty = positions.value[i].y
      if (touchPos.value === null) {
        val.set(1, 0, tx, ty)
        return
      }
      const dx = tx - touchPos.value.x
      const dy = ty - touchPos.value.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      const pushStrength = Math.max(0, 1 - distance / config.pushRadius)
      const angle = Math.atan2(dy, dx)
      const pushDistance = pushStrength * config.maxPushDistance
      const newX = tx + Math.cos(angle) * pushDistance
      const newY = ty + Math.sin(angle) * pushDistance

      val.set(
        Math.cos(angle),
        Math.sin(angle),
        clamp(
          newX,
          size + config.positionAdjustment,
          config.canvasSize - size - config.positionAdjustment,
        ),
        clamp(
          newY,
          size + config.positionAdjustment,
          config.canvasSize - size - config.positionAdjustment,
        ),
      )
    })
  }

  const transforms = initialPositions.map((positions, i) =>
    createTransform(positions, sizes[i]),
  )

  return (
    <GestureDetector gesture={gesture}>
      <Canvas
        style={{
          width: config.canvasSize,
          height: config.canvasSize,
        }}
      >
        <Group>
          <RoundedRect
            x={0}
            y={0}
            width={config.canvasSize}
            height={config.canvasSize}
            r={16}
            color="rgb(250, 250, 250)"
            opacity={0.5}
          />
        </Group>
        {textures.map((texture, i) => (
          <Atlas
            key={i}
            image={texture}
            sprites={sprites[i]}
            transforms={transforms[i]}
          />
        ))}
      </Canvas>
    </GestureDetector>
  )
}
