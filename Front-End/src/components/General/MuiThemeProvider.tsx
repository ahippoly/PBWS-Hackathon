import { ThemeProvider } from '@emotion/react'
import { CssBaseline, createTheme, PaletteMode } from '@mui/material'

export const themeOptions = {
  palette: {
    mode: 'dark' as PaletteMode,
    background: {
      default: '#1e1e1e',
      paper: '#616161',
    },
    primary: {
      main: '#7b62c1',
    },
    secondary: {
      main: '#f8f9f9',
    },
    text: {
      // primary: '#7b62c1',
    },
  },
  typography: {
    fontFamily: 'Museo Moderno',
    fontWeightLight: 500,
    fontWeightRegular: 500,
    fontWeightMedium: 500,
  },
}

const theme = createTheme(themeOptions)

function MuiThemeProvider ({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default MuiThemeProvider
