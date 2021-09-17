import { Image, StyleSheet, Text, View } from "react-native"

type Props = {
  useH1?: boolean
}

export function Header(props: Props) {
  return (
    <header>
      <View style={styles.container}>
        <View style={styles.headerEdge} />
        <View style={styles.title} accessibilityRole="header">
          <Image
            accessibilityLabel={props.useH1 ? "Omoidasu Logo" : null}
            source={{ uri: "/omoidasuLogo.png" }}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Image
            accessibilityLabel="Omoidasu Title Logo"
            source={{ uri: "/titleLogo.png" }}
            style={styles.titleLogoImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.links}>
          <Text accessibilityRole="link" href={`/`} style={styles.link}>
            記事一覧
          </Text>
          <Text
            accessibilityRole="link"
            href="https://omoidasu.co.jp/ja/apps"
            rel="noopener noreferrer"
            target="_blank"
            style={styles.link}
          >
            アプリ
          </Text>
        </View>
      </View>
    </header>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  headerEdge: { height: 30, width: 200 },
  title: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: { width: 40, height: 40, marginRight: 12 },
  titleLogoImage: { width: 140, height: 70 },
  links: {
    width: 200,
    flexDirection: "row",
    alignItems: "center",
  },
  link: { marginHorizontal: 8, fontSize: 12 },
})
