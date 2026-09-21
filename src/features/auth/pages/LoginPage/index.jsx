import { AuthCard } from '../../components/AuthComponent/AuthCard';
import { LoginForm } from '../../components/AuthComponent/LoginForm';
import { LanguageToggle } from '@/features/settings/components/LanguageToggle';
import { useLocalization } from '@/i18n/LocalizationProvider';

export function LoginPage() {
  const { t } = useLocalization();
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-secondary-light to-primary-light px-4 py-10 sm:px-6">
      <LanguageToggle className="absolute top-4 end-4" />

      <div className="w-full max-w-md">
        <AuthCard>
          <LoginForm />
        </AuthCard>

        <p className="mt-6 text-center text-xs leading-relaxed text-text-secondary">
          {t('auth.agreeSignIn')}{' '}
          <span className="cursor-pointer underline-offset-2 hover:underline">{t('auth.termsOfService')}</span>{' '}
          {t('auth.and')}{' '}
          <span className="cursor-pointer underline-offset-2 hover:underline">{t('auth.privacyPolicy')}</span>.
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
