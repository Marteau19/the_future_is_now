import { useState } from 'react'
import { CheckCircle, CreditCard } from 'lucide-react'

export default function PaymentForm({ amount, currency = 'CAD', onSuccess }) {
  const [card, setCard] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [processing, setProcessing] = useState(false)
  const [done, setDone] = useState(false)

  function formatCard(v) {
    return v.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19)
  }
  function formatExpiry(v) {
    const d = v.replace(/\D/g, '')
    if (d.length >= 3) return `${d.slice(0, 2)}/${d.slice(2, 4)}`
    return d
  }

  function handlePay(e) {
    e.preventDefault()
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      setDone(true)
      onSuccess && onSuccess()
    }, 1500)
  }

  if (done) {
    return (
      <div className="flex flex-col items-center gap-3 py-6 fade-in">
        <CheckCircle size={48} style={{ color: 'var(--color-brand)' }} />
        <p className="font-semibold text-base" style={{ color: 'var(--color-text)' }}>Payment complete</p>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          ${amount?.toFixed(2)} {currency} · Receipt saved to your account
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handlePay} className="space-y-3">
      <div className="flex items-center gap-2 mb-1">
        <CreditCard size={18} style={{ color: 'var(--color-text-secondary)' }} />
        <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
          Pay ${amount?.toFixed(2)} {currency}
        </span>
      </div>

      <input
        type="text"
        placeholder="Card number"
        value={card}
        onChange={e => setCard(formatCard(e.target.value))}
        className="w-full px-4 py-3 rounded-lg text-sm outline-none"
        style={{ border: '1.5px solid var(--color-border)', background: 'var(--color-surface)' }}
        required
      />
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="MM/YY"
          value={expiry}
          onChange={e => setExpiry(formatExpiry(e.target.value))}
          maxLength={5}
          className="flex-1 px-4 py-3 rounded-lg text-sm outline-none"
          style={{ border: '1.5px solid var(--color-border)', background: 'var(--color-surface)' }}
          required
        />
        <input
          type="text"
          placeholder="CVC"
          value={cvc}
          onChange={e => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
          className="flex-1 px-4 py-3 rounded-lg text-sm outline-none"
          style={{ border: '1.5px solid var(--color-border)', background: 'var(--color-surface)' }}
          required
        />
      </div>

      <button
        type="submit"
        disabled={processing}
        className="w-full py-3 rounded-lg font-semibold text-white transition-opacity"
        style={{ background: 'var(--color-brand)', opacity: processing ? 0.7 : 1 }}
      >
        {processing ? 'Processing…' : `Pay $${amount?.toFixed(2)} ${currency}`}
      </button>
    </form>
  )
}
