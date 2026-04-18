import { createContext, useContext, useState, useCallback } from 'react'

const CartContext = createContext(null)

const WHATSAPP = '5493584323047'

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [open, setOpen] = useState(false)

  const addItem = useCallback((product) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.id === product.id)
      if (exists) {
        return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.categories?.name || '',
        image_url: product.image_url,
        qty: 1,
      }]
    })
    setOpen(true)
  }, [])

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const updateQty = useCallback((id, qty) => {
    if (qty < 1) return removeItem(id)
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, qty } : i))
  }, [removeItem])

  const clearCart = useCallback(() => setItems([]), [])

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0)

  const sendWhatsApp = useCallback(() => {
    if (items.length === 0) return
    const lines = items.map((i) =>
      `• ${i.name} (${i.category}) x${i.qty}${i.price ? ' — ' + i.price : ''}`
    )
    const msg = `¡Hola! Me interesan estos productos:\n\n${lines.join('\n')}\n\n¿Podrían darme más información?`
    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }, [items])

  return (
    <CartContext.Provider value={{
      items, open, setOpen, addItem, removeItem, updateQty, clearCart, totalItems, sendWhatsApp,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
