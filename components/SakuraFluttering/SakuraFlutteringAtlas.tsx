import {
  Atlas,
  Canvas,
  Group,
  rect,
  useRSXformBuffer,
  useTexture,
} from "@shopify/react-native-skia"
import { SakuraPetal } from "./SakuraPetal"
import {
  useSharedValue,
  withTiming,
  withRepeat,
  Easing,
} from "react-native-reanimated"
import { useEffect } from "react"
import { useWindowDimensions } from "react-native"

const elementSize = { width: 40, height: 60 }

export default function SakuraFluttering() {
  const window = useWindowDimensions()
  const canvasSize = { width: window.width, height: window.height + 40 }
  const numOfSprites = window.width < 500 ? 30 : 70
  /**
   * アニメーション進行
   * 0から100までの値で変化する
   * 0から100まで行くと丁度canvasの縦サイズ分下に移動する
   */
  const progress = useSharedValue(0)

  // 揺れるアニメーションのための値
  const swayProgress = useSharedValue(0)

  const texture = useTexture(
    <Group>
      {Array.from({ length: 3 }).map((_, i) => (
        <SakuraPetal
          key={i}
          colorId={(i % 3) as 0 | 1 | 2}
          size={elementSize}
          position={{ x: elementSize.width * i, y: 0 }}
          opacity={window.width < 500 ? 0.5 : 0.7}
        />
      ))}
    </Group>,
    { width: elementSize.width * 3, height: elementSize.height },
  )

  const sprites = Array.from({ length: numOfSprites }).map((_, i) =>
    rect(elementSize.width * (i % 3), 0, elementSize.width, elementSize.height),
  )

  // グリッド状にスプライトを配置（２次元ノイズ）
  const initialPositions = useSharedValue(
    Array.from({ length: numOfSprites }).map(() => {
      return {
        x: Math.random() * canvasSize.width,
        y: Math.random() * canvasSize.height,
        scale: 0.2 + Math.random() * 0.3, // 0.2 から 0.6 の間のランダムな値
        rotation: Math.random() * Math.PI * 2, // 0から2πの間でランダムな角度（ラジアン）
        swayAmplitude: 15 + Math.random() * 70, // 揺れの振幅（3〜25の間に増加）
        swayFrequency: 0.6 + Math.random() * 0.7, // 揺れの周波数（0.3〜1の間に調整）
        fallSpeed: 0.8 + Math.random() * 1, // 落下速度の個別調整（0.2〜1.2の間に拡大）
        initialPhase: Math.random() * Math.PI * 2, // 初期位相（0〜2πの間）
        rotationSpeed:
          (Math.random() > 0.5 ? 1 : -1) * (0.2 + Math.random() * 0.3), // 回転速度（正負の方向に0.2〜0.5の間）- 速度を下げる
        flutterAmplitude: 0,
        flutterFrequency: 0,
        // Y軸回転のための初期位相と速度を追加
        rotateYPhase: Math.random() * Math.PI * 2,
        rotateYSpeed:
          (Math.random() > 0.5 ? 1 : -1) * (0.3 + Math.random() * 0.5), // 回転速度を上げる
      }
    }),
  )

  console.log(initialPositions.value.slice(0, 5))

  // 回転アニメーションのための値を追加
  const rotationProgress = useSharedValue(0)

  // 空気抵抗による震えのためのアニメーション値
  const flutterProgress = useSharedValue(0)

  // Y軸回転のためのアニメーション値を追加
  const rotateYProgress = useSharedValue(0)

  useEffect(() => {
    // 落下アニメーション - かなり長い時間のアニメーションにして切れ目の頻度を減らす
    progress.value = 0 // 初期値をリセット
    progress.value = withRepeat(
      withTiming(100, {
        duration: 1000 * 60 * 5, // 5分間の非常に長いアニメーション
        easing: Easing.linear, // linear easingで一定の速度を保つ
      }),
      -1, // 無限繰り返し
      false, // yoyo効果なし（一定方向に移動）
    )

    // 揺れるアニメーション - 繰り返しの境界でのジャンプを防止
    swayProgress.value = 0 // 初期値をリセット
    swayProgress.value = withRepeat(
      withTiming(Math.PI * 2, {
        duration: 20000, // 20秒間の長いアニメーション
        easing: Easing.linear, // linear easingで一定の速度を保つ
      }),
      -1, // 無限繰り返し
      true, // yoyo効果あり - 往復するので境界でのジャンプがなくなる
    )

    // 回転アニメーション - 無限に回転させる
    rotationProgress.value = 0 // 初期値をリセット
    rotationProgress.value = withRepeat(
      withTiming(Math.PI * 2, {
        duration: 25000, // 25秒で一周 - より遅く
        easing: Easing.linear, // linear easingで一定の速度を保つ
      }),
      -1, // 無限繰り返し
      false, // yoyo効果なし - 常に同じ方向に回転
    )

    // 空気抵抗による震えのアニメーション
    flutterProgress.value = 0 // 初期値をリセット
    flutterProgress.value = withRepeat(
      withTiming(Math.PI * 2, {
        duration: 3000, // 3秒間の少し長めのアニメーション（より緩やかな震え）
        easing: Easing.linear,
      }),
      -1,
      false,
    )

    // Y軸回転のアニメーション - 無限に回転
    rotateYProgress.value = 0
    rotateYProgress.value = withRepeat(
      withTiming(Math.PI * 2, {
        duration: 8000, // 8秒で一周（回転速度を上げる）
        easing: Easing.linear,
      }),
      -1,
      false,
    )
  }, [])

  // 落下速度を調整（長いアニメーション時間に合わせて調整）
  const fallSpeedMultiplier = 15 // 元の速度に対する倍率（少し下げて速すぎる花びらを抑制）

  const transforms = useRSXformBuffer(numOfSprites, (val, i) => {
    "worklet"

    const {
      x,
      y,
      scale,
      rotation,
      swayAmplitude,
      swayFrequency,
      fallSpeed,
      initialPhase,
      rotationSpeed,
      flutterAmplitude,
      flutterFrequency,
      rotateYPhase,
      rotateYSpeed,
    } = initialPositions.value[i]

    // progressの値に応じてY座標を下に移動させる
    // 循環するようにモジュロ演算を使用してラップアラウンドをスムーズに
    const fallOffset =
      (progress.value / 100) *
      canvasSize.height *
      fallSpeed *
      fallSpeedMultiplier

    // Y座標の計算方法を変更して、リピート時の不連続性を解消
    // 初期Y座標を考慮した循環でスムーズな落下を実現
    const currentY = (y + fallOffset) % canvasSize.height

    // 左右の揺れを計算（初期位相を加えて各ペタルの揺れのタイミングをずらす）
    // 循環するsin関数なので境界でのジャンプは発生しない
    const swayOffset =
      Math.sin(swayProgress.value * swayFrequency + initialPhase) *
      swayAmplitude

    // 空気抵抗による高周波の震え（フラッター）を追加
    const flutterOffset =
      Math.sin(flutterProgress.value * flutterFrequency + initialPhase) *
      flutterAmplitude *
      (fallSpeed * 0.5) // 落下速度に比例して震えの大きさを調整

    // 揺れと震えを組み合わせる
    const currentX = x + swayOffset + flutterOffset

    // 連続的に回転させる
    // グローバルな回転進行状況 × 個別の回転速度
    const continuousRotation = rotationProgress.value * rotationSpeed

    // 揺れと震えに応じた回転の微調整も加える
    const swayRotationOffset =
      Math.sin(swayProgress.value * 0.5 + initialPhase) * 0.2

    // 空気抵抗による高周波の回転震えを追加
    const flutterRotationOffset =
      Math.sin(flutterProgress.value * flutterFrequency * 0.7 + initialPhase) *
      (0.01 + fallSpeed * 0.02) // 回転の震えも大幅に小さく

    // 初期回転角度 + 連続的な回転 + 揺れによる微調整 + 震えによる微調整
    const currentRotation =
      rotation + continuousRotation + swayRotationOffset + flutterRotationOffset
    const sn = Math.sin(currentRotation)
    const cs = Math.cos(currentRotation)

    val.set(scale * cs, scale * sn, currentX, currentY)
  })

  return (
    <Canvas
      style={{
        bottom: 40,
        borderWidth: 1,
        borderColor: "rgb(255, 230, 245)",
        ...canvasSize,
      }}
    >
      <Atlas image={texture} sprites={sprites} transforms={transforms} />
    </Canvas>
  )
}
