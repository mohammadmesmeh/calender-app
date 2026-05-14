import { Plus, Trash2, Pin, Clock } from "lucide-react";
export const Note =({id,pinned,text,timestamp ,deleteNote ,togglePin})=>{
    return(
        <div
                            key={id}
                            className={`p-3 rounded-lg border transition-all duration-200 group ${pinned
                                ? "bg-yellow-50 border-yellow-200 shadow-sm"
                                : "bg-white border-gray-100 hover:border-purple-200"
                                }`}
                        >
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-700 break-words">{text}</p>
                                    <div className="flex items-center gap-1 mt-2">
                                        <Clock size={12} className="text-gray-400" />
                                        <span className="text-xs text-gray-400">{timestamp}</span>
                                    </div>
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => togglePin(id)}
                                        className={`p-1 rounded hover:bg-gray-200 transition-colors ${pinned ? "text-yellow-500" : "text-gray-400"
                                            }`}
                                        title={pinned ? "Unpin" : "Pin"}
                                    >
                                        <Pin size={14} fill={pinned ? "currentColor" : "none"} />
                                    </button>
                                    <button
                                        onClick={() => deleteNote(id)}
                                        className="p-1 rounded text-gray-400 hover:bg-red-100 hover:text-red-500 transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
    )
}