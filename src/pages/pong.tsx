import Head from 'next/head'
import styles from 'static/scss/pages/Home.module.scss'
import dynamic from 'next/dynamic'

const NoSSRGame = dynamic(() => import('components/Pong/Game'), {
  ssr: false,
})

const NoSSRVideo = dynamic(() => import('components/Video/Video'), {
  ssr: false,
})

export default function Home() {
  return (
    <>
      <Head>
        <title>Gesture controlled Space Invaders - Tim van de Vathorst</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        ></meta>
      </Head>

      <div className={styles.container}>
        {/* <NoSSRVideo /> */}
        <NoSSRGame />
      </div>
    </>
  )
}
