export function sortBy(key) {
  return (a, b) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0)
}

export function range(start: number, end: number) {
  return Array.from({ length: end - start }, (_, i) => i + start)
}
