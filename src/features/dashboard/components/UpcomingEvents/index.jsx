import { CalendarX } from "lucide-react";
import { EventCard } from "@/features/calendar/components/EventCard";
import { events } from "@/Mock Data/data";

export const UpcomingEvents = () => {
  return (
    <div className="w-full bg-surface rounded-card shadow-card p-container-md">
      <h2 className="text-lg font-semibold text-text mb-4">Upcoming Events</h2>

      {events.length === 0 ? (
        <div className="calendar-empty">
          <CalendarX className="calendar-empty-icon" size={48} />
          <p className="calendar-empty-title">No upcoming events</p>
          <p className="calendar-empty-description">Add an event to get started</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-1 max-h-64 overflow-y-auto scrollbar-minimal" role="list" aria-label="Upcoming events">
          {events.map((event) => (
            <li key={event.id}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
