import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useAuth } from '@lib/auth'

export default function Home() {
  const auth = useAuth()
  return (
    <div className={styles.container}>
      <Head>
        <title>Go football</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {auth.user ? (
          <>
            {auth.user.name}
            <button onClick={() => auth.signout()}>Sign out</button>
          </>
        ) : (
          <button onClick={() => auth.signinWithGoogle()}>Sign in</button>
        )}
      </main>
    </div>
  )
}
