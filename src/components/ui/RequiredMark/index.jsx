import { useLocalization } from '@/i18n/LocalizationProvider'

export const RequiredMark = () => {
  const { t } = useLocalization()
  return (
    <span className="text-danger" aria-label={t('common.required')}>*</span>
  )
}
