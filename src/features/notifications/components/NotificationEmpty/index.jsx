import { BellOff } from 'lucide-react'

export const NotificationEmpty = () => (
  <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light/50 text-primary mb-3">
      <BellOff size={22} />
    </span>
    <p className="text-sm font-medium text-text">All caught up!</p>
    <p className="text-xs text-text-muted mt-1 max-w-[200px]">
      No new notifications. We&apos;ll let you know when something arrives.
    </p>
  </div>
)
