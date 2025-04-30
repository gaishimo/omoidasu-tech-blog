import { google } from "googleapis"

const serviceAccountEnv = process.env.SERVICE_ACCOUNT_BASE64
if (!serviceAccountEnv) {
  throw new Error("SERVICE_ACCOUNT_BASE64 environment variable is required")
}

const serviceAccountJson = JSON.parse(
  Buffer.from(serviceAccountEnv, "base64").toString(),
)

const SCOPES = ["https://www.googleapis.com/auth/webmasters"]

const auth = new google.auth.GoogleAuth({
  credentials: serviceAccountJson,
  scopes: SCOPES,
})

async function submitSitemap() {
  const client = await auth.getClient()
  const webmasters = google.webmasters({ version: "v3", auth: client })

  const siteUrl = "https://blog.omoidasu.dev"
  const sitemapUrls = [
    "https://blog.omoidasu.dev/sitemap.xml",
    "https://blog.omoidasu.dev/feed.xml",
  ]

  for (const sitemapUrl of sitemapUrls) {
    const res = await webmasters.sitemaps.submit({
      feedpath: sitemapUrl,
      siteUrl,
    })
    console.log("sitemap submitted.", sitemapUrl)
  }
}

submitSitemap().catch(console.error)
