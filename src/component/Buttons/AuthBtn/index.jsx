import { motion } from 'framer-motion';
import { Loader2, ArrowRight } from 'lucide-react';

// Official Google "G" mark, inlined so it never depends on an external asset.
function GoogleIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  );
}

/**
 * AuthButton
 * Reusable submit/action button for auth forms.
 *
 * variant:
 *  - "primary": solid blue→purple gradient CTA (e.g. "Create account")
 *  - "google":  outlined white button with the Google mark
 */
export function AuthButton({
  variant = 'primary',
  type = 'button',
  onClick,
  disabled,
  loading,
  loadingText,
  children,
  ...props
}) {
  const isPrimary = variant === 'primary';

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.01 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[15px] font-semibold transition-all duration-200 ${
        isPrimary
          ? disabled
            ? 'cursor-not-allowed bg-slate-300 text-white shadow-none'
            : 'bg-gradient-to-r from-[#437FF7] to-[#8B5CF6] text-white shadow-lg shadow-indigo-200 hover:shadow-indigo-300'
          : disabled
          ? 'cursor-not-allowed border border-slate-200 bg-slate-50 text-slate-400'
          : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md'
      }`}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className={`h-[18px] w-[18px] animate-spin ${isPrimary ? '' : 'text-slate-400'}`} />
          {loadingText}
        </>
      ) : isPrimary ? (
        <>
          {children}
          <ArrowRight className="h-[18px] w-[18px]" />
        </>
      ) : (
        <>
          <GoogleIcon className="h-5 w-5" />
          {children}
        </>
      )}
    </motion.button>
  );
}
