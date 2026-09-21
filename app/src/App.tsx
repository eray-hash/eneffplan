import { HashRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { RoleProvider } from './context/RoleContext'
import { TrackingProvider } from './context/TrackingContext'
import { Controlling } from './pages/Controlling'
import { Dashboard } from './pages/Dashboard'
import { Kanban } from './pages/Kanban'
import { Mitarbeiter } from './pages/Mitarbeiter'
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
              <Route path="/zeiterfassung" element={<Zeiterfassung />} />
              <Route path="/rechnungen" element={<Rechnungen />} />
              <Route path="/controlling" element={<Controlling />} />
              <Route path="/mitarbeiter" element={<Mitarbeiter />} />
            </Routes>
          </Layout>
        </HashRouter>
      </TrackingProvider>
    </RoleProvider>
  )
}

export default App
