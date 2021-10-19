import Konva from 'konva'
import { useRef, useEffect } from 'react'
import { Image } from 'react-konva'
import { IPlayer } from 'state/spaceInvaderState'
import useImage from 'use-image'

type PlayerProps = {
  player: IPlayer
}

const Player = ({ player }: PlayerProps) => {
  const PlayerElement = useRef(null)
  const [image] = useImage(player.src)

  useEffect(() => {
    const anim = new Konva.Animation((frame) => {
      PlayerElement?.current?.to({ x: window.player.x })
    }, PlayerElement.current.getLayer())

    anim.start()

    return () => {
      anim.stop()
    }
  }, [])
  return (
    <Image
      image={image}
      id={player.id}
      ref={PlayerElement}
      x={player.x}
      y={player.y}
      width={player.width}
      height={player.height}
    />
  )
}

export default Player
