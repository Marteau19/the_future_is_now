import { useNavigate } from 'react-router-dom'
import { ShoppingCart, CheckCircle } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const navigate = useNavigate()
  const { addToCart, items } = useCart()
  const inCart = items.some(i => i.id === product.id)

  return (
    <div
      className="rounded-card overflow-hidden"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-card)',
        opacity: product.inStock ? 1 : 0.6,
      }}
    >
      <div
        className="h-28 bg-cover bg-center"
        style={{ backgroundImage: `url(${product.image})` }}
      />
      <div className="p-3">
        {/* Compatibility badge */}
        <span
          className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold mb-1.5"
          style={{ background: 'var(--color-brand-light)', color: 'var(--color-brand)' }}
        >
          Compatible with your EC-5
        </span>

        <p
          className="font-semibold text-sm leading-snug cursor-pointer"
          style={{ color: 'var(--color-text)' }}
          onClick={() => navigate(`/parts/${product.id}`)}
        >
          {product.name}
        </p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
          {product.category}
        </p>

        <div className="flex items-center justify-between mt-3">
          <span className="font-bold text-base" style={{ color: 'var(--color-text)' }}>
            ${product.price.toFixed(2)}
          </span>
          {product.inStock ? (
            <button
              onClick={() => inCart ? navigate('/cart') : addToCart(product)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white transition-colors"
              style={{ background: inCart ? 'var(--color-brand-dark)' : 'var(--color-brand)' }}
            >
              {inCart ? <CheckCircle size={14} /> : <ShoppingCart size={14} />}
              {inCart ? 'In cart' : 'Add'}
            </button>
          ) : (
            <span className="text-xs px-3 py-1.5 rounded-full" style={{ background: 'var(--color-surface-alt)', color: 'var(--color-text-disabled)' }}>
              Out of stock
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
