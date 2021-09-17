import { StyleSheet, Text, View } from "react-native"

export function Footer() {
  return (
    <footer>
      <View style={styles.container}>
        <View style={styles.copyRight}>
          <Text style={styles.copyRightText}>
            &copy; 2021 Omoidasu, Inc. All rights reserved.
          </Text>
        </View>
      </View>
    </footer>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "rgb(220, 220, 220)",
    paddingVertical: 16,
  },
  copyRight: {},
  copyRightText: { fontSize: 11, color: "rgb(70, 70, 70)" },
})
