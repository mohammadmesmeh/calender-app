import { forwardRef, useId } from "react"
import { ResponsiveContainer } from "recharts"
import { ChartContext } from "./ChartContext"

const ChartStyle = ({ id, config }) => {
  if (!config || Object.keys(config).length === 0) return null

  const cssVars = Object.entries(config)
    .map(([key, val]) => `--color-${key}: ${val.color || val};`)
    .join("")

  return <style>{`#${id} { ${cssVars} }`}</style>
}

export const ChartContainer = forwardRef(({ id, className, children, config = {}, ...props }, ref) => {
  const generatedId = useId()
  const chartId = id || `chart-${generatedId}`

  return (
    <ChartContext.Provider value={{ config }}>
      <ChartStyle id={chartId} config={config} />
      <div
        ref={ref}
        id={chartId}
        className={`flex justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-text-muted [&_.recharts-cartesian-grid_line]:stroke-border [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_line]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-[hsl(var(--chart-bg))] [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-[hsl(var(--chart-bg))] [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none ${className || ""}`}
        {...props}
      >
        <ResponsiveContainer width="100%" height="100%">{children}</ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "ChartContainer"

export const ChartTooltipContent = forwardRef(({ active, payload, label, formatter, labelFormatter, indicator = "dot", hideLabel, hideIndicator, className }, ref) => {
  if (!active || !payload?.length) return null

  const flattenPayload = payload.flat()
  const labelStr = labelFormatter ? labelFormatter(label) : label

  return (
    <div ref={ref} className={`rounded-icon border border-border bg-surface px-3 py-2 shadow-card text-xs ${className || ""}`}>
      {!hideLabel && labelStr ? (
        <p className="mb-1.5 font-medium text-text-muted">{labelStr}</p>
      ) : null}

      <div className="grid gap-1">
        {flattenPayload.map((entry, index) => {
          const value = formatter ? formatter(entry.value) : entry.value
          const key = entry.name || entry.dataKey
          const colorKey = `--color-${key}`

          return (
            <div key={index} className="flex items-center gap-1.5 text-xs">
              {!hideIndicator && (
                <span
                  className={`shrink-0 ${indicator === "dot" ? "h-2 w-2 rounded-full" : "h-0.5 w-4 rounded"}`}
                  style={{ backgroundColor: `var(${colorKey}, hsl(var(--chart-1)))` }}
                />
              )}
              <span className="text-text-secondary">{entry.name || key}:</span>
              <span className="font-medium tabular-nums text-text">{value}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
})
ChartTooltipContent.displayName = "ChartTooltipContent"

export const ChartLegendContent = forwardRef(({ payload, className }, ref) => {
  if (!payload?.length) return null

  return (
    <div ref={ref} className={`flex flex-wrap items-center gap-3 text-xs ${className || ""}`}>
      {payload.map((entry, index) => {
        const key = entry.dataKey || entry.value
        const colorKey = `--color-${key}`

        return (
          <div key={index} className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: `var(${colorKey}, hsl(var(--chart-1)))` }}
            />
            <span className="text-text-secondary">{entry.value}</span>
          </div>
        )
      })}
    </div>
  )
})
ChartLegendContent.displayName = "ChartLegendContent"
