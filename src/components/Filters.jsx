import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import Slider from '@mui/material/Slider'
import Button from '@mui/material/Button'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded'
import { brands, types, minPrice, maxPrice } from '../data/cars.js'

const currency = (n) => n.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })

export default function Filters({ filters, setFilters }) {
  const update = (key) => (e) => setFilters((prev) => ({ ...prev, [key]: e.target.value }))

  const reset = () =>
    setFilters({ search: '', brand: 'Todas', type: 'Todos', priceRange: [minPrice, maxPrice] })

  return (
    <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3 }}>
      <Stack spacing={2.5}>
        <TextField
          fullWidth
          size="small"
          placeholder="Buscar por marca o modelo..."
          value={filters.search}
          onChange={update('search')}
          slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchRoundedIcon fontSize="small" /></InputAdornment> } }}
        />

        <TextField select fullWidth size="small" label="Marca" value={filters.brand} onChange={update('brand')}>
          <MenuItem value="Todas">Todas las marcas</MenuItem>
          {brands.map((b) => (
            <MenuItem key={b} value={b}>
              {b}
            </MenuItem>
          ))}
        </TextField>

        <TextField select fullWidth size="small" label="Tipo" value={filters.type} onChange={update('type')}>
          <MenuItem value="Todos">Todos los tipos</MenuItem>
          {types.map((t) => (
            <MenuItem key={t} value={t}>
              {t}
            </MenuItem>
          ))}
        </TextField>

        <Stack spacing={1}>
          <Typography variant="body2" color="text.secondary">
            Precio: {currency(filters.priceRange[0])} – {currency(filters.priceRange[1])}
          </Typography>
          <Slider
            value={filters.priceRange}
            onChange={(_, value) => setFilters((prev) => ({ ...prev, priceRange: value }))}
            min={minPrice}
            max={maxPrice}
            step={1000000}
            size="small"
            valueLabelDisplay="auto"
            valueLabelFormat={currency}
          />
        </Stack>

        <Button startIcon={<RestartAltRoundedIcon />} onClick={reset} size="small">
          Limpiar filtros
        </Button>
      </Stack>
    </Paper>
  )
}
