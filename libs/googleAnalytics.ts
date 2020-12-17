import { Constants } from "./Constants"

export function trackPageView(url: string) {
  if (window.gtag) {
    window.gtag("config", Constants.GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

export function trackEvent({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label: string
  value: any
}) {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}
