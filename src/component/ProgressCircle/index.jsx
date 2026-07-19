import { useState, useMemo } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { AnimatedCounter } from "../Animated Freamer Motion/AnimatedCounter"

const CHART_COLORS = {
  primary: "#437FF7",
  primaryLight: "#DBEAFE",
  secondary: "#8B5CF6",
  secondaryLight: "#EDE9FE",
  success: "#538165",
  successLight: "#D1FAE5",
  accent: "#FF3270",
  accentLight: "#EAA9C3",
  border: "#E5ECED",
  textMuted: "#9CA3AF",
}

const RADIAN = Math.PI / 180

const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 1.4
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill={CHART_COLORS.textMuted} textAnchor="middle" dominantBaseline="central" fontSize={11}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const CustomTooltipContent = ({ active, payload }) => {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-xl border border-border bg-surface px-4 py-3 shadow-card">
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: entry.payload.color }}
          />
          <span className="text-text-secondary">{entry.name}:</span>
          <span className="font-semibold text-text">{entry.value}</span>
        </div>
      ))}
    </div>
  )
}

const defaultData = (value) => [
  { name: "Completed", value, color: CHART_COLORS.primary },
  { name: "Remaining", value: 100 - value, color: CHART_COLORS.border },
]

export const ProgressCircle = ({ value = 0, size, data: externalData, onClick }) => {
  const [activeIndex, setActiveIndex] = useState(null)

  const data = externalData || defaultData(value)

  const total = useMemo(() => data.reduce((sum, d) => sum + d.value, 0), [data])
  const displayValue = externalData ? total : value

  const onMouseEnter = (_, index) => setActiveIndex(index)
  const onMouseLeave = () => setActiveIndex(null)

  return (
    <div className="relative flex items-center justify-center" style={size ? { width: size, height: size } : undefined}>
      <div className="w-full h-full" style={size ? undefined : { minWidth: 140, minHeight: 140 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={size ? size * 0.28 : "38%"}
              outerRadius={size ? size * 0.45 : "60%"}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
              activeIndex={activeIndex}
              activeShape={{ outerRadius: size ? size * 0.48 : "64%" }}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onClick={onClick}
              className="cursor-pointer"
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.color}
                  opacity={activeIndex === null || activeIndex === index ? 1 : 0.5}
                />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltipContent />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <AnimatedCounter value={displayValue} duration={1.5} />
        {!externalData && <span className="text-xs text-text-muted">%</span>}
      </div>
    </div>
  )
}
