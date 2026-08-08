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

const getEventsCollectionReference = (uid) => collection(db, "users", uid, "events");

const getEventDocumentReference = (uid, eventId) =>
  doc(db, "users", uid, "events", eventId);

export const getEvents = async (uid) => {
  if (!uid) return [];

  const eventsQuery = query(getEventsCollectionReference(uid), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(eventsQuery);

  return querySnapshot.docs.map((eventDoc) => ({
    id: eventDoc.id,
    ...eventDoc.data(),
  }));
};

export const createEvent = async (uid, eventData) => {
  if (!uid) throw new Error("User is not authenticated");

  const now = serverTimestamp();
  const eventDocument = {
    ...eventData,
    createdAt: now,
    updatedAt: now,
  };

  const eventDocumentReference = await addDoc(getEventsCollectionReference(uid), eventDocument);

  return { id: eventDocumentReference.id, ...eventDocument };
};

export const updateEvent = async (uid, eventId, eventData) => {
  if (!uid) throw new Error("User is not authenticated");

  const eventDocumentReference = getEventDocumentReference(uid, eventId);

  await setDoc(
    eventDocumentReference,
    { ...eventData, updatedAt: serverTimestamp() },
    { merge: true }
  );
};

export const deleteEvent = async (uid, eventId) => {
  if (!uid) throw new Error("User is not authenticated");

  const eventDocumentReference = getEventDocumentReference(uid, eventId);

  await deleteDoc(eventDocumentReference);
};