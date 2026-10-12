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
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-text">
        {label}
      </label>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5 text-text-muted">
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
          className={`w-full rounded-input border bg-surface py-2.5 ps-10 ${
            rightSlot ? 'pe-10' : 'pe-3.5'
          } text-[15px] text-text placeholder:text-text-muted transition-all duration-150 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:bg-background disabled:text-text-muted ${
            error
              ? 'border-danger focus:border-danger focus:ring-danger/20'
              : 'border-border hover:border-border focus:border-primary focus:ring-primary/20'
          }`}
        />

        {rightSlot && (
          <div className="absolute inset-y-0 end-0 flex items-center pe-3.5">
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
            className="flex items-center gap-1.5 text-sm font-medium text-danger"
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            {error.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
