import { useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Calendar, Clock, Tag, FileText, MapPin, Flag, X, Save } from 'lucide-react'
import { Modal } from '../Modal'
import { FieldWrapper } from '../FormField'
import { categories } from '../../Mock Data/data'

const FORM_SCHEMA = yup.object().shape({
  type: yup.string().oneOf(['task', 'event']).required('Type is required'),
  category: yup.string().required('Category is required'),
  title: yup.string().trim().max(100, 'Title must be 100 characters or less').required('Title is required'),
  description: yup.string().trim().max(500, 'Description must be 500 characters or less').nullable(),
  date: yup.date().required('Date is required').typeError('Date is required'),
  time: yup.string().required('Time is required'),
  priority: yup.string().when('type', {
    is: 'task',
    then: yup.string().oneOf(['low', 'medium', 'high']).required('Priority is required'),
    otherwise: yup.string().nullable(),
  }),
  location: yup.string().trim().nullable(),
})

const segmentedButton = 'inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30'
const selectedButton = 'bg-primary text-white shadow-soft'
const unselectedButton = 'bg-gray-100 text-text-muted hover:bg-gray-200'
const inputBase = 'w-full rounded-xl border border-border bg-white px-4 py-3 text-text placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition'

const timeOption = (value) => ({ label: value.toString().padStart(2, '0'), value: value.toString().padStart(2, '0') })
const hours = Array.from({ length: 12 }, (_, index) => timeOption(index + 1))
const minutes = Array.from({ length: 12 }, (_, index) => timeOption(index * 5))
const periods = [
  { value: 'AM', label: 'AM' },
  { value: 'PM', label: 'PM' },
]

const buildTimeValue = (hour, minute, period) => {
  if (!hour || !minute || !period) return ''
  return `${hour}:${minute} ${period}`
}

export const AddTaskEventModal = ({ isOpen, onClose, onSave }) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FORM_SCHEMA),
    defaultValues: {
      type: 'task',
      category: '',
      title: '',
      description: '',
      date: null,
      hour: '9',
      minute: '00',
      period: 'AM',
      time: '09:00 AM',
      priority: 'medium',
      location: '',
    },
  })

  const type = watch('type')
  const selectedHour = watch('hour')
  const selectedMinute = watch('minute')
  const selectedPeriod = watch('period')

  const combinedTime = useMemo(() => buildTimeValue(selectedHour, selectedMinute, selectedPeriod), [selectedHour, selectedMinute, selectedPeriod])

  const onSubmit = (values) => {
    onSave({
      type: values.type,
      category: values.category,
      title: values.title,
      description: values.description || '',
      date: values.date,
      time: combinedTime,
      priority: values.type === 'task' ? values.priority : null,
      location: values.type === 'event' ? values.location || '' : null,
    })
    reset()
    onClose()
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Modal title="Add New" isOpen={isOpen} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-3 sm:grid-cols-2">
          <button type="button" className={`${segmentedButton} ${type === 'task' ? selectedButton : unselectedButton}`} onClick={() => setValue('type', 'task')}>
            Task
          </button>
          <button type="button" className={`${segmentedButton} ${type === 'event' ? selectedButton : unselectedButton}`} onClick={() => setValue('type', 'event')}>
            Event
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <FieldWrapper label="Category" htmlFor="category" error={errors.category?.message} icon={<Tag size={16} />} required>
            <select id="category" className={inputBase} {...register('category')}>
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </FieldWrapper>

          <FieldWrapper label="Title" htmlFor="title" error={errors.title?.message} icon={<FileText size={16} />} required>
            <input id="title" type="text" placeholder="Enter title" className={inputBase} {...register('title')} maxLength={100} />
          </FieldWrapper>
        </div>

        <FieldWrapper label="Description" htmlFor="description" error={errors.description?.message} icon={<FileText size={16} />}>
          <textarea id="description" rows="4" placeholder="Add a description" className={`${inputBase} min-h-[120px]`} {...register('description')} maxLength={500} />
        </FieldWrapper>

        <div className="grid gap-6 lg:grid-cols-2">
          <FieldWrapper label="Date" htmlFor="date" error={errors.date?.message} icon={<Calendar size={16} />} required>
            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <DatePicker
                  id="date"
                  selected={field.value}
                  onChange={field.onChange}
                  className={inputBase}
                  placeholderText="Select date"
                  dateFormat="MMMM d, yyyy"
                />
              )}
            />
          </FieldWrapper>

          <FieldWrapper label="Time" error={errors.time?.message} icon={<Clock size={16} />} required>
            <div className="grid gap-3 sm:grid-cols-3">
              <select className={inputBase} {...register('hour')}>
                {hours.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <select className={inputBase} {...register('minute')}>
                {minutes.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <select className={inputBase} {...register('period')}>
                {periods.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <input type="hidden" {...register('time')} value={combinedTime} />
          </FieldWrapper>
        </div>

        {type === 'task' && (
          <FieldWrapper label="Priority" htmlFor="priority" error={errors.priority?.message} icon={<Flag size={16} />} required>
            <select id="priority" className={inputBase} {...register('priority')}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </FieldWrapper>
        )}

        {type === 'event' && (
          <FieldWrapper label="Location" htmlFor="location" error={errors.location?.message} icon={<MapPin size={16} />}>
            <input id="location" type="text" placeholder="Enter location" className={inputBase} {...register('location')} />
          </FieldWrapper>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={handleClose} className="inline-flex items-center justify-center rounded-xl border border-border px-4 py-3 text-sm font-medium text-text transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/30">
            Cancel
          </button>
          <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/50">
            <Save size={16} /> Save
          </button>
        </div>
      </form>
    </Modal>
  )
}
