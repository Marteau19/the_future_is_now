import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProgressBar from '../components/ProgressBar'
import CoachMark from '../components/CoachMark'

export default function CreateAccount() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '', phone: '', address: '',
  })

  function update(k, v) { setForm(f => ({ ...f, [k]: v })) }

  function handleSubmit(e) {
    e.preventDefault()
    localStorage.setItem('ecoflo_account', JSON.stringify(form))
    navigate('/book-soil-analysis')
  }

  const inputClass = "w-full px-4 py-3 rounded-lg text-sm outline-none transition-colors"
  const inputStyle = { border: '1.5px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)' }

  return (
    <div className="app-shell">
      <ProgressBar stage={2} />
      <CoachMark />

      <div className="px-5 pt-6 pb-24 page-enter">
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>Create your account</h1>
        <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>
          Your Ecoflo account, your system, your history — all in one place.
        </p>

        <form id="account-form" onSubmit={handleSubmit} className="space-y-3">
          <div className="flex gap-3">
            <input required placeholder="First name" value={form.firstName} onChange={e => update('firstName', e.target.value)}
              className={inputClass} style={inputStyle} />
            <input required placeholder="Last name" value={form.lastName} onChange={e => update('lastName', e.target.value)}
              className={inputClass} style={inputStyle} />
          </div>
          <input required type="email" placeholder="Email" value={form.email} onChange={e => update('email', e.target.value)}
            className={inputClass} style={inputStyle} />
          <input required type="password" placeholder="Password" value={form.password} onChange={e => update('password', e.target.value)}
            className={inputClass} style={inputStyle} />
          <input type="tel" placeholder="Phone (optional)" value={form.phone} onChange={e => update('phone', e.target.value)}
            className={inputClass} style={inputStyle} />
          <input placeholder="Property address (optional)" value={form.address} onChange={e => update('address', e.target.value)}
            className={inputClass} style={inputStyle} />

          <button
            type="submit"
            className="w-full py-4 rounded-card font-semibold text-white text-base mt-2"
            style={{ background: 'var(--color-brand)' }}
          >
            Create my Ecoflo account
          </button>
        </form>
      </div>
    </div>
  )
}
