import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Logo from '@/assets/img/logo.png'

export default function NavBar () {
  return (
    <Box>
      <AppBar
        position='static'
        sx={{
          backgroundColor: 'background.default',
          zIndex: 99,
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <img src={Logo} alt='logo' style={{ height: '50px' }} />
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
          <WalletMultiButton />
          {/* <Logo /> */}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
