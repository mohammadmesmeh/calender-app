import { useMemo } from "react"
import { CheckCircle2, CalendarDays, ClipboardList } from "lucide-react"
import { useTask } from "@/features/tasks/context/TaskContext/TaskContext"
import { AreaStepChart } from "../AreaStepChart"
import { AnimatedCounter } from "@/components/animations/AnimatedFramerMotion/AnimatedCounter"
import { AnimatedProgressBar } from "@/components/animations/AnimatedFramerMotion/AnimatedProgressBar"
import { getCompletionStats } from "@/features/dashboard/utils/analytics"
import { useLocalization } from "@/i18n/LocalizationProvider"

export const ProductivityAnalytics = () => {
  const { tasks } = useTask()
  const { t } = useLocalization()
  const completionStats = useMemo(() => getCompletionStats(tasks), [tasks])

  return (
    <div className="w-full rounded-card bg-surface p-container-md shadow-card">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-text">{t('dashboard.productivityAnalytics')}</h2>
        <p className="mt-1 text-sm text-text-secondary">
          {t('dashboard.analyticsSubtitle')}
        </p>
      </div>

      <div className="mb-6 grid gap-stack-sm sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-section border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-icon bg-success-light text-success">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p className="text-xs text-text-muted">{t('dashboard.completed')}</p>
              <p className="text-2xl font-bold text-text tabular-nums">
                <AnimatedCounter value={completionStats.completed} duration={1.2} />
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-card border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-icon bg-accent-light text-accent">
              <CalendarDays size={20} />
            </div>
            <div>
              <p className="text-xs text-text-muted">{t('dashboard.pending')}</p>
              <p className="text-2xl font-bold text-text tabular-nums">
                <AnimatedCounter value={completionStats.pending} duration={1.2} />
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-card border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-icon bg-primary-light text-primary">
              <ClipboardList size={20} />
            </div>
            <div>
              <p className="text-xs text-text-muted">{t('dashboard.totalTasks')}</p>
              <p className="text-2xl font-bold text-text tabular-nums">
                <AnimatedCounter value={completionStats.total} duration={1.2} />
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-card border border-border p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-icon bg-secondary-light text-secondary">
              <span className="text-sm font-bold">%</span>
            </div>
            <div>
              <p className="text-xs text-text-muted">{t('dashboard.completion')}</p>
              <p className="text-2xl font-bold text-text tabular-nums">
                <AnimatedCounter value={completionStats.completion} duration={1.2} suffix="%" />
              </p>
            </div>
          </div>
          <AnimatedProgressBar value={completionStats.completion} duration={2.1} />
        </div>
      </div>

      <AreaStepChart />
    </div>
  )
}
