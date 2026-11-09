import { useEffect, useState, type ReactNode } from 'react'
import { Navigate, NavLink, useLocation } from 'react-router-dom'
import logo from '../assets/eneffplan-logo.png'
import { useRole, type Role } from '../context/RoleContext'

const navItems: { to: string; label: string; icon: string; roles: Role[] }[] = [
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

function isAllowed(pathname: string, role: Role) {
  return navItems.some(
    (item) =>
      item.roles.includes(role) && (item.to === '/' ? pathname === '/' : pathname === item.to || pathname.startsWith(`${item.to}/`)),
  )
}

export function Layout({ children }: { children: ReactNode }) {
  const { role, setRole } = useRole()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const visibleItems = navItems.filter((item) => item.roles.includes(role))

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  if (!isAllowed(location.pathname, role)) return <Navigate to="/" replace />

  return (
    <div className="flex h-dvh flex-col bg-white lg:flex-row">
      <header className="flex shrink-0 items-center gap-3 bg-brand-700 px-4 py-3 lg:hidden">
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Menü öffnen"
          aria-expanded={menuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-white hover:bg-white/10"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <NavLink to="/" aria-label="Zum Dashboard" className="block rounded-lg bg-white px-3 py-1.5">
          <img src={logo} alt="Eneffplan" className="h-5 w-auto" />
        </NavLink>
      </header>

      {menuOpen && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setMenuOpen(false)} aria-hidden="true" />}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 max-w-[85vw] shrink-0 flex-col overflow-y-auto bg-brand-700 transition-transform duration-200 lg:static lg:z-auto lg:w-64 lg:max-w-none lg:translate-x-0 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-start justify-between border-b border-white/10 px-5 py-5">
          <div>
            <NavLink
              to="/"
              aria-label="Zum Dashboard"
              onClick={() => setMenuOpen(false)}
              className="block w-fit rounded-lg bg-white px-3 py-2 shadow-sm"
            >
              <img src={logo} alt="Eneffplan" className="h-6 w-auto" />
            </NavLink>
            <div className="mt-2 text-[11px] text-brand-100">CRM-Mockup · Look &amp; Feel</div>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Menü schließen"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white hover:bg-white/10 lg:hidden"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {visibleItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors lg:py-2 ${
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
          <label htmlFor="role-switch" className="mb-1.5 block px-1 text-[11px] font-medium uppercase tracking-wide text-brand-100">
            Ansicht (nur im Mockup)
          </label>
          <select
            id="role-switch"
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="w-full rounded-lg border border-white/20 bg-brand-800 px-2.5 py-2 text-sm text-white"
          >
            <option value="geschaeftsfuehrung">Geschäftsführung</option>
            <option value="mitarbeiter">Mitarbeiter (Selin Aydın)</option>
          </select>
        </div>
      </aside>

      <main className="min-w-0 flex-1 overflow-y-auto bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8 lg:py-8">{children}</div>
      </main>
    </div>
  )
}
