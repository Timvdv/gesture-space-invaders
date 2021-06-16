import { atom, selectorFamily } from 'recoil'

const gameState = atom({
  key: 'gameState',
  default: {
    canvasHeight: 700,
    canvasWidth: 700,
  },
})

const playerState = atom({
  key: 'playerState',
  default: {
    id: 'player1',
    width: 100,
    height: 100,
    x: 0,
    y: 0,
  },
})

type Invader = {
  id: string
  x: number
  y: number
  width: number
  height: number
  show: boolean
}

const invaderState = atom({
  key: 'invaderState',
  default: [] as Invader[],
})

export type IBullet = {
  id: string
  x: number
  y: number
  width: number
  height: number
  show: boolean
}

const bulletState = atom({
  key: 'bulletState',
  default: [] as IBullet[],
})

const singleBulletState = selectorFamily({
  key: 'singleBulletState',
  get: (bulletId) => ({ get }) =>
    Array.isArray(get(bulletState)) &&
    get(bulletState).find((bullet) => bullet.id === bulletId),
  set: (bulletId) => ({ set }, newValue: IBullet) =>
    set(bulletState, (prevState) => {
      if (Array.isArray(prevState)) {
        const newBulletIndex = prevState.findIndex(
          (bullet) => bullet.id === bulletId
        )

        if (newBulletIndex > -1) {
          const newState = [...prevState]

          newState[newBulletIndex] = newValue

          return newState
        }
      }

      return [...prevState]
    }),
})

export { invaderState, playerState, gameState, bulletState, singleBulletState }
