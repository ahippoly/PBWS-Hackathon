import AddNewCredential from '@/components/Provider/MyCredentials/AddNewCredential'
import Web3Credential from '@/components/Provider/MyCredentials/Web3Credential'
import { diplomasWeb3 } from '@/mocks/DiplomasWeb3.mock'
import { Stack, Typography } from '@mui/material'

function MyCredentials () {
  return (
    <Stack
      gap={10}
      justifyContent='center'
      alignItems='center'
    >
      <Typography variant='h1'>All Credential</Typography>
      <Stack
        spacing={5}
        flexWrap='wrap'
        useFlexGap
        direction='row'

      >
        {diplomasWeb3.map((diploma) => (
          <Web3Credential key={diploma.id} credential={diploma} />
        ))}
        <AddNewCredential />
      </Stack>

    </Stack>
  )
}

export default MyCredentials
