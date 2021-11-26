/* eslint-disable complexity */
import { useEffect, useRef } from 'react'
import styles from './Video.module.scss'

export default function Video() {
  const video = useRef(null)

  useEffect(() => {
    /* Setup video stream and canvas */
    window.navigator.getUserMedia =
      window.navigator.getUserMedia ||
      window.navigator.webkitGetUserMedia ||
      window.navigator.mozGetUserMedia ||
      window.navigator.msGetUserMedia

    window.navigator.getUserMedia(
      { video: true },
      (stream) => {
        if (video.current) {
          video.current.srcObject = stream
          video.current.play()
        }
      },
      (error) => {
        console.error('error', error)
      }
    )
  }, [])

  // Only run this client side
  return (
    <>
      <video
        className={styles.video__big}
        ref={video}
        width={'100%'}
        height={'110%'}
        muted
      ></video>
    </>
  )
}
