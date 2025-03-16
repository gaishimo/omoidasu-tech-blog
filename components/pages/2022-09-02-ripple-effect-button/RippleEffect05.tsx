import { Easing } from "react-native-reanimated"
import RippleEffect from "./RippleEffect"

/**
 * 波紋が拡がるアニメーション
 */
export default function RippleEffect05() {
  return <RippleEffect easing={Easing.inOut(Easing.quad)} />
}
