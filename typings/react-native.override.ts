import "react-native"

declare module "react-native" {
  interface AccessibilityProps {
    href?: string
    rel?: string
    target?: string
  }
}
