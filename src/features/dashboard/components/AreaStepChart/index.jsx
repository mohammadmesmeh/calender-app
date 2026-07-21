import { useMemo } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, TrendingDown } from "lucide-react"
import { AnimatedCounter } from "@/components/animations/AnimatedFramerMotion/AnimatedCounter"

const data = [
  { label: "Mon", tasks: 4, events: 2 },
  { label: "Tue", tasks: 6, events: 3 },
  { label: "Wed", tasks: 3, events: 1 },
  { label: "Thu", tasks: 7, events: 4 },
  { label: "Fri", tasks: 5, events: 2 },
  { label: "Sat", tasks: 2, events: 0 },
  { label: "Sun", tasks: 3, events: 1 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-button border border-border bg-surface px-4 py-3 shadow-card">
      <p className="mb-2 text-xs font-medium text-text-muted">{label}</p>
      {payload.map((entry, index) => {
        const colors = {
          tasks: "bg-primary",
          events: "bg-secondary",
        }
        return (
          <div key={index} className="flex items-center gap-2 text-sm">
            <span className={`h-2 w-2 rounded-full ${colors[entry.dataKey] || "bg-primary"}`} />
            <span className="capitalize text-text-secondary">{entry.dataKey}:</span>
            <span className="font-semibold text-text">{entry.value}</span>
          </div>
        )
      })}
    </div>
  )
}

export const AreaStepChart = ({ className }) => {
  const stats = useMemo(() => {
    const totalTasks = data.reduce((sum, d) => sum + d.tasks, 0)
    const totalEvents = data.reduce((sum, d) => sum + d.events, 0)
    const total = totalTasks + totalEvents
    const weekCount = data.length
    const avgPerDay = weekCount ? (total / weekCount) : 0
    const prevTotal = 28
    const trend = total >= prevTotal ? "up" : "down"
    const change = prevTotal ? Math.round(((total - prevTotal) / prevTotal) * 100) : 0

    return { totalTasks, totalEvents, avgPerDay, trend, change }
  }, [])

  return (
    <div className={`w-full rounded-card bg-surface p-container-md shadow-card ${className || ""}`}>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-text">Weekly Activity</h2>
          <p className="mt-1 text-sm text-text-secondary">
            Tasks and events logged this week
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-button border border-border bg-background px-3 py-2">
          {stats.trend === "up" ? (
            <TrendingUp size={18} className="text-success" />
          ) : (
            <TrendingDown size={18} className="text-danger" />
          )}
          <span className={`text-sm font-semibold tabular-nums ${stats.trend === "up" ? "text-success" : "text-danger"}`}>
            {stats.change > 0 ? "+" : ""}<AnimatedCounter value={stats.change} duration={1} suffix="%" />
          </span>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-stack-xs">
        <div className="rounded-button bg-background p-3">
          <p className="text-xs text-text-muted">Tasks</p>
          <p className="mt-1 text-lg font-bold text-text tabular-nums">
            <AnimatedCounter value={stats.totalTasks} duration={1.2} />
          </p>
        </div>
        <div className="rounded-button bg-background p-3">
          <p className="text-xs text-text-muted">Events</p>
          <p className="mt-1 text-lg font-bold text-text tabular-nums">
            <AnimatedCounter value={stats.totalEvents} duration={1.2} />
          </p>
        </div>
        <div className="rounded-button bg-background p-3">
          <p className="text-xs text-text-muted">Avg / Day</p>
          <p className="mt-1 text-lg font-bold text-text tabular-nums">
            <AnimatedCounter value={stats.avgPerDay} duration={1.2} decimals={1} />
          </p>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="tasksGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="eventsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.25} />
                <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />

            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--text-muted))", fontSize: 12 }}
              dy={8}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--text-muted))", fontSize: 12 }}
              allowDecimals={false}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "hsl(var(--border))", strokeDasharray: "3 3" }} />

            <Area
              type="monotone"
              dataKey="tasks"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="url(#tasksGradient)"
              dot={{ fill: "hsl(var(--primary))", stroke: "hsl(var(--surface))", strokeWidth: 2, r: 4 }}
              activeDot={{ fill: "hsl(var(--primary))", stroke: "hsl(var(--surface))", strokeWidth: 2, r: 6 }}
            />

            <Area
              type="monotone"
              dataKey="events"
              stroke="hsl(var(--secondary))"
              strokeWidth={2}
              fill="url(#eventsGradient)"
              dot={{ fill: "hsl(var(--secondary))", stroke: "hsl(var(--surface))", strokeWidth: 2, r: 4 }}
              activeDot={{ fill: "hsl(var(--secondary))", stroke: "hsl(var(--surface))", strokeWidth: 2, r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
