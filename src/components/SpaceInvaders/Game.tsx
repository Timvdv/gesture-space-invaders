import { useEffect, useRef } from 'react'
import {
  useRecoilState,
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
} from 'recoil'
import { Stage, Layer } from 'react-konva'
import useAllKeysPress from 'helpers/hooks/useAllKeyPress'
import { v4 as uuidv4 } from 'uuid'
import {
  gameState,
  bulletState,
  invaderState,
  playerState,
} from 'state/spaceInvaderState'
import userState from 'state/userState'
import Invader from './Invader'
import Player from './Player'
import Bullet from './Bullet'
import haveIntersection from 'helpers/intersect'

function Game() {
  const [game] = useRecoilState(gameState)
  const [bullets, setBullets] = useRecoilState(bulletState)
  const [invaders, setInvaders] = useRecoilState(invaderState)
  const [player, setPlayer] = useRecoilState(playerState)
  const [user] = useRecoilState(userState)

  console.log(user)

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
    setPlayer({
      ...player,
      x: player.x - 10,
    })
  }, [useKeyPressLeft])

  useEffect(() => {
    setPlayer({
      ...player,
      x: player.x + 10,
    })
  }, [useKeyPressRight])

  useEffect(() => {
    if (useKeyPressUp) {
      bullets.filter((bullet) => bullet.x > -50)

      setBullets([
        ...bullets,
        {
          id: uuidv4(),
          x: player.x,
          y: game.canvasHeight - 50,
          width: 50,
          height: 50,
          show: true,
        },
      ])
    }
  }, [useKeyPressUp])

  useEffect(() => {
    let xStart = 0,
      yStart = 0

    const maxWidth = game.canvasWidth

    // Lets start with 10 invaders
    ;[...Array(10)].forEach(() => {
      const invaderWidth = game.canvasWidth / 7

      if (maxWidth < xStart) {
        xStart = 0
        yStart += invaderWidth
      }

      invaders.push({
        id: uuidv4(),
        width: invaderWidth,
        height: invaderWidth,
        x: xStart,
        y: yStart,
        show: true,
      })

      xStart += invaderWidth
    })

    setPlayer({
      id: 'player1',
      width: 100,
      height: 100,
      x: game.canvasWidth / 2 - 100 / 2,
      y: game.canvasHeight - player.height,
    })
  }, [])

  console.log('Render')

  useEffect(() => {
    layer.current &&
      bullets.forEach((bullet) => {
        layer.current.children.forEach((group) => {
          // do not check intersection with itself
          if (group.attrs.id === bullet.id || group.attrs.id === 'player1') {
            return
          }

          if (haveIntersection(group.getClientRect(), bullet)) {
            const newBulletIndex = bullets.findIndex(
              (bulletIndex) => bulletIndex.id === bullet.id
            )

            if (newBulletIndex > -1) {
              const newState = [...bullets]

              console.log(bullet)
              console.log('INTERSECTING -', bullet, group)

              newState.splice(newBulletIndex - 1, 1)

              setBullets(newState)
            }

            const newInvaderIndex = invaders.findIndex(
              (invaderIndex) => invaderIndex.id === group.attrs.id
            )

            if (newInvaderIndex > -1) {
              const newState = [...invaders]

              newState.splice(newInvaderIndex, 1)

              setInvaders(newState)
            }
          }
        })
      })
  }, [bullets])

  // Build the Game
  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      scaleX={scale}
      scaleY={scale}
    >
      <Layer ref={layer}>
        <RecoilBridge>
          {bullets.map((bullet) => {
            return <Bullet key={bullet.id} uuid={bullet.id} />
          })}

          {invaders.map((invader) => {
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

          <Player />
        </RecoilBridge>
      </Layer>
    </Stage>
  )
}

export default Game
