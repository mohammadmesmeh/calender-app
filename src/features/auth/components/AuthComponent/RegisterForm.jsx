import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AnimatePresence, motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { InputField } from './InputField';
import { AuthButton } from "@/components/buttons/AuthBtn";
import { AuthLogo } from './AuthLogo';

const validationSchema = yup.object({
  email: yup.string().email('Please enter a valid email address').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

/**
 * RegisterForm
 * Owns all sign-up logic: validation, submit handlers (email + Google),
 * and success/error state. Purely presentational pieces are delegated
 * to InputField / AuthButton.
 */
export function RegisterForm() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [firebaseError, setFirebaseError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { isLoading, isLoadingGoogle, signUpWithEmail, signUpWithGoogle } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmitEmail = async (data) => {
    setFirebaseError('');
    setSuccessMessage('');
    try {
      await signUpWithEmail(data);
      setSuccessMessage('Account created successfully! Redirecting...');
      reset();
      navigate('/dashboard');
    } catch (error) {
      setFirebaseError(
        error?.code?.replace('auth/', '').replace(/-/g, ' ') || 'An error occurred during sign up'
      );
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
      setFirebaseError(
        error?.code?.replace('auth/', '').replace(/-/g, ' ') || 'An error occurred during sign up'
      );
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

      <AnimatePresence mode="wait">
        {successMessage && (
          <motion.div
            key="success"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-5 flex items-start gap-2.5 overflow-hidden rounded-button border border-success/30 bg-success-light/50 p-3.5"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
            <p className="text-sm font-medium text-success">{successMessage}</p>
          </motion.div>
        )}

        {firebaseError && (
          <motion.div
            key="error"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-5 flex items-start gap-2.5 overflow-hidden rounded-button border border-danger/30 bg-danger-light/50 p-3.5"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-danger" />
            <p className="text-sm font-medium capitalize text-danger">{firebaseError}</p>
          </motion.div>
        )}
      </AnimatePresence>

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

        <InputField
          label="Password"
          id="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          icon={Lock}
          error={errors.password}
          registration={register('password')}
          disabled={busy}
          rightSlot={
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="text-text-muted transition-colors hover:text-text"
            >
              {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
            </button>
          }
        />

        <InputField
          label="Confirm password"
          id="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="••••••••"
          icon={Lock}
          error={errors.confirmPassword}
          registration={register('confirmPassword')}
          disabled={busy}
          rightSlot={
            <button
              type="button"
              onClick={() => setShowConfirmPassword((v) => !v)}
              tabIndex={-1}
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              className="text-text-muted transition-colors hover:text-text"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-[18px] w-[18px]" />
              ) : (
                <Eye className="h-[18px] w-[18px]" />
              )}
            </button>
          }
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
