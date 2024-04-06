import { Box, Button, Stack, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { SendSOLToRandomAddress } from '@/components/Web3Related/SendToRandomAddress'

function HomePage () {
  return (
    <Box
      textAlign='center'
    >
      <Typography
        variant='h1'
        id='big-title'
        sx={{ fontSize: '3rem', fontWeight: 'bold', color: 'primary.main' }}
      >Title of the product
      </Typography>
      <SendSOLToRandomAddress />
    </Box>
  )
}

export default HomePage
