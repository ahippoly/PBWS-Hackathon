import { Card, CardContent, CardHeader, Stack, Typography } from '@mui/material'

function CredentialPendingAction ({ credential } : {credential: DiplomaWeb3}) {
  return (
    <Card>
      <Stack>
        <img />
        <Stack>
          <CardHeader title={credential.university} />
          <CardContent>
            <Typography variant='body1'>Sent you a credential</Typography>
            <Typography variant='body1'>PhD in Computer Science</Typography>
          </CardContent>
        </Stack>
      </Stack>

    </Card>
  )
}

export default CredentialPendingAction
