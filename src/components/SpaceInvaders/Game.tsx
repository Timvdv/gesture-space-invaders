import { v4 as uuidv4 } from 'uuid'
import { useEffect, useRef, useState } from 'react'
import Konva from 'konva'
import {
  useRecoilState,
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
} from 'recoil'
import { Stage, Layer } from 'react-konva'
import useAllKeysPress from 'helpers/hooks/useAllKeyPress'
import { useIntersection } from 'helpers/hooks/useIntersection'
import { gameState, playerState } from 'state/spaceInvaderState'
import Invader from './Invader'
import Player from './Player'
import Bullets from './Bullets'

window.bullets = []
window.invaders = []

window.player = {
  show: true,
  id: 'player1',
  width: 100,
  height: 100,
  x: 0,
  y: 0,
  src:
    'https://p165.p3.n0.cdn.getcloudapp.com/items/Wnux6QD9/a008da85-f7cd-442d-8b61-d7ff98d1c1ee.png',
}

function Game() {
  const [game, setGame] = useRecoilState(gameState)
  const { player } = window
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE()
  const layer = useRef(null)

  // now you may want to make it visible even on small screens
  // we can just scale it
  const scale = Math.min(
    window.innerWidth / game.canvasWidth,
    window.innerHeight / game.canvasHeight
  )

  const useKeyPressUp = useAllKeysPress({ userKeys: 'ArrowUp' })
  const useKeyPressLeft = useAllKeysPress({ userKeys: 'ArrowLeft' })
  const useKeyPressRight = useAllKeysPress({ userKeys: 'ArrowRight' })

  useEffect(() => {
    player.x -= 5
  }, [useKeyPressLeft])

  useEffect(() => {
    player.x += 5
  }, [useKeyPressRight])

  useEffect(() => {
    if (useKeyPressUp) {
      if (window.bullets.length > 1) {
        window.bullets.shift()
      }

      window.bullets.push({
        id: uuidv4(),
        x: player.x,
        y: player.y - 50,
        width: 10,
        height: 30,
        show: true,
      })
    }
  }, [useKeyPressUp])

  useEffect(() => {
    const padding = 10
    let xStart = padding,
      yStart = 20

    const maxWidth = game.canvasWidth

    // Start with some invaders
    ;[...Array(24)].forEach(() => {
      const invaderWidth = game.canvasWidth / 8

      if (maxWidth < xStart) {
        xStart = padding
        yStart += invaderWidth + padding
      }

      window.invaders.push({
        id: uuidv4(),
        width: invaderWidth,
        height: invaderWidth,
        x: xStart,
        y: yStart,
        show: true,
      })

      xStart += invaderWidth + padding
    })
  }, [])

  // Remove both the bullet & invader when intersecting
  useIntersection((newBulletIndex, newInvaderIndex) => {
    window.bullets.splice(newBulletIndex - 1, 1)
    window.invaders.splice(newInvaderIndex, 1)

    setGame({
      ...game,
      intersectCount: game.intersectCount + 1,
      state: 'playing',
    })
  })

  if (game.state === 'loading') {
    return (
      <>
        <h1>Loading game...</h1>
      </>
    )
  }

  if (game.state === 'notSupported') {
    return (
      <>
        <h1>Please enable your video</h1>
      </>
    )
  }

  if (game.state === 'win') {
    return (
      <>
        <h1>You won!</h1>
      </>
    )
  }

  if (game.state === 'lose') {
    return (
      <>
        <h1>You Lose!</h1>
      </>
    )
  }

  // Build the Game
  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      scaleX={scale}
      scaleY={scale}
      style={{
        zIndex: 2,
      }}
    >
      <Layer ref={layer}>
        <RecoilBridge>
          {window.bullets.map((bullet) => {
            return <Bullets key={bullet.id} uuid={bullet.id} />
          })}

          {window.invaders.map((invader) => {
            return (
              <Invader
                key={invader.id}
                uuid={invader.id}
                x={invader.x}
                y={invader.y}
                width={invader.width}
                height={invader.height}
              />
            )
          })}

          <Player player={player} />
        </RecoilBridge>
      </Layer>
    </Stage>
  )
}

export default Game
