import { useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  getTasks,
  createTask,
  updateTask as updateTaskDocument,
  toggleTask as toggleTaskDocument,
  deleteTask as deleteTaskDocument,
} from "../../services/taskService";
import { TaskContext } from "./TaskContext";

export const TaskProvider = ({ children }) => {
  const { user } = useAuth();
  const uid = user?.uid;

  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    queueMicrotask(() => {
      if (isCancelled) return;

      if (!uid) {
        setTasks([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      getTasks(uid)
        .then((fetchedTasks) => {
          if (!isCancelled) setTasks(fetchedTasks);
        })
        .catch((loadError) => {
          if (isCancelled) return;
          console.error("Failed to load tasks:", loadError);
          setError("Failed to load tasks");
        })
        .finally(() => {
          if (!isCancelled) setIsLoading(false);
        });
    });

    return () => {
      isCancelled = true;
    };
  }, [uid]);

  const isPersistedTask = (targetTask) =>
    targetTask?.createdAt !== undefined && targetTask?.createdAt !== null;

  const addTask = useCallback(
    async (newTask) => {
      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      if (newTask.type === "event") {
        const event = {
          id: `event-${Date.now()}`,
          title: newTask.title || "Untitled Event",
          time: newTask.time || newTask.date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          day: dayNames[newTask.date.getDay()],
          note: newTask.description || null,
          type: newTask.category || "event",
          color: "bg-primary",
          location: newTask.location || "",
        };
        setTasks((prev) => [event, ...prev]);
        return;
      }

      if (!uid) {
        setError("You must be signed in to add a task");
        return;
      }

      const taskData = {
        title: newTask.title,
        time: newTask.date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        day: dayNames[newTask.date.getDay()],
        completed: false,
        priority: newTask.priority || "medium",
        description: newTask.description || null,
      };

      try {
        const createdTask = await createTask(uid, taskData);
        setTasks((prev) => [createdTask, ...prev]);
        setError(null);
      } catch (createError) {
        console.error("Failed to create task:", createError);
        setError("Failed to create task");
      }
    },
    [uid]
  );

  const toggleTask = useCallback(
    async (id) => {
      const targetTask = tasks.find((task) => task.id === id);
      if (!targetTask) return;

      const nextCompleted = !targetTask.completed;

      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, completed: nextCompleted } : task))
      );

      if (!isPersistedTask(targetTask) || !uid) return;

      try {
        await toggleTaskDocument(uid, id, nextCompleted);
      } catch (toggleError) {
        console.error("Failed to toggle task:", toggleError);
        setError("Failed to update task");
      }
    },
    [tasks, uid]
  );

  const updateTask = useCallback(
    async (id, updates) => {
      const targetTask = tasks.find((task) => task.id === id);
      if (!targetTask) return;

      setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...updates } : task)));

      if (!isPersistedTask(targetTask) || !uid) return;

      try {
        await updateTaskDocument(uid, id, updates);
      } catch (updateError) {
        console.error("Failed to update task:", updateError);
        setError("Failed to update task");
      }
    },
    [tasks, uid]
  );

  const deleteTask = useCallback(
    async (id) => {
      const targetTask = tasks.find((task) => task.id === id);
      if (!targetTask) return;

      setTasks((prev) => prev.filter((task) => task.id !== id));

      if (!isPersistedTask(targetTask) || !uid) return;

      try {
        await deleteTaskDocument(uid, id);
      } catch (deleteError) {
        console.error("Failed to delete task:", deleteError);
        setError("Failed to delete task");
      }
    },
    [tasks, uid]
  );

  const value = useMemo(
    () => ({
      tasks,
      addTask,
      toggleTask,
      updateTask,
      deleteTask,
      isLoading,
      error,
    }),
    [tasks, addTask, toggleTask, updateTask, deleteTask, isLoading, error]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};