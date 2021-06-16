import Konva from 'konva'
import { useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { Spring, animated } from 'react-spring/renderprops-konva'
import { Rect } from 'react-konva'
import { playerState, gameState } from 'state/spaceInvaderState'

const Player = () => {
  const PlayerElement = useRef(null)
  const [player] = useRecoilState(playerState)

  return (
    <>
      <Rect
        id={player.id}
        ref={PlayerElement}
        x={player.x}
        y={player.y}
        width={player.width}
        height={player.height}
        fill={'red'}
      />
    </>
  )
}

export default Player
