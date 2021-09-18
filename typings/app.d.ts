interface Window {
  gtag: (type: "config" | "event", arg1: string, options: any) => void
}

type PostMeta = {
  title: string
  tagNames: string[]
  color1: string
  color2: string
  author: string
  description: string
  imagePath: string | null
  createdAt: Date
  lastUpdatedAt: Date
}

type Post = PostMeta & {
  id: string
  createdAt: string
  lastUpdatedAt: string
}
