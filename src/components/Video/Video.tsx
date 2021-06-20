import { useEffect, useRef } from 'react'
import { useRecoilState } from 'recoil'
import userState from 'state/userState'
import { v4 as uuidv4 } from 'uuid'

import styles from './Video.module.scss'
import { bulletState, playerState, gameState } from 'state/spaceInvaderState'

let model = null
let isVideoPlaying = false
let context = null
let first = 'closed'

let userInfo = {
  bbox: [],
  class: 0,
  label: '',
  score: '',
}

export default function Video() {
  const video = useRef(null)
  const canvas = useRef(null)

  const [, setUserState] = useRecoilState(userState)
  const [bullets, setBullets] = useRecoilState(bulletState)
  const [player, setPlayer] = useRecoilState(playerState)
  const [game] = useRecoilState(gameState)

  function runDetection() {
    const scale = 700 / 500

    model.detect(video.current).then((predictions) => {
      predictions.forEach((element) => {
        if (element.label !== 'face') {
          userInfo = element
        }

        if (element.label === 'open') {
          setPlayer({
            ...player,
            y: game.canvasHeight - player.height,
            x: Math.ceil(element.bbox[0] * scale),
          })

          first = 'open'

          return
        }

        if (element.label === 'point' && first === 'open') {
          const test = bullets.filter((bullet) => bullet.x > -50)

          // if (canShoot) {
          setBullets([
            ...test,
            {
              id: uuidv4(),
              x: Math.ceil(element.bbox[0] * scale),
              y: game.canvasHeight - 50,
              width: 50,
              height: 50,
              show: true,
            },
          ])
          // }

          first = 'point'
        }
      })

      model.renderPredictions(
        predictions,
        canvas.current,
        context,
        video.current
      )
      if (isVideoPlaying) {
        requestAnimationFrame(runDetection)
      }
    })
  }

  const init = async () => {
    context = canvas.current.getContext('2d')
    model = await handTrack.load({
      canvas: canvas.current,
      context,
      mediasource: video.current,
      flipHorizontal: true, // flip e.g for video
      maxNumBoxes: 20, // maximum number of boxes to detect
      iouThreshold: 0.5, // ioU threshold for non-max suppression
      scoreThreshold: 0.6, // confidence threshold for predictions.
    })

    const videoResult = await handTrack.startVideo(video.current)

    if (videoResult.status) {
      console.log('Video started. Now tracking')
      isVideoPlaying = true
      runDetection(model, context)
    } else {
      console.log('Please enable video')
    }
  }

  useEffect(() => {
    init()

    // Update the user state every second so the music is in sync
    const interval = setInterval(() => {
      setUserState(userInfo)
    }, 1000)
    return () => clearInterval(interval)

    /* start camera input stream on the provided video tag. returns a promise with message format
    { status: false, msg: 'please provide a valid video element' }
    */
  }, [])

  return (
    <>
      <canvas className={styles.video__canvas} ref={canvas}></canvas>
      <video className={styles.video__mini} ref={video} muted></video>
    </>
  )
}
