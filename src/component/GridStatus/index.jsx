import { CircleCheckBig, Clock2, ClipboardList, CalendarClock } from "lucide-react";
export const GridStatus = () => {
    return (
        <div className="grid grid-cols-2 gap-5   w-full px-10">
            <div className="text-green-500 bg-white p-6 rounded-lg  shadow-xl ">
                <span className="flex items-center justify-center w-10 h-10 bg-green-200/75 rounded-lg">
                    <CircleCheckBig />
                </span>
                <h3 className="text-sm text-text-muted font-light my-5">Completed Tasks</h3>
               <p className="text-4xl text-text font-bold">3</p>
            </div>
            <div className="text-yellow-500 bg-white p-6 rounded-lg shadow-xl ">
                <span className="flex items-center justify-center w-10 h-10 bg-yellow-200/75 rounded-lg">
                    <Clock2 />
                </span> 
                <h3 className="text-sm text-text-muted font-light my-5">Pending Tasks</h3>
                <p className="text-4xl text-text font-bold">3</p>
            </div>

            <div className="text-blue-500 bg-white p-6 rounded-lg shadow-xl ">
                <span className="flex items-center justify-center w-10 h-10 bg-blue-200/75 rounded-lg">
                    <ClipboardList />
                </span>
                <h3 className="text-sm text-text-muted font-light my-5">Total Tasks</h3>
                <p className="text-4xl text-text font-bold">3</p>
            </div>
            < div className="text-purple-500 bg-white p-6  rounded-lg shadow-xl ">
                <span className="flex items-center justify-center w-10 h-10 bg-purple-200/75 rounded-lg">
                    <CalendarClock />
                </span>
                <h3 className="text-sm text-text-muted font-light my-5">Upcoming Events</h3>
               <p className="text-4xl text-text font-bold">3</p>
            </div>
        </div>
    )
}

