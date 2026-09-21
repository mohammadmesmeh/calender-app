import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Mail, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { InputField } from './InputField';
import { AuthButton } from "@/components/buttons/AuthBtn";
import { AuthLogo } from './AuthLogo';
import { AuthSuccessMessage, AuthErrorMessage } from './AuthFeedback';
import { forgotPasswordSchema } from '../../validation/authSchemas';
import { getFirebaseErrorMessage } from '../../utils/firebaseErrors';

export function ForgotPasswordForm() {
  const [successMessage, setSuccessMessage] = useState('');
  const [firebaseError, setFirebaseError] = useState('');
  const { isLoading, resetPassword } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(forgotPasswordSchema) });

  const onSubmit = async (data) => {
    setFirebaseError('');
    setSuccessMessage('');
    try {
      await resetPassword(data.email);
      setSuccessMessage('Password reset email sent! Check your inbox.');
    } catch (error) {
      setFirebaseError(getFirebaseErrorMessage(error));
    }
  };

  return (
    <>
      <div className="mb-3 flex justify-center">
        <AuthLogo />
      </div>
      <h1 className="text-center text-xl font-semibold tracking-tight text-text">
        Forgot your password?
      </h1>
      <p className="mt-1.5 text-center text-sm text-text-secondary">
        Enter your email and we&apos;ll send you a reset link
      </p>

      <AuthSuccessMessage message={successMessage} />
      <AuthErrorMessage message={firebaseError} />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <InputField
          label="Email address"
          id="email"
          type="email"
          placeholder="you@example.com"
          icon={Mail}
          error={errors.email}
          registration={register('email')}
          disabled={isLoading}
        />

        <AuthButton type="submit" variant="primary" disabled={isLoading} loading={isLoading} loadingText="Sending...">
          Send reset link
        </AuthButton>
      </form>

      <p className="mt-6 text-center text-sm text-text-secondary">
        <Link to="/login" className="inline-flex items-center gap-1.5 font-semibold text-primary transition-colors hover:text-primary-hover">
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>
      </p>
    </>
  );
}
