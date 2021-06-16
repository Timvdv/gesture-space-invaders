export function getRandom(min: number, max: number): number {
  const minCeil = Math.ceil(min)
  const maxFloor = Math.floor(max)

  //The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (maxFloor - minCeil) + minCeil)
}
