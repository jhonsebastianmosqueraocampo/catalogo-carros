import { useMemo, useState } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { cars, minPrice, maxPrice } from '../data/cars.js'
import Filters from '../components/Filters.jsx'
import CarCard from '../components/CarCard.jsx'

export default function CatalogPage() {
  const [filters, setFilters] = useState({ search: '', brand: 'Todas', type: 'Todos', priceRange: [minPrice, maxPrice] })

  const filtered = useMemo(() => {
    const search = filters.search.trim().toLowerCase()
    return cars.filter((car) => {
      const matchesSearch = !search || `${car.brand} ${car.model}`.toLowerCase().includes(search)
      const matchesBrand = filters.brand === 'Todas' || car.brand === filters.brand
      const matchesType = filters.type === 'Todos' || car.type === filters.type
      const matchesPrice = car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1]
      return matchesSearch && matchesBrand && matchesType && matchesPrice
    })
  }, [filters])

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
        Catálogo de vehículos
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {filtered.length} de {cars.length} vehículos disponibles
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Box sx={{ position: { md: 'sticky' }, top: { md: 88 } }}>
            <Filters filters={filters} setFilters={setFilters} />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 9 }}>
          {filtered.length === 0 ? (
            <Typography color="text.secondary" sx={{ py: 8, textAlign: 'center' }}>
              No encontramos vehículos con esos filtros.
            </Typography>
          ) : (
            <Grid container spacing={2.5}>
              {filtered.map((car) => (
                <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={car.id}>
                  <CarCard car={car} />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  )
}
