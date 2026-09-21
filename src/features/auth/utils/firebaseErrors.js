const errorMap = {
  'auth/user-not-found': 'No account found with this email address',
  'auth/wrong-password': 'Incorrect password. Please try again',
  'auth/invalid-credential': 'Invalid email or password. Please try again',
  'auth/email-already-in-use': 'An account with this email already exists',
  'auth/weak-password': 'Password must be at least 6 characters',
  'auth/invalid-email': 'Please enter a valid email address',
  'auth/too-many-requests': 'Too many attempts. Please try again later',
  'auth/network-request-failed': 'Network error. Please check your connection',
  'auth/popup-closed-by-user': 'Sign-in cancelled. Please try again',
  'auth/popup-blocked': 'Pop-up was blocked. Please allow pop-ups for this site',
  'auth/user-disabled': 'This account has been disabled',
  'auth/requires-recent-login': 'Please sign in again and try again',
  'auth/operation-not-allowed': 'This sign-in method is not enabled',
};

export function getFirebaseErrorMessage(error) {
  if (!error) return 'An unexpected error occurred';
  const code = error?.code || '';
  return errorMap[code] || code.replace('auth/', '').replace(/-/g, ' ') || 'An unexpected error occurred';
}
