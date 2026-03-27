import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Trash2, Plus, Minus } from 'lucide-react'
import BottomNav from '../components/BottomNav'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const navigate = useNavigate()
  const { items, subtotal, shipping, total, updateQty, removeFromCart } = useCart()

  return (
    <div className="app-shell">
      <div className="flex items-center gap-3 px-5 pt-8 pb-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={20} style={{ color: 'var(--color-text)' }} />
        </button>
        <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>Your cart</h1>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-5 text-center">
          <p className="text-base font-semibold mb-2" style={{ color: 'var(--color-text)' }}>Your cart is empty</p>
          <p className="text-sm mb-5" style={{ color: 'var(--color-text-secondary)' }}>Browse parts compatible with your EC-5 system.</p>
          <button onClick={() => navigate('/parts')} className="px-6 py-3 rounded-full font-semibold text-white text-sm" style={{ background: 'var(--color-brand)' }}>
            Browse parts
          </button>
        </div>
      ) : (
        <div className="px-5 pb-32 pt-4 space-y-3">
          {items.map(item => (
            <div key={item.id} className="flex items-center gap-3 py-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
              <div className="h-14 w-14 rounded-lg bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url(${item.image})` }} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-text)' }}>{item.name}</p>
                <p className="text-sm font-bold mt-0.5" style={{ color: 'var(--color-text)' }}>${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'var(--color-surface-alt)' }}>
                  <Minus size={12} />
                </button>
                <span className="text-sm font-semibold w-4 text-center">{item.qty}</span>
                <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'var(--color-surface-alt)' }}>
                  <Plus size={12} />
                </button>
                <button onClick={() => removeFromCart(item.id)} className="ml-1">
                  <Trash2 size={16} style={{ color: 'var(--color-danger)' }} />
                </button>
              </div>
            </div>
          ))}

          {/* Summary */}
          <div className="rounded-card p-4 space-y-2" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <SummaryRow label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
            <SummaryRow label="Shipping" value={shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`} />
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '8px', marginTop: '4px' }}>
              <SummaryRow label="Total" value={`$${total.toFixed(2)} CAD`} bold />
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-4 rounded-card font-semibold text-white text-base"
            style={{ background: 'var(--color-brand)' }}
          >
            Proceed to checkout
          </button>
        </div>
      )}
      <BottomNav />
    </div>
  )
}

function SummaryRow({ label, value, bold }) {
  return (
    <div className="flex justify-between">
      <span className={`text-sm ${bold ? 'font-bold' : ''}`} style={{ color: 'var(--color-text)' }}>{label}</span>
      <span className={`text-sm ${bold ? 'font-bold' : 'font-medium'}`} style={{ color: 'var(--color-text)' }}>{value}</span>
    </div>
  )
}
