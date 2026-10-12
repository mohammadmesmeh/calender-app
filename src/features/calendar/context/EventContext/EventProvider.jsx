import { useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  getEvents,
  createEvent,
  updateEvent as updateEventDocument,
  deleteEvent as deleteEventDocument,
} from "../../services/eventService";
import { buildEventDocument } from "../../utils/calendarUtils";
import { EventContext } from "./EventContext";

export const EventProvider = ({ children }) => {
  const { user } = useAuth();
  const uid = user?.uid;

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    queueMicrotask(() => {
      if (isCancelled) return;

      if (!uid) {
        setEvents([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      getEvents(uid)
        .then((fetchedEvents) => {
          if (!isCancelled) setEvents(fetchedEvents);
        })
        .catch((loadError) => {
          if (isCancelled) return;
          console.error("Failed to load events:", loadError);
          setError("Failed to load events");
        })
        .finally(() => {
          if (!isCancelled) setIsLoading(false);
        });
    });

    return () => {
      isCancelled = true;
    };
  }, [uid]);

  const addEvent = useCallback(
    async (newEvent) => {
      if (!uid) {
        setError("You must be signed in to add an event");
        return;
      }

      const eventData = buildEventDocument({
        title: newEvent.title || "Untitled Event",
        date: newEvent.date,
        time: newEvent.time,
        description: newEvent.description,
        category: newEvent.category,
        location: newEvent.location,
      });

      try {
        const createdEvent = await createEvent(uid, eventData);
        setEvents((prev) => [createdEvent, ...prev]);
        setError(null);
      } catch (createError) {
        console.error("Failed to create event:", createError);
        setError("Failed to create event");
      }
    },
    [uid]
  );

  const updateEvent = useCallback(
    async (id, updates) => {
      const targetEvent = events.find((event) => event.id === id);
      if (!targetEvent) return;

      const previousEvent = targetEvent;
      setEvents((prev) => prev.map((event) => (event.id === id ? { ...event, ...updates } : event)));

      if (!targetEvent.createdAt || !uid) return;

      try {
        await updateEventDocument(uid, id, updates);
      } catch (updateError) {
        console.error("Failed to update event:", updateError);
        setEvents((prev) => prev.map((event) => (event.id === id ? previousEvent : event)));
        setError("Failed to update event");
      }
    },
    [events, uid]
  );

  const deleteEvent = useCallback(
    async (id) => {
      const targetEvent = events.find((event) => event.id === id);
      if (!targetEvent) return;

      setEvents((prev) => prev.filter((event) => event.id !== id));

      if (!targetEvent?.createdAt || !uid) return;

      try {
        await deleteEventDocument(uid, id);
      } catch (deleteError) {
        console.error("Failed to delete event:", deleteError);
        setError("Failed to delete event");
      }
    },
    [events, uid]
  );

  const value = useMemo(
    () => ({
      events,
      addEvent,
      updateEvent,
      deleteEvent,
      isLoading,
      error,
    }),
    [events, addEvent, updateEvent, deleteEvent, isLoading, error]
  );

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};