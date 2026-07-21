import { useState } from "react";
import { Plus, Trash2, Pin, Clock } from "lucide-react";
import { useDate } from "@/features/calendar/hooks/useDate";
import { CONST } from "@/constants/const";
import {Note} from '../Note'
import { IconBtn } from "@/components/buttons/IconBtn";

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
        <div className="bg-surface w-full rounded-card p-container-md shadow-subtle border border-accent-light/50 min-h-96 flex flex-col">
            {/* Header */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-text">Notes</h3>
                <p className="text-xs text-text-secondary">Quick notes & reminders</p>
            </div>

            {/* Input Area */}
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addNote()}
                    placeholder="Add a note..."
                    className="flex-1 px-3 py-2 bg-surface border border-accent-light/50 rounded-input text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 placeholder-text-muted"
                />
                <IconBtn onClick={addNote} icon={Plus} className="bg-gradient-to-r from-secondary to-primary hover:from-secondary hover:to-primary-hover text-white" />
            </div>

            {/* Notes List */}
            <div className="flex-1 overflow-y-auto space-y-2 max-h-64 ">
                {sortedNotes.length === 0 ? (
                    <div className="text-center py-8 text-text-muted">
                        <p className="text-sm">No notes yet</p>
                        <p className="text-xs text-text-muted/60">Add your first note above</p>
                    </div>
                ) : (
                    sortedNotes.map(note => (
                        <Note key={note.id} {...note} togglePin={togglePin} deleteNote={deleteNote}  />
                        
                    ))
                )}
            </div>
        </div>
    );
}   