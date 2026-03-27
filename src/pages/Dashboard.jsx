import { useNavigate } from 'react-router-dom'
import { CalendarCheck, ShoppingBag, History, HeadphonesIcon } from 'lucide-react'
import BottomNav from '../components/BottomNav'
import HealthRing from '../components/HealthRing'
import NotificationBanner from '../components/NotificationBanner'
import StatusBadge from '../components/StatusBadge'
import TimelineItem from '../components/TimelineItem'
import CoachMark from '../components/CoachMark'
import customer from '../data/customer.json'
import system from '../data/system.json'
import history from '../data/history.json'

const hour = new Date().getHours()
const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

const QUICK_ACTIONS = [
  { icon: CalendarCheck, label: 'Book Service', path: '/book' },
  { icon: ShoppingBag,   label: 'Buy Parts',    path: '/parts' },
  { icon: History,       label: 'History',      path: '/system' },
  { icon: HeadphonesIcon, label: 'Support',     path: '/account' },
]

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="app-shell">
      <CoachMark />

      {/* Header */}
      <div className="px-5 pt-8 pb-2" style={{ background: 'var(--color-bg)' }}>
        <img src="/logo.png" alt="Ecoflo" className="h-6 mb-4" />
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{greeting},</p>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>{customer.firstName}</h1>
      </div>

      <div className="px-5 pb-28 space-y-4">
        {/* Health ring */}
        <div
          id="health-ring"
          className="rounded-card p-5 flex items-center gap-5"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
        >
          <HealthRing score={system.healthScore} />
          <div>
            <StatusBadge status={system.status} />
            <p className="font-semibold text-base mt-1.5" style={{ color: 'var(--color-text)' }}>
              Your system is healthy
            </p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
              {system.model}
            </p>
          </div>
        </div>

        {/* Notification */}
        <NotificationBanner
          type="info"
          message="Filter renewal due in approximately 14 months"
        />

        {/* System info */}
        <div
          className="rounded-card p-4 space-y-2"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
        >
          <p className="font-semibold text-sm mb-1" style={{ color: 'var(--color-text)' }}>System info</p>
          <InfoRow label="Serial" value={system.serial} />
          <InfoRow label="Installed" value={system.installed} />
          <InfoRow label="Address" value={system.address} />
        </div>

        {/* Next maintenance */}
        <div
          className="rounded-card p-4 flex items-center justify-between"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--color-text-secondary)' }}>
              Next maintenance
            </p>
            <p className="font-bold text-base" style={{ color: 'var(--color-text)' }}>{system.nextMaintenance}</p>
          </div>
          <button
            onClick={() => navigate('/book')}
            className="px-4 py-2 rounded-full text-sm font-semibold text-white"
            style={{ background: 'var(--color-brand)' }}
          >
            Book now
          </button>
        </div>

        {/* Quick actions */}
        <div id="quick-actions">
          <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--color-text-secondary)' }}>
            Quick actions
          </p>
          <div className="grid grid-cols-4 gap-2">
            {QUICK_ACTIONS.map(({ icon: Icon, label, path }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className="flex flex-col items-center gap-1.5 py-3 rounded-card"
                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
              >
                <Icon size={20} strokeWidth={1.5} style={{ color: 'var(--color-brand)' }} />
                <span className="text-xs font-medium text-center leading-tight" style={{ color: 'var(--color-text)' }}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* History */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--color-text-secondary)' }}>
            History
          </p>
          <div className="rounded-card p-4" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            {history.map((item, i) => (
              <TimelineItem key={item.id} item={item} isLast={i === history.length - 1} />
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{label}</span>
      <span className="text-xs font-medium text-right" style={{ color: 'var(--color-text)' }}>{value}</span>
    </div>
  )
}
