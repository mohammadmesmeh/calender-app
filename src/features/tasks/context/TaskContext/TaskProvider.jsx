import { useState, useCallback, useMemo } from 'react'
import { tasks as initialTasks } from '../../data'
import { TaskContext } from './TaskContext'

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => initialTasks)

  const addTask = useCallback((newTask) => {
    const id = Date.now()

    if (newTask.type === 'event') {
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      const event = {
        id,
        title: newTask.title || 'Untitled Event',
        time: newTask.time || newTask.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        day: dayNames[newTask.date.getDay()],
        note: newTask.description || null,
        type: newTask.category || 'event',
        color: 'bg-primary',
        location: newTask.location || '',
      }
      setTasks((prev) => [event, ...prev])
    } else {
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      const task = {
        id,
        title: newTask.description,
        time: newTask.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        day: dayNames[newTask.date.getDay()],
        completed: false,
        priority: newTask.priority || 'medium',
      }
      setTasks((prev) => [task, ...prev])
    }
  }, [])

  const toggleTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    )
  }, [])

  const value = useMemo(() => ({ tasks, addTask, toggleTask }), [tasks, addTask, toggleTask])

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}
