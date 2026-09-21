import { useState, type DragEvent } from 'react'
import { Badge } from '../components/ui/Badge'
import { useRole } from '../context/RoleContext'
import { useTracking } from '../context/TrackingContext'
import { employees, projects, tasks as initialTasks, type SubTask, type TaskStatus } from '../data/mockData'

const columns: { key: TaskStatus; label: string; hint: string }[] = [
  { key: 'offen', label: 'Backlog', hint: 'Noch nicht begonnen' },
  { key: 'in_bearbeitung', label: 'In Bearbeitung', hint: 'Zeit läuft automatisch auf diese Aufgabe' },
  { key: 'erledigt', label: 'Erledigt', hint: 'Meilenstein-Aufgabe abgeschlossen' },
]

export function Kanban() {
  const { role } = useRole()
  const { activeTaskId, setActiveTask } = useTracking()
  const me = employees[0]
  const [localTasks, setLocalTasks] = useState<SubTask[]>(() => initialTasks.map((t) => ({ ...t })))
  const [employeeFilter, setEmployeeFilter] = useState<string>('alle')
  const [dragOverColumn, setDragOverColumn] = useState<TaskStatus | null>(null)

  const visibleTasks =
    role === 'mitarbeiter'
      ? localTasks.filter((t) => t.assigneeId === me.id)
      : employeeFilter === 'alle'
        ? localTasks
        : localTasks.filter((t) => t.assigneeId === employeeFilter)

  function moveTask(taskId: string, newStatus: TaskStatus) {
    setLocalTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)))
    if (newStatus === 'in_bearbeitung') {
      setActiveTask(taskId)
    } else if (activeTaskId === taskId) {
      setActiveTask(null)
    }
  }

  function handleDrop(e: DragEvent<HTMLDivElement>, status: TaskStatus) {
    e.preventDefault()
    setDragOverColumn(null)
    const taskId = e.dataTransfer.getData('text/task-id')
    if (taskId) moveTask(taskId, status)
  }

  return (
    <div>
 <h1 className="text-xl font-semibold text-slate-900">Aufgaben (Kanban)</h1>
 <p className="mt-1 text-sm text-slate-500">
        Ersetzt den Planner: Karte auf "In Bearbeitung" ziehen startet automatisch die Zeiterfassung auf dieser Aufgabe. Ohne
        aktive Karte bucht die Zeit auf "Intern".
      </p>

      {role === 'geschaeftsfuehrung' && (
 <div className="mb-4 mt-4 flex items-center gap-2">
 <label className="text-xs font-medium text-slate-500">Mitarbeiter:</label>
          <select
            value={employeeFilter}
            onChange={(e) => setEmployeeFilter(e.target.value)}
 className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-slate-700"
          >
            <option value="alle">Alle</option>
            {employees.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
      )}

 <div className={`grid grid-cols-1 gap-4 md:grid-cols-3 ${role === 'mitarbeiter' ? 'mt-6' : ''}`}>
        {columns.map((col) => {
          const columnTasks = visibleTasks.filter((t) => t.status === col.key)
          return (
            <div
              key={col.key}
              onDragOver={(e) => {
                e.preventDefault()
                setDragOverColumn(col.key)
              }}
              onDragLeave={() => setDragOverColumn(null)}
              onDrop={(e) => handleDrop(e, col.key)}
              className={`rounded-xl border p-3 transition-colors ${
                dragOverColumn === col.key ? 'border-brand-400 bg-brand-50' : 'border-slate-200 bg-slate-50'
              }`}
            >
 <div className="mb-3 px-1">
 <div className="flex items-center justify-between">
 <h3 className="text-sm font-semibold text-slate-800">{col.label}</h3>
 <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-600">
                    {columnTasks.length}
                  </span>
                </div>
 <p className="mt-0.5 text-[11px] text-slate-400">{col.hint}</p>
              </div>

 <div className="space-y-2">
                {columnTasks.map((t) => {
                  const project = projects.find((p) => p.id === t.projectId)!
                  const assignee = employees.find((e) => e.id === t.assigneeId)!
                  const isActive = activeTaskId === t.id
                  return (
                    <div
                      key={t.id}
                      draggable
                      onDragStart={(e) => e.dataTransfer.setData('text/task-id', t.id)}
 className={`cursor-grab rounded-lg border bg-white p-3 shadow-sm active:cursor-grabbing ${
                        isActive ? 'border-brand-400 ring-1 ring-brand-300' : 'border-slate-100'
                      }`}
                    >
 <div className="flex items-start justify-between gap-2">
 <span className="text-sm font-medium text-slate-800">{t.title}</span>
                        {isActive && <Badge tone="green">● Läuft</Badge>}
                      </div>
 <div className="mt-1 text-xs text-slate-400">
                        #{project.number} · {project.customerName}
                      </div>
 <div className="mt-2 flex items-center justify-between">
 <div className={`flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-semibold text-white ${assignee.color}`}>
                          {assignee.initials}
                        </div>
 <span className="text-xs text-slate-400">
                          {t.usedHours}h / {t.budgetHours}h
                        </span>
                      </div>
                    </div>
                  )
                })}
                {columnTasks.length === 0 && (
 <div className="rounded-lg border border-dashed border-slate-200 py-6 text-center text-xs text-slate-300">
                    Keine Karten
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
