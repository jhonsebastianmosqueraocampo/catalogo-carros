import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'
import DirectionsCarFilledRoundedIcon from '@mui/icons-material/DirectionsCarFilledRounded'
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded'
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded'
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded'
import { useColorMode } from '../theme.js'
import { useCart } from '../context/CartContext.jsx'

export default function Navbar() {
  const { mode, toggleColorMode } = useColorMode()
  const { count } = useCart()

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider' }}
    >
      <Toolbar sx={{ maxWidth: 1280, width: '100%', mx: 'auto' }}>
        <Box
          component={Link}
          to="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            flexGrow: 1,
            textDecoration: 'none',
            color: 'text.primary',
          }}
        >
          <DirectionsCarFilledRoundedIcon sx={{ color: 'primary.main' }} />
          <Typography variant="h6" sx={{ fontFamily: '"Poppins", sans-serif', fontWeight: 700 }}>
            AutoCatálogo
          </Typography>
        </Box>

        <IconButton component={Link} to="/carrito" aria-label="Carrito de compras" sx={{ mr: 0.5 }}>
          <Badge badgeContent={count} color="secondary">
            <ShoppingCartRoundedIcon />
          </Badge>
        </IconButton>

        <IconButton onClick={toggleColorMode} aria-label="Cambiar tema">
          {mode === 'dark' ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
