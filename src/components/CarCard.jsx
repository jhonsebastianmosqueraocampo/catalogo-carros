import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

const currency = (n) => n.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })

export default function CarCard({ car }) {
  const { addToCart } = useCart()

  return (
    <Card
      variant="outlined"
      data-cy="car-card"
      data-car-id={car.id}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: 6, borderColor: 'primary.main' },
      }}
    >
      <CardActionArea component={Link} to={`/carro/${car.id}`} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
        <CardMedia component="img" height="180" image={car.images[0]} alt={`${car.brand} ${car.model}`} />
        <CardContent sx={{ flexGrow: 1 }}>
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              {car.brand} {car.model}
            </Typography>
            <Chip label={car.type} size="small" color="primary" variant="outlined" />
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
            {car.year} · {car.transmission} · {car.fuel}
          </Typography>
          <Typography variant="h6" color="secondary.main" sx={{ fontWeight: 700 }}>
            {currency(car.price)}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
        <Button
          fullWidth
          size="small"
          variant="outlined"
          startIcon={<AddShoppingCartRoundedIcon />}
          onClick={() => addToCart(car)}
          data-cy="add-to-cart-btn"
        >
          Agregar al carrito
        </Button>
      </CardActions>
    </Card>
  )
}
