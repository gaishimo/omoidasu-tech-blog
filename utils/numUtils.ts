export function random(a: number = 1, b: number = 0) {
  const lower = Math.ceil(Math.min(a, b))
  const upper = Math.floor(Math.max(a, b))
  return Math.floor(lower + Math.random() * (upper - lower + 1))
}

export function range(n: number) {
  return Array.from({ length: n }, (_, i) => i)
}
