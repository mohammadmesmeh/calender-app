import { AuthCard } from '../../component/AuthComponent/AuthCard';
import { AuthLogo } from '../../component/AuthComponent/AuthLogo';
import { RegisterForm } from '../../component/AuthComponent/RegisterForm';

/**
 * RegisterPage
 * Layout only — soft gradient background, centers the AuthCard,
 * no form logic or auth calls live here.
 */
export function RegisterPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-[#EDE9FE] to-[#DBEAFE] px-4 py-10 sm:px-6">
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <AuthLogo />
        </div>

        <AuthCard>
          <RegisterForm />
        </AuthCard>

        <p className="mt-6 text-center text-xs leading-relaxed text-slate-500">
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
