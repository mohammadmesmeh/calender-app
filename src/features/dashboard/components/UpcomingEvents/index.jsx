import { CalendarX } from "lucide-react";
import { EventCard } from "@/features/calendar/components/EventCard";
import { useEvents } from "@/features/calendar/context/EventContext/EventContext";
import { useLocalization } from "@/i18n/LocalizationProvider";

export const UpcomingEvents = () => {
  const { events } = useEvents();
  const { t } = useLocalization();

  return (
    <div className="w-full bg-surface rounded-card shadow-card p-container-md">
      <h2 className="text-lg font-semibold text-text mb-4">{t('dashboard.upcomingEvents')}</h2>

      {events.length === 0 ? (
        <div className="calendar-empty">
          <CalendarX className="calendar-empty-icon" size={48} />
          <p className="calendar-empty-title">{t('dashboard.noUpcomingEvents')}</p>
          <p className="calendar-empty-description">{t('dashboard.addEventToStart')}</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-1 max-h-64 overflow-y-auto scrollbar-minimal" role="list" aria-label={t('dashboard.upcomingEvents')}>
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
