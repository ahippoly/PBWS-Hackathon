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

gsap.registerPlugin(useGSAP)

export function App () {
  return (
    <SolanaWalletProvider>
      <MuiThemeProvider>
        <BrowserRouter>
          <Stack bgcolor='background.default' direction='column' sx={{ height: '100%', maxHeight: '100%' }}>
            <Routes>
              <Route path='/' element={<HomePage />} />
            </Routes>
          </Stack>
        </BrowserRouter>
      </MuiThemeProvider>
    </SolanaWalletProvider>

  )
}
