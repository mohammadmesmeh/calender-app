import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Mail, ArrowLeft, ArrowRight } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { InputField } from './InputField';
import { AuthButton } from "@/components/buttons/AuthBtn";
import { AuthLogo } from './AuthLogo';
import { AuthSuccessMessage, AuthErrorMessage } from './AuthFeedback';
import { makeForgotPasswordSchema } from '../../validation/authSchemas';
import { getFirebaseErrorMessage } from '../../utils/firebaseErrors';
import { useLocalization } from '@/i18n/LocalizationProvider';

export function ForgotPasswordForm() {
  const [successMessage, setSuccessMessage] = useState('');
  const [firebaseError, setFirebaseError] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { isLoading, resetPassword } = useAuth();
  const { t, dir } = useLocalization();
  const BackIcon = dir === 'rtl' ? ArrowRight : ArrowLeft;

  const schema = useMemo(() => makeForgotPasswordSchema(t), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setFirebaseError('');
    setSuccessMessage('');
    setIsSending(true);
    try {
      await resetPassword(data.email);
      setSuccessMessage(t('auth.resetSent'));
    } catch (error) {
      setFirebaseError(getFirebaseErrorMessage(error, t));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <div className="mb-3 flex justify-center">
        <AuthLogo />
      </div>
      <h1 className="text-center text-xl font-semibold tracking-tight text-text">
        {t('auth.forgotPasswordTitle')}
      </h1>
      <p className="mt-1.5 text-center text-sm text-text-secondary">
        {t('auth.forgotPasswordSubtitle')}
      </p>

      <AuthSuccessMessage message={successMessage} />
      <AuthErrorMessage message={firebaseError} />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <InputField
          label={t('common.email')}
          id="email"
          type="email"
          placeholder={t('common.emailPlaceholder')}
          icon={Mail}
          error={errors.email}
          registration={register('email')}
          disabled={isLoading || isSending}
        />

        <AuthButton type="submit" variant="primary" disabled={isLoading || isSending} loading={isLoading || isSending} loadingText={t('auth.sending')}>
          {t('auth.sendResetLink')}
        </AuthButton>
      </form>

      <p className="mt-6 text-center text-sm text-text-secondary">
        <Link to="/login" className="inline-flex items-center gap-1.5 font-semibold text-primary transition-colors hover:text-primary-hover">
          <BackIcon className="h-4 w-4" />
          {t('auth.backToSignIn')}
        </Link>
      </p>
    </>
  );
}
