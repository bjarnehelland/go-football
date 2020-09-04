import { GetStaticProps } from 'next'
import Link from 'next/link'
import db from '@/lib/firebase-admin'
import AddTournament from '@/components/AddTournament'
import Head from 'next/head'

export default function Tournaments({ tournaments }) {
  return (
    <div>
      <Head>
        <title>Go football - Tournaments</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AddTournament />
      <ul>
        {tournaments.map((t) => (
          <li key={t.id}>
            <Link href="/tournaments/[id]" as={`/tournaments/${t.id}`}>
              <a>{t.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const snapshot = await db.collection('tournaments').get()
  const tournaments = []
  snapshot.forEach((doc) => {
    tournaments.push({ id: doc.id, ...doc.data() })
  })

  return {
    props: { tournaments },
    revalidate: 1,
  }
}
