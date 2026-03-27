import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import ProgressBar from '../components/ProgressBar'
import BookingCalendar from '../components/BookingCalendar'
import TechnicianCard from '../components/TechnicianCard'
import CoachMark from '../components/CoachMark'

export default function BookSoilAnalysis() {
  const navigate = useNavigate()
  const [booking, setBooking] = useState(null)
  const [confirmed, setConfirmed] = useState(false)

  function handleConfirm() {
    setConfirmed(true)
    localStorage.setItem('ecoflo_soilBooking', JSON.stringify(booking))
  }

  return (
    <div className="app-shell">
      <ProgressBar stage={3} />
      <CoachMark />

      <div className="px-5 pt-6 pb-24 page-enter">
        {!confirmed ? (
          <>
            <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>Schedule Soil Analysis</h1>
            <p className="text-sm mb-5" style={{ color: 'var(--color-text-secondary)' }}>
              A technician will visit your property to confirm the ideal system placement.
            </p>

            <div
              id="booking-calendar"
              className="rounded-card p-4 mb-4"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
            >
              <BookingCalendar onSelect={setBooking} />
            </div>

            {booking && (
              <div id="technician-card" className="mb-6 fade-in">
                <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                  Your technician
                </p>
                <TechnicianCard note={`Arriving ${booking.slot} on ${booking.date}`} />
              </div>
            )}

            <button
              disabled={!booking}
              onClick={handleConfirm}
              className="w-full py-4 rounded-card font-semibold text-white text-base transition-opacity"
              style={{ background: 'var(--color-brand)', opacity: booking ? 1 : 0.4 }}
            >
              Confirm appointment
            </button>
          </>
        ) : (
          <div className="fade-in">
            <div
              className="rounded-card p-5 mb-6 text-center"
              style={{ background: 'var(--color-brand-light)', border: '1.5px solid var(--color-brand)' }}
            >
              <CheckCircle size={40} className="mx-auto mb-2" style={{ color: 'var(--color-brand)' }} />
              <h2 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>Appointment confirmed!</h2>
              <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                {booking.date} at {booking.slot}
              </p>
              <p className="text-xs mt-2 font-semibold" style={{ color: 'var(--color-brand)' }}>
                Ref: SOIL-2026-0042
              </p>
            </div>
            <TechnicianCard note={`Arriving ${booking.slot} on ${booking.date}`} />
            <button
              onClick={() => navigate('/soil-report')}
              className="w-full mt-6 py-4 rounded-card font-semibold text-white text-base"
              style={{ background: 'var(--color-brand)' }}
            >
              View soil report
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
