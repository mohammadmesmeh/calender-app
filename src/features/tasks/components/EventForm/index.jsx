import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Tag, MapPin, Clock, FileText } from 'lucide-react'
import { FieldWrapper } from "@/features/auth/components/Formes/FormField"
import { RequiredMark } from "@/components/ui/RequiredMark"
import { FORM_CLASSES, TIME_OPTIONS } from "@/constants/form"
import { categories } from '../../data'

export const EventForm = ({
  title,
  onTitleChange,
  category,
  onCategoryChange,
  date,
  onDateChange,
  hour,
  onHourChange,
  minute,
  onMinuteChange,
  period,
  onPeriodChange,
  location,
  onLocationChange,
  description,
  onDescriptionChange,
  error,
  onErrorClear,
}) => {
  const handleChange = (setter) => (e) => {
    setter(e.target.value)
    if (error) onErrorClear()
  }

  return (
    <div className="space-y-5">
      <FieldWrapper label="Title" htmlFor="ev-title" icon={<FileText size={16} />} required>
        <input
          id="ev-title"
          type="text"
          placeholder="Enter event title"
          className={FORM_CLASSES.input}
          value={title}
          onChange={handleChange(onTitleChange)}
          maxLength={100}
        />
      </FieldWrapper>

      <div className="grid gap-5 sm:grid-cols-2">
        <FieldWrapper label="Category" htmlFor="ev-category" icon={<Tag size={16} />} required>
          <select
            id="ev-category"
            className={FORM_CLASSES.input}
            value={category}
            onChange={handleChange(onCategoryChange)}
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </FieldWrapper>

        <FieldWrapper label="Date" htmlFor="ev-date" icon={<Clock size={16} />} required>
          <DatePicker
            id="ev-date"
            selected={date}
            onChange={(d) => {
              onDateChange(d)
              if (error) onErrorClear()
            }}
            className={FORM_CLASSES.input}
            placeholderText="Select date"
            dateFormat="MMMM d, yyyy"
          />
        </FieldWrapper>
      </div>

      <FieldWrapper label="Time" icon={<Clock size={16} />}>
        <div className="grid gap-3 grid-cols-3">
          <select className={FORM_CLASSES.input} value={hour} onChange={handleChange(onHourChange)}>
            {TIME_OPTIONS.hours.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <select className={FORM_CLASSES.input} value={minute} onChange={handleChange(onMinuteChange)}>
            {TIME_OPTIONS.minutes.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <select className={FORM_CLASSES.input} value={period} onChange={handleChange(onPeriodChange)}>
            {TIME_OPTIONS.periods.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </FieldWrapper>

      <FieldWrapper label="Location" htmlFor="ev-location" icon={<MapPin size={16} />}>
        <input
          id="ev-location"
          type="text"
          placeholder="Enter location"
          className={FORM_CLASSES.input}
          value={location}
          onChange={handleChange(onLocationChange)}
        />
      </FieldWrapper>

      <FieldWrapper label="Description" htmlFor="ev-description" icon={<FileText size={16} />}>
        <textarea
          id="ev-description"
          rows={3}
          placeholder="Add a description"
          className={`${FORM_CLASSES.input} min-h-[80px] resize-none`}
          value={description}
          onChange={handleChange(onDescriptionChange)}
          maxLength={500}
        />
      </FieldWrapper>

      {error && (
        <p className="text-sm text-danger flex items-center gap-1.5 bg-danger/5 rounded-button px-3 py-2">
          {error}
        </p>
      )}
    </div>
  )
}
