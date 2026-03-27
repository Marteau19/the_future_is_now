import BottomNav from '../components/BottomNav'
import StatusBadge from '../components/StatusBadge'
import TimelineItem from '../components/TimelineItem'
import system from '../data/system.json'
import history from '../data/history.json'

export default function MySystem() {
  return (
    <div className="app-shell">
      <div className="px-5 pt-8 pb-28 page-enter">
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>My System</h1>
        <p className="text-sm mb-5" style={{ color: 'var(--color-text-secondary)' }}>Full details and history</p>

        {/* System card */}
        <div className="rounded-card p-4 mb-4" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <div className="flex items-center justify-between mb-3">
            <p className="font-bold text-base" style={{ color: 'var(--color-text)' }}>{system.model}</p>
            <StatusBadge status={system.status} />
          </div>
          {[
            ['Serial', system.serial],
            ['Installed', system.installed],
            ['Address', system.address],
            ['Filter type', system.filterType],
            ['Warranty', `${system.warrantyYears} years`],
            ['Next maintenance', system.nextMaintenance],
            ['Filter renewal', system.filterRenewalDue],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between py-1.5" style={{ borderTop: '1px solid var(--color-border)' }}>
              <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{label}</span>
              <span className="text-xs font-medium text-right max-w-[180px]" style={{ color: 'var(--color-text)' }}>{value}</span>
            </div>
          ))}
        </div>

        {/* History */}
        <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--color-text-secondary)' }}>Service history</p>
        <div className="rounded-card p-4" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          {history.map((item, i) => (
            <TimelineItem key={item.id} item={item} isLast={i === history.length - 1} />
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
