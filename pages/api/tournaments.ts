import { NextApiRequest, NextApiResponse } from 'next'
import db from '@/lib/firebase-admin'
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const snapshot = await db.collection('tournaments').get()
  if (snapshot.empty) {
    console.log('No matching documents.')
    res.status(200).json([])
    return
  }
  const tournaments = []
  snapshot.forEach((doc) => {
    tournaments.push({ id: doc.id, ...doc.data() })
  })
  res.status(200).json(tournaments)
}
