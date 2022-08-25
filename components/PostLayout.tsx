import { format } from "date-fns"
import { Fragment, ReactNode } from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import useMedia from "use-media"
import { Colors } from "../libs/colors"
import { PostMeta } from "../typings/Post"
import { BaseLayout } from "./BaseLayout"
import { PostHeader } from "./PostHeader"
import { RecentPostsPanel } from "./RecentPostsPanel"
import { TagsPanel } from "./TagsPanel"

type Headline = { title: string; children: Headline[] }

type Props = {
  children: ReactNode
  // description?: string
  headlines: Headline[]
  meta: PostMeta
}

export function PostLayout(props: Props) {
  const isSmallScreen = useMedia({ maxWidth: 700 })
  const isMediumScreen = useMedia({ minWidth: 700, maxWidth: 1200 })
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
            {(isSmallScreen || isMediumScreen) && (
              <View>
                <RecentPostsPanel style={styles.recentPostsPanel} />
                <TagsPanel style={styles.tagsPanel} />
              </View>
            )}
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
                  {"\n"}主にReact Nativeでのアプリ開発を行っています。
                </Text>
              </View>
              <View style={styles.footerRow}>
                <Text style={styles.footerText}>
                  <Text
                    accessibilityRole="link"
                    style={styles.linkText}
                    href="https://omoidasu.co.jp/ja/apps"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    アプリ一覧
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
                <ScrollView>
                  <RecentPostsPanel style={styles.recentPostsPanel} />
                  <TagsPanel style={styles.tagsPanel} />
                </ScrollView>
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
    // position: "sticky",
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
  recentPostsPanel: {
    marginTop: 100,
  },
  tagsPanel: {
    marginTop: 40,
  },
})

function parseTitleToLinkId(s: string) {
  const parsed = s.toLowerCase().replace(/\s/g, "-").replace(".", "")
  return `#${parsed}`
}
