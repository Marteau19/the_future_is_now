import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import BottomNav from '../components/BottomNav'
import BookingCalendar from '../components/BookingCalendar'
import PaymentForm from '../components/PaymentForm'
import { useCart } from '../context/CartContext'

export default function Checkout() {
  const navigate = useNavigate()
  const { items, subtotal, techFee, shipping, total, toggleTechnicianInstall, technicianInstall, setInstall } = useCart()

  const needsTech = items.some(i => !i.diyFriendly)

  function handleSuccess() {
    navigate('/order-confirmation')
  }

  return (
    <div className="app-shell">
      <div className="flex items-center gap-3 px-5 pt-8 pb-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={20} style={{ color: 'var(--color-text)' }} />
        </button>
        <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>Checkout</h1>
      </div>

      <div className="px-5 pt-4 pb-28 space-y-5">
        {/* Delivery */}
        <section>
          <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--color-text-secondary)' }}>
            Delivery address
          </p>
          <div className="rounded-card p-4" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>Marie Tremblay</p>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>247 Chemin du Lac, Saint-Sauveur, QC J0R 1R0</p>
          </div>
        </section>

        {/* Install option */}
        {needsTech && (
          <section id="install-option">
            <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--color-text-secondary)' }}>
              Installation
            </p>
            {items.filter(i => !i.diyFriendly).map(item => (
              <div key={item.id} className="rounded-card p-4 mb-3" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                <p className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text)' }}>{item.name}</p>
                <div className="flex gap-2">
                  {['self', 'tech'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => toggleTechnicianInstall(item.id, opt === 'tech')}
                      className="flex-1 py-2.5 rounded-lg text-xs font-semibold border transition-colors"
                      style={{
                        background: (technicianInstall[item.id] === true && opt === 'tech') || (technicianInstall[item.id] !== true && opt === 'self')
                          ? 'var(--color-brand)' : 'var(--color-surface)',
                        color: (technicianInstall[item.id] === true && opt === 'tech') || (technicianInstall[item.id] !== true && opt === 'self')
                          ? '#fff' : 'var(--color-text)',
                        borderColor: (technicianInstall[item.id] === true && opt === 'tech') || (technicianInstall[item.id] !== true && opt === 'self')
                          ? 'var(--color-brand)' : 'var(--color-border)',
                      }}
                    >
                      {opt === 'self' ? "I'll install it myself" : 'Book a technician (+$85)'}
                    </button>
                  ))}
                </div>
                {technicianInstall[item.id] === true && (
                  <div className="mt-3 fade-in">
                    <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-text-secondary)' }}>Pick an install date</p>
                    <BookingCalendar onSelect={d => setInstall(d.date)} />
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Order summary */}
        <section>
          <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--color-text-secondary)' }}>
            Order summary
          </p>
          <div className="rounded-card p-4 space-y-2" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            {items.map(i => (
              <div key={i.id} className="flex justify-between">
                <span className="text-sm" style={{ color: 'var(--color-text)' }}>{i.name} × {i.qty}</span>
                <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>${(i.price * i.qty).toFixed(2)}</span>
              </div>
            ))}
            {techFee > 0 && <div className="flex justify-between"><span className="text-sm" style={{ color: 'var(--color-text)' }}>Technician install</span><span className="text-sm font-medium">${techFee.toFixed(2)}</span></div>}
            <div className="flex justify-between"><span className="text-sm" style={{ color: 'var(--color-text)' }}>Shipping</span><span className="text-sm font-medium">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '8px' }}>
              <div className="flex justify-between">
                <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>Total</span>
                <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>${total.toFixed(2)} CAD</span>
              </div>
            </div>
          </div>
        </section>

        {/* Payment */}
        <section>
          <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--color-text-secondary)' }}>
            Payment
          </p>
          <div className="rounded-card p-4" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <PaymentForm amount={total} currency="CAD" onSuccess={handleSuccess} />
          </div>
        </section>
      </div>
      <BottomNav />
    </div>
  )
}
