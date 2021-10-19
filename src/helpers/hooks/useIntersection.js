import { useEffect, useRef } from 'react'
import haveIntersection from 'helpers/intersect'

export const useIntersection = (callback) => {
  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef = useRef()
  const previousTimeRef = useRef()

  const collision = (time) => {
    // Loop through all invaders
    window.invaders.forEach((invader) => {
      // Loop through all bullets
      window.bullets.forEach((bullet) => {
        if (haveIntersection(invader, bullet)) {
          const newBulletIndex = window.bullets.findIndex(
            (bulletIndex) => bulletIndex.id === bullet.id
          )

          const newInvaderIndex = window.invaders.findIndex(
            (invaderIndex) => invaderIndex.id === invader.id
          )

          if (newBulletIndex > -1 || newInvaderIndex > -1) {
            return callback(newBulletIndex, newInvaderIndex)
          }
        }
      })
    })

    previousTimeRef.current = time

    requestRef.current = requestAnimationFrame(collision)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(collision)
    return () => cancelAnimationFrame(requestRef.current)
  }, []) // Make sure the effect runs only once
}
