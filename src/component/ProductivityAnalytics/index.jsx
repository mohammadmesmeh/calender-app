import { useMemo } from "react";
import { CheckCircle2, CalendarDays, ClipboardList } from "lucide-react";
import { tasks } from "../../Mock Data/data";
import { AreaStepChart } from "../AreaStepChart";
import { AnimatedProgressBar } from "../Animated Freamer Motion/AnimatedProgressBar";

export const ProductivityAnalytics = () => {
  const completionStats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const pending = total - completed;
    const completion = total ? Math.round((completed / total) * 100) : 0;
    return { total, completed, pending, completion };
  }, []);

  return (
    <div className="w-full rounded-lg bg-surface p-6 shadow-md">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-text">Productivity Analytics</h2>
        <p className="mt-1 text-sm text-text-secondary">
          Task completion overview and weekly activity
        </p>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-success-light text-success">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p className="text-xs text-text-muted">Completed</p>
              <p className="text-2xl font-bold text-text">{completionStats.completed}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-light text-accent">
              <CalendarDays size={20} />
            </div>
            <div>
              <p className="text-xs text-text-muted">Pending</p>
              <p className="text-2xl font-bold text-text">{completionStats.pending}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-light text-primary">
              <ClipboardList size={20} />
            </div>
            <div>
              <p className="text-xs text-text-muted">Total Tasks</p>
              <p className="text-2xl font-bold text-text">{completionStats.total}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary-light text-secondary">
              <span className="text-sm font-bold">%</span>
            </div>
            <div>
              <p className="text-xs text-text-muted">Completion</p>
              <p className="text-2xl font-bold text-text">{completionStats.completion}%</p>
            </div>
          </div>
          <AnimatedProgressBar value={completionStats.completion} duration={2.1} />
        </div>
      </div>

      <AreaStepChart />
    </div>
  );
};
