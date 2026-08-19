import { createContext, useMemo, useState, useEffect, useContext } from 'react'
import { createTheme } from '@mui/material/styles'

export const ColorModeContext = createContext({ mode: 'dark', toggleColorMode: () => {} })
export const useColorMode = () => useContext(ColorModeContext)

const getInitialMode = () => {
  if (typeof window === 'undefined') return 'dark'
  const stored = window.localStorage.getItem('color-mode')
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export const useColorModeProvider = () => {
  const [mode, setMode] = useState(getInitialMode)

  useEffect(() => {
    window.localStorage.setItem('color-mode', mode)
  }, [mode])

  return useMemo(
    () => ({ mode, toggleColorMode: () => setMode((prev) => (prev === 'light' ? 'dark' : 'light')) }),
    [mode],
  )
}

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: '#2F6FED', light: '#6796F5', dark: '#1E4FB8' },
      secondary: { main: '#FF6B35' },
      background:
        mode === 'dark' ? { default: '#0B0E14', paper: '#141822' } : { default: '#F5F7FA', paper: '#FFFFFF' },
      text:
        mode === 'dark' ? { primary: '#F2F3F5', secondary: '#98A2B3' } : { primary: '#111827', secondary: '#5B6472' },
    },
    shape: { borderRadius: 14 },
    typography: {
      fontFamily: '"Inter", "Poppins", system-ui, sans-serif',
      h1: { fontFamily: '"Poppins", sans-serif', fontWeight: 700 },
      h2: { fontFamily: '"Poppins", sans-serif', fontWeight: 700 },
      h3: { fontFamily: '"Poppins", sans-serif', fontWeight: 600 },
      h4: { fontFamily: '"Poppins", sans-serif', fontWeight: 600 },
      button: { textTransform: 'none', fontWeight: 600 },
    },
    components: {
      MuiButton: { styleOverrides: { root: { borderRadius: 10 } } },
      MuiChip: { styleOverrides: { root: { borderRadius: 8, fontWeight: 500 } } },
      MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
      MuiCard: { styleOverrides: { root: { backgroundImage: 'none' } } },
    },
  })
