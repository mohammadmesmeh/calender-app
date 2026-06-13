import { useAuth } from "../../Hooks/useAuth"

export const UserProfile = ({ className, hiddenName, classNameIcon }) => {
      const {user} = useAuth()
      console.log(user);
      
    return (
        <div className={`user profile  flex items-center  gap-2 ${className} `}>
            {user?.photoURL?<img src={user?.photoURL} alt="User Avatar" className="w-10 h-10 rounded-full" />
            : <svg xmlns="http://www.w3.org/2000/svg" 
            width="15" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
            class={`lucide lucide-user-round-icon lucide-user-round w-10 h-10 rounded-full  p-1 ${classNameIcon} `}>
            <circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg> }
            <div className={`info ${hiddenName}  flex-col  ${ hiddenName=== 'hidden' ? 'hidden' : "md:flex"}`}>
                <span className={` text-md font-medium hidden md:block `}>{user.displayName}</span>
                <span className={`text-xs text-slate-300 hidden md:block `}>{user.email}</span>
            </div>
        </div>
    )
}