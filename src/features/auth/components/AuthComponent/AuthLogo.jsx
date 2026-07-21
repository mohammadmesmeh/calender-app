import { Calendar } from 'lucide-react';
import { Logo } from '@/components/navigation/Logo';

/**
 * AuthLogo
 * Centered brand mark used at the top of auth cards (register/login).
 */
export function AuthLogo() {
  return (
    <div className="flex flex-row items-center justify-start gap-2.5">
      <div className="flex h-11 w-11 items-center justify-center rounded-button bg-gradient-to-br from-primary to-secondary shadow-card">
        <Calendar className="h-5 w-5 text-white" />
      </div>
      <Logo />
    </div>
  );
}
