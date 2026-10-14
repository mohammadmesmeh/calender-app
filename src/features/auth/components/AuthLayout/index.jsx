import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, CheckCircle2, Clock, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';
import { LanguageToggle } from '@/features/settings/components/LanguageToggle';
import { useLocalization } from '@/i18n/LocalizationProvider';

export function AuthLayout({ children }) {
  const { t, lang, dir } = useLocalization();
  const isAr = lang === 'ar';

  return (
    <div className="relative flex min-h-screen w-full flex-col justify-between overflow-x-hidden bg-background text-text selection:bg-primary/20 selection:text-primary">
      {/* Background Ambient Glows & Grid */}
      <div className="pointer-events-none absolute -top-36 -start-36 h-[32rem] w-[32rem] rounded-full bg-primary/15 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-36 -end-36 h-[32rem] w-[32rem] rounded-full bg-secondary/15 blur-[140px]" />
      <div className="pointer-events-none absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 h-[40rem] w-[40rem] rounded-full bg-primary/5 blur-[180px]" />

      {/* Grid pattern overlay with radial mask */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,#000_60%,transparent_100%)]"
        style={{
          backgroundImage: `linear-gradient(to right, hsl(var(--border) / 0.4) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border) / 0.4) 1px, transparent 1px)`,
          backgroundSize: '3.5rem 3.5rem',
        }}
      />

      {/* Top Header Navigation */}
      <header className="relative z-10 w-full border-b border-border/40 bg-surface/40 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <Link to="/" className="group flex items-center gap-3 transition-opacity hover:opacity-90">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-secondary shadow-md shadow-primary/20 transition-transform group-hover:scale-105">
              <Calendar className="h-5 w-5 text-white" strokeWidth={2.2} />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Calendar
              </span>
              <span className="hidden rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary sm:inline-block">
                v2.0
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageToggle className="rounded-full border border-border/70 bg-surface/80 px-3 py-1.5 text-xs shadow-sm backdrop-blur-md transition-all hover:border-primary/40 hover:bg-surface" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          {/* Left Column: Visual Showcase wrapped in an elegant card with shadow */}
          <div className="hidden select-none lg:col-span-7 lg:flex">
            <motion.div
              initial={{ opacity: 0, x: isAr ? 24 : -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex w-full flex-col gap-6 rounded-3xl border border-border/70 bg-surface/60 p-7 shadow-2xl backdrop-blur-xl ring-1 ring-black/[0.04] dark:bg-surface/50 sm:p-9"
            >

            {/* Showcase Headlines */}
            <div className="space-y-3">
              <h2 className="text-3xl font-extrabold tracking-tight text-text sm:text-4xl xl:text-5xl leading-[1.15]">
                {isAr ? (
                  <>
                    نظّم وقتك وأنجز مهامك <br />
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      بكل وضوح وسلاسة.
                    </span>
                  </>
                ) : (
                  <>
                    Master your schedule <br />
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      with effortless clarity.
                    </span>
                  </>
                )}
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
                {isAr
                  ? 'من الجداول اليومية إلى التخطيط الأسبوعي، تحكّم بيومك مع ميزة السحب والتمديد التفاعلية وتنظيم المهام بدقة وسهولة.'
                  : 'From daily time-blocking to weekly overviews, take control of your time with interactive drag-to-resize and seamless productivity tracking.'}
              </p>
            </div>

            {/* Interactive Mockup: Floating Schedule Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative max-w-lg rounded-2xl border border-border/80 bg-surface/85 p-5 shadow-2xl backdrop-blur-xl ring-1 ring-black/5"
            >
              {/* Preview Header */}
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-success animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                    {isAr ? 'الجدول المباشر · اليوم' : "Today's Schedule"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-text-muted">
                  <Clock className="h-3.5 w-3.5" />
                  <span>09:30 AM</span>
                </div>
              </div>

              {/* Sample Timeline Items */}
              <div className="mt-3.5 space-y-2.5">
                {/* Event 1 */}
                <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/60 p-2.5 transition-all hover:bg-background">
                  <div className="w-1.5 self-stretch rounded-full bg-accent" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-text">
                      {isAr ? 'مراجعة التصميم وتجربة المستخدم' : 'Product & UX Design Review'}
                    </p>
                    <p className="text-[11px] text-text-muted">
                      {isAr ? 'جلسة فيديو · تقييم الواجهات' : 'Google Meet · Design System Sync'}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-md bg-accent/15 px-2 py-0.5 text-[10px] font-semibold text-accent">
                    09:30 - 11:00 AM
                  </span>
                </div>

                {/* Event 2 */}
                <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/60 p-2.5 transition-all hover:bg-background">
                  <div className="w-1.5 self-stretch rounded-full bg-primary" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-text">
                      {isAr ? 'تطوير المحرك ومزامنة المهام' : 'Core Engine & Fast Sync Task'}
                    </p>
                    <p className="text-[11px] text-text-muted">
                      {isAr ? 'أولوية عالية · التقويم الذكي' : 'High Priority · Calender App'}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-md bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
                    11:30 - 01:00 PM
                  </span>
                </div>

                {/* Event 3 */}
                <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/60 p-2.5 transition-all hover:bg-background">
                  <div className="w-1.5 self-stretch rounded-full bg-secondary" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-text">
                      {isAr ? 'جلسة استراتيجية الفريق وخارطة الطريق' : 'Roadmap & Strategy Session'}
                    </p>
                    <p className="text-[11px] text-text-muted">
                      {isAr ? 'فريق العمل · التحديث القادم' : 'Team Sync · Q4 Milestones'}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-md bg-secondary/15 px-2 py-0.5 text-[10px] font-semibold text-secondary">
                    02:00 - 03:30 PM
                  </span>
                </div>
              </div>

              {/* Floating Mini Productivity Score Badge */}
              <div className="absolute -bottom-3 -end-3 flex items-center gap-2.5 rounded-xl border border-border/80 bg-surface/95 px-3.5 py-2 shadow-xl ring-1 ring-black/5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-success/15 text-success">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-text">
                    {isAr ? '٨٥٪ إنجاز المهام' : '85% Weekly Score'}
                  </p>
                  <p className="text-[9px] text-text-muted">
                    {isAr ? '١٢ مهمة مكتملة هذا الأسبوع' : '12 tasks completed'}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-medium text-text-secondary">
              <span className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-surface/60 px-3 py-1.5 shadow-sm">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                {isAr ? 'تمديد وسحب مثل Google Calendar' : 'Google Calendar-style Resize'}
              </span>
              <span className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-surface/60 px-3 py-1.5 shadow-sm">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                {isAr ? 'دعم كامل للغة العربية والـ RTL' : 'Complete Arabic & RTL First'}
              </span>
              <span className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-surface/60 px-3 py-1.5 shadow-sm">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                {isAr ? 'سحابي وآمن مع Firebase' : 'Secure Cloud Sync'}
              </span>
            </div>
            </motion.div>
          </div>

          {/* Right Column: Auth Form Card */}
          <div className="flex w-full justify-center lg:col-span-5">
            <div className="w-full max-w-md">
              {children}
            </div>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-10 w-full border-t border-border/40 bg-surface/20 py-4 text-center text-xs text-text-muted backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Calendar App. {isAr ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
          <div className="flex items-center gap-4 text-text-secondary">
            <span className="cursor-pointer hover:text-primary transition-colors">{t('auth.termsOfService')}</span>
            <span>·</span>
            <span className="cursor-pointer hover:text-primary transition-colors">{t('auth.privacyPolicy')}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
