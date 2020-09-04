import Head from 'next/head'
import { Flex, Heading, Button } from 'theme-ui'
import User from '@/components/User'
import { createTournament } from '@/lib/db'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  async function handleCreateTournament(e) {
    e.preventDefault()

    const tournament = await createTournament('yolo')
    router.push(`tournament/${tournament.id}`)
  }
  return (
    <div>
      <Head>
        <title>Go football</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex sx={{ p: 4 }}>
        <Heading>Go football</Heading>
        <User />
      </Flex>
      <Button onClick={handleCreateTournament}>+ Tournament</Button>
    </div>
  )
}
