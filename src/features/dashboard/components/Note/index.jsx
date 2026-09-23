import { Trash2, Pin, Clock } from "lucide-react";
import { useLocalization } from "@/i18n/LocalizationProvider";

const MONTH_FORMAT = (locale) => new Intl.DateTimeFormat(locale, {
  weekday: "short",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

export const Note = ({ id, pinned, text, timestamp, deleteNote, togglePin }) => {
  const { t, locale } = useLocalization();

  const displayTime = (() => {
    if (!timestamp) return "";
    const parsed = typeof timestamp === "number" ? new Date(timestamp) : new Date(timestamp);
    if (Number.isNaN(parsed.getTime())) return String(timestamp);
    try {
      return MONTH_FORMAT(locale).format(parsed);
    } catch {
      return String(timestamp);
    }
  })();

  return (
    <div
      className={`p-3 rounded-icon border transition-all duration-200 group ${
        pinned
          ? "bg-warning/10 border-warning/30 shadow-subtle"
          : "bg-surface border-border hover:border-accent-light"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-text break-words" dir="auto">{text}</p>
          <div className="flex items-center gap-1 mt-2">
            <Clock size={12} className="text-text-muted" />
            <span className="text-xs text-text-muted">{displayTime}</span>
          </div>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => togglePin(id)}
            className={`p-1 rounded hover:bg-background transition-colors ${pinned ? "text-warning" : "text-text-muted"}`}
            title={pinned ? t('dashboard.unpin') : t('dashboard.pin')}
          >
            <Pin size={14} fill={pinned ? "currentColor" : "none"} />
          </button>
          <button
            onClick={() => deleteNote(id)}
            className="p-1 rounded text-text-muted hover:bg-danger-light hover:text-danger transition-colors"
            title={t('dashboard.deleteNote')}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}