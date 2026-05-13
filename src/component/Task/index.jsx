import { Check } from "lucide-react";
export const Task = ({ title, time, completed, onToggle, priority }) => {

    return (
        <li className="flex items-center justify-between  group cursor-pointer" onClick={onToggle}>
            <div className=" flex gap-4 items-center">
                <div className={`w-5 h-5 aspect-square cursor-pointer border border-green-500 ${completed ? 'bg-green-500' : 'bg-transparent '} rounded-full flex items-center justify-center `}>
                    <Check size={16} className={` ${!completed ? "opacity-0 group-hover:opacity-100 group-hover:text-green-500" : "opacity-100 "} transition-colors duration-500 text-white`} />
                </div>

                <div>
                    <p className="font-medium">{title}</p>
                    <p className="text-xs text-gray-500">{time}</p>

                </div>
            </div>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full w-20 text-center ${priority === "high" ? "bg-red-500 text-white" :
                    priority === "medium" ? "bg-yellow-500 text-gray-800" :
                        "bg-green-500 text-white"
                }`}>
                {priority}
            </span>
        </li >
    )
}