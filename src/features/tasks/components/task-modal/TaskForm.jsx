import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Calendar, FileText, Type } from 'lucide-react'
import { RequiredMark } from "@/components/ui/RequiredMark"
import { FORM_CLASSES } from "@/constants/form"

export const TaskForm = ({
  title,
  onTitleChange,
  date,
  onDateChange,
  description,
  onDescriptionChange,
  error,
}) => (
  <div className="space-y-5">
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-text mb-1.5">
        <Type size={16} className="text-text-muted" />
        Task Title <RequiredMark />
      </label>
      <input
        type="text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="Enter task title..."
        className={FORM_CLASSES.input}
        maxLength={100}
      />
    </div>
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
        Description
      </label>
      <textarea
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        rows={4}
        placeholder="Add notes or details..."
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
