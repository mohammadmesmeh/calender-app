import { AuthLayout } from '../../components/AuthLayout';
import { AuthCard } from '../../components/AuthComponent/AuthCard';
import { RegisterForm } from '../../components/AuthComponent/RegisterForm';
import { useLocalization } from '@/i18n/LocalizationProvider';

export function RegisterPage() {
  const { t } = useLocalization();

  return (
    <AuthLayout>
      <AuthCard>
        <RegisterForm />
      </AuthCard>

      <p className="mt-6 text-center text-xs leading-relaxed text-text-muted">
        {t('auth.agreeRegister')}{' '}
        <span className="cursor-pointer underline-offset-2 hover:underline hover:text-primary transition-colors">
          {t('auth.termsOfService')}
        </span>{' '}
        {t('auth.and')}{' '}
        <span className="cursor-pointer underline-offset-2 hover:underline hover:text-primary transition-colors">
          {t('auth.privacyPolicy')}
        </span>.
      </p>
    </AuthLayout>
  );
}

export default RegisterPage;
