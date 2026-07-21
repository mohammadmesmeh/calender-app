export const FORM_CLASSES = {
  input:
    'w-full rounded-input border border-border bg-surface px-4 py-3 text-text placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition',
  segmented:
    'inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30',
  selected: 'bg-primary text-white shadow-subtle',
  unselected: 'bg-background text-text-muted hover:bg-border/50',
}

export const TIME_OPTIONS = (() => {
  const timeOption = (v) => ({
    label: v.toString().padStart(2, '0'),
    value: v.toString().padStart(2, '0'),
  })
  return {
    hours: Array.from({ length: 12 }, (_, i) => timeOption(i + 1)),
    minutes: Array.from({ length: 12 }, (_, i) => timeOption(i * 5)),
    periods: [
      { value: 'AM', label: 'AM' },
      { value: 'PM', label: 'PM' },
    ],
  }
})()

export const buildTimeValue = (hour, minute, period) => {
  if (!hour || !minute || !period) return ''
  return `${hour}:${minute} ${period}`
}
