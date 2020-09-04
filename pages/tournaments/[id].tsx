import { GetStaticProps, GetStaticPaths } from 'next'
import db from '@/lib/firebase-admin'
import Head from 'next/head'

export default function Tournament({ tournament }) {
  return (
    <div>
      <Head>
        <title>Go football - {tournament?.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {JSON.stringify(tournament)}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const tournamentRef = await db.collection('tournaments').doc(context.params.id.toString())
  const doc = await tournamentRef.get()
  let tournament = doc.exists && doc.data()

  return {
    props: { tournament },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}
