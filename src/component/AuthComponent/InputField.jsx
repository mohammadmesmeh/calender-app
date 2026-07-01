import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

/**
 * InputField
 * Reusable labeled input with a leading icon, optional trailing slot
 * (e.g. show/hide password button), and inline animated error message.
 */
export function InputField({
  label,
  id,
  type = 'text',
  placeholder,
  icon: Icon,
  error,
  registration,
  disabled,
  rightSlot,
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
          <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
        </div>

        <input
          {...registration}
          type={type}
          id={id}
          placeholder={placeholder}
          autoComplete={
            id === 'email'
              ? 'email'
              : id === 'password' || id === 'confirmPassword'
              ? 'new-password'
              : 'off'
          }
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full rounded-xl border bg-white py-2.5 pl-10 ${
            rightSlot ? 'pr-10' : 'pr-3.5'
          } text-[15px] text-slate-900 placeholder:text-slate-400 transition-all duration-150 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 ${
            error
              ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
              : 'border-slate-200 hover:border-slate-300 focus:border-[#437FF7] focus:ring-[#DBEAFE]'
          }`}
        />

        {rightSlot && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3.5">
            {rightSlot}
          </div>
        )}
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 6 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="flex items-center gap-1.5 text-sm font-medium text-red-600"
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            {error.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
