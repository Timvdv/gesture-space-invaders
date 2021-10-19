import Konva from 'konva'
import { useEffect, useRef } from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image'

type InvaderProps = {
  uuid: string
  x: number
  y: number
  width: number
  height: number
}

const Invader = ({ uuid, x, y, width, height }: InvaderProps) => {
  const invaderRef = useRef(null)
  const [image] = useImage(
    'https://i0.wp.com/codeheir.com/wp-content/uploads/2019/03/invader1.png'
  )

  useEffect(() => {
    const anim = new Konva.Animation((frame) => {
      // invaderRef.current.x((Math.sin(frame.time / 500) + 100) / 3)
    }, invaderRef.current.getLayer())

    anim.start()

    return () => {
      anim.stop()
    }
  }, [])

  return (
    <Image
      image={image}
      id={uuid}
      ref={invaderRef}
      x={x}
      y={y}
      width={width}
      height={height}
      globalCompositeOperation="xor"
    />
  )
}

export default Invader
