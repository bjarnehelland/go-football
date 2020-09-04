import { useRouter } from 'next/router'
import { useState } from 'react'
import { Grid, Input, Button } from 'theme-ui'

import { createTournament } from '@/lib/db'

export default function AddTournament() {
  const router = useRouter()
  const [name, setName] = useState('')
  async function handleCreateTournament(e) {
    if (!name) return
    e.preventDefault()
    const tournament = await createTournament(name)
    router.push(`/tournaments/${tournament.id}`)
  }
  return (
    <Grid>
      <Input value={name} onChange={(e) => setName(e.target.value)} />
      <Button onClick={handleCreateTournament} disabled={!name}>
        + Tournament
      </Button>
    </Grid>
  )
}
