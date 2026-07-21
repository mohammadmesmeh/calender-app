import { AuthCard } from '../../components/AuthComponent/AuthCard';
import { AuthLogo } from '../../components/AuthComponent/AuthLogo';
import { RegisterForm } from '../../components/AuthComponent/RegisterForm';

/**
 * RegisterPage
 * Layout only — soft gradient background, centers the AuthCard,
 * no form logic or auth calls live here.
 */
export function RegisterPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-secondary-light to-primary-light px-4 py-10 sm:px-6">
      <div className="w-full max-w-md">
   

        <AuthCard>
          <RegisterForm />
        </AuthCard>

        <p className="mt-6 text-center text-xs leading-relaxed text-text-secondary">
          By creating an account, you agree to our{' '}
          <span className="cursor-pointer underline-offset-2 hover:underline">Terms of Service</span>{' '}
          and{' '}
          <span className="cursor-pointer underline-offset-2 hover:underline">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
