import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'

const CartContext = createContext(null)
export const useCart = () => useContext(CartContext)

const load = () => {
  try {
    const raw = window.localStorage.getItem('catalogo-carros:cart')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(load)

  useEffect(() => {
    window.localStorage.setItem('catalogo-carros:cart', JSON.stringify(items))
  }, [items])

  const addToCart = useCallback((car) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === car.id)
      if (existing) {
        return prev.map((i) => (i.id === car.id ? { ...i, qty: i.qty + 1 } : i))
      }
      return [...prev, { id: car.id, brand: car.brand, model: car.model, price: car.price, image: car.images[0], qty: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const setQty = useCallback((id, qty) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items])
  const total = useMemo(() => items.reduce((sum, i) => sum + i.qty * i.price, 0), [items])

  const value = { items, addToCart, removeFromCart, setQty, clearCart, count, total }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
