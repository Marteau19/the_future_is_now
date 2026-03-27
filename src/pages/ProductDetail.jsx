import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle, ShoppingCart } from 'lucide-react'
import BottomNav from '../components/BottomNav'
import { useCart } from '../context/CartContext'
import parts from '../data/parts.json'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, items } = useCart()
  const product = parts.find(p => p.id === id)
  const inCart = items.some(i => i.id === id)

  if (!product) return (
    <div className="app-shell px-5 pt-20 text-center">
      <p style={{ color: 'var(--color-text-secondary)' }}>Product not found.</p>
      <button onClick={() => navigate('/parts')} className="mt-4 text-sm" style={{ color: 'var(--color-brand)' }}>Back to store</button>
    </div>
  )

  return (
    <div className="app-shell">
      {/* Image */}
      <div
        className="relative h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${product.image})` }}
      >
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.9)' }}
        >
          <ArrowLeft size={16} />
        </button>
      </div>

      <div className="px-5 pt-5 pb-28">
        {/* Compatibility */}
        <span
          className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mb-2"
          style={{ background: 'var(--color-brand-light)', color: 'var(--color-brand)' }}
        >
          Compatible with your EC-5
        </span>

        <h1 className="text-xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>{product.name}</h1>
        <p className="text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>{product.category}</p>
        <p className="text-2xl font-bold mb-3" style={{ color: 'var(--color-text)' }}>${product.price.toFixed(2)}</p>
        <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>{product.description}</p>

        {/* DIY info */}
        <div
          className="flex items-center gap-2 p-3 rounded-lg mb-5"
          style={{ background: product.diyFriendly ? 'var(--color-brand-light)' : '#FEF3C7' }}
        >
          <CheckCircle size={14} style={{ color: product.diyFriendly ? 'var(--color-brand)' : '#92400E', flexShrink: 0 }} />
          <p className="text-xs" style={{ color: product.diyFriendly ? 'var(--color-brand)' : '#92400E' }}>
            {product.diyFriendly ? 'Self-installation compatible — no technician required' : 'Technician installation recommended'}
          </p>
        </div>

        {product.inStock ? (
          <button
            onClick={() => inCart ? navigate('/cart') : addToCart(product)}
            className="w-full py-4 rounded-card font-semibold text-white text-base flex items-center justify-center gap-2"
            style={{ background: inCart ? 'var(--color-brand-dark)' : 'var(--color-brand)' }}
          >
            {inCart ? <CheckCircle size={18} /> : <ShoppingCart size={18} />}
            {inCart ? 'View cart' : 'Add to cart'}
          </button>
        ) : (
          <button disabled className="w-full py-4 rounded-card font-semibold text-base" style={{ background: 'var(--color-surface-alt)', color: 'var(--color-text-disabled)' }}>
            Out of stock
          </button>
        )}
      </div>
      <BottomNav />
    </div>
  )
}
