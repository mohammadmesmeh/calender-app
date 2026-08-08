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

const getNotificationsCollectionReference = (uid) =>
  collection(db, "users", uid, "notifications");

const getNotificationDocumentReference = (uid, notificationId) =>
  doc(db, "users", uid, "notifications", notificationId);

const toDate = (timestamp) =>
  timestamp && typeof timestamp.toDate === "function"
    ? timestamp.toDate()
    : timestamp;

export const getNotifications = async (uid) => {
  if (!uid) return [];

  const notificationsQuery = query(
    getNotificationsCollectionReference(uid),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(notificationsQuery);

  return querySnapshot.docs.map((notificationDoc) => {
    const data = notificationDoc.data();
    return {
      id: notificationDoc.id,
      ...data,
      time: toDate(data.time),
      createdAt: toDate(data.createdAt),
      updatedAt: toDate(data.updatedAt),
    };
  });
};

export const createNotification = async (uid, notificationData) => {
  if (!uid) throw new Error("User is not authenticated");

  const now = serverTimestamp();
  const notificationDocument = {
    ...notificationData,
    read: notificationData.read ?? false,
    createdAt: now,
    updatedAt: now,
  };

  const notificationDocumentReference = await addDoc(
    getNotificationsCollectionReference(uid),
    notificationDocument
  );

  return { id: notificationDocumentReference.id, ...notificationDocument };
};

export const markNotificationAsRead = async (uid, notificationId) => {
  if (!uid) throw new Error("User is not authenticated");

  const notificationDocumentReference = getNotificationDocumentReference(
    uid,
    notificationId
  );

  await setDoc(
    notificationDocumentReference,
    { read: true, updatedAt: serverTimestamp() },
    { merge: true }
  );
};

export const markAllNotificationsAsRead = async (uid, notificationIds) => {
  if (!uid) throw new Error("User is not authenticated");
  if (!notificationIds || notificationIds.length === 0) return;

  await Promise.all(
    notificationIds.map((notificationId) =>
      setDoc(
        getNotificationDocumentReference(uid, notificationId),
        { read: true, updatedAt: serverTimestamp() },
        { merge: true }
      )
    )
  );
};

export const deleteNotification = async (uid, notificationId) => {
  if (!uid) throw new Error("User is not authenticated");

  const notificationDocumentReference = getNotificationDocumentReference(
    uid,
    notificationId
  );

  await deleteDoc(notificationDocumentReference);
};