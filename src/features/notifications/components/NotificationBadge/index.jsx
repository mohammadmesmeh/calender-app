export const NotificationBadge = ({ count }) => {
  if (count <= 0) return null

  return (
    <span className="absolute top-1 right-1 flex min-w-[18px] h-[18px] items-center justify-center rounded-full bg-danger text-[10px] font-bold leading-none text-white px-1 border-2 border-surface">
      {count > 99 ? '99+' : count}
    </span>
  )
}
