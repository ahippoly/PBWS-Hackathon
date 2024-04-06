import { Button, Fab, Stack, Typography } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { cardSize } from '@/config/Ui-style'

function AddNewCredential () {
  return (
    <Button
      sx={{ width: `${cardSize}px` }}
      variant='outlined'
    >
      <Stack
        justifyContent='center'
        alignItems='center'
        sx={{ width: '100%' }}
      >
        <AddCircleIcon />
        <Typography variant='body1'>Add New</Typography>
      </Stack>
    </Button>
  )
}

export default AddNewCredential
