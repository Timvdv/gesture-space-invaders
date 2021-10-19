import { atom } from 'recoil'
interface IGameObject {
  id: string
  x: number
  y: number
  width: number
  height: number
  show: boolean
}

export interface IPlayer extends IGameObject {
  src: string
}

export interface IInvader extends IGameObject {}
export interface IBullet extends IGameObject {}

export const gameState = atom({
  key: 'gameState',
  default: {
    intersectCount: 0,
    canvasHeight: 700,
    canvasWidth: 700,
    state: '',
  },
})

export const playerState = atom({
  key: 'playerState',
  default: {
    id: 'player1',
    width: 100,
    height: 100,
    x: 0,
    y: 0,
  } as IPlayer,
})
