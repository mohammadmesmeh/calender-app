import { useAuth } from "../../Hooks/useAuth"

export const UserProfile = ({ className, classNameIcon, expanded }) => {
    const { user } = useAuth()
    console.log(user);
    console.log(user?.photoURL);
    return (
        <div className={`flex items-center   ${className}`}>

            {user?.photoURL ?
                <img
                    src={user.photoURL}
                    alt="User Avatar"
                    className="w-11 h-11 rounded-full"
                    onError={(e) => {
                        console.log("Image failed");
                        console.log(e);
                    }}
                />
                :
                <svg xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class={`lucide lucide-user-round-icon lucide-user-round w-10 h-10 rounded-full p-1 ${classNameIcon} `}>
                    <circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>
            }

            {/* الاسم والإيميل */}
            <div
                className={`flex flex-col transition-all duration-300 overflow-hidden ${expanded ? "opacity-100 max-w-[200px]" : "opacity-0 max-w-0"
                    }`}
            >
                <span className="text-md font-medium">
                    {user?.displayName}
                </span>
                <span className="text-xs text-slate-400">
                    {user?.email}
                </span>
            </div>
        </div >
    )
}