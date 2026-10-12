import { AuthCard } from '../../components/AuthComponent/AuthCard';
import { ForgotPasswordForm } from '../../components/AuthComponent/ForgotPasswordForm';
import { LanguageToggle } from '@/features/settings/components/LanguageToggle';

export function ForgotPasswordPage() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-secondary-light to-primary-light px-4 py-10 sm:px-6">
      <LanguageToggle className="absolute top-4 end-4" />

      <div className="w-full max-w-md">
        <AuthCard>
          <ForgotPasswordForm />
        </AuthCard>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
