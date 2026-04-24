import { format } from "date-fns"
import { Fragment, ReactNode, useCallback } from "react"
import { Linking, StyleSheet, Text, View } from "react-native"
import useMedia from "use-media"
import { Colors } from "../libs/colors"
import { Post } from "../typings/Post"
import { BaseLayout } from "./BaseLayout"
import { PostHeader } from "./PostHeader"
import { RecentPostsPanel } from "./RecentPostsPanel"
import { RelatedPostsPanel } from "./RelatedPostsPanel"
import { TagsPanel } from "./TagsPanel"
import { WithSkia } from "./WithSkia"

type Headline = { title: string; children: Headline[] }

type Props = {
  children: ReactNode
  // description?: string
  headlines: Headline[]
  meta: Post
}

const DEVELOPMENT_URL = "https://omoidasu.co.jp/development"

export function PostLayout(props: Props) {
  const isSmallScreen = useMedia({ maxWidth: 700 })
  const isMediumScreen = useMedia({ minWidth: 700, maxWidth: 1200 })
  const openDevelopmentPage = useCallback(() => {
    if (typeof window !== "undefined") {
      window.open(DEVELOPMENT_URL, "_blank", "noopener,noreferrer")
      return
    }
    Linking.openURL(DEVELOPMENT_URL)
  }, [])

  const renderHeadline = (headline: Headline) => (
    <Fragment key={headline.title}>
      <View style={styles.headlineItem}>
        <Text
          accessibilityRole="link"
          style={styles.headlineLink}
          href={parseTitleToLinkId(headline.title)}
        >
          {headline.title}
        </Text>
      </View>
      {(headline.children || []).length > 0 ? (
        <View style={styles.headlineList}>
          {(headline.children || []).map(child => renderHeadline(child))}
        </View>
      ) : null}
    </Fragment>
  )

  return (
    <BaseLayout
      title={`${props.meta.title} | Omoidasu Tech Blog`}
      description={props.meta.description}
      imagePath={props.meta.imagePath}
    >
      <View style={[styles.container, isSmallScreen && styles.containerSmall]}>
        <View
          style={[
            styles.article,
            isSmallScreen && styles.articleSmall,
            isMediumScreen && styles.articleMedium,
          ]}
        >
          <View style={styles.articleBody}>
            <PostHeader {...props.meta} />
            {props.children}
            <View style={styles.likeButton}>
              <WithSkia
                delay={3500}
                getComponent={() => import("./LikeButtonWithAction")}
                fallback={() => null}
              />
            </View>
            <View style={styles.subPanels}>
              <RelatedPostsPanel
                id={props.meta.id}
                style={styles.relatedPostsPanel}
              />
              <RecentPostsPanel style={styles.recentPostsPanel} />
              <TagsPanel style={styles.tagsPanel} />
            </View>
            <View style={styles.footer}>
              <View style={styles.footerRow}>
                <Text style={styles.footerText}>
                  最終更新:{" "}
                  {format(props.meta.lastUpdatedAt, "yyyy-MM-dd HH:mm")}
                </Text>
              </View>
              <View style={styles.footerRow}>
                <Text style={styles.footerText}>
                  {"筆者: "}
                  <Text
                    accessibilityRole="link"
                    style={styles.linkText}
                    href="https://twitter.com/gaishimo"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    @gaishimo
                  </Text>
                  {"\n"}主にReact Nativeでのアプリ開発を専門に行っています。
                  {"\n"}React
                  Nativeのお仕事お受けいたしますのでお気軽にご相談ください。
                </Text>
              </View>
              <View style={styles.footerRow}>
                <Text style={styles.footerText}>
                  <Text
                    accessibilityRole="link"
                    style={styles.linkText}
                    onPress={openDevelopmentPage}
                  >
                    {"React Nativeアプリの開発依頼はこちら "}
                    <Text style={styles.externalLinkIcon}>↗</Text>
                  </Text>
                </Text>
              </View>
            </View>
          </View>
          {!isSmallScreen && !isMediumScreen && (
            <View style={styles.sidebar}>
              <View style={styles.stick}>
                <View style={styles.headlinesPanel}>
                  <View style={styles.headlineList}>
                    {props.headlines.map((headline: Headline) =>
                      renderHeadline(headline),
                    )}
                  </View>
                </View>
                <View style={styles.sidebarLinkContainer}>
                  <Text
                    accessibilityRole="link"
                    style={styles.sidebarLink}
                    onPress={openDevelopmentPage}
                  >
                    {"React Nativeアプリの\n開発依頼はこちら "}
                    <Text style={styles.externalLinkIcon}>↗</Text>
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    </BaseLayout>
  )
}

const styles = StyleSheet.create({
  container: { alignItems: "center" },
  containerSmall: { width: "100%" },
  article: { width: 1000, flexDirection: "row" },
  articleMedium: {
    width: "80%",
    paddingHorizontal: 8,
  },
  articleSmall: {
    width: "100%",
    paddingHorizontal: 8,
  },
  likeButton: {
    marginTop: 40,
    height: 60,
  },
  footer: {
    marginTop: 56,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: "rgb(230, 230, 230)",
  },
  footerRow: { marginBottom: 8 },
  footerText: { color: Colors.textColor3, fontSize: 13 },
  linkText: { color: "rgb(60, 26, 130)" },
  articleBody: { flex: 1, width: "100%" },
  sidebar: { width: 280, paddingLeft: 30 },
  stick: {
    // @ts-ignore
    position: "sticky",
    top: 160,
  },
  headlinesPanel: {
    borderWidth: 1,
    borderColor: "rgba(210, 210, 210, 0.5)",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  headlineList: {
    paddingLeft: 10,
  },
  headlineItem: {
    marginBottom: 8,
    letterSpacing: 0,
  },
  headlineLink: {
    color: Colors.textColor1,
    fontSize: 13,
  },
  sidebarLinkContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  sidebarLink: {
    color: "rgb(60, 26, 130)",
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
  },
  externalLinkIcon: {
    color: "rgb(150, 150, 150)",
    fontSize: 12,
  },
  subPanels: { marginTop: 100 },
  relatedPostsPanel: {},
  recentPostsPanel: {
    marginTop: 40,
  },
  tagsPanel: {
    marginTop: 40,
  },
})

function parseTitleToLinkId(s: string) {
  const parsed = s.toLowerCase().replace(/\s/g, "-").replace(".", "")
  return `#${parsed}`
}
