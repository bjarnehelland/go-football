import { Flex, Button, Box, Avatar } from 'theme-ui'
import { useAuth } from '@/lib/auth'

export default function User() {
  const auth = useAuth()
  if (auth.user) {
    return (
      <Flex ml={'auto'} sx={{ alignItems: 'center' }}>
        <Button p={2} onClick={() => auth.signout()}>
          Sign out
        </Button>
        <Box p={2}>{auth.user.name}</Box>
        <Avatar p={2} src={auth.user.photoUrl} alt={auth.user.name} />
      </Flex>
    )
  }
  return (
    <Button ml={'auto'} onClick={() => auth.signinWithGoogle()}>
      Sign in
    </Button>
  )
}
