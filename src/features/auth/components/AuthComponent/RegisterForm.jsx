import { useState, useMemo } from 'react';
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
import { makeRegisterSchema } from '../../validation/authSchemas';
import { getFirebaseErrorMessage } from '../../utils/firebaseErrors';
import { useLocalization } from '@/i18n/LocalizationProvider';

export function RegisterForm() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [firebaseError, setFirebaseError] = useState('');
  const { t } = useLocalization();

  const { isLoading, isLoadingGoogle, signUpWithEmail, signUpWithGoogle } = useAuth();

  const schema = useMemo(() => makeRegisterSchema(t), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmitEmail = async (data) => {
    setFirebaseError('');
    setSuccessMessage('');
    try {
      await signUpWithEmail(data);
      setSuccessMessage(t('auth.accountCreated'));
      reset();
      navigate('/dashboard');
    } catch (error) {
      setFirebaseError(getFirebaseErrorMessage(error, t));
    }
  };

  const onSubmitGoogle = async () => {
    setFirebaseError('');
    setSuccessMessage('');
    try {
      await signUpWithGoogle();
      setSuccessMessage(t('auth.accountCreated'));
      reset();
      navigate('/dashboard');
    } catch (error) {
      setFirebaseError(getFirebaseErrorMessage(error, t));
    }
  };

  const busy = isLoading || isLoadingGoogle;

  return (
    <>
      <div className="mb-3 flex justify-center">
        <AuthLogo />
      </div>
      <h1 className="text-center text-xl font-semibold tracking-tight text-text">
        {t('auth.createAccountTitle')}
      </h1>
      <p className="mt-1.5 text-center text-sm text-text-secondary">
        {t('auth.createAccountSubtitle')}
      </p>

      <AuthSuccessMessage message={successMessage} />
      <AuthErrorMessage message={firebaseError} />

      <form onSubmit={handleSubmit(onSubmitEmail)} className="mt-6 space-y-4">
        <InputField
          label={t('common.email')}
          id="email"
          type="email"
          placeholder={t('common.emailPlaceholder')}
          icon={Mail}
          error={errors.email}
          registration={register('email')}
          disabled={busy}
        />

        <PasswordInput
          label={t('common.password')}
          id="password"
          error={errors.password}
          registration={register('password')}
          disabled={busy}
        />

        <PasswordInput
          label={t('common.confirmPassword')}
          id="confirmPassword"
          error={errors.confirmPassword}
          registration={register('confirmPassword')}
          disabled={busy}
        />

        <AuthButton type="submit" variant="primary" disabled={busy} loading={isLoading} loadingText={t('auth.creatingAccount')}>
          {t('auth.createAccount')}
        </AuthButton>

        <div className="relative flex items-center py-1">
          <div className="h-px flex-1 bg-border" />
          <span className="px-3 text-xs font-medium uppercase tracking-wide text-text-muted">
            {t('auth.orContinueWith')}
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <AuthButton
          type="button"
          variant="google"
          onClick={onSubmitGoogle}
          disabled={busy}
          loading={isLoadingGoogle}
          loadingText={t('auth.signingUp')}
        >
          {t('auth.signUpWithGoogle')}
        </AuthButton>
      </form>

      <p className="mt-6 text-center text-sm text-text-secondary">
        {t('auth.alreadyHaveAccount')}{' '}
        <Link to="/login" className="font-semibold text-primary transition-colors hover:text-primary-hover">
          {t('auth.signIn')}
        </Link>
      </p>
    </>
  );
}
