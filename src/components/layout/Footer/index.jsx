import { Logo } from "@/components/navigation/Logo";
import { useLocalization } from "@/i18n/LocalizationProvider";

export const Footer = () => {
  const { t } = useLocalization();

  return (
    <footer className="w-full mt-4 border-t border-border bg-surface px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-text-secondary text-sm">

      <div className="flex items-center gap-2">
        <Logo />
        <span className="hidden h-4 w-px bg-border sm:block" aria-hidden="true" />
        <span>{t('nav.footerTagline')}</span>
      </div>

      <div className="flex items-center gap-4 text-text-muted">
        <span className="hover:text-text cursor-pointer transition">
          {t('nav.privacy')}
        </span>
        <span className="hover:text-text cursor-pointer transition">
          {t('nav.terms')}
        </span>
        <span className="hover:text-text cursor-pointer transition">
          {t('nav.support')}
        </span>
      </div>

      <div className="text-text-muted">
        © {new Date().getFullYear()} {t('nav.rights')}
      </div>

    </footer>
  );
};