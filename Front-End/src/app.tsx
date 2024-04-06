import { useState } from 'react'
import { ReactComponent as Logo } from './logo.svg'
import './app.scss'
import NavBar from './components/General/NavBar'
import MuiThemeProvider from './components/General/MuiThemeProvider'
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import { Divider, Stack } from '@mui/material'
import HomePage from './pages/HomePage'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { SolanaWalletProvider } from './components/Web3Related/SolanaWalletProvider'
import CreateCredentials from './pages/Provider/CreateCredentials'
import GlobalLayout from './layout/GlobalLayout'
import MyCredentials from './pages/Provider/MyCredentials'
import SendCredential from './pages/Provider/SendCredential'
import ConnectToThirdParty from './pages/Provider/ConnectToThirdParty'

gsap.registerPlugin(useGSAP)

export function App () {
  return (
    <SolanaWalletProvider>
      <MuiThemeProvider>
        <BrowserRouter>
          <Stack bgcolor='background.default' direction='column' sx={{ height: '100%', maxHeight: '100%' }}>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/provider/connect' element={<GlobalLayout><ConnectToThirdParty /></GlobalLayout>} />
              <Route path='/provider/create' element={<GlobalLayout><CreateCredentials /></GlobalLayout>} />
              <Route path='/provider/my-credentials' element={<GlobalLayout><MyCredentials /></GlobalLayout>} />
              <Route path='/provider/send-credential' element={<GlobalLayout><SendCredential /></GlobalLayout>} />
            </Routes>
          </Stack>
        </BrowserRouter>
      </MuiThemeProvider>
    </SolanaWalletProvider>

  )
}
