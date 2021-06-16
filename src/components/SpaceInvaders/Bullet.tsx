import { useRef } from 'react'
import { useRecoilState } from 'recoil'
import { Spring, animated } from 'react-spring/renderprops-konva'

import { gameState, singleBulletState } from 'state/spaceInvaderState'

type BulletProps = {
  uuid: string
}

const Bullet = ({ uuid }: BulletProps) => {
  const [game] = useRecoilState(gameState)
  const [bullet, setBullet] = useRecoilState(singleBulletState(uuid)) as any

  const bulletRef = useRef(null)

  return (
    <>
      {bullet?.show && (
        <Spring
          native
          config={{ duration: 1000 }}
          from={{
            y: game.canvasHeight - bullet.height,
          }}
          to={{
            y: -bullet.width,
          }}
          onFrame={(animation) => {
            // This will trigger an INSANE amount of renders
            setBullet({
              ...bullet,
              y: animation.y,
            })
          }}
        >
          {(props) => {
            return (
              <animated.Rect
                {...props}
                id={uuid}
                ref={bulletRef}
                x={bullet.x}
                width={bullet.width}
                height={bullet.height}
                fill={'black'}
              />
            )
          }}
        </Spring>
      )}
    </>
  )
}

export default Bullet
