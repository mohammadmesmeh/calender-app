import { useMemo } from "react"
import { CircleCheckBig, Clock2, ClipboardList, CalendarClock } from "lucide-react"
import { useTask } from "@/features/tasks/context/TaskContext/TaskContext"
import { useEvents } from "@/features/calendar/context/EventContext/EventContext"
import { AnimatedCounter } from "@/components/animations/AnimatedFramerMotion/AnimatedCounter"
import { Card, CardContent } from "@/components/ui/card"
import { getCompletionStats } from "@/features/dashboard/utils/analytics"

export const GridStatus = () => {
  const { tasks } = useTask()
  const { events } = useEvents()
  const stats = useMemo(() => getCompletionStats(tasks), [tasks])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter w-full">
      <Card>
        <CardContent className="p-container-md">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-10 h-10 rounded-icon bg-success-light text-success">
              <CircleCheckBig size={20} />
            </span>
          </div>
          <h3 className="text-sm text-text-muted font-light mb-1">Completed Tasks</h3>
          <p className="text-3xl font-bold text-text tabular-nums">
            <AnimatedCounter value={stats.completed} duration={1.2} />
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-container-md">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-10 h-10 rounded-icon bg-accent-light text-accent">
              <Clock2 size={20} />
            </span>
          </div>
          <h3 className="text-sm text-text-muted font-light mb-1">Pending Tasks</h3>
          <p className="text-3xl font-bold text-text tabular-nums">
            <AnimatedCounter value={stats.pending} duration={1.2} />
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-container-md">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-10 h-10 rounded-icon bg-primary-light text-primary">
              <ClipboardList size={20} />
            </span>
          </div>
          <h3 className="text-sm text-text-muted font-light mb-1">Total Tasks</h3>
          <p className="text-3xl font-bold text-text tabular-nums">
            <AnimatedCounter value={stats.total} duration={1.2} />
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-container-md">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-10 h-10 rounded-icon bg-secondary-light text-secondary">
              <CalendarClock size={20} />
            </span>
          </div>
          <h3 className="text-sm text-text-muted font-light mb-1">Upcoming Events</h3>
          <p className="text-3xl font-bold text-text tabular-nums">
            <AnimatedCounter value={events.length} duration={1.2} />
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
