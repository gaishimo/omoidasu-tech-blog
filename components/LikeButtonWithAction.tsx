import { useCallback } from "react"
import LikeButton from "./LikeButton"

export default function LikeButtonWithAction() {
  const onPress = useCallback(async () => {
    try {
      const currentPageUrl = window.location.href
      const response = await fetch("/api/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: currentPageUrl }),
      })
      if (!response.ok) {
        console.error("Failed to send like notification")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }, [])

  return <LikeButton onPress={onPress} />
}
