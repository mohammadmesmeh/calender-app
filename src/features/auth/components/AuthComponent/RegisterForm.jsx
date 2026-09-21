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
import { AuthSuccessMessage, AuthErrorMessage } from './AuthFeedback';
import { registerSchema } from '../../validation/authSchemas';
import { getFirebaseErrorMessage } from '../../utils/firebaseErrors';

export function RegisterForm() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [firebaseError, setFirebaseError] = useState('');

  const { isLoading, isLoadingGoogle, signUpWithEmail, signUpWithGoogle } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(registerSchema) });

  const onSubmitEmail = async (data) => {
    setFirebaseError('');
    setSuccessMessage('');
    try {
      await signUpWithEmail(data);
      setSuccessMessage('Account created successfully! Redirecting...');
      reset();
      navigate('/dashboard');
    } catch (error) {
      setFirebaseError(getFirebaseErrorMessage(error));
    }
  };

  const onSubmitGoogle = async () => {
    setFirebaseError('');
    setSuccessMessage('');
    try {
      await signUpWithGoogle();
      setSuccessMessage('Account created successfully! Redirecting...');
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
        Create your account
      </h1>
      <p className="mt-1.5 text-center text-sm text-text-secondary">
        Start organizing your schedule in seconds
      </p>

      <AuthSuccessMessage message={successMessage} />
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

        <PasswordInput
          label="Confirm password"
          id="confirmPassword"
          error={errors.confirmPassword}
          registration={register('confirmPassword')}
          disabled={busy}
        />

        <AuthButton type="submit" variant="primary" disabled={busy} loading={isLoading} loadingText="Creating account...">
          Create account
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
          loadingText="Signing up..."
        >
          Sign up with Google
        </AuthButton>
      </form>

      <p className="mt-6 text-center text-sm text-text-secondary">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-primary transition-colors hover:text-primary-hover">
          Sign in
        </Link>
      </p>
    </>
  );
}
