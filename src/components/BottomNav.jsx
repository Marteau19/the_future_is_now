import { useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, Settings, CalendarCheck, ShoppingBag, User } from 'lucide-react'

const TABS = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'My System',  icon: Settings,        path: '/system'    },
  { label: 'Book',       icon: CalendarCheck,   path: '/book'      },
  { label: 'Parts',      icon: ShoppingBag,     path: '/parts'     },
  { label: 'Account',   icon: User,            path: '/account'   },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <nav
      className="fixed bottom-0 left-1/2 z-30 flex w-full max-w-[430px]"
      style={{
        transform: 'translateX(-50%)',
        background: 'var(--color-bg)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      {TABS.map(({ label, icon: Icon, path }) => {
        const active = pathname.startsWith(path)
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className="flex flex-1 flex-col items-center pt-2 pb-3 gap-0.5"
            style={{ color: active ? 'var(--color-brand)' : 'var(--color-text-disabled)' }}
          >
            {active && (
              <span
                className="absolute top-0 rounded-full"
                style={{
                  height: '3px',
                  width: '24px',
                  background: 'var(--color-brand)',
                  marginTop: '-1px',
                }}
              />
            )}
            <Icon size={22} strokeWidth={active ? 2 : 1.5} />
            <span className="text-xs font-medium">{label}</span>
          </button>
        )
      })}
    </nav>
  )
}
