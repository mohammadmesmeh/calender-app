import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Calendar, FileText, Type, Clock } from 'lucide-react'
import { RequiredMark } from "@/components/ui/RequiredMark"
import { FORM_CLASSES, TIME_OPTIONS } from "@/constants/form"

const TimePicker = ({ hour, minute, period, onHourChange, onMinuteChange, onPeriodChange, label }) => (
  <div>
    <span className="block text-xs font-medium text-text-muted mb-1.5">{label}</span>
    <div className="grid grid-cols-3 gap-2">
      <select className={FORM_CLASSES.input} value={hour} onChange={onHourChange} aria-label={`${label} hours`}>
        {TIME_OPTIONS.hours.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <select className={FORM_CLASSES.input} value={minute} onChange={onMinuteChange} aria-label={`${label} minutes`}>
        {TIME_OPTIONS.minutes.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <select className={FORM_CLASSES.input} value={period} onChange={onPeriodChange} aria-label={`${label} period`}>
        {TIME_OPTIONS.periods.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  </div>
)

export const TaskForm = ({
  title,
  onTitleChange,
  date,
  onDateChange,
  hour,
  onHourChange,
  minute,
  onMinuteChange,
  period,
  onPeriodChange,
  endHour,
  onEndHourChange,
  endMinute,
  onEndMinuteChange,
  endPeriod,
  onEndPeriodChange,
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
      <label className="flex items-center gap-2 text-sm font-medium text-text mb-3">
        <Clock size={16} className="text-text-muted" />
        Time
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <TimePicker
          label="Start"
          hour={hour} minute={minute} period={period}
          onHourChange={(e) => onHourChange(e.target.value)}
          onMinuteChange={(e) => onMinuteChange(e.target.value)}
          onPeriodChange={(e) => onPeriodChange(e.target.value)}
        />
        <TimePicker
          label="End"
          hour={endHour} minute={endMinute} period={endPeriod}
          onHourChange={(e) => onEndHourChange(e.target.value)}
          onMinuteChange={(e) => onEndMinuteChange(e.target.value)}
          onPeriodChange={(e) => onEndPeriodChange(e.target.value)}
        />
      </div>
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
