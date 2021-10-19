import { useEffect, useRef, createRef } from 'react'
import { Rect, Group } from 'react-konva'
import { IBullet } from 'state/spaceInvaderState'
import Konva from 'konva'

type BulletsProps = {
  uuid: string
}

const Bullets = ({ uuid }: BulletsProps) => {
  const bulletContainer = useRef(null)
  const bulletLength = window.bullets.length
  const bulletRefs = useRef([])

  useEffect(() => {
    const anim = new Konva.Animation((frame) => {
      window.bullets.forEach((bullet) => {
        const currentBullet = bulletRefs.current.find((b) => {
          return b.current?.attrs.id === bullet.id
        })

        if (currentBullet) {
          currentBullet.current.to({ y: -bullet.height * 10 })
        }

        console.log(frame.time);
      })
    }, bulletContainer.current.getLayer())

    anim.start()

    return () => {
      anim.stop()
    }
  })

  if (bulletRefs.current.length !== bulletLength) {
    // add or remove refs
    bulletRefs.current = Array(bulletLength)
      .fill()
      .map((_, i) => bulletRefs.current[i] || createRef())
  }

  return (
    <Group ref={bulletContainer}>
      {window.bullets.map(
        (bullet, i) =>
          bullet?.show && (
            <Rect
              id={uuid}
              ref={bulletRefs.current[i]}
              key={bullet.id}
              x={bullet.x}
              y={bullet.y}
              width={bullet.width}
              height={bullet.height}
              fill={'#4bff00'}
            />
          )
      )}
    </Group>
  )
}

export default Bullets
