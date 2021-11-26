import Head from 'next/head'
import styles from 'static/scss/pages/Home.module.scss'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Gesture controlled Games by Tim van de Vathorst</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        ></meta>
      </Head>

      <h1>Select the game you want to play</h1>
      <ul>
        <li>
          <Link href="/pong">Pong</Link>
        </li>
        <li>
          <Link href="/space-invaders">Space invaders</Link>
        </li>
      </ul>
    </>
  )
}
