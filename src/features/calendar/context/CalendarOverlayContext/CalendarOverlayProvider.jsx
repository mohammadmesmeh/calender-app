import { useCallback, useMemo, useState } from "react";
import { useCalendarData } from "../../hooks/useCalendarData";
import { buildEventDocument, buildTaskDocument, combineDateAndTime, formatTimeLabel, toDate } from "../../utils/calendarUtils";
import { TaskModal } from "@/features/tasks/components/task-modal";
import { CalendarEventPopover } from "../../components/CalendarEventPopover";
import { CalendarOverlayContext } from "./CalendarOverlayContext";

const seedFromEvent = (item) => ({
  type: "event",
  title: item.record.title,
  date: toDate(item.record.startAt) || toDate(item.record.date),
  time: item.record.time,
  description: item.record.note || "",
  category: item.record.type,
  location: item.record.location,
});

const seedFromTask = (item) => {
  const record = item.record;
  const start = toDate(record.startAt);
  const end = toDate(record.endAt);
  return {
    type: "task",
    title: record.title,
    date: start || toDate(record.date) || null,
    time: record.time || (start ? formatTimeLabel(start) : undefined),
    endTime: end ? formatTimeLabel(end) : record.endTime || undefined,
    description: record.description || "",
  };
};

export const CalendarOverlayProvider = ({ children }) => {
  const {
    addEvent,
    addTask,
    updateEvent,
    updateTask,
    deleteEvent,
    deleteTask,
  } = useCalendarData();

  const [addDate, setAddDate] = useState(null);
  const [addTime, setAddTime] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const isAddOpen = !!addDate;
  const isEditOpen = !!editingItem;

  const openAdd = useCallback((date, time) => {
    if (!date) return;
    const base = new Date(date);
    const target = time ? combineDateAndTime(base, time) : base;
    setAddDate(target);
    setAddTime(time || null);
    setSelectedItem(null);
    setEditingItem(null);
  }, []);

  const openItem = useCallback((item) => {
    setSelectedItem(item);
    setAddDate(null);
    setAddTime(null);
    setEditingItem(null);
  }, []);

  const startEdit = useCallback((item) => {
    setSelectedItem(null);
    setAddDate(null);
    setAddTime(null);
    setEditingItem(item);
  }, []);

  const closeModal = useCallback(() => {
    setAddDate(null);
    setAddTime(null);
    setEditingItem(null);
  }, []);

  const closePopover = useCallback(() => setSelectedItem(null), []);

  const handleSave = useCallback(
    (payload) => {
      if (editingItem?.source === "event") {
        const updates = buildEventDocument({
          title: payload.title,
          date: payload.date,
          time: payload.time,
          description: payload.description,
          category: payload.category,
          location: payload.location,
        });
        updateEvent(editingItem.id, updates);
      } else if (editingItem?.source === "task") {
        const updates = {
          title: payload.title.trim(),
          ...buildTaskDocument({ date: payload.date, time: payload.time, endTime: payload.endTime }),
          description: payload.description.trim() || null,
        };
        updateTask(editingItem.id, updates);
      } else {
        if (payload.type === "event") addEvent(payload);
        else addTask(payload);
      }
      closeModal();
    },
    [editingItem, updateEvent, updateTask, addEvent, addTask, closeModal]
  );

  const handleDelete = useCallback(
    (item) => {
      if (item?.source === "event") deleteEvent(item.id);
      else if (item?.source === "task") deleteTask(item.id);
      setSelectedItem(null);
    },
    [deleteEvent, deleteTask]
  );

  const value = useMemo(
    () => ({
      openAdd,
      openItem,
      startEdit,
      closeModal,
      closePopover,
      addDate,
      selectedItem,
      editingItem,
      isAddOpen,
      isEditOpen,
    }),
    [openAdd, openItem, startEdit, closeModal, closePopover, addDate, selectedItem, editingItem, isAddOpen, isEditOpen]
  );

  const popoverEvent = selectedItem
    ? {
        title: selectedItem.record.title,
        type: selectedItem.source === "event" ? selectedItem.record.type : "task",
        startAt: selectedItem.record.startAt,
        day: selectedItem.record.day,
        time: selectedItem.record.time,
        location: selectedItem.record.location,
        note: selectedItem.source === "event" ? selectedItem.record.note : selectedItem.record.description,
      }
    : null;

  return (
    <CalendarOverlayContext.Provider value={value}>
      {children}

      <TaskModal
        key={editingItem ? `edit-${editingItem.id}` : `add-${addDate ? addDate.toDateString() : "default"}`}
        isOpen={isAddOpen || isEditOpen}
        onClose={closeModal}
        onSave={handleSave}
        editing={!!editingItem}
        initialValues={
          editingItem
            ? editingItem.source === "event"
              ? seedFromEvent(editingItem)
              : seedFromTask(editingItem)
            : { date: addDate || new Date(), time: addTime || undefined }
        }
      />

      <CalendarEventPopover
        event={popoverEvent}
        onClose={closePopover}
        onDelete={() => handleDelete(selectedItem)}
        onEdit={() => startEdit(selectedItem)}
      />
    </CalendarOverlayContext.Provider>
  );
};