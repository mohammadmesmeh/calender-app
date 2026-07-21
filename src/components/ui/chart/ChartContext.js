import { createContext, useContext } from "react"

export const ChartContext = createContext(null)

export const useChart = () => {
  const ctx = useContext(ChartContext)
  if (!ctx) throw new Error("useChart must be used within a <ChartContainer />")
  return ctx
}
