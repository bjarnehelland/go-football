import { GetStaticProps, GetStaticPaths } from 'next'
import db from '@/lib/firebase-admin'

export default function Tournament(props) {
  return <div>{JSON.stringify(props)}</div>
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
