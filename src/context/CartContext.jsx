import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [technicianInstall, setTechnicianInstall] = useState({})
  const [installDate, setInstallDate] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('ecoflo_cart')
    if (stored) {
      const { items: i, technicianInstall: t, installDate: d } = JSON.parse(stored)
      if (i) setItems(i)
      if (t) setTechnicianInstall(t)
      if (d) setInstallDate(d)
    }
  }, [])

  function persist(nextItems, nextTech, nextDate) {
    localStorage.setItem('ecoflo_cart', JSON.stringify({
      items: nextItems,
      technicianInstall: nextTech,
      installDate: nextDate,
    }))
  }

  function addToCart(product, qty = 1) {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id)
      const next = existing
        ? prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i)
        : [...prev, { ...product, qty }]
      persist(next, technicianInstall, installDate)
      return next
    })
  }

  function removeFromCart(productId) {
    setItems(prev => {
      const next = prev.filter(i => i.id !== productId)
      persist(next, technicianInstall, installDate)
      return next
    })
  }

  function updateQty(productId, qty) {
    if (qty < 1) { removeFromCart(productId); return }
    setItems(prev => {
      const next = prev.map(i => i.id === productId ? { ...i, qty } : i)
      persist(next, technicianInstall, installDate)
      return next
    })
  }

  function toggleTechnicianInstall(productId, value) {
    setTechnicianInstall(prev => {
      const next = { ...prev, [productId]: value }
      persist(items, next, installDate)
      return next
    })
  }

  function setInstall(date) {
    setInstallDate(date)
    persist(items, technicianInstall, date)
  }

  function clearCart() {
    setItems([])
    setTechnicianInstall({})
    setInstallDate(null)
    localStorage.removeItem('ecoflo_cart')
  }

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  const techFee = Object.values(technicianInstall).filter(Boolean).length * 85
  const shipping = subtotal >= 100 ? 0 : 12.99
  const total = subtotal + techFee + shipping
  const itemCount = items.reduce((s, i) => s + i.qty, 0)

  return (
    <CartContext.Provider value={{
      items,
      technicianInstall,
      installDate,
      subtotal,
      techFee,
      shipping,
      total,
      itemCount,
      addToCart,
      removeFromCart,
      updateQty,
      toggleTechnicianInstall,
      setInstall,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
