import { useState } from 'react'
import { Badge } from '../components/ui/Badge'
import { Card, CardHeader } from '../components/ui/Card'
import { useRole } from '../context/RoleContext'
import { absences, employees, type AbsenceType } from '../data/mockData'

const typeLabel: Record<AbsenceType, string> = { urlaub: 'Urlaub', krank: 'Krank', sonderurlaub: 'Sonderurlaub' }
const typeTone: Record<AbsenceType, 'blue' | 'red' | 'violet'> = { urlaub: 'blue', krank: 'red', sonderurlaub: 'violet' }
const currency = (n: number) => n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })

export function Profil() {
  const me = employees[0]
  const { role } = useRole()
  const [myAbsences, setMyAbsences] = useState(() => absences.filter((a) => a.employeeId === me.id))
  const [form, setForm] = useState({ from: '', to: '', type: 'urlaub' as AbsenceType })

  function addAbsence() {
    if (!form.from || !form.to) return
    setMyAbsences((prev) => [...prev, { id: `local-${Date.now()}`, employeeId: me.id, from: form.from, to: form.to, type: form.type }])
    setForm({ from: '', to: '', type: 'urlaub' })
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">Mein Profil</h1>
      <p className="mb-6 mt-1 text-sm text-slate-500">Persönliche Daten, Abwesenheiten und dein Arbeitszeit-Setup.</p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Persönliche Daten" />
          <div className="flex items-center gap-4">
            <div className={`flex h-14 w-14 items-center justify-center rounded-full text-lg font-semibold text-white ${me.color}`}>
              {me.initials}
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-800">{me.name}</div>
              <div className="text-xs text-slate-500">Wochenkapazität: {me.weeklyHours} Std.</div>
            </div>
          </div>
          {role === 'geschaeftsfuehrung' && (
            <dl className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-500">Interner Kostensatz</dt>
                <dd className="font-medium text-slate-800">{currency(me.hourlyCostRate)} / h</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Verkaufspreis</dt>
                <dd className="font-medium text-slate-800">{currency(me.hourlySellRate)} / h</dd>
              </div>
            </dl>
          )}
        </Card>

        <Card>
          <CardHeader title="Weitere Bereiche (Ideen, noch nicht gebaut)" subtitle="Was hier später noch sinnvoll ergänzt werden könnte" />
          <ul className="space-y-2 text-sm text-slate-600">
            <li>· Passwort/Zugang &amp; Zwei-Faktor-Login</li>
            <li>· Benachrichtigungen (z. B. bei neuer Aufgabe, Meilenstein erreicht)</li>
            <li>· Anzeigeeinstellungen (Sprache, Startseite)</li>
            <li>· Dokumente zur eigenen Person (Vertrag, Zertifikate)</li>
          </ul>
        </Card>

        <Card>
          <CardHeader title="Abwesenheiten" subtitle="Urlaub, Krankheit, Sonderurlaub eintragen — erscheint automatisch im Kalender" />
          <ul className="mb-4 space-y-2">
            {myAbsences.map((a) => (
              <li key={a.id} className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2 text-sm">
                <span className="text-slate-600">
                  {a.from} {a.from !== a.to && `– ${a.to}`}
                </span>
                <Badge tone={typeTone[a.type]}>{typeLabel[a.type]}</Badge>
              </li>
            ))}
            {myAbsences.length === 0 && <p className="text-sm text-slate-400">Keine Abwesenheiten eingetragen.</p>}
          </ul>
          <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-4">
            <input
              type="date"
              value={form.from}
              onChange={(e) => setForm((f) => ({ ...f, from: e.target.value }))}
              className="rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
            />
            <input
              type="date"
              value={form.to}
              onChange={(e) => setForm((f) => ({ ...f, to: e.target.value }))}
              className="rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
            />
            <select
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as AbsenceType }))}
              className="rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
            >
              <option value="urlaub">Urlaub</option>
              <option value="krank">Krank</option>
              <option value="sonderurlaub">Sonderurlaub</option>
            </select>
          </div>
          <button onClick={addAbsence} className="mt-3 w-full rounded-lg bg-brand-600 py-2 text-sm font-medium text-white hover:bg-brand-700">
            Abwesenheit eintragen
          </button>
        </Card>
      </div>
    </div>
  )
}
