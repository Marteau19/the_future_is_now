import { useNavigate } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import BottomNav from '../components/BottomNav'
import ProductCard from '../components/ProductCard'
import CoachMark from '../components/CoachMark'
import { useCart } from '../context/CartContext'
import parts from '../data/parts.json'

export default function PartsStore() {
  const navigate = useNavigate()
  const { itemCount } = useCart()

  return (
    <div className="app-shell">
      <CoachMark />
      <div className="px-5 pt-8 pb-28 page-enter">
        {/* Header */}
        <div className="flex items-start justify-between mb-1">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Parts Store</h1>
            <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
              Filtered for your EC-5 system
            </p>
          </div>
          <button
            onClick={() => navigate('/cart')}
            className="relative p-2 rounded-full"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
          >
            <ShoppingCart size={20} strokeWidth={1.5} style={{ color: 'var(--color-text)' }} />
            {itemCount > 0 && (
              <span
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center text-white font-bold"
                style={{ background: 'var(--color-brand)' }}
              >
                {itemCount}
              </span>
            )}
          </button>
        </div>

        {/* Product grid */}
        <div id="product-grid" className="grid grid-cols-2 gap-3 mt-4">
          {parts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
