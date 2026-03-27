import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, Users } from 'lucide-react'
import ProgressBar from '../components/ProgressBar'
import BookingCalendar from '../components/BookingCalendar'
import CoachMark from '../components/CoachMark'

const CREW = [
  { name: 'Marc Bouchard', initials: 'MB' },
  { name: 'Julien Roy', initials: 'JR' },
]

export default function BookInstallation() {
  const navigate = useNavigate()
  const [booking, setBooking] = useState(null)
  const [confirmed, setConfirmed] = useState(false)

  function handleConfirm() {
    setConfirmed(true)
    localStorage.setItem('ecoflo_installBooking', JSON.stringify(booking))
  }

  return (
    <div className="app-shell">
      <ProgressBar stage={5} />
      <CoachMark />

      <div className="px-5 pt-6 pb-24 page-enter">
        {!confirmed ? (
          <>
            <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>Schedule Installation</h1>
            <p className="text-sm mb-5" style={{ color: 'var(--color-text-secondary)' }}>
              Installation typically takes 6–8 hours. We'll send a reminder 48h before.
            </p>

            <div
              id="booking-calendar"
              className="rounded-card p-4 mb-4"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
            >
              <BookingCalendar onSelect={setBooking} />
            </div>

            {booking && (
              <div className="rounded-card p-4 mb-6 fade-in" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Users size={16} style={{ color: 'var(--color-brand)' }} />
                  <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>Your installation crew</span>
                </div>
                <div className="flex gap-3">
                  {CREW.map(m => (
                    <div key={m.name} className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ background: 'var(--color-brand-muted)' }}
                      >
                        {m.initials}
                      </div>
                      <span className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>{m.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              disabled={!booking}
              onClick={handleConfirm}
              className="w-full py-4 rounded-card font-semibold text-white text-base transition-opacity"
              style={{ background: 'var(--color-brand)', opacity: booking ? 1 : 0.4 }}
            >
              Confirm installation date
            </button>
          </>
        ) : (
          <div className="fade-in">
            <div
              className="rounded-card p-5 mb-6 text-center"
              style={{ background: 'var(--color-brand-light)', border: '1.5px solid var(--color-brand)' }}
            >
              <CheckCircle size={40} className="mx-auto mb-2" style={{ color: 'var(--color-brand)' }} />
              <h2 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>Installation scheduled!</h2>
              <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                {booking.date} · Starting at {booking.slot}
              </p>
              <p className="text-xs mt-2 font-semibold" style={{ color: 'var(--color-brand)' }}>
                Ref: INST-2026-0088
              </p>
            </div>
            <p className="text-sm mb-6 text-center" style={{ color: 'var(--color-text-secondary)' }}>
              You'll receive a reminder 48 hours before installation day.
            </p>
            <button
              onClick={() => navigate('/installation-complete')}
              className="w-full py-4 rounded-card font-semibold text-white text-base"
              style={{ background: 'var(--color-brand)' }}
            >
              View installation summary
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
