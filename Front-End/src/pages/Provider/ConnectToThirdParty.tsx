import { Box, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useState } from 'react'

function ConnectToThirdParty () {
  const [loading, setLoading] = useState(false)

  const handleConnect = () => {
    console.log('Connect to third party')
  }

  return (
    <Box>
      <Typography variant='h1'>Connect to Third Party</Typography>
      <LoadingButton
        loading={loading}
        onClick={handleConnect}
        variant='contained'
        color='primary'
      />

    </Box>

  )
}

export default ConnectToThirdParty
