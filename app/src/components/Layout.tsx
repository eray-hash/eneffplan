import { type ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/eneffplan-logo.png'
import { useRole } from '../context/RoleContext'

const navItems = [
  { to: '/', label: 'Dashboard', icon: '◈', roles: ['mitarbeiter', 'geschaeftsfuehrung'] },
  { to: '/projekte', label: 'Projekte', icon: '▤', roles: ['mitarbeiter', 'geschaeftsfuehrung'] },
  { to: '/kanban', label: 'Aufgaben (Kanban)', icon: '▥', roles: ['mitarbeiter', 'geschaeftsfuehrung'] },
  { to: '/kalender', label: 'Mein Kalender', icon: '▦', roles: ['mitarbeiter', 'geschaeftsfuehrung'] },
  { to: '/zeiterfassung', label: 'Zeiterfassung', icon: '◷', roles: ['mitarbeiter', 'geschaeftsfuehrung'] },
  { to: '/rechnungen', label: 'Angebote & Rechnungen', icon: '⎘', roles: ['geschaeftsfuehrung'] },
  { to: '/controlling', label: 'Controlling', icon: '◫', roles: ['geschaeftsfuehrung'] },
  { to: '/kapazitaet', label: 'Kapazitätsplanung', icon: '▧', roles: ['geschaeftsfuehrung'] },
  { to: '/mitarbeiter', label: 'Mitarbeiter', icon: '◍', roles: ['geschaeftsfuehrung'] },
  { to: '/profil', label: 'Mein Profil', icon: '●', roles: ['mitarbeiter', 'geschaeftsfuehrung'] },
]

export function Layout({ children }: { children: ReactNode }) {
  const { role, setRole } = useRole()
  const visibleItems = navItems.filter((item) => item.roles.includes(role))

  return (
    <div className="flex h-screen bg-white">
      <aside className="flex w-64 shrink-0 flex-col overflow-y-auto bg-brand-700">
        <div className="border-b border-white/10 px-5 py-5">
          <NavLink to="/" className="block w-fit rounded-lg bg-white px-3 py-2 shadow-sm">
            <img src={logo} alt="Eneffplan" className="h-6 w-auto" />
          </NavLink>
          <div className="mt-2 text-[11px] text-brand-100">CRM-Mockup · Look &amp; Feel</div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {visibleItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'bg-white text-brand-700' : 'text-brand-50 hover:bg-white/10'
                }`
              }
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 p-3">
          <label className="mb-1.5 block px-1 text-[11px] font-medium uppercase tracking-wide text-brand-100">
            Ansicht (nur im Mockup)
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as 'mitarbeiter' | 'geschaeftsfuehrung')}
            className="w-full rounded-lg border border-white/20 bg-brand-800 px-2.5 py-1.5 text-sm text-white"
          >
            <option value="geschaeftsfuehrung">Geschäftsführung</option>
            <option value="mitarbeiter">Mitarbeiter (Selin Aydın)</option>
          </select>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-slate-50">
        <div className="mx-auto max-w-6xl px-8 py-8">{children}</div>
      </main>
    </div>
  )
}
