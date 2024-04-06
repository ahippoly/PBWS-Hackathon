import NavBar from '@/components/General/NavBar'
import { Divider, Stack } from '@mui/material'

function GlobalLayout ({ children } : {children: React.ReactNode}) {
  return (
    <>
      <NavBar />
      <Stack
        direction='row'
        flexGrow={1}
        minHeight={0}
      >
        <Divider orientation='vertical' flexItem />
        <Stack direction='column' gap={2} p={3} flexGrow={1} justifyContent='center'>
          {children}
        </Stack>
      </Stack>
    </>

  )
}

export default GlobalLayout
