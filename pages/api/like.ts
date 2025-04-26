import type { NextApiRequest, NextApiResponse } from "next"

export default async function likeHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const webhookUrl = process.env.LIKE_SLACK_WEBHOOK_URL

    if (!webhookUrl) {
      return res.status(500).json({ error: "Webhook URL not configured" })
    }

    const { url } = req.body
    if (!url) {
      return res.status(400).json({ error: "URL not provided" })
    }

    try {
      const randomHeart = ["❤️", "💛", "💚"][Math.floor(Math.random() * 3)]
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `いいねが押されました! ${randomHeart}\n${url}`,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Slack webhook error:", response.status, errorText)
        return res.status(500).json({ error: "Failed to send notification" })
      }

      res.status(200).json({ message: "Notification sent" })
    } catch (error) {
      console.error("Error sending notification:", error)
      res.status(500).json({ error: "Error sending notification" })
    }
  } else {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
