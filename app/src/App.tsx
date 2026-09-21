import { HashRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { RoleProvider } from './context/RoleContext'
import { TrackingProvider } from './context/TrackingContext'
import { Controlling } from './pages/Controlling'
import { Dashboard } from './pages/Dashboard'
import { Kalender } from './pages/Kalender'
import { Kanban } from './pages/Kanban'
import { Kapazitaet } from './pages/Kapazitaet'
import { Mitarbeiter } from './pages/Mitarbeiter'
import { Profil } from './pages/Profil'
import { Projekte } from './pages/Projekte'
import { ProjektDetail } from './pages/ProjektDetail'
import { Rechnungen } from './pages/Rechnungen'
import { Zeiterfassung } from './pages/Zeiterfassung'

function App() {
  return (
    <RoleProvider>
      <TrackingProvider>
        <HashRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/projekte" element={<Projekte />} />
              <Route path="/projekte/:id" element={<ProjektDetail />} />
              <Route path="/kanban" element={<Kanban />} />
              <Route path="/kalender" element={<Kalender />} />
              <Route path="/zeiterfassung" element={<Zeiterfassung />} />
              <Route path="/rechnungen" element={<Rechnungen />} />
              <Route path="/controlling" element={<Controlling />} />
              <Route path="/kapazitaet" element={<Kapazitaet />} />
              <Route path="/mitarbeiter" element={<Mitarbeiter />} />
              <Route path="/profil" element={<Profil />} />
            </Routes>
          </Layout>
        </HashRouter>
      </TrackingProvider>
    </RoleProvider>
  )
}

export default App
