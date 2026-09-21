import { AuthCard } from '../../components/AuthComponent/AuthCard';
import { RegisterForm } from '../../components/AuthComponent/RegisterForm';
import { LanguageToggle } from '@/features/settings/components/LanguageToggle';
import { useLocalization } from '@/i18n/LocalizationProvider';

/**
 * RegisterPage
 * Layout only — soft gradient background, centers the AuthCard,
 * no form logic or auth calls live here.
 */
export function RegisterPage() {
  const { t } = useLocalization();
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-secondary-light to-primary-light px-4 py-10 sm:px-6">
      <LanguageToggle className="absolute top-4 end-4" />

      <div className="w-full max-w-md">
        <AuthCard>
          <RegisterForm />
        </AuthCard>

        <p className="mt-6 text-center text-xs leading-relaxed text-text-secondary">
          {t('auth.agreeRegister')}{' '}
          <span className="cursor-pointer underline-offset-2 hover:underline">{t('auth.termsOfService')}</span>{' '}
          {t('auth.and')}{' '}
          <span className="cursor-pointer underline-offset-2 hover:underline">{t('auth.privacyPolicy')}</span>.
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
