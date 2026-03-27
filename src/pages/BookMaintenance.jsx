import { useState } from 'react'
import { CheckCircle, Wrench, Search, AlertTriangle, Phone } from 'lucide-react'
import BottomNav from '../components/BottomNav'
import ServiceCard from '../components/ServiceCard'
import BookingCalendar from '../components/BookingCalendar'
import TechnicianCard from '../components/TechnicianCard'
import PaymentForm from '../components/PaymentForm'
import CoachMark from '../components/CoachMark'

const SERVICES = [
  { id: 'annual', icon: Wrench,         title: 'Annual Maintenance',   description: 'Full system inspection and tune-up', price: 185, recommended: true  },
  { id: 'filter', icon: Search,         title: 'Filter Inspection',    description: 'Check and replace filter if needed',  price: 95,  recommended: false },
  { id: 'repair', icon: AlertTriangle,  title: 'Repair / Diagnostic',  description: 'Diagnose and repair system issues',   price: null, recommended: false },
  { id: 'urgent', icon: Phone,          title: 'Emergency Call',       description: 'Priority response within 4 hours',   price: 250, recommended: false },
]

export default function BookMaintenance() {
  const [service, setService] = useState(null)
  const [booking, setBooking] = useState(null)
  const [confirmed, setConfirmed] = useState(false)
  const [payOpen, setPayOpen] = useState(false)
  const [paid, setPaid] = useState(false)
  const step = !service ? 0 : !confirmed ? 1 : 2

  return (
    <div className="app-shell">
      <CoachMark />
      <div className="px-5 pt-8 pb-28 page-enter">
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>Book a Service</h1>
        <p className="text-sm mb-5" style={{ color: 'var(--color-text-secondary)' }}>
          {step === 0 ? 'What kind of service do you need?' : step === 1 ? 'Choose a date and time' : 'Appointment confirmed'}
        </p>

        {/* Step 0: service selection */}
        {step === 0 && (
          <div id="service-selector" className="space-y-3">
            {SERVICES.map(s => (
              <ServiceCard
                key={s.id}
                {...s}
                selected={service?.id === s.id}
                onClick={() => setService(s)}
              />
            ))}
            {service && (
              <button
                className="w-full mt-2 py-4 rounded-card font-semibold text-white text-base"
                style={{ background: 'var(--color-brand)' }}
                onClick={() => {}}
              >
                Continue — {service.title}
              </button>
            )}
          </div>
        )}

        {/* Step 1: calendar */}
        {step === 1 && (
          <div className="fade-in">
            <div
              className="rounded-card p-4 mb-4"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
            >
              <BookingCalendar onSelect={setBooking} />
            </div>

            {booking && (
              <div className="mb-4 fade-in">
                <TechnicianCard note={`Arriving ${booking.slot} on ${booking.date}`} />
              </div>
            )}

            <button
              disabled={!booking}
              onClick={() => setConfirmed(true)}
              className="w-full py-4 rounded-card font-semibold text-white text-base transition-opacity"
              style={{ background: 'var(--color-brand)', opacity: booking ? 1 : 0.4 }}
            >
              Confirm appointment
            </button>
          </div>
        )}

        {/* Step 2: confirmed + post-service preview */}
        {step === 2 && (
          <div className="fade-in space-y-4">
            <div
              className="rounded-card p-5 text-center"
              style={{ background: 'var(--color-brand-light)', border: '1.5px solid var(--color-brand)' }}
            >
              <CheckCircle size={40} className="mx-auto mb-2" style={{ color: 'var(--color-brand)' }} />
              <h2 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>Service booked!</h2>
              <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                {booking?.date} · {booking?.slot}
              </p>
              <p className="text-xs mt-2 font-semibold" style={{ color: 'var(--color-brand)' }}>
                Ref: MAINT-2027-0031
              </p>
            </div>

            {/* Post-service report preview */}
            <div id="post-service-report" className="rounded-card p-4" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <p className="font-semibold text-sm mb-3" style={{ color: 'var(--color-text)' }}>
                Post-service report (sample)
              </p>
              <TechnicianCard note="System performing normally. Filter in good condition." />
              <div className="mt-3">
                {!paid && !payOpen && (
                  <button
                    onClick={() => setPayOpen(true)}
                    className="w-full py-3 rounded-lg font-semibold text-white text-sm"
                    style={{ background: 'var(--color-brand)' }}
                  >
                    Pay invoice · $185 CAD
                  </button>
                )}
                {payOpen && !paid && (
                  <div className="fade-in">
                    <PaymentForm amount={185} currency="CAD" onSuccess={() => setPaid(true)} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  )
}
