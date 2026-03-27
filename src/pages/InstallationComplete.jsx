import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, Phone, Mail, MessageCircle, Calendar } from 'lucide-react'
import ProgressBar from '../components/ProgressBar'
import DocumentCard from '../components/DocumentCard'
import PaymentForm from '../components/PaymentForm'
import CoachMark from '../components/CoachMark'
import { useJourney } from '../context/JourneyContext'

export default function InstallationComplete() {
  const navigate = useNavigate()
  const { completeInstallation } = useJourney()
  const [payOpen, setPayOpen] = useState(false)
  const [paid, setPaid] = useState(false)

  function handleDashboard() {
    completeInstallation()
    navigate('/dashboard')
  }

  return (
    <div className="app-shell">
      <ProgressBar stage={6} />
      <CoachMark />

      <div className="px-5 pt-6 pb-28 space-y-4 page-enter">
        {/* Hero */}
        <div className="text-center py-2 mb-2">
          <CheckCircle size={48} className="mx-auto mb-2" style={{ color: 'var(--color-brand)' }} />
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Your system is installed!</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
            Ecoflo Compact Biofilter EC-5 · May 3, 2026
          </p>
        </div>

        {/* Invoice */}
        <div
          id="invoice-card"
          className="rounded-card p-4"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>Invoice · $11,950 CAD</p>
            {paid
              ? <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: 'var(--color-brand-light)', color: 'var(--color-brand)' }}>Paid</span>
              : <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: '#FEF3C7', color: '#92400E' }}>Due</span>
            }
          </div>
          {!paid && !payOpen && (
            <button
              onClick={() => setPayOpen(true)}
              className="w-full py-3 rounded-lg font-semibold text-white text-sm"
              style={{ background: 'var(--color-brand)' }}
            >
              Pay now
            </button>
          )}
          {payOpen && !paid && (
            <div className="mt-2 fade-in">
              <PaymentForm amount={11950} currency="CAD" onSuccess={() => setPaid(true)} />
            </div>
          )}
        </div>

        {/* Documents */}
        <div className="rounded-card p-4 space-y-2" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <p className="font-semibold text-sm mb-1" style={{ color: 'var(--color-text)' }}>Documents</p>
          <DocumentCard name="System Specs" size="1.2 MB" />
          <DocumentCard name="Warranty Certificate" size="0.8 MB" />
          <DocumentCard name="Municipality Permit Copy" size="2.1 MB" />
        </div>

        {/* Support */}
        <div className="rounded-card p-4" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <p className="font-semibold text-sm mb-3" style={{ color: 'var(--color-text)' }}>Support</p>
          <div className="space-y-2">
            <SupportRow icon={Phone} label="1-800-ECOFLO-1" />
            <SupportRow icon={Mail} label="support@ecoflo.com" />
            <SupportRow icon={MessageCircle} label="Start a chat" />
          </div>
        </div>

        {/* Maintenance schedule */}
        <div
          id="maintenance-schedule"
          className="rounded-card p-4"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={16} style={{ color: 'var(--color-brand)' }} />
            <p className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>Maintenance schedule</p>
          </div>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            First service due: <span className="font-semibold" style={{ color: 'var(--color-text)' }}>March 2027</span>
          </p>
          <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>Annual thereafter. We'll remind you.</p>
        </div>

        <button
          onClick={handleDashboard}
          className="w-full py-4 rounded-card font-semibold text-white text-base"
          style={{ background: 'var(--color-brand)' }}
        >
          Go to my dashboard
        </button>
      </div>
    </div>
  )
}

function SupportRow({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-3">
      <Icon size={16} strokeWidth={1.5} style={{ color: 'var(--color-text-secondary)' }} />
      <span className="text-sm" style={{ color: 'var(--color-text)' }}>{label}</span>
    </div>
  )
}
