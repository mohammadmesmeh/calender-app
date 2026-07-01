import { Calendar } from 'lucide-react';
import { Logo } from '../../component/Logo';

/**
 * AuthLogo
 * Centered brand mark used at the top of auth cards (register/login).
 */
export function AuthLogo() {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#437FF7] to-[#8B5CF6] shadow-md shadow-indigo-200">
        <Calendar className="h-5 w-5 text-white" />
      </div>
      <Logo />
    </div>
  );
}
