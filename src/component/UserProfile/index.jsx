
export const UserProfile =({ className ,hiddenName,classNameIcon }) => { 
    return (
           <div className={`user profile  flex items-center  gap-2 ${className} `}>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={`lucide lucide-user-round-icon lucide-user-round w-10 h-10 rounded-full  p-1 ${classNameIcon} `}><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
                {/* <img src="/path/to/user-avatar.jpg" alt="User Avatar" className="w-10 h-10 rounded-full" /> */}
                <div className={`info ${hiddenName} flex flex-col `}>
                <span className={` text-md font-medium `}>John Doe</span>
                <span className={`text-xs text-slate-300 `}>john.doe@example.com</span>
                </div>
            </div>
    )
}