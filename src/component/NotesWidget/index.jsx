import { useState } from "react";
import { Plus, Trash2, Pin, Clock } from "lucide-react";
import { useDate } from "../../Hooks/useDate";
import { CONST } from "../../constants/const";
import {Note} from '../Note'
import { IconBtn } from "../Buttons/IconBtn";

export const NotesWidget = () => {
    const [notes, setNotes] = useState([
        { id: 1, text: "Review project proposal", pinned: true, timestamp: "Today" },
        { id: 2, text: "Call with stakeholders", pinned: false, timestamp: "Yesterday" }
    ]);
    const [input, setInput] = useState("");
    const {thisDayInWeek} = useDate()
  
    

    const addNote = () => {
        if (input.trim()) {
            setNotes([
                { id: Date.now(), text: input, pinned: false, timestamp: CONST.DAYS__OF__WEEK[thisDayInWeek+2]  },
                ...notes
            ]);
            setInput("");
        }
    };

    const deleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    const togglePin = (id) => {
        setNotes(notes.map(note =>
            note.id === id ? { ...note, pinned: !note.pinned } : note
        ));
    };

    const sortedNotes = [...notes].sort((a, b) => b.pinned - a.pinned);

    return (
        <div className="bg-bgCard rounded-lg p-6 shadow-sm border border-purple-100 min-h-96 flex flex-col">
            {/* Header */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Notes</h3>
                <p className="text-xs text-gray-500">Quick notes & reminders</p>
            </div>

            {/* Input Area */}
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addNote()}
                    placeholder="Add a note..."
                    className="flex-1 px-3 py-2 bg-white border border-purple-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-400"
                />
                <IconBtn onClick={addNote} icon={Plus} className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white" />
            </div>

            {/* Notes List */}
            <div className="flex-1 overflow-y-auto space-y-2 max-h-64">
                {sortedNotes.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                        <p className="text-sm">No notes yet</p>
                        <p className="text-xs text-gray-300">Add your first note above</p>
                    </div>
                ) : (
                    sortedNotes.map(note => (
                        <Note {...note} togglePin={togglePin} deleteNote={deleteNote}  />
                        
                    ))
                )}
            </div>
        </div>
    );
}   