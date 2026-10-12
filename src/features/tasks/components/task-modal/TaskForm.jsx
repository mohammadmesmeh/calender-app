import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ar as arLocale } from 'date-fns/locale'
import { Calendar, FileText, Type, Clock } from 'lucide-react'
import { RequiredMark } from "@/components/ui/RequiredMark"
import { FORM_CLASSES, TIME_OPTIONS } from "@/constants/form"
import { useLocalization } from "@/i18n/LocalizationProvider"

const WEEK_START_TO_RDP = { sun: 0, mon: 1, sat: 6 }

const TimePicker = ({ hour, minute, period, onHourChange, onMinuteChange, onPeriodChange, label, hourAria, minuteAria, periodAria, translate }) => (
  <div>
    <span className="block text-xs font-medium text-text-muted mb-1.5">{label}</span>
    <div className="grid grid-cols-3 gap-2">
      <select className={FORM_CLASSES.input} value={hour} onChange={onHourChange} aria-label={hourAria}>
        {TIME_OPTIONS.hours.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <select className={FORM_CLASSES.input} value={minute} onChange={onMinuteChange} aria-label={minuteAria}>
        {TIME_OPTIONS.minutes.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <select className={FORM_CLASSES.input} value={period} onChange={onPeriodChange} aria-label={periodAria}>
        {TIME_OPTIONS.periods.map((o) => (
          <option key={o.value} value={o.value}>{translate(o.value === 'AM' ? 'time.am' : 'time.pm')}</option>
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
}) => {
  const { t, lang, weekStart } = useLocalization()

  return (
  <div className="space-y-5">
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-text mb-1.5">
        <Type size={16} className="text-text-muted" />
        {t('taskForm.taskTitle')} <RequiredMark />
      </label>
      <input
        type="text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder={t('taskForm.enterTaskTitle')}
        className={FORM_CLASSES.input}
        maxLength={100}
      />
    </div>
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-text mb-1.5">
        <Calendar size={16} className="text-text-muted" />
        {t('taskForm.taskDate')} <RequiredMark />
      </label>
      <DatePicker
        selected={date}
        onChange={onDateChange}
        className={FORM_CLASSES.input}
        placeholderText={t('taskForm.selectDate')}
        dateFormat="MMMM d, yyyy"
        locale={lang === 'ar' ? arLocale : undefined}
        calendarStartDay={WEEK_START_TO_RDP[weekStart] ?? 0}
      />
    </div>
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-text mb-3">
        <Clock size={16} className="text-text-muted" />
        {t('taskForm.time')}
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <TimePicker
          label={t('taskForm.start')}
          translate={t}
          hourAria={`${t('taskForm.start')} ${t('taskForm.time')} ${t('taskForm.hours')}`}
          minuteAria={`${t('taskForm.start')} ${t('taskForm.time')} ${t('taskForm.minutes')}`}
          periodAria={`${t('taskForm.start')} ${t('taskForm.time')} ${t('taskForm.period')}`}
          hour={hour} minute={minute} period={period}
          onHourChange={(e) => onHourChange(e.target.value)}
          onMinuteChange={(e) => onMinuteChange(e.target.value)}
          onPeriodChange={(e) => onPeriodChange(e.target.value)}
        />
        <TimePicker
          label={t('taskForm.end')}
          translate={t}
          hourAria={`${t('taskForm.end')} ${t('taskForm.time')} ${t('taskForm.hours')}`}
          minuteAria={`${t('taskForm.end')} ${t('taskForm.time')} ${t('taskForm.minutes')}`}
          periodAria={`${t('taskForm.end')} ${t('taskForm.time')} ${t('taskForm.period')}`}
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
        {t('taskForm.description')}
      </label>
      <textarea
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        rows={4}
        placeholder={t('taskForm.addNotes')}
        className={`${FORM_CLASSES.input} min-h-[120px] resize-none`}
        maxLength={500}
      />
      <p className="text-xs text-text-muted mt-1 text-end">
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
}