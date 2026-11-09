import { createContext, useContext, useState, type ReactNode } from 'react'
import { tasks as initialTasks, type SubTask, type TaskStatus } from '../data/mockData'

interface TasksContextValue {
  tasks: SubTask[]
  moveTask: (taskId: string, status: TaskStatus) => void
}

const TasksContext = createContext<TasksContextValue | undefined>(undefined)

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<SubTask[]>(() => initialTasks.map((t) => ({ ...t })))

  const moveTask = (taskId: string, status: TaskStatus) => {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status } : t)))
  }

  return <TasksContext.Provider value={{ tasks, moveTask }}>{children}</TasksContext.Provider>
}

export function useTasks() {
  const ctx = useContext(TasksContext)
  if (!ctx) throw new Error('useTasks must be used within TasksProvider')
  return ctx
}
