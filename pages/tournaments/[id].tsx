import { GetStaticProps, GetStaticPaths } from 'next'
import db from '@/lib/firebase-admin'
import Head from 'next/head'

function WorldCupTieBreakerRules() {
  return (
    <div>
      <h3>World cup tie breaker rules</h3>
      In the league format, the ranking in each group is determined as follows:
      <ul>
        <li>greatest number of points obtained in all group matches</li>
        <li>goal difference in all group matches</li>
        <li>greatest number of goals scored in all group matches</li>
        <li>
          If two or more teams are equal on the basis of the above three criteria, their rankings shall be determined as
          follows:
          <ul>
            <li>greatest number of points obtained in the group matches between the teams concerned;</li>
            <li>goal difference resulting from the group matches between the teams concerned</li>
            <li>greater number of goals scored in all group matches between the teams concerned</li>
            <li>
              the goals scored away from home count double between the teams concerned (if the tie is only between two
              teams)
            </li>
            <li>
              fair play points system in which the number of yellow and red cards in all group matches is considered
              according to the following deductions: – fi rst yellow card: minus 1 point – second yellow card/indirect
              red card: minus 3 points – direct red card: minus 4 points – yellow card and direct red card: minus 5
              points
            </li>
            <li>drawing of lots by the FIFA Organising Committee.</li>
          </ul>
        </li>
      </ul>
    </div>
  )
}

function EuroTieBreakerRules() {
  return (
    <div>
      <h3>Euro tie breaker rules</h3>
      If two or more teams finish equal on points after all the group matches have been played, the following criteria
      will be applied to determine the ranking:
      <ul>
        <li>Greater number of points obtained in the matches between the teams in question.</li>
        <li>
          Goal difference resulting from the matches between the teams in question (if more than two teams finish
          equal).
        </li>
        <li>
          Greater number of goals scored in the matches between the teams in question (if more than two teams finish
          equal).
        </li>
        <li>Goal difference in all the group matches.</li>
        <li>Greater number of goals scored in all the group matches.</li>
        <li>Fair Play conduct of the teams (final tournament).</li>
        <li>Higher position in the UEFA national team coefficient ranking.</li>
      </ul>
      The four best third-placed teams are determined according to the following criteria applied, in the order given,
      to the final tournament group matches :
      <ul>
        <li>Greater number of points obtained.</li>
        <li>Superior goal difference.</li>
        <li>Greater number of goals scored.</li>
        <li>Fair Play conduct of the teams (final tournament).</li>
        <li>Higher position in the UEFA national team coefficient ranking.</li>
      </ul>
    </div>
  )
}
export default function Tournament({ tournament }) {
  return (
    <div>
      <Head>
        <title>Go football - {tournament?.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>{tournament?.name}</h1>

      <WorldCupTieBreakerRules />
      <EuroTieBreakerRules />
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
