import { Card, CardActions, CardContent, CardHeader, IconButton, Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
function Web3Credential ({ credential } : {credential: DiplomaWeb3}) {
  return (
    <Card
      sx={{ width: '400px' }}
    >
      <CardHeader title={credential.name} />
      <CardContent>
        <Typography variant='body1'>{credential.description}</Typography>
      </CardContent>
      <CardActions>
        <IconButton>
          <SendIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default Web3Credential
