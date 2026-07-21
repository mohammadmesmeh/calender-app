import { Save, X } from 'lucide-react'

export const TaskActions = ({ onCancel, onConfirm, type = 'task' }) => (
  <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
    <button
      type="button"
      onClick={onCancel}
      className="inline-flex items-center justify-center gap-2 rounded-button border border-border px-5 py-2.5 text-sm font-medium text-text transition hover:bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
    >
      <X size={16} />
      Cancel
    </button>
    <button
      type="button"
      onClick={onConfirm}
      className="inline-flex items-center justify-center gap-2 rounded-button bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/50"
    >
      <Save size={16} />
      {type === 'event' ? 'Save Event' : 'Save Task'}
    </button>
  </div>
)
