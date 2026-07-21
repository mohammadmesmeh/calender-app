import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Calendar, FileText } from 'lucide-react'
import { RequiredMark } from "@/components/ui/RequiredMark"
import { FORM_CLASSES } from "@/constants/form"

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
        Task Date <RequiredMark />
      </label>
      <DatePicker
        selected={date}
        onChange={onDateChange}
        className={FORM_CLASSES.input}
        placeholderText="Select a date"
        dateFormat="MMMM d, yyyy"
      />
    </div>
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-text mb-1.5">
        <FileText size={16} className="text-text-muted" />
        Description <RequiredMark />
      </label>
      <textarea
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        rows={4}
        placeholder="Describe your task..."
        className={`${FORM_CLASSES.input} min-h-[120px] resize-none`}
        maxLength={500}
      />
      <p className="text-xs text-text-muted mt-1 text-right">
        {description.length}/500
      </p>
    </div>
    {error && (
      <p className="text-sm text-danger flex items-center gap-1.5 bg-danger/5 rounded-button px-3 py-2">
        {error}
      </p>
    )}
  </div>
)
