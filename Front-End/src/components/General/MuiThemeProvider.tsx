import { ThemeProvider } from '@emotion/react'
import { CssBaseline, createTheme, PaletteMode } from '@mui/material'

export const themeOptions = {
  palette: {
    mode: 'light' as PaletteMode,
    background: {
      default: '#fafafa',
      paper: '#fff',
    },
    primary: {
      main: '#8c52ff',
    },
    secondary: {
      main: '#8f8f8f',
    },
    text: {
      // primary: '#7b62c1',
    },
  },
  typography: {
    fontFamily: 'Poppins',
    // fontWeightLight: 200,
    // fontWeightRegular: 100,
    // fontWeightMedium: 200,
    // h1: {}
    // body1: {
    //   fontWeight: 200,
    // },
    // body2: {
    //   fontWeight: 200,
    // },
    // subtitle1: {
    //   fontWeight: 200,
    // },
    // subtitle2: {
    //   fontWeight: 200,
    // },
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
