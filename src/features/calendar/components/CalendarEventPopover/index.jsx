import { Clock, MapPin, FileText, Pencil, Trash2, CalendarDays } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { toDate } from "../../utils/calendarUtils";
import { useLocalization } from "@/i18n/LocalizationProvider";

export const CalendarEventPopover = ({ event, onClose, onEdit, onDelete }) => {
  const { t, weekday, dateFull } = useLocalization();

  if (!event) return null;

  const start = toDate(event.startAt);
  const dateLabel = start
    ? `${weekday(start, "long")}, ${dateFull(start)}`
    : event.day || "";

  return (
    <Modal title={t('calendar.eventDetails')} isOpen={!!event} onClose={onClose}>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-icon bg-primary-light text-primary">
            <CalendarDays size={18} />
          </span>
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-text truncate" dir="auto">{event.title}</h3>
            <p className="text-sm text-text-secondary">
              {event.type === 'task' ? t('taskForm.task') : t(`calendar.slots.${event.type}`)}
            </p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-text-secondary">
            <CalendarDays size={15} className="text-text-muted shrink-0" />
            <span className="capitalize">{dateLabel}</span>
          </div>
          {event.time && (
            <div className="flex items-center gap-2 text-text-secondary">
              <Clock size={15} className="text-text-muted shrink-0" />
              <span>{event.time}</span>
            </div>
          )}
          {event.location && (
            <div className="flex items-center gap-2 text-text-secondary">
              <MapPin size={15} className="text-text-muted shrink-0" />
              <span>{event.location}</span>
            </div>
          )}
          {event.note && (
            <div className="flex items-start gap-2 text-text-secondary">
              <FileText size={15} className="text-text-muted shrink-0 mt-0.5" />
              <span className="whitespace-pre-line break-words" dir="auto">{event.note}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onDelete}
            className="inline-flex items-center justify-center gap-2 rounded-button border border-danger/40 px-4 py-2 text-sm font-medium text-danger transition hover:bg-danger-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger/40"
          >
            <Trash2 size={16} />
            {t('common.delete')}
          </button>
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex items-center justify-center gap-2 rounded-button bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            <Pencil size={16} />
            {t('common.edit')}
          </button>
        </div>
      </div>
    </Modal>
  );
};