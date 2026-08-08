import { useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  getNotes,
  createNote,
  updateNote as updateNoteDocument,
  togglePinNote as togglePinNoteDocument,
  deleteNote as deleteNoteDocument,
} from "../../services/noteService";
import { NotesContext } from "./NotesContext";

export const NotesProvider = ({ children }) => {
  const { user } = useAuth();
  const uid = user?.uid;

  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    queueMicrotask(() => {
      if (isCancelled) return;

      if (!uid) {
        setNotes([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      getNotes(uid)
        .then((fetchedNotes) => {
          if (!isCancelled) setNotes(fetchedNotes);
        })
        .catch((loadError) => {
          if (isCancelled) return;
          console.error("Failed to load notes:", loadError);
          setError("Failed to load notes");
        })
        .finally(() => {
          if (!isCancelled) setIsLoading(false);
        });
    });

    return () => {
      isCancelled = true;
    };
  }, [uid]);

  const addNote = useCallback(
    async (newNote) => {
      if (!uid) {
        setError("You must be signed in to add a note");
        return;
      }

      const noteData = {
        text: newNote.text,
        pinned: newNote.pinned || false,
        timestamp: newNote.timestamp || "",
      };

      try {
        const createdNote = await createNote(uid, noteData);
        setNotes((prev) => [createdNote, ...prev]);
        setError(null);
      } catch (createError) {
        console.error("Failed to create note:", createError);
        setError("Failed to create note");
      }
    },
    [uid]
  );

  const updateNote = useCallback(
    async (id, updates) => {
      const targetNote = notes.find((note) => note.id === id);
      if (!targetNote) return;

      setNotes((prev) => prev.map((note) => (note.id === id ? { ...note, ...updates } : note)));

      if (!targetNote?.createdAt || !uid) return;

      try {
        await updateNoteDocument(uid, id, updates);
      } catch (updateError) {
        console.error("Failed to update note:", updateError);
        setError("Failed to update note");
      }
    },
    [notes, uid]
  );

  const togglePinNote = useCallback(
    async (id) => {
      const targetNote = notes.find((note) => note.id === id);
      if (!targetNote) return;

      const nextPinned = !targetNote.pinned;

      setNotes((prev) => prev.map((note) => (note.id === id ? { ...note, pinned: nextPinned } : note)));

      if (!targetNote?.createdAt || !uid) return;

      try {
        await togglePinNoteDocument(uid, id, nextPinned);
      } catch (pinError) {
        console.error("Failed to pin note:", pinError);
        setError("Failed to pin note");
      }
    },
    [notes, uid]
  );

  const deleteNote = useCallback(
    async (id) => {
      const targetNote = notes.find((note) => note.id === id);
      if (!targetNote) return;

      setNotes((prev) => prev.filter((note) => note.id !== id));

      if (!targetNote?.createdAt || !uid) return;

      try {
        await deleteNoteDocument(uid, id);
      } catch (deleteError) {
        console.error("Failed to delete note:", deleteError);
        setError("Failed to delete note");
      }
    },
    [notes, uid]
  );

  const value = useMemo(
    () => ({
      notes,
      addNote,
      updateNote,
      togglePinNote,
      deleteNote,
      isLoading,
      error,
    }),
    [notes, addNote, updateNote, togglePinNote, deleteNote, isLoading, error]
  );

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
};