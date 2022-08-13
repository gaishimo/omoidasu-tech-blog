export function wait(millisec: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => resolve(), millisec)
  })
}
