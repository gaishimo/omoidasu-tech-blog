// import { useMediaQuery } from "react-responsive"
import { Image, StyleSheet, Text, View } from "react-native"
import useMedia from "use-media"

type Props = {
  useH1?: boolean
}

export function Header(props: Props) {
  const isSmallScreen = useMedia({ maxWidth: 700 })

  return (
    <header>
      <View style={styles.container}>
        <View
          style={isSmallScreen ? styles.headerEdgeSmall : styles.headerEdge}
        />
        <View style={styles.title} accessibilityRole="header">
          <Image
            accessibilityLabel={props.useH1 ? "Omoidasu Logo" : null}
            source={{ uri: "/omoidasuLogo.png" }}
            style={[styles.logoImage, isSmallScreen && styles.logoImageSmall]}
            resizeMode="contain"
          />
          <Image
            accessibilityLabel="Omoidasu Title Logo"
            source={{ uri: "/titleLogo.png" }}
            style={[
              styles.titleLogoImage,
              isSmallScreen && styles.titleLogoImageSmall,
            ]}
            resizeMode="contain"
          />
        </View>
        <View style={isSmallScreen ? styles.linksSmall : styles.links}>
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
  headerEdge: { width: 200, height: 30 },
  headerEdgeSmall: { width: 32, height: 20 },
  title: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: { width: 40, height: 40, marginRight: 12 },
  logoImageSmall: { width: 32, height: 32 },
  titleLogoImage: { width: 140, height: 70 },
  titleLogoImageSmall: { width: 100, height: 50 },
  links: {
    width: 200,
    flexDirection: "row",
    alignItems: "center",
  },
  linksSmall: {
    width: 80,
    flexDirection: "column",
    alignItems: "center",
  },
  link: { marginBottom: 4, marginHorizontal: 8, fontSize: 12 },
})
