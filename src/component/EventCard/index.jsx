export const  EventCard = ({ title, time, note, type, color, key }) => {
    return (
        <li key={key} className=" flex items-center gap-4">

            <div className="flex flex-col justify-center  ">
                <div className={`w-3 h-3 ${color} rounded-full`} />

            </div>
            <div className="flex items-center gap-2 justify-between w-full">

                <div>
                    <p className="font-medium">{title}</p>
                    <p className="text-xs text-gray-500">{time}</p>
                    {note && <p className="text-xs text-gray-400">{note}</p>}
                </div>
                < span className={`text-xs w-24 text-center  ${color} text-white px-2 py-1 rounded`}>{type}</span>
            </div>
        </li>
    )
}