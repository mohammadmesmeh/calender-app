// Converts a stored 12-hour time string ("09:30 AM") into a locale-aware label
// for display, e.g. "9:30 AM" for en-US, "09:30 ص" for Arabic. Stored fields
// stay English (language-agnostic); only the rendered text is localized.
export const formatStoredTime = (timeString, locale) => {
  if (!timeString) return '';
  const match = String(timeString)
    .trim()
    .match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
  if (!match) return timeString;
  let hour = parseInt(match[1], 10);
  const minute = parseInt(match[2], 10);
  const period = (match[3] || '').toUpperCase();
  if (period === 'PM' && hour < 12) hour += 12;
  if (period === 'AM' && hour === 12) hour = 0;
  const date = new Date(2024, 0, 1, hour, minute, 0, 0);
  try {
    return new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  } catch {
    return timeString;
  }
};