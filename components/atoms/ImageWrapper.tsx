import { useCallback, useEffect, useState } from "react"
import {
  Image,
  ImageLoadEventData,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native"

type Props = {
  width: number | string
  maxWidth: number
  alt?: string
  style?: StyleProp<ViewStyle>
  sourceUri: string
}

type Size = { width: number; height: number }

export function ImageWrapper(props: Props) {
  const [viewSize, setViewSize] = useState<Size>({ width: 1, height: 1 })
  const [loadedImageSize, setLoadedImageSize] = useState<Size>({
    width: 1,
    height: 1,
  })

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    setViewSize({ width, height })
  }

  const onLoadImage = useCallback(
    (event: NativeSyntheticEvent<ImageLoadEventData>) => {
      const source = event.nativeEvent.source
      if (source == null) return
      const { width, height } = event.nativeEvent.source
      setLoadedImageSize({ width, height })
    },
    [],
  )

  const imageRatio = loadedImageSize.height / loadedImageSize.width

  useEffect(() => {
    // 画像サイズを取得する
    Image.getSize(props.sourceUri, (width, height) => {
      setLoadedImageSize({ width, height })
    })
  }, [])

  return (
    <View
      style={[
        styles.wrapper,
        props.style,
        { width: props.width, maxWidth: props.maxWidth },
      ]}
      onLayout={onLayout}
    >
      <Image
        source={{ uri: props.sourceUri }}
        onLoad={onLoadImage}
        accessibilityLabel={props.alt || ""}
        style={{
          width: viewSize.width - 2, // 右の枠が消えないようにマイナス
          height: viewSize.width * imageRatio,
          resizeMode: "contain",
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgb(230, 230, 230)",
    borderRadius: 2,
  },
})
