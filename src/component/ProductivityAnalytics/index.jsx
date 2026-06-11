import { useMemo } from "react";
import { BarChart3, CheckCircle2, Activity, CalendarDays } from "lucide-react";
import { tasks } from "../../Mock Data/data";
import { CustomizeLegendAndTooltipStyle } from '../Char';
import { AnimatedProgressBar } from "../Animated Freamer Motion/AnimatedProgressBar";

const weeklyData = [
  { day: "Mon", value: 72 },
  { day: "Tue", value: 88 },
  { day: "Wed", value: 60 },
  { day: "Thu", value: 95 },
  { day: "Fri", value: 80 },
  { day: "Sat", value: 55 },
  { day: "Sun", value: 68 },
];

const activityItems = [
  { id: 1, title: "Completed UI review", timestamp: "2h ago", tag: "Design" },
  { id: 2, title: "Updated sprint goals", timestamp: "5h ago", tag: "Planning" },
  { id: 3, title: "Shared analytics report", timestamp: "Yesterday", tag: "Report" },
];

export const ProductivityAnalytics = () => {
  const completionStats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const pending = total - completed;
    const completion = total ? Math.round((completed / total) * 100) : 0;
    return { total, completed, pending, completion };
  }, []);

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold">Productivity Analytics</h2>
          <p className="text-sm text-gray-500">Weekly performance, completion status, and activity summary</p>
        </div>
        <div className="inline-flex items-center gap-2 text-sm text-gray-500">
          <BarChart3 className="h-5 w-5" />
          <span>This Week</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="space-y-4">
          < CustomizeLegendAndTooltipStyle />

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Completed</p>
                  <p className="text-2xl font-semibold">{completionStats.completed}</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">Tasks completed this week</div>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pending</p>
                  <p className="text-2xl font-semibold">{completionStats.pending}</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">Tasks remaining</div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Activity Overview</p>
              <h3 className="text-lg font-semibold">Recent updates</h3>
            </div>
            <span className="text-sm text-slate-600">Live</span>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>Completion Rate</span>
                <span className="font-semibold text-slate-900">{completionStats.completion}%</span>
              </div>
             
              <AnimatedProgressBar value={completionStats.completion} duration={2.1} />
              
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3 text-sm text-slate-500">
                <span>Total tasks</span>
                <span className="font-semibold text-slate-900">{completionStats.total}</span>
              </div>
              <div className="grid gap-3 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="font-medium">On track</span>
                  <span>68%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Needs review</span>
                  <span>32%</span>
                </div>
              </div>
            </div>

            {/* <div className="space-y-3">
              {activityItems.map((item) => (
                <div key={item.id} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                    <Activity className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{item.title}</p>
                    <div className="mt-1 flex items-center justify-between gap-3 text-xs text-slate-500">
                      <span>{item.timestamp}</span>
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-600">{item.tag}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div> */}
          </div>
        </section>
      </div>
    </div>
  );
};
