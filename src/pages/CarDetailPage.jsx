import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import SpeedRoundedIcon from '@mui/icons-material/SpeedRounded'
import LocalGasStationRoundedIcon from '@mui/icons-material/LocalGasStationRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import EventSeatRoundedIcon from '@mui/icons-material/EventSeatRounded'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded'
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded'
import { cars } from '../data/cars.js'
import { useCart } from '../context/CartContext.jsx'

const currency = (n) => n.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })

const SPECS = [
  { key: 'engine', label: 'Motor', icon: SettingsRoundedIcon },
  { key: 'power', label: 'Potencia', icon: SpeedRoundedIcon },
  { key: 'transmission', label: 'Transmisión', icon: SettingsRoundedIcon },
  { key: 'fuel', label: 'Combustible', icon: LocalGasStationRoundedIcon },
  { key: 'consumption', label: 'Consumo', icon: LocalGasStationRoundedIcon },
  { key: 'seats', label: 'Puestos', icon: EventSeatRoundedIcon },
  { key: 'year', label: 'Año', icon: CalendarMonthRoundedIcon },
  { key: 'color', label: 'Color', icon: PaletteRoundedIcon },
]

export default function CarDetailPage() {
  const { id } = useParams()
  const car = cars.find((c) => c.id === id)
  const [activeImage, setActiveImage] = useState(0)
  const [added, setAdded] = useState(false)
  const { addToCart } = useCart()

  if (!car) return <Navigate to="/" replace />

  const handleAdd = () => {
    addToCart(car)
    setAdded(true)
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button component={Link} to="/" startIcon={<ArrowBackRoundedIcon />} sx={{ mb: 3 }}>
        Volver al catálogo
      </Button>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Box
            component="img"
            src={car.images[activeImage]}
            alt={`${car.brand} ${car.model}`}
            sx={{ width: '100%', height: { xs: 260, md: 420 }, objectFit: 'cover', borderRadius: 3, mb: 1.5 }}
          />
          <Stack direction="row" spacing={1.5}>
            {car.images.map((img, i) => (
              <Box
                key={img}
                component="img"
                src={img}
                onClick={() => setActiveImage(i)}
                alt={`Vista ${i + 1}`}
                data-cy="gallery-thumb"
                sx={{
                  width: 90,
                  height: 60,
                  objectFit: 'cover',
                  borderRadius: 1.5,
                  cursor: 'pointer',
                  opacity: activeImage === i ? 1 : 0.55,
                  outline: activeImage === i ? '2px solid' : 'none',
                  outlineColor: 'primary.main',
                  transition: 'opacity 0.2s ease',
                }}
              />
            ))}
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Chip label={car.type} color="primary" size="small" sx={{ mb: 1.5 }} />
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
            {car.brand} {car.model}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {car.description}
          </Typography>
          <Typography variant="h4" color="secondary.main" sx={{ fontWeight: 700, mb: 2 }}>
            {currency(car.price)}
          </Typography>

          <Button
            variant="contained"
            size="large"
            startIcon={<AddShoppingCartRoundedIcon />}
            onClick={handleAdd}
            sx={{ mb: 3 }}
            data-cy="detail-add-to-cart"
          >
            Agregar al carrito
          </Button>

          <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
              Ficha técnica
            </Typography>
            <Divider sx={{ mb: 1.5 }} />
            <Grid container spacing={2}>
              {SPECS.map(({ key, label, icon: Icon }) => (
                <Grid size={6} key={key}>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Icon fontSize="small" sx={{ color: 'primary.main' }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block">
                        {label}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {car[key]}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar open={added} autoHideDuration={2500} onClose={() => setAdded(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" onClose={() => setAdded(false)} variant="filled">
          {car.brand} {car.model} agregado al carrito.
        </Alert>
      </Snackbar>
    </Container>
  )
}
