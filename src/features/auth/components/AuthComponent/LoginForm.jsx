import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Mail } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { InputField } from './InputField';
import { PasswordInput } from './PasswordInput';
import { AuthButton } from "@/components/buttons/AuthBtn";
import { AuthLogo } from './AuthLogo';
import { AuthErrorMessage } from './AuthFeedback';
import { loginSchema } from '../../validation/authSchemas';
import { getFirebaseErrorMessage } from '../../utils/firebaseErrors';

export function LoginForm() {
  const navigate = useNavigate();
  const [firebaseError, setFirebaseError] = useState('');

  const { isLoading, isLoadingGoogle, signInWithEmail, signInWithGoogle } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmitEmail = async (data) => {
    setFirebaseError('');
    try {
      await signInWithEmail(data);
      reset();
      navigate('/dashboard');
    } catch (error) {
      setFirebaseError(getFirebaseErrorMessage(error));
    }
  };

  const onSubmitGoogle = async () => {
    setFirebaseError('');
    try {
      await signInWithGoogle();
      reset();
      navigate('/dashboard');
    } catch (error) {
      setFirebaseError(getFirebaseErrorMessage(error));
    }
  };

  const busy = isLoading || isLoadingGoogle;

  return (
    <>
      <div className="mb-3 flex justify-center">
        <AuthLogo />
      </div>
      <h1 className="text-center text-xl font-semibold tracking-tight text-text">
        Welcome back
      </h1>
      <p className="mt-1.5 text-center text-sm text-text-secondary">
        Sign in to your account to continue
      </p>

      <AuthErrorMessage message={firebaseError} />

      <form onSubmit={handleSubmit(onSubmitEmail)} className="mt-6 space-y-4">
        <InputField
          label="Email address"
          id="email"
          type="email"
          placeholder="you@example.com"
          icon={Mail}
          error={errors.email}
          registration={register('email')}
          disabled={busy}
        />

        <PasswordInput
          label="Password"
          id="password"
          error={errors.password}
          registration={register('password')}
          disabled={busy}
        />

        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="text-sm font-medium text-primary transition-colors hover:text-primary-hover"
          >
            Forgot password?
          </Link>
        </div>

        <AuthButton type="submit" variant="primary" disabled={busy} loading={isLoading} loadingText="Signing in...">
          Sign in
        </AuthButton>

        <div className="relative flex items-center py-1">
          <div className="h-px flex-1 bg-border" />
          <span className="px-3 text-xs font-medium uppercase tracking-wide text-text-muted">
            Or continue with
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <AuthButton
          type="button"
          variant="google"
          onClick={onSubmitGoogle}
          disabled={busy}
          loading={isLoadingGoogle}
          loadingText="Signing in..."
        >
          Sign in with Google
        </AuthButton>
      </form>

      <p className="mt-6 text-center text-sm text-text-secondary">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="font-semibold text-primary transition-colors hover:text-primary-hover">
          Create one
        </Link>
      </p>
    </>
  );
}
