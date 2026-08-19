import { useState } from 'react'
import { Link } from 'react-router-dom'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import { useCart } from '../context/CartContext.jsx'

const currency = (n) => n.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })

export default function CartPage() {
  const { items, removeFromCart, setQty, clearCart, total } = useCart()
  const [placed, setPlaced] = useState(false)

  const handleCheckout = () => {
    setPlaced(true)
    clearCart()
  }

  if (placed) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
        <Alert severity="success" sx={{ mb: 3 }}>
          ¡Pedido simulado con éxito! Este es un checkout de demostración, no se realizó ningún cobro real.
        </Alert>
        <Button component={Link} to="/" variant="contained" startIcon={<ArrowBackRoundedIcon />}>
          Volver al catálogo
        </Button>
      </Container>
    )
  }

  if (items.length === 0) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
        <ShoppingCartRoundedIcon sx={{ fontSize: 56, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          Tu carrito está vacío
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Explora el catálogo y agrega los vehículos que te interesen.
        </Typography>
        <Button component={Link} to="/" variant="contained" startIcon={<ArrowBackRoundedIcon />}>
          Ir al catálogo
        </Button>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Tu carrito
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={2}>
            {items.map((item) => (
              <Paper key={item.id} variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                  <Box component="img" src={item.image} alt={`${item.brand} ${item.model}`} sx={{ width: 96, height: 64, objectFit: 'cover', borderRadius: 2 }} />
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      {item.brand} {item.model}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {currency(item.price)} c/u
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
                    <IconButton size="small" aria-label="Disminuir cantidad" onClick={() => setQty(item.id, item.qty - 1)} disabled={item.qty <= 1}>
                      <RemoveRoundedIcon fontSize="small" />
                    </IconButton>
                    <Typography sx={{ minWidth: 24, textAlign: 'center' }}>{item.qty}</Typography>
                    <IconButton size="small" aria-label="Aumentar cantidad" onClick={() => setQty(item.id, item.qty + 1)}>
                      <AddRoundedIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, minWidth: 110, textAlign: 'right' }}>
                    {currency(item.price * item.qty)}
                  </Typography>
                  <IconButton size="small" color="error" onClick={() => removeFromCart(item.id)} aria-label="Quitar">
                    <DeleteOutlineRoundedIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Paper>
            ))}
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, position: { md: 'sticky' }, top: { md: 88 } }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
              Resumen
            </Typography>
            <Divider sx={{ mb: 1.5 }} />
            <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Subtotal
              </Typography>
              <Typography variant="body2">{currency(total)}</Typography>
            </Stack>
            <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Impuestos y envío
              </Typography>
              <Typography variant="body2">Incluidos</Typography>
            </Stack>
            <Divider sx={{ mb: 1.5 }} />
            <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 2.5 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Total
              </Typography>
              <Typography variant="subtitle1" color="secondary.main" sx={{ fontWeight: 700 }}>
                {currency(total)}
              </Typography>
            </Stack>
            <Button fullWidth variant="contained" size="large" onClick={handleCheckout}>
              Finalizar compra
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
