/* eslint-disable no-process-env */
/* eslint-disable no-buffer-constructor */
import { useEffect } from 'react'
import { useState } from 'react'
import { Song, Track, Instrument, Effect } from 'reactronica'
import { useRecoilState } from 'recoil'
import { gameState } from 'state/spaceInvaderState'

const Audio = () => {
  let count = 0
  const [game] = useRecoilState(gameState)

  useEffect(() => {
    if (game.intersectCount > count) {
      count++
    }
  }, [game])

  return (
    <>
      <Song bpm={124} isPlaying={play}>
        <Track>
          <Instrument
            type="sampler"
            samples={{
              B1: '/samples/Kit-01-124bpm/Beats/DL_K1BeatA124-07.wav',
            }}
          />
        </Track>
        )
      </Song>
    </>
  )
}

export default Audio
