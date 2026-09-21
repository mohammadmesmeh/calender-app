import { useEvents } from "../context/EventContext/EventContext";
import { useTask } from "@/features/tasks/context/TaskContext/TaskContext";

export const useCalendarData = () => {
  const {
    events,
    isLoading: isEventsLoading,
    error: eventsError,
    addEvent,
    updateEvent,
    deleteEvent,
  } = useEvents();

  const {
    tasks,
    isLoading: isTasksLoading,
    error: tasksError,
    addTask,
    updateTask,
    deleteTask,
  } = useTask();

  return {
    events,
    tasks,
    isLoading: isEventsLoading || isTasksLoading,
    error: eventsError || tasksError,
    addEvent,
    updateEvent,
    deleteEvent,
    addTask,
    updateTask,
    deleteTask,
  };
};