import { Calendar } from 'lucide-react';

/**
 * AuthLogo
 * Centered brand mark used at the top of auth cards (register/login).
 */
export function AuthLogo() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary to-secondary shadow-xl shadow-primary/25 ring-8 ring-primary/10 transition-transform duration-300 hover:scale-105">
        <Calendar className="h-7 w-7 text-white" strokeWidth={2.2} />
      </div>
    </div>
  );
}
