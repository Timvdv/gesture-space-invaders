import { IBullet, IInvader, IPlayer } from 'state/spaceInvaderState'

declare module '*.png'
declare module '*.wav'
declare module '*.mp3'

declare global {
  interface Window {
    bullets: IBullet[]
    invaders: IInvader[]
    player: IPlayer
    innerWidth: number
    innerHeight: number
  }
}

window.MyNamespace = window.MyNamespace || {}

