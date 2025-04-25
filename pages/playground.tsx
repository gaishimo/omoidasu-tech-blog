import { StyleSheet, View } from "react-native"
import { WithSkia } from "../components/WithSkia"
import { LoadingRect } from "../components/LoadingRect"

export default function () {
  return (
    <View>
      <WithSkia
        delay={1000}
        getComponent={() => import("../components/LikeButton")}
        fallback={() => (
          <LoadingRect
            width={320}
            height={140}
            textColor="lightblue"
            bgColor={"rgb(240, 240, 240)"}
          />
        )}
      />
    </View>
  )
}
