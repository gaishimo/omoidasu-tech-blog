import React, { useState, useEffect } from "react"
import { css } from "@emotion/react"
import { Parallax } from "react-scroll-parallax"
import Shape from "./Shape"
import { getWindowWidth } from "../../utils/domUtils"

type Props = {
  color: string
  size: number
  opacity: number
  position: { x: number; y: number }
  angle: number
  windowSize: { width: number; height: number }
}

const MOVE_TIMES = [2000]

const styles = {
  container: css({
    position: "absolute",
  }),
}

type MovingData = {
  centerPosition: { x: number; y: number }
  angle: number
}

export default function MovingShape(props: Props) {
  const [centerPosition, setCenterPosition] = useState<{
    x: number
    y: number
  }>(props.position)

  const windowWidth = getWindowWidth()

  return (
    <div
      style={{
        position: "absolute",
        left: centerPosition.x,
        top: centerPosition.y,
      }}
    >
      <Parallax
        x={windowWidth < 500 ? ["0px", "0px"] : ["-5px", "5px"]}
        y={["-300px", "100px"]}
      >
        <Shape {...props} />
      </Parallax>
    </div>
  )
}
