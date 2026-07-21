import { useState, useMemo } from 'react'
import { Modal } from "@/components/ui/Modal"
import { TaskForm } from './TaskForm'
import { TaskActions } from './TaskActions'
import { EventForm } from '../EventForm'
import { FORM_CLASSES, buildTimeValue } from '@/constants/form'

export const TaskModal = ({ isOpen, onClose, onSave }) => {
  const [type, setType] = useState('task')
  const [date, setDate] = useState(null)
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [hour, setHour] = useState('9')
  const [minute, setMinute] = useState('00')
  const [period, setPeriod] = useState('AM')
  const [location, setLocation] = useState('')

  const combinedTime = useMemo(() => buildTimeValue(hour, minute, period), [hour, minute, period])

  const resetState = () => {
    setDate(null)
    setDescription('')
    setTitle('')
    setCategory('')
    setHour('9')
    setMinute('00')
    setPeriod('AM')
    setLocation('')
    setError('')
  }

  const handleSubmit = () => {
    if (type === 'task') {
      if (!title.trim()) { setError('Please enter a task title'); return }
      if (!date) { setError('Please select a task date'); return }
      setError('')
      onSave({ type: 'task', title: title.trim(), date, description: description.trim(), completed: false, priority: 'medium' })
    } else {
      if (!title.trim()) { setError('Please enter an event title'); return }
      if (!date) { setError('Please select an event date'); return }
      if (!category) { setError('Please select a category'); return }
      setError('')
      onSave({ type: 'event', title: title.trim(), date, time: combinedTime, description: description.trim(), location: location.trim(), category })
    }
    resetState()
    onClose()
  }

  const handleClose = () => { resetState(); onClose() }
  const clearError = () => { if (error) setError('') }

  return (
    <Modal title={type === 'task' ? 'Add New Task' : 'Add New Event'} isOpen={isOpen} onClose={handleClose}>
      <div className="space-y-6">
        <div className="grid gap-3 sm:grid-cols-2">
          <button type="button" className={`${FORM_CLASSES.segmented} ${type === 'task' ? FORM_CLASSES.selected : FORM_CLASSES.unselected}`} onClick={() => { setType('task'); setError('') }}>
            Task
          </button>
          <button type="button" className={`${FORM_CLASSES.segmented} ${type === 'event' ? FORM_CLASSES.selected : FORM_CLASSES.unselected}`} onClick={() => { setType('event'); setError('') }}>
            Event
          </button>
        </div>

        {type === 'task' ? (
          <TaskForm title={title} onTitleChange={setTitle} date={date} onDateChange={(d) => { setDate(d); clearError() }} description={description} onDescriptionChange={setDescription} error={error} />
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
