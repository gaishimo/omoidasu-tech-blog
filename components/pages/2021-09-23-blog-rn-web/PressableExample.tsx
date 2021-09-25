import { useCallback, useState } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"

const textMapping = {
  ready: "PRESSABLE",
  pressing: "PRESSING",
  longPressing: "LONG PRESSING",
}

export function PressableExample() {
  const [status, setStatus] = useState<"ready" | "pressing" | "longPressing">(
    "ready",
  )

  const onPressIn = useCallback(() => setStatus("pressing"), [])

  const onLongPress = useCallback(() => setStatus("longPressing"), [])

  const onPressOut = useCallback(() => setStatus("ready"), [])

  const styleMapping = {
    ready: null,
    pressing: styles.buttonPressing,
    longPressing: styles.buttonLongPressing,
  }

  return (
    <View style={styles.example}>
      <Pressable
        accessibilityRole="button"
        pressRetentionOffset={20}
        style={styles.pressable}
        delayLongPress={1000}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onLongPress={onLongPress}
      >
        <View style={[styles.button, styleMapping[status]]}>
          <Text style={styles.text}>{textMapping[status]}</Text>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  example: { marginTop: 16, alignItems: "flex-start" },
  pressable: {},
  button: {
    width: 120,
    height: 120,
    margin: 16,
    backgroundColor: "rgb(0, 120, 180)",
    borderRadius: 90,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  buttonPressing: {
    transform: [{ scale: 1.1 }],
    backgroundColor: "rgb(0, 100, 160)",
  },
  buttonLongPressing: {
    transform: [{ scale: 1.2 }],
    backgroundColor: "rgb(0, 60, 120)",
  },
  text: {
    textAlign: "center",
    color: "white",
    fontWeight: "normal",
    fontSize: 14,
    letterSpacing: 1,
  },
})
