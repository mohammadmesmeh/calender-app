import { useAuth } from "@/features/auth/hooks/useAuth"
import { UserRound } from 'lucide-react'
import { useLocalization } from "@/i18n/LocalizationProvider"

export const UserProfile = ({ className = '', classNameIcon = '', expanded = false }) => {
  const { user } = useAuth()
  const { t } = useLocalization()

  const displayName = user?.displayName?.trim() || user?.email?.split('@')[0] || t('common.user') || 'User'
  const email = user?.email || ''

  return (
    <div className={`flex items-center ${className}`}>
      {user?.photoURL ? (
        <img
          src={user.photoURL}
          alt={t('nav.userAvatar')}
          className="h-10 w-10 shrink-0 rounded-full object-cover shadow-subtle"
        />
      ) : (
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-subtle ${classNameIcon}`}
        >
          <UserRound size={20} />
        </span>
      )}

      <div
        className={`flex flex-col min-w-0 overflow-hidden transition-all duration-300 ${
          expanded ? "opacity-100 max-w-[12rem]" : "opacity-0 max-w-0"
        }`}
      >
        <span className="truncate text-sm font-semibold leading-tight" dir="auto">
          {displayName}
        </span>
        {email ? (
          <span className="truncate text-xs opacity-80 leading-tight mt-0.5" dir="ltr">
            {email}
          </span>
        ) : null}
      </div>
    </div>
  )
}