import { AuthLayout } from '../../components/AuthLayout';
import { AuthCard } from '../../components/AuthComponent/AuthCard';
import { LoginForm } from '../../components/AuthComponent/LoginForm';
import { useLocalization } from '@/i18n/LocalizationProvider';

export function LoginPage() {
  const { t } = useLocalization();

  return (
    <AuthLayout>
      <AuthCard>
        <LoginForm />
      </AuthCard>

      <p className="mt-6 text-center text-xs leading-relaxed text-text-muted">
        {t('auth.agreeSignIn')}{' '}
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

export default LoginPage;
