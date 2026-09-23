import { BellOff } from 'lucide-react'
import { useLocalization } from "@/i18n/LocalizationProvider"

export const NotificationEmpty = () => {
  const { t } = useLocalization()
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light/50 text-primary mb-3">
        <BellOff size={22} />
      </span>
      <p className="text-sm font-medium text-text">{t('notifications.allCaughtUp')}</p>
      <p className="text-xs text-text-muted mt-1 max-w-[200px]">
        {t('notifications.noNotifications')}
      </p>
    </div>
  )
}