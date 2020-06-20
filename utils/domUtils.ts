export function isBrowser() {
  return typeof window !== "undefined"
}

export function getScrollHeight() {
  if (typeof window !== "undefined") {
    return window.document.body.scrollHeight
  }
  return 0
}

export function getWindowWidth() {
  if (typeof window !== "undefined") {
    return window.screen.width
  }
  return 0
}
