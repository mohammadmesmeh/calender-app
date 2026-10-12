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
import { useTask } from "@/features/tasks/context/TaskContext/TaskContext"
import { useEvents } from "@/features/calendar/context/EventContext/EventContext"
import { getWeeklyActivity } from "@/features/dashboard/utils/analytics"
import { useLocalization } from "@/i18n/LocalizationProvider"

const DAY_INDEX = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }

const CustomTooltip = ({ active, payload, label }) => {
  const { t } = useLocalization()

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
            <span className="text-text-secondary">
              {entry.dataKey === "tasks" ? t('dashboard.tasks') + ":" : t('dashboard.events') + ":"}
            </span>
            <span className="font-semibold text-text">{entry.value}</span>
          </div>
        )
      })}
    </div>
  )
}

export const AreaStepChart = ({ className }) => {
  const { tasks } = useTask()
  const { events } = useEvents()
  const { t, weekday } = useLocalization()

  const { data, totalTasks, totalEvents, avgPerDay, trend, change } = useMemo(
    () => getWeeklyActivity(tasks, events),
    [tasks, events]
  )

  const localizedData = useMemo(
    () =>
      data.map((row, index) => ({
        ...row,
        label: weekday(new Date(2024, 0, DAY_INDEX[row.label] ?? index), "short") || row.label,
      })),
    [data, weekday]
  )

  return (
    <div className={`w-full rounded-card bg-surface p-container-md shadow-card ${className || ""}`}>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-text">{t('dashboard.weeklyActivity')}</h2>
          <p className="mt-1 text-sm text-text-secondary">
            {t('dashboard.weeklyActivitySubtitle')}
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-button border border-border bg-background px-3 py-2">
          {trend === "up" ? (
            <TrendingUp size={18} className="text-success" />
          ) : (
            <TrendingDown size={18} className="text-danger" />
          )}
          <span className={`text-sm font-semibold tabular-nums ${trend === "up" ? "text-success" : "text-danger"}`}>
            {change > 0 ? "+" : ""}<AnimatedCounter value={change} duration={1} suffix="%" />
          </span>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-stack-xs">
        <div className="rounded-button bg-background p-3">
          <p className="text-xs text-text-muted">{t('dashboard.tasks')}</p>
          <p className="mt-1 text-lg font-bold text-text tabular-nums">
            <AnimatedCounter value={totalTasks} duration={1.2} />
          </p>
        </div>
        <div className="rounded-button bg-background p-3">
          <p className="text-xs text-text-muted">{t('dashboard.events')}</p>
          <p className="mt-1 text-lg font-bold text-text tabular-nums">
            <AnimatedCounter value={totalEvents} duration={1.2} />
          </p>
        </div>
        <div className="rounded-button bg-background p-3">
          <p className="text-xs text-text-muted">{t('dashboard.avgPerDay')}</p>
          <p className="mt-1 text-lg font-bold text-text tabular-nums">
            <AnimatedCounter value={avgPerDay} duration={1.2} decimals={1} />
          </p>
        </div>
      </div>

      <div className="h-72 w-full" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={localizedData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
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
