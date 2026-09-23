import { useState, useMemo } from 'react'
import { Modal } from "@/components/ui/Modal"
import { TaskForm } from './TaskForm'
import { TaskActions } from './TaskActions'
import { EventForm } from '../EventForm'
import { FORM_CLASSES, buildTimeValue } from '@/constants/form'
import { parseTimeString, combineDateAndTime, DEFAULT_DURATION_MINUTES } from "@/features/calendar/utils/calendarUtils"
import { useLocalization } from "@/i18n/LocalizationProvider"

const toParts = (minutesOfDay) => {
  const m24 = ((Math.round(minutesOfDay) % 1440) + 1440) % 1440
  const hour = Math.floor(m24 / 60)
  return {
    hour: String(hour % 12 || 12),
    minute: String(m24 % 60).padStart(2, '0'),
    period: hour >= 12 ? 'PM' : 'AM',
  }
}

export const TaskModal = ({ isOpen, onClose, onSave, initialValues = null, editing = false }) => {
  const { t } = useLocalization()
  const seed = initialValues || {}
  const seedTime = parseTimeString(seed.time)
  const hasTime = Boolean(seed.time)
  const seedHour = seedTime.hours % 12 || 12

  const seedEndTime = parseTimeString(seed.endTime)
  const startInitMinutes = hasTime ? seedTime.hours * 60 + seedTime.minutes : 9 * 60
  const endInit = (() => {
    if (seed.endTime) return toParts(seedEndTime.hours * 60 + seedEndTime.minutes)
    return toParts(startInitMinutes + DEFAULT_DURATION_MINUTES)
  })()

  const [type, setType] = useState(() => (seed.type === 'event' ? 'event' : 'task'))
  const [date, setDate] = useState(() => {
    if (!seed.date) return null
    const base = new Date(seed.date)
    if (editing || !hasTime) return base
    try {
      return combineDateAndTime(base, seed.time)
    } catch {
      return base
    }
  })
  const [description, setDescription] = useState(() => seed.description || '')
  const [error, setError] = useState('')

  const [title, setTitle] = useState(() => seed.title || '')
  const [category, setCategory] = useState(() => seed.category || '')
  const [hour, setHour] = useState(() => (hasTime ? String(seedHour) : '9'))
  const [minute, setMinute] = useState(() => (hasTime ? String(seedTime.minutes).padStart(2, '0') : '00'))
  const [period, setPeriod] = useState(() => (seedTime.hours >= 12 ? 'PM' : 'AM'))
  const [location, setLocation] = useState(() => seed.location || '')

  const [endHour, setEndHour] = useState(() => endInit.hour)
  const [endMinute, setEndMinute] = useState(() => endInit.minute)
  const [endPeriod, setEndPeriod] = useState(() => endInit.period)

  const combinedTime = useMemo(() => buildTimeValue(hour, minute, period), [hour, minute, period])
  const combinedEndTime = useMemo(() => buildTimeValue(endHour, endMinute, endPeriod), [endHour, endMinute, endPeriod])

  const resetState = () => {
    setDate(null)
    setDescription('')
    setTitle('')
    setCategory('')
    setHour('9')
    setMinute('00')
    setPeriod('AM')
    const defaultEnd = toParts(9 * 60 + DEFAULT_DURATION_MINUTES)
    setEndHour(defaultEnd.hour)
    setEndMinute(defaultEnd.minute)
    setEndPeriod(defaultEnd.period)
    setLocation('')
    setError('')
  }

  const handleSubmit = () => {
    if (type === 'task') {
      if (!title.trim()) { setError(t('taskForm.taskTitleRequired')); return }
      if (!date) { setError(t('taskForm.taskDateRequired')); return }
      const startMinutes = parseTimeString(combinedTime).hours * 60 + parseTimeString(combinedTime).minutes
      const endMinutes = parseTimeString(combinedEndTime).hours * 60 + parseTimeString(combinedEndTime).minutes
      if (!combinedTime || !combinedEndTime || endMinutes <= startMinutes) {
        setError(t('taskForm.endAfterStart'))
        return
      }
      setError('')
      onSave({ type: 'task', title: title.trim(), date, time: combinedTime, endTime: combinedEndTime, description: description.trim(), completed: false, priority: 'medium' })
    } else {
      if (!title.trim()) { setError(t('taskForm.eventTitleRequired')); return }
      if (!date) { setError(t('taskForm.eventDateRequired')); return }
      if (!category) { setError(t('taskForm.categoryRequired')); return }
      setError('')
      onSave({ type: 'event', title: title.trim(), date, time: combinedTime, description: description.trim(), location: location.trim(), category })
    }
    resetState()
    onClose()
  }

  const handleClose = () => { resetState(); onClose() }
  const clearError = () => { if (error) setError('') }

  const modalTitle = editing
    ? type === 'task' ? t('taskForm.editTask') : t('taskForm.editEvent')
    : type === 'task' ? t('taskForm.addNewTask') : t('taskForm.addNewEvent')

  return (
    <Modal title={modalTitle} isOpen={isOpen} onClose={handleClose}>
      <div className="space-y-6">
        <div className="grid gap-3 sm:grid-cols-2">
          <button type="button" className={`${FORM_CLASSES.segmented} ${type === 'task' ? FORM_CLASSES.selected : FORM_CLASSES.unselected}`} onClick={() => { setType('task'); setError('') }}>
            {t('taskForm.task')}
          </button>
          <button type="button" className={`${FORM_CLASSES.segmented} ${type === 'event' ? FORM_CLASSES.selected : FORM_CLASSES.unselected}`} onClick={() => { setType('event'); setError('') }}>
            {t('taskForm.event')}
          </button>
        </div>

        {type === 'task' ? (
          <TaskForm
            title={title} onTitleChange={setTitle}
            date={date} onDateChange={(d) => { setDate(d); clearError() }}
            hour={hour} onHourChange={setHour}
            minute={minute} onMinuteChange={setMinute}
            period={period} onPeriodChange={setPeriod}
            endHour={endHour} onEndHourChange={setEndHour}
            endMinute={endMinute} onEndMinuteChange={setEndMinute}
            endPeriod={endPeriod} onEndPeriodChange={setEndPeriod}
            description={description} onDescriptionChange={setDescription}
            error={error}
          />
        ) : (
          <EventForm
            title={title} onTitleChange={setTitle}
            category={category} onCategoryChange={setCategory}
            date={date} onDateChange={setDate}
            hour={hour} onHourChange={setHour}
            minute={minute} onMinuteChange={setMinute}
            period={period} onPeriodChange={setPeriod}
            location={location} onLocationChange={setLocation}
            description={description} onDescriptionChange={setDescription}
            error={error} onErrorClear={clearError}
          />
        )}

        <TaskActions type={type} onCancel={handleClose} onConfirm={handleSubmit} />
      </div>
    </Modal>
  )
}
