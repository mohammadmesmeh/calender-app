import {
  collection,
  doc,
  getDocs,
  addDoc,
  setDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase";

const getNotesCollectionReference = (uid) => collection(db, "users", uid, "notes");

const getNoteDocumentReference = (uid, noteId) =>
  doc(db, "users", uid, "notes", noteId);

export const getNotes = async (uid) => {
  if (!uid) return [];

  const notesQuery = query(getNotesCollectionReference(uid), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(notesQuery);

  return querySnapshot.docs.map((noteDoc) => ({
    id: noteDoc.id,
    ...noteDoc.data(),
  }));
};

export const createNote = async (uid, noteData) => {
  if (!uid) throw new Error("User is not authenticated");

  const now = serverTimestamp();
  const noteDocument = {
    ...noteData,
    createdAt: now,
    updatedAt: now,
  };

  const noteDocumentReference = await addDoc(getNotesCollectionReference(uid), noteDocument);

  return { id: noteDocumentReference.id, ...noteDocument };
};

export const updateNote = async (uid, noteId, noteData) => {
  if (!uid) throw new Error("User is not authenticated");

  const noteDocumentReference = getNoteDocumentReference(uid, noteId);

  await setDoc(
    noteDocumentReference,
    { ...noteData, updatedAt: serverTimestamp() },
    { merge: true }
  );
};

export const togglePinNote = async (uid, noteId, pinned) => {
  if (!uid) throw new Error("User is not authenticated");

  const noteDocumentReference = getNoteDocumentReference(uid, noteId);

  await setDoc(
    noteDocumentReference,
    { pinned, updatedAt: serverTimestamp() },
    { merge: true }
  );
};

export const deleteNote = async (uid, noteId) => {
  if (!uid) throw new Error("User is not authenticated");

  const noteDocumentReference = getNoteDocumentReference(uid, noteId);

  await deleteDoc(noteDocumentReference);
};