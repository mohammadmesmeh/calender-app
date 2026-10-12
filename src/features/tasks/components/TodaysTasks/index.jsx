import { useState } from "react"
import { Plus, ClipboardList } from 'lucide-react'
import { Task } from "../Task";
import { AddButtonsNonBg } from '@/components/buttons/AddButtonsNonBg'
import { useTask } from '../../context/TaskContext/TaskContext'
import { useEvents } from "@/features/calendar/context/EventContext/EventContext"
import { TaskModal } from '../task-modal'
import { useLocalization } from "@/i18n/LocalizationProvider"

export const TodaysTasks = () => {
    const { tasks, addTask, toggleTask } = useTask()
    const { addEvent } = useEvents()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { t } = useLocalization()

    return (
        <div className="w-full bg-surface rounded-card shadow-card p-container-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-text">{t('dashboard.todaysTasks')}</h2>
                <AddButtonsNonBg
                    content={t('nav.addTask')}
                    className="bg-transparent shadow-none hover:shadow-none text-xs md:text-sm"
                    onClick={() => setIsModalOpen(true)}
                >
                    <Plus size={16} />
                </AddButtonsNonBg>
            </div>

            {tasks.length === 0 ? (
                <div className="calendar-empty">
                    <ClipboardList className="calendar-empty-icon" size={48} />
                    <p className="calendar-empty-title">{t('dashboard.noTasks')}</p>
                    <p className="calendar-empty-description">{t('dashboard.addTaskToStart')}</p>
                </div>
            ) : (
                <ul className="flex flex-col gap-2 max-h-64 overflow-y-auto scrollbar-minimal" role="list" aria-label={t('dashboard.todaysTasks')}>
                    {tasks.map((task) => (
                        <Task key={task.id} {...task} onToggle={() => toggleTask(task.id)} />
                    ))}
                </ul>
            )}

            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={(data) => (data.type === "event" ? addEvent(data) : addTask(data))}
            />
        </div>
    )
}
