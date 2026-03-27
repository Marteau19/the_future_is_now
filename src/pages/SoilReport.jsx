import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileCheck, CheckCircle } from 'lucide-react'
import ProgressBar from '../components/ProgressBar'
import CoachMark from '../components/CoachMark'

const REPORT = {
  reportDate: '2026-04-10',
  soilType: 'Sandy loam — moderate permeability',
  recommendation: 'Ecoflo Compact Biofilter EC-5 confirmed',
  permitReady: true,
  pricing: {
    system: 8400,
    installation: 3200,
    permit: 350,
    total: 11950,
    currency: 'CAD',
  },
}

export default function SoilReport() {
  const navigate = useNavigate()
  const [approved, setApproved] = useState(false)

  function handleApprove() {
    setApproved(true)
    setTimeout(() => navigate('/book-installation'), 800)
  }

  return (
    <div className="app-shell">
      <ProgressBar stage={4} />
      <CoachMark />

      <div className="px-5 pt-6 pb-24 page-enter">
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>Soil Report</h1>
        <p className="text-sm mb-5" style={{ color: 'var(--color-text-secondary)' }}>
          Analysis completed {REPORT.reportDate}
        </p>

        {/* Report card */}
        <div
          id="report-card"
          className="rounded-card p-4 mb-4"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <FileCheck size={18} style={{ color: 'var(--color-brand)' }} />
            <span className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>Analysis results</span>
          </div>
          <div className="space-y-2">
            <Row label="Soil type" value={REPORT.soilType} />
            <Row label="System confirmed" value={REPORT.recommendation} highlight />
            <Row
              label="Permit documentation"
              value={REPORT.permitReady ? '✓ Ready to submit' : 'Pending'}
              highlight={REPORT.permitReady}
            />
          </div>
        </div>

        {/* Pricing */}
        <div
          id="pricing-breakdown"
          className="rounded-card p-4 mb-6"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
        >
          <p className="font-semibold text-sm mb-3" style={{ color: 'var(--color-text)' }}>Price breakdown</p>
          <div className="space-y-2">
            <LineItem label="System — Ecoflo EC-5" amount={REPORT.pricing.system} />
            <LineItem label="Installation" amount={REPORT.pricing.installation} />
            <LineItem label="Municipal permit" amount={REPORT.pricing.permit} />
            <div className="my-2" style={{ borderTop: '1px solid var(--color-border)' }} />
            <LineItem label="Total" amount={REPORT.pricing.total} currency={REPORT.pricing.currency} bold />
          </div>
        </div>

        <button
          onClick={handleApprove}
          disabled={approved}
          className="w-full py-4 rounded-card font-semibold text-white text-base transition-opacity"
          style={{ background: 'var(--color-brand)', opacity: approved ? 0.7 : 1 }}
        >
          {approved ? 'Approved ✓' : 'Approve and schedule installation'}
        </button>
      </div>
    </div>
  )
}

function Row({ label, value, highlight }) {
  return (
    <div className="flex items-start justify-between gap-2">
      <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{label}</span>
      <span
        className="text-xs font-medium text-right"
        style={{ color: highlight ? 'var(--color-brand)' : 'var(--color-text)' }}
      >
        {value}
      </span>
    </div>
  )
}

function LineItem({ label, amount, currency, bold }) {
  return (
    <div className="flex items-center justify-between">
      <span
        className={`text-sm ${bold ? 'font-bold' : ''}`}
        style={{ color: 'var(--color-text)' }}
      >
        {label}
      </span>
      <span
        className={`text-sm ${bold ? 'font-bold' : 'font-medium'}`}
        style={{ color: bold ? 'var(--color-text)' : 'var(--color-text-secondary)' }}
      >
        ${amount.toLocaleString()}{currency ? ` ${currency}` : ''}
      </span>
    </div>
  )
}
