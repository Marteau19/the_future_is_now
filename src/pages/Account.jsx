import { useNavigate } from 'react-router-dom'
import { LogOut, RotateCcw, User, Bell, Shield } from 'lucide-react'
import BottomNav from '../components/BottomNav'
import { useJourney } from '../context/JourneyContext'
import customer from '../data/customer.json'

export default function Account() {
  const navigate = useNavigate()
  const { resetDemo } = useJourney()

  function handleReset() {
    resetDemo()
    navigate('/')
  }

  return (
    <div className="app-shell">
      <div className="px-5 pt-8 pb-28 page-enter">
        <h1 className="text-2xl font-bold mb-5" style={{ color: 'var(--color-text)' }}>Account</h1>

        {/* Profile */}
        <div className="flex items-center gap-4 p-4 rounded-card mb-5" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ background: 'var(--color-brand)' }}>
            {customer.firstName[0]}{customer.lastName[0]}
          </div>
          <div>
            <p className="font-bold text-base" style={{ color: 'var(--color-text)' }}>{customer.firstName} {customer.lastName}</p>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{customer.email}</p>
          </div>
        </div>

        {/* Menu */}
        <div className="space-y-2">
          <MenuItem icon={User} label="Personal information" />
          <MenuItem icon={Bell} label="Notifications" />
          <MenuItem icon={Shield} label="Privacy & security" />
        </div>

        {/* Danger zone */}
        <div className="mt-8 space-y-3">
          <button
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-card font-semibold text-sm border-2"
            style={{ borderColor: 'var(--color-brand)', color: 'var(--color-brand)', background: 'transparent' }}
          >
            <RotateCcw size={16} />
            Reset prototype demo
          </button>
          <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-card font-semibold text-sm" style={{ background: 'var(--color-surface-alt)', color: 'var(--color-text-secondary)' }}>
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}

function MenuItem({ icon: Icon, label }) {
  return (
    <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-card text-left" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
      <Icon size={18} strokeWidth={1.5} style={{ color: 'var(--color-text-secondary)' }} />
      <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{label}</span>
    </button>
  )
}
