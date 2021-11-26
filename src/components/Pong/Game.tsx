/* eslint-disable complexity */
import { useEffect, useRef, useState } from 'react'
import Konva from 'konva'
import { Stage, Layer, Rect, Circle, Text } from 'react-konva'
import useAllKeysPress from 'helpers/hooks/useAllKeyPress'

import SocketIOClient from 'socket.io-client'

// collision Detect function
function collisionDetect(player, ball) {
  // returns true or false
  player.top = player.y
  player.right = player.x + player.width
  player.bottom = player.y + player.height
  player.left = player.x

  ball.top = ball.y - ball.radius
  ball.right = ball.x + ball.radius
  ball.bottom = ball.y + ball.radius
  ball.left = ball.x - ball.radius

  return (
    ball.left < player.right &&
    ball.top < player.bottom &&
    ball.right > player.left &&
    ball.bottom > player.top
  )
}

function getRandomAngle() {
  const maxAngleDegrees = 180
  const minAngleDegrees = 0

  return (
    ((Math.random() * (maxAngleDegrees - minAngleDegrees) + minAngleDegrees) /
      180) *
    Math.PI
  )
}

let playerOneScore = 0,
  playerTwoScore = 0

function Game() {
  const layer = useRef(null)

  // connected flag
  const [connected, setConnected] = useState<boolean>(false)

  const gameSize = Math.min(window.innerWidth, window.innerHeight)

  const useKeyPressLeft = useAllKeysPress({ userKeys: 'ArrowLeft' })
  const useKeyPressRight = useAllKeysPress({ userKeys: 'ArrowRight' })
  const useKeyPressA = useAllKeysPress({ userKeys: 'a' })
  const useKeyPressD = useAllKeysPress({ userKeys: 'd' })

  const [playerOne, setPlayerOne] = useState({
    x: 10,
    y: 40,
    width: 200,
    height: 30,
    leftArrowPressed: false,
    rightArrowPressed: false,
  })

  const [playerTwo, setPlayerTwo] = useState({
    x: 10,
    y: gameSize - 70,
    width: 200,
    height: 30,
    leftArrowPressed: false,
    rightArrowPressed: false,
  })

  const [ball, setBall] = useState({
    x: gameSize / 2,
    y: gameSize / 2,
    velocityX: 1,
    velocityY: 1,
    radius: 30,
    speed: 2,
    angle: 0,
  })

  useEffect(() => {
    setPlayerOne({
      ...playerOne,
      leftArrowPressed: true,
      rightArrowPressed: false,
    })
  }, [useKeyPressLeft])

  useEffect(() => {
    setPlayerOne({
      ...playerOne,
      rightArrowPressed: true,
      leftArrowPressed: false,
    })
  }, [useKeyPressRight])

  useEffect(() => {
    setPlayerTwo({
      ...playerTwo,
      leftArrowPressed: true,
      rightArrowPressed: false,
    })
  }, [useKeyPressA])

  useEffect(() => {
    setPlayerTwo({
      ...playerTwo,
      rightArrowPressed: true,
      leftArrowPressed: false,
    })
  }, [useKeyPressD])

  const reset = () => {
    setBall({
      ...ball,
      x: gameSize / 2,
      y: gameSize / 2,
      velocityX: 1,
      velocityY: 1,
      speed: 2,
      angle: getRandomAngle(),
    })
  }

  useEffect(() => {
    const anim = new Konva.Animation((frame) => {
      /**
       * Uncomment below if you want to enable move using the keyboard
       */

      //   if (playerOne.leftArrowPressed && playerOne.x > 0) {
      //     setPlayerOne({
      //       ...playerOne,
      //       x: playerOne.x - 8,
      //     })
      //   } else if (
      //     playerOne.rightArrowPressed &&
      //     playerOne.x < gameSize - playerOne.width
      //   ) {
      //     setPlayerOne({
      //       ...playerOne,
      //       x: playerOne.x + 8,
      //     })
      //   }

      //   if (playerTwo.leftArrowPressed && playerTwo.x > 0) {
      //     setPlayerTwo({
      //       ...playerTwo,
      //       x: playerTwo.x - 8,
      //     })
      //   } else if (
      //     playerTwo.rightArrowPressed &&
      //     playerTwo.x < gameSize - playerTwo.width
      //   ) {
      //     setPlayerTwo({
      //       ...playerTwo,
      //       x: playerTwo.x + 8,
      //     })
      //   }

      // move the ball
      ball.x += ball.velocityX
      ball.y += ball.velocityY

      if (ball.x + ball.radius + 10 >= gameSize || ball.x - ball.radius <= 10) {
        // play wallHitSound

        ball.velocityX = -ball.velocityX
      }

      setBall({ ...ball, x: ball.x, y: ball.y })

      // if ball hit on bottom wall
      if (ball.y + ball.radius >= gameSize) {
        // play scoreSound

        // then user scored 1 point
        playerOneScore += 1

        reset()

        return
      }

      // if ball hit on top wall
      if (ball.y - ball.radius <= 0) {
        // play scoreSound

        // then ai scored 1 point
        playerTwoScore += 1

        reset()
        return
      }

      // collision detection on paddles
      const player = ball.y < gameSize / 2 ? playerOne : playerTwo

      if (collisionDetect(player, ball)) {
        // console.log('COLLISION!!!')

        // play hitSound
        // hitSound.play()
        // default angle is 0deg in Radian
        let angle = 0

        const relativeIntersectX = player.x + player.width / 2 - ball.x
        const normalizedRelativeIntersectionY =
          relativeIntersectX / (player.height / 2)
        const bounceAngle = normalizedRelativeIntersectionY * -2

        // // if ball hit the top of paddle
        // if (ball.x + ball.radius / 2 < player.x + player.width / 2) {
        //   // then -1 * Math.PI / 4 = -45deg
        //   angle = (-1 * Math.PI) / 6
        // } else if (ball.x + ball.radius / 2 > player.x + player.width / 2) {
        //   // if it hit the bottom of paddle
        //   // then angle will be Math.PI / 4 = 45deg
        //   angle = Math.PI / 6
        // }

        setBall({
          ...ball,
          speed: ball.speed + 0.3,
          velocityX:
            (player === playerOne ? 1 : -1) *
            ball.speed *
            Math.cos(bounceAngle),
          velocityY: ball.speed * Math.sin(bounceAngle),
        })
      }

      // console.log(frame);
    }, layer.current.getLayer())

    anim.start()

    return () => {
      anim.stop()
    }
  })

  useEffect((): any => {
    // connect to socket server
    const socket = SocketIOClient.connect('ws://0.0.0.0:8080', {
      path: '',
      transports: ['websocket', 'polling', 'flashsocket'],
    })

    // log socket connection
    socket.on('connect', () => {
      setConnected(true)
    })

    socket.on('player1', (message) => {
      setPlayerOne({
        ...playerOne,
        x: (JSON.parse(message).left * 1000 + playerOne.width / 2),
      })
    })

    socket.on('player2', (message) => {

      setPlayerTwo({
        ...playerTwo,
        x: JSON.parse(message).left * 1000 - playerTwo.width / 2,
      })
    })

    // socket disconnect onUnmount if exists
    if (socket) return () => socket.disconnect()
  }, [])

  // Build the Game
  return (
    <Stage
      width={gameSize}
      height={gameSize}
      style={{
        zIndex: 2,
        background: 'transparent',
      }}
      fill="transparent"
    >
      <Layer ref={layer}>
        <Text text={`Tim's score: ${playerOneScore}`} fill="white" y={10} />
        <Text
          text={`Opponent score: ${playerTwoScore}`}
          fill="white"
          y={gameSize - 20}
          x={gameSize - 140}
        />
        <Rect
          x={playerOne.x}
          y={playerOne.y}
          width={playerOne.width}
          height={playerOne.height}
          fill={'#4bff00'}
        />

        <Circle x={ball.x} y={ball.y} radius={ball.radius} fill={'#4bff00'} />

        <Rect
          x={playerTwo.x}
          y={playerTwo.y}
          width={playerTwo.width}
          height={playerTwo.height}
          fill={'#4bff00'}
        />
      </Layer>
    </Stage>
  )
}

export default Game
