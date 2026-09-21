import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";

const PROFILE_COLLECTION = "profile";
const PROFILE_DOC_ID = "profile";

const getProfileDocumentReference = (uid) =>
  doc(db, "users", uid, PROFILE_COLLECTION, PROFILE_DOC_ID);

export const ensureUserProfile = async (firebaseUser) => {
  if (!firebaseUser || !firebaseUser.uid) {
    return null;
  }

  const profileDocumentReference = getProfileDocumentReference(firebaseUser.uid);
  const profileSnapshot = await getDoc(profileDocumentReference);

  if (profileSnapshot.exists()) {
    return { created: false, profile: profileSnapshot.data() };
  }

  const now = serverTimestamp();
  const profileData = {
    displayName: firebaseUser.displayName ?? "",
    photoURL: firebaseUser.photoURL ?? null,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
    language: navigator.language || "en",
    createdAt: now,
    updatedAt: now,
  };

  await setDoc(profileDocumentReference, profileData);

  return { created: true, profile: profileData };
};