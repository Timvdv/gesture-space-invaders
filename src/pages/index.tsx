import Head from 'next/head'
import styles from 'static/scss/pages/Home.module.scss'

import Carousel from 'components/carousel/Carousel'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          The <a href="https://nextjs.org">Next Boilerplate!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing
          <code className={styles.code}>src/pages/index.js</code>
        </p>

        <Carousel />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  )
}
