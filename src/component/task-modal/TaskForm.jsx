import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Calendar, FileText } from 'lucide-react'

const inputBase =
  'w-full rounded-xl border border-border bg-white px-4 py-3 text-text placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition'

export const TaskForm = ({
  date,
  onDateChange,
  description,
  onDescriptionChange,
  error,
}) => (
  <div className="space-y-5">
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-text mb-1.5">
        <Calendar size={16} className="text-text-muted" />
        Task Date <span className="text-danger">*</span>
      </label>
      <DatePicker
        selected={date}
        onChange={onDateChange}
        className={inputBase}
        placeholderText="Select a date"
        dateFormat="MMMM d, yyyy"
      />
    </div>
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-text mb-1.5">
        <FileText size={16} className="text-text-muted" />
        Description <span className="text-danger">*</span>
      </label>
      <textarea
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        rows={4}
        placeholder="Describe your task..."
        className={`${inputBase} min-h-[120px] resize-none`}
        maxLength={500}
      />
      <p className="text-xs text-text-muted mt-1 text-right">
        {description.length}/500
      </p>
    </div>
    {error && (
      <p className="text-sm text-danger flex items-center gap-1.5 bg-danger/5 rounded-lg px-3 py-2">
        {error}
      </p>
    )}
  </div>
)
