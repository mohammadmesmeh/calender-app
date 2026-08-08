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

const getTasksCollectionReference = (uid) => collection(db, "users", uid, "tasks");

const getTaskDocumentReference = (uid, taskId) =>
  doc(db, "users", uid, "tasks", taskId);

export const getTasks = async (uid) => {
  if (!uid) return [];

  const tasksQuery = query(getTasksCollectionReference(uid), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(tasksQuery);

  return querySnapshot.docs.map((taskDoc) => ({
    id: taskDoc.id,
    ...taskDoc.data(),
  }));
};

export const createTask = async (uid, taskData) => {
  if (!uid) throw new Error("User is not authenticated");

  const now = serverTimestamp();
  const taskDocument = {
    ...taskData,
    createdAt: now,
    updatedAt: now,
  };

  const taskDocumentReference = await addDoc(getTasksCollectionReference(uid), taskDocument);

  return { id: taskDocumentReference.id, ...taskDocument };
};

export const updateTask = async (uid, taskId, taskData) => {
  if (!uid) throw new Error("User is not authenticated");

  const taskDocumentReference = getTaskDocumentReference(uid, taskId);

  await setDoc(
    taskDocumentReference,
    { ...taskData, updatedAt: serverTimestamp() },
    { merge: true }
  );
};

export const toggleTask = async (uid, taskId, completed) => {
  if (!uid) throw new Error("User is not authenticated");

  const taskDocumentReference = getTaskDocumentReference(uid, taskId);

  await setDoc(
    taskDocumentReference,
    { completed, updatedAt: serverTimestamp() },
    { merge: true }
  );
};

export const deleteTask = async (uid, taskId) => {
  if (!uid) throw new Error("User is not authenticated");

  const taskDocumentReference = getTaskDocumentReference(uid, taskId);

  await deleteDoc(taskDocumentReference);
};
