import { useAuth } from "@/features/auth/hooks/useAuth"
import { UserRound } from 'lucide-react'

export const UserProfile = ({ className, classNameIcon, expanded }) => {
  const { user } = useAuth()
  return (
    <div className={`flex items-center ${className}`}>
      {user?.photoURL ? (
        <img src={user.photoURL} alt="User Avatar" className="w-11 h-11 rounded-full" />
      ) : (
        <span className={`w-10 h-10 rounded-full p-1 ${classNameIcon}`}>
          <UserRound size={32} />
        </span>
      )}

      <div className={`flex flex-col transition-all duration-300 overflow-hidden ${expanded ? "opacity-100 max-w-[200px]" : "opacity-0 max-w-0"}`}>
        <span className="text-md font-medium">{user?.displayName}</span>
        <span className="text-xs text-text-muted">{user?.email}</span>
      </div>
    </div>
  )
}