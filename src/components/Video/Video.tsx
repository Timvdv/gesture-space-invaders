/* eslint-disable complexity */
import { useEffect, useRef } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { v4 as uuidv4 } from 'uuid'
import * as handTrack from 'handtrackjs'

import styles from './Video.module.scss'
import { playerState, gameState } from 'state/spaceInvaderState'
import useWindowSize from 'helpers/hooks/useWindowSize'

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
  const size = useWindowSize()
  const video = useRef(null)
  const canvas = useRef(null)

  const { player } = window

  const [game, setGame] = useRecoilState(gameState)

  const scale = 700 / 500

  function runDetection() {
    model.detect(video.current).then((predictions) => {
      predictions.forEach((element) => {
        if (element.label !== 'face') {
          userInfo = element
        }

        if (element.label === 'open') {
          window.player.x = Math.ceil(element.bbox[0] * scale)
          window.player.y = game.canvasHeight - player.height

          first = 'open'

          return
        }

        if (element.label === 'point') {
          window.player.x = Math.ceil(element.bbox[0] * scale)
          window.player.y = game.canvasHeight - player.height
        }

        if (element.label === 'point' && first === 'open') {
          window.bullets.push({
            id: uuidv4(),
            x: Math.ceil(element.bbox[0] * scale),
            y: game.canvasHeight - 50,
            width: 10,
            height: 30,
            show: true,
          })

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

      setGame({ ...game, state: 'playing' })

      runDetection()
    } else {
      setGame({
        ...game,
        state: 'notSupported',
      })

      console.log('Please enable video')
    }
  }

  const workerRef = useRef(null)

  const render = function () {
    const ctx = canvas.current.getContext('2d')

    ctx.drawImage(
      video.current,
      0,
      0,
      video.current.width,
      video.current.height
    )

    const srcData = ctx.getImageData(
      0,
      0,
      video.current.width,
      video.current.height
    )

    workerRef.current.postMessage({
      imageData: srcData,
    })
  }

  useEffect(() => {
    setGame({
      ...game,
      state: 'loading',
    })

    /* Setup video stream and canvas */
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia

    navigator.getUserMedia(
      { video: true },
      function (stream) {

        if(video.current) {

          video.current.srcObject = stream
          video.current.play()


          setInterval(render, 10)
        }

      },
      function (error) {
        console.log('error', error)
      }
    )

    workerRef.current = new Worker(
      new URL('../../workers/example.worker.js', import.meta.url)
    )

    workerRef.current.onmessage = (evt) =>
      console.log('worker response', evt.data)

    return () => {
      workerRef.current.terminate()
    }
  }, [])

  // Only run this client side
  return (
    <>
      <canvas
        className={styles.video__canvas}
        ref={canvas}
        width={128}
        height={72}
        style={{
          left: `${(player?.x / 100) * (size.width / 100) + 2}%`,
        }}
      ></canvas>
      <video
        className={styles.video__mini}
        ref={video}
        width={128}
        height={72}
        muted
      ></video>
    </>
  )
}
