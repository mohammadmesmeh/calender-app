import { createContext, useContext } from 'react'

export const EventContext = createContext(null)

export const useEvents = () => {
  const context = useContext(EventContext)
  if (!context) throw new Error('useEvents must be used within an EventProvider')
  return context
}