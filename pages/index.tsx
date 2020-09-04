import Head from 'next/head'
import { Flex, Heading } from 'theme-ui'
import User from '@/components/User'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Go football</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex p={4}>
        <Heading>Go football</Heading>
        <User />
      </Flex>
    </div>
  )
}
