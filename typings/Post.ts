export type PostMeta = {
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

export type Post = PostMeta & {
  id: string
  createdAt: string
  lastUpdatedAt: string
}
