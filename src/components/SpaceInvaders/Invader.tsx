import Konva from 'konva'
import { useEffect, useRef, useState } from 'react'
import { Rect } from 'react-konva'
import { getRandom } from 'helpers/getRandom'

type InvaderProps = {
  uuid: string
  x: number
  y: number
  width: number
  height: number
}

const Invader = ({ uuid, x, y, width, height }: InvaderProps) => {
  const invaderRef = useRef(null)

  useEffect(() => {
    const anim = new Konva.Animation((frame) => {
      // invaderRef.current.x((Math.sin(frame.time / 500) + 100) / 3)
    }, invaderRef.current.getLayer())

    anim.start()

    return () => {
      anim.stop()
    }
  }, [])

  const color = Konva.Util.getRandomColor()

  return (
    <Rect
      id={uuid}
      ref={invaderRef}
      x={x}
      y={y}
      width={width}
      height={height}
      //
      fill={'black'}
      globalCompositeOperation="xor"
    />
  )
}

export default Invader
