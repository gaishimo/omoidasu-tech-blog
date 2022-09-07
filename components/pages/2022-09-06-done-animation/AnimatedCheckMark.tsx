import {
  Canvas,
  Easing,
  Path,
  runTiming,
  Skia,
  useComputedValue,
  useValue,
} from "@shopify/react-native-skia"
import { useCallback, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { wait } from "../../../utils/wait"

const radius = 40
const canvasSize = { width: 200, height: 200 }
const center = { x: canvasSize.width / 2, y: canvasSize.height / 2 }

const checkMarkPoints = [
  { x: center.x - radius * 0.35, y: center.y + radius * 0.1 },
  { x: center.x - radius * 0.05, y: center.y + radius * 0.45 },
  { x: center.x + radius * 0.4, y: center.y - radius * 0.35 },
]

function getVector(p1: { x: number; y: number }, p2: { x: number; y: number }) {
  return {
    x: p2.x - p1.x,
    y: p2.y - p1.y,
  }
}

export default function AnimatedCheckMark() {
  const [animating, setAnimating] = useState(false)
  const circleProgress = useValue(0)
  const done = useValue(false)
  const checkMark1Progress = useValue(0)
  const checkMark2Progress = useValue(0)

  const activeArcPath = useComputedValue(() => {
    const path = Skia.Path.Make()
    const arcRect = {
      x: center.x - radius,
      y: center.y - radius,
      width: radius * 2,
      height: radius * 2,
    }
    if (done.current) {
      path.addArc(arcRect, 0, 360)
    } else {
      path.addArc(arcRect, circleProgress.current * 360, 300)
    }

    return path
  }, [circleProgress, done])

  const checkMarkPath1 = useComputedValue(() => {
    const path = Skia.Path.Make()
    if (checkMark1Progress.current === 0) {
      return path
    }
    path.moveTo(checkMarkPoints[0].x, checkMarkPoints[0].y)

    const vector = getVector(checkMarkPoints[0], checkMarkPoints[1])
    const vectorToCurrent = {
      x: vector.x * checkMark1Progress.current,
      y: vector.y * checkMark1Progress.current,
    }
    path.rLineTo(vectorToCurrent.x, vectorToCurrent.y)
    return path
  }, [checkMark1Progress])

  const checkMarkPath2 = useComputedValue(() => {
    const path = Skia.Path.Make()
    if (checkMark2Progress.current === 0) {
      return path
    }
    path.moveTo(checkMarkPoints[1].x, checkMarkPoints[1].y)
    const vector = getVector(checkMarkPoints[1], checkMarkPoints[2])
    const vectorToCurrent = {
      x: vector.x * checkMark2Progress.current,
      y: vector.y * checkMark2Progress.current,
    }
    path.rLineTo(vectorToCurrent.x, vectorToCurrent.y)
    return path
  }, [checkMark2Progress])

  const runAnimation = useCallback(async () => {
    setAnimating(true)
    runTiming(circleProgress, { loop: true, yoyo: false }, { duration: 1000 })
    await wait(3000)
    done.current = true
    circleProgress.animation.cancel()
    await wait(500)
    runTiming(
      checkMark1Progress,
      1,
      { duration: 300, easing: Easing.out(Easing.sin) },
      async () => {
        await wait(100)
        runTiming(
          checkMark2Progress,
          1,
          {
            duration: 400,
            easing: Easing.out(Easing.sin),
          },
          async () => {
            await wait(1500)
            circleProgress.current = 0
            checkMark1Progress.current = 0
            checkMark2Progress.current = 0
            done.current = false
            setAnimating(false)
          },
        )
      },
    )
  }, [checkMark1Progress, checkMark2Progress])

  return (
    <View style={[styles.container, canvasSize]}>
      <Canvas style={[canvasSize]}>
        <Path
          path={activeArcPath}
          color="#0091FF"
          style="stroke"
          strokeWidth={6}
          strokeCap="round"
        />
        <Path
          path={checkMarkPath1}
          color="#0091FF"
          style="stroke"
          strokeWidth={6}
          strokeCap="round"
          strokeJoin="round"
        />
        <Path
          path={checkMarkPath2}
          color="#0091FF"
          style="stroke"
          strokeWidth={6}
          strokeCap="round"
          strokeJoin="round"
        />
      </Canvas>
      {!animating && (
        <TouchableOpacity
          onPress={runAnimation}
          style={[StyleSheet.absoluteFill, styles.overlay]}
        >
          <Text style={styles.startText}>START</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgb(240, 240, 240)",
  },
  overlay: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(250, 250, 250)",
    borderRadius: 8,
  },
  startText: { color: "rgb(100, 180, 180)", fontSize: 18 },
})
