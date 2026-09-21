import { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { InputField } from './InputField';

export function PasswordInput({ label, id, placeholder = '••••••••', error, registration, disabled }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputField
      label={label}
      id={id}
      type={showPassword ? 'text' : 'password'}
      placeholder={placeholder}
      icon={Lock}
      error={error}
      registration={registration}
      disabled={disabled}
      rightSlot={
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          tabIndex={-1}
          aria-label={showPassword ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
          className="text-text-muted transition-colors hover:text-text"
        >
          {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
        </button>
      }
    />
  );
}
