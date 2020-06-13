export function sortBy(key) {
  return (a, b) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0)
}
