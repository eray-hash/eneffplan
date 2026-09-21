import { type ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { useRole } from '../context/RoleContext'

const navItems = [
  { to: '/', label: 'Dashboard', icon: '◈', roles: ['mitarbeiter', 'geschaeftsfuehrung'] },
  { to: '/projekte', label: 'Projekte', icon: '▤', roles: ['mitarbeiter', 'geschaeftsfuehrung'] },
  { to: '/kanban', label: 'Aufgaben (Kanban)', icon: '▥', roles: ['mitarbeiter', 'geschaeftsfuehrung'] },
  { to: '/zeiterfassung', label: 'Zeiterfassung', icon: '◷', roles: ['mitarbeiter', 'geschaeftsfuehrung'] },
  { to: '/rechnungen', label: 'Angebote & Rechnungen', icon: '⎘', roles: ['geschaeftsfuehrung'] },
  { to: '/controlling', label: 'Controlling', icon: '◫', roles: ['geschaeftsfuehrung'] },
  { to: '/mitarbeiter', label: 'Mitarbeiter', icon: '◍', roles: ['geschaeftsfuehrung'] },
]

export function Layout({ children }: { children: ReactNode }) {
  const { role, setRole } = useRole()
  const visibleItems = navItems.filter((item) => item.roles.includes(role))

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      <aside className="flex w-64 shrink-0 flex-col overflow-y-auto border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-200 px-5 py-5 dark:border-slate-800">
          <div className="text-lg font-semibold tracking-wide">
            <span className="text-brand-600">ENEFF</span>
            <span className="text-ink dark:text-slate-100">PLAN</span>
          </div>
          <div className="mt-0.5 text-[11px] text-slate-400">CRM-Mockup · Look &amp; Feel</div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {visibleItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                }`
              }
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-200 p-3 dark:border-slate-800">
          <label className="mb-1.5 block px-1 text-[11px] font-medium uppercase tracking-wide text-slate-400">
            Ansicht (nur im Mockup)
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as 'mitarbeiter' | 'geschaeftsfuehrung')}
            className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <option value="geschaeftsfuehrung">Geschäftsführung</option>
            <option value="mitarbeiter">Mitarbeiter (Selin Aydın)</option>
          </select>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl px-8 py-8">{children}</div>
      </main>
    </div>
  )
}
