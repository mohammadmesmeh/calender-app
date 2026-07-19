import { useState } from 'react'
import { Modal } from '../Modal'
import { TaskForm } from './TaskForm'
import { TaskActions } from './TaskActions'

export const TaskModal = ({ isOpen, onClose, onSave }) => {
  const [date, setDate] = useState(null)
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!date) {
      setError('Please select a task date')
      return
    }
    if (!description.trim()) {
      setError('Please enter a task description')
      return
    }
    setError('')
    onSave({
      date,
      description: description.trim(),
      completed: false,
      priority: 'medium',
    })
    setDate(null)
    setDescription('')
    onClose()
  }

  const handleClose = () => {
    setDate(null)
    setDescription('')
    setError('')
    onClose()
  }

  return (
    <Modal title="Add New Task" isOpen={isOpen} onClose={handleClose}>
      <div className="space-y-6">
        <TaskForm
          date={date}
          onDateChange={(d) => {
            setDate(d)
            if (error) setError('')
          }}
          description={description}
          onDescriptionChange={setDescription}
          error={error}
        />
        <TaskActions onCancel={handleClose} onConfirm={handleSubmit} />
      </div>
    </Modal>
  )
}
