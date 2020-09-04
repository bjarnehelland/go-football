import Head from 'next/head'
import { Flex, Heading } from 'theme-ui'
import User from '@/components/User'
import Link from 'next/link'

export default function Home() {
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
      <Link href="/tournaments" as={'/tournaments'}>
        <a>Tournaments</a>
      </Link>
    </div>
  )
}
