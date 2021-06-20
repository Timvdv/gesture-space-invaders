import Head from 'next/head'
import styles from 'static/scss/pages/Home.module.scss'
import dynamic from 'next/dynamic'

import Video from 'components/Video/Video'

const NoSSRGame = dynamic(() => import('components/SpaceInvaders/Game'), {
  ssr: false,
})

export default function Home() {
  return (
    <>
      <Head>
        <title>Gesture controlled Space Invaders - Tim van de Vathorst</title>
        <script src="https://cdn.jsdelivr.net/npm/handtrackjs@latest/dist/handtrack.min.js">
          {' '}
        </script>
      </Head>

      <div className={styles.container}>
        {/* <Video /> */}
        <NoSSRGame />
      </div>
    </>
  )
}
