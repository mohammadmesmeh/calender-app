const FALLBACK_KEY = 'unexpected';

const errorKeys = {
  'auth/user-not-found': 'userNotFound',
  'auth/wrong-password': 'wrongPassword',
  'auth/invalid-credential': 'invalidCredential',
  'auth/email-already-in-use': 'emailInUse',
  'auth/weak-password': 'weakPassword',
  'auth/invalid-email': 'invalidEmail',
  'auth/too-many-requests': 'tooManyRequests',
  'auth/network-request-failed': 'network',
  'auth/popup-closed-by-user': 'popupClosed',
  'auth/popup-blocked': 'popupBlocked',
  'auth/user-disabled': 'userDisabled',
  'auth/requires-recent-login': 'recentLogin',
  'auth/operation-not-allowed': 'operationNotAllowed',
};

export function getFirebaseErrorMessage(error, t) {
  if (!error) return t(`authErrors.${FALLBACK_KEY}`);
  const code = error?.code || '';
  const key = errorKeys[code] || FALLBACK_KEY;
  return t(`authErrors.${key}`);
}