import { AuthCard } from '../../components/AuthComponent/AuthCard';
import { LoginForm } from '../../components/AuthComponent/LoginForm';

export function LoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-secondary-light to-primary-light px-4 py-10 sm:px-6">
      <div className="w-full max-w-md">
        <AuthCard>
          <LoginForm />
        </AuthCard>

        <p className="mt-6 text-center text-xs leading-relaxed text-text-secondary">
          By signing in, you agree to our{' '}
          <span className="cursor-pointer underline-offset-2 hover:underline">Terms of Service</span>{' '}
          and{' '}
          <span className="cursor-pointer underline-offset-2 hover:underline">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
