import { useNavigate } from 'react-router-dom'
import { CheckCircle, Package } from 'lucide-react'
import BottomNav from '../components/BottomNav'
import { useCart } from '../context/CartContext'

export default function OrderConfirmation() {
  const navigate = useNavigate()
  const { items, technicianInstall, installDate, total, clearCart } = useCart()

  function handleDone() {
    clearCart()
    navigate('/dashboard')
  }

  return (
    <div className="app-shell">
      <div className="px-5 pt-12 pb-28 page-enter">
        {/* Hero */}
        <div className="text-center mb-6">
          <CheckCircle size={52} className="mx-auto mb-3" style={{ color: 'var(--color-brand)' }} />
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Order placed!</h1>
          <p className="text-xs mt-1 font-semibold" style={{ color: 'var(--color-brand)' }}>ECO-2026-8821</p>
        </div>

        {/* Items */}
        <div className="rounded-card p-4 mb-4" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <div className="flex items-center gap-2 mb-3">
            <Package size={16} style={{ color: 'var(--color-brand)' }} />
            <p className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>Your items</p>
          </div>
          {items.map(item => (
            <div key={item.id} className="flex justify-between py-1.5" style={{ borderBottom: '1px solid var(--color-border)' }}>
              <span className="text-sm" style={{ color: 'var(--color-text)' }}>{item.name} × {item.qty}</span>
              <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>${(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between pt-2">
            <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>Total paid</span>
            <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>${total.toFixed(2)} CAD</span>
          </div>
        </div>

        {/* Delivery */}
        <div className="rounded-card p-4 mb-4" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <p className="font-semibold text-sm mb-1" style={{ color: 'var(--color-text)' }}>Delivery</p>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Estimated 3–5 business days</p>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>247 Chemin du Lac, Saint-Sauveur, QC</p>
        </div>

        {/* Install appointment if booked */}
        {installDate && Object.values(technicianInstall).some(Boolean) && (
          <div className="rounded-card p-4 mb-4" style={{ background: 'var(--color-brand-light)', border: '1px solid var(--color-brand)' }}>
            <p className="font-semibold text-sm mb-1" style={{ color: 'var(--color-brand)' }}>Technician install booked</p>
            <p className="text-sm" style={{ color: 'var(--color-text)' }}>{installDate}</p>
          </div>
        )}

        <button
          onClick={handleDone}
          className="w-full py-4 rounded-card font-semibold text-white text-base"
          style={{ background: 'var(--color-brand)' }}
        >
          Back to dashboard
        </button>
      </div>
      <BottomNav />
    </div>
  )
}
