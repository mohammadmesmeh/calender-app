// import { useState } from 'react';
// import { useNavigate , Link } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';// Firebase Auth: لإنشاء مستخدم جديد
// import { auth, googleProvider } from '../../firebase';//auth: إعدادات Firebase الخاصة بك
// import { useAuth } from '../../Hooks/useAuth';

// const validationSchema = yup.object({
//   email: yup
//     .string()
//     .email('Please enter a valid email address')
//     .required('Email is required'),
//   password: yup
//     .string()
//     .min(6, 'Password must be at least 6 characters')
//     .required('Password is required'),
//   confirmPassword: yup
//     .string()
//     .oneOf([yup.ref('password')], 'Passwords must match')
//     .required('Please confirm your password'),
// });

// export function Register() {
//   const navigate = useNavigate();
//   const [successMessage, setSuccessMessage] = useState('');
//   const [firebaseError, setFirebaseError] = useState('');
//   const {user,
//         isLoading,
//         isLoadingGoogle,
//         signUpWithEmail,
//         signUpWithGoogle} = useAuth()

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({
//     resolver: yupResolver(validationSchema),
//   });

//   const onSubmitEmail = async (data) => {
//     setFirebaseError('');
//     setSuccessMessage('');
//     try {
//      await signUpWithEmail(data)
//       setSuccessMessage('Account created successfully! Redirecting...');
//       reset();
//       navigate('/dashboard');
//     } catch (error) {
//       const errorMessage = error?.code?.replace('auth/', '').replace(/-/g, ' ') || 'An error occurred during sign up';
//       setFirebaseError(errorMessage);
//     } 
    
//   };
//   const onSubmitGoogle = async () => {
//     setFirebaseError('');
//     setSuccessMessage('');

//     try {
//       // إنشاء المستخدم في Firebase
//      await signUpWithGoogle()
//       // جلب المستخدم الحالي 
//       setSuccessMessage('Account created successfully! Redirecting...');
//       reset();
//       navigate('/dashboard');
//     } catch (error) {
//       const errorMessage = error.code?.replace('auth/', '').replace(/-/g, ' ') || 'An error occurred during sign up';
//       setFirebaseError(errorMessage);
//     } 
   
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
//       <div className="w-full max-w-md">
//         <div className="bg-white rounded-lg shadow-lg p-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
//           <p className="text-gray-600 mb-8">Join us today to get started</p>

//           {successMessage && (
//             <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
//               <p className="text-green-800 text-sm font-medium">{successMessage}</p>
//             </div>
//           )}

//           {firebaseError && (
//             <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//               <p className="text-red-800 text-sm font-medium capitalize">{firebaseError}</p>
//             </div>
//           )}

//           <form onSubmit={handleSubmit(onSubmitEmail)} className="space-y-5">
//             {/* Email Field */}
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                 Email Address
//               </label>
//               <input
//                 {...register('email')}
//                 type="email"
//                 id="email"
//                 placeholder="you@example.com"
//                 className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${errors.email
//                   ? 'border-red-300 focus:ring-red-200 bg-red-50'
//                   : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
//                   }`}
//                 disabled={isLoading || isLoadingGoogle}
//               />
//               {errors.email && (
//                 <p className="mt-1 text-sm text-red-600 font-medium">{errors.email.message}</p>
//               )}
//             </div>

//             {/* Password Field */}
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//                 Password
//               </label>
//               <input
//                 {...register('password')}
//                 type="password"
//                 id="password"
//                 placeholder="••••••••"
//                 className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${errors.password
//                   ? 'border-red-300 focus:ring-red-200 bg-red-50'
//                   : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
//                   }`}
//                 disabled={isLoading ||isLoadingGoogle}
//               />
//               {errors.password && (
//                 <p className="mt-1 text-sm text-red-600 font-medium">{errors.password.message}</p>
//               )}
//             </div>

//             {/* Confirm Password Field */}
//             <div>
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
//                 Confirm Password
//               </label>
//               <input
//                 {...register('confirmPassword')}
//                 type="password"
//                 id="confirmPassword"
//                 placeholder="••••••••"
//                 className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${errors.confirmPassword
//                   ? 'border-red-300 focus:ring-red-200 bg-red-50'
//                   : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
//                   }`}
//                 disabled={isLoading || isLoadingGoogle}
//               />
//               {errors.confirmPassword && (
//                 <p className="mt-1 text-sm text-red-600 font-medium">{errors.confirmPassword.message}</p>
//               )}
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isLoading||isLoadingGoogle}
//               className={`w-full py-2 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${isLoading
//                 ? 'bg-gray-400 cursor-not-allowed'
//                 : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
//                 }`}
//             >
//               {isLoading ? (
//                 <span className="flex items-center justify-center">
//                   <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4" />
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                   </svg>
//                   Creating Account...
//                 </span>
//               ) : (
//                 'Create Account'
//               )}
//             </button>
//             <button
//               type="button"
//               onClick={onSubmitGoogle}
//               disabled={isLoading || isLoadingGoogle }
//               className={`w-full py-2 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${isLoading
//                 ? 'bg-gray-400 cursor-not-allowed'
//                 : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
//                 }`}
//             >
//               {isLoadingGoogle ? (
//                 <span className="flex items-center justify-center">
//                   <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4" />
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                   </svg>
//                   Register With Google...
//                 </span>
//               ) : (
//                 'Register With Google'
//               )}
//             </button>

//           </form>

//           {/* Login Link */}
//           <p className="mt-6 text-center text-gray-600 text-sm">
//             Already have an account?{' '}
//             <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
//               Sign In
//             </Link>
            

//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import {Logo} from '../../component/Logo'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Calendar,
} from 'lucide-react';
import { auth, googleProvider } from '../../firebase'; // auth: إعدادات Firebase الخاصة بك
import { useAuth } from '../../Hooks/useAuth';
 
const validationSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});
 
// Official Google "G" logo mark, rendered inline so the button never depends
// on an external asset failing to load.
function GoogleIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  );
}
 
// Reusable form field wrapper: label, icon-leading input, inline validation.
function FormField({
  label,
  id,
  type = 'text',
  placeholder,
  icon: Icon,
  error,
  registration,
  disabled,
  rightSlot,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
          <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
        </div>
        <input
          {...registration}
          type={type}
          id={id}
          placeholder={placeholder}
          autoComplete={
            id === 'email'
              ? 'email'
              : id === 'password'
              ? 'new-password'
              : id === 'confirmPassword'
              ? 'new-password'
              : 'off'
          }
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full rounded-xl border bg-white py-2.5 pl-10 ${
            rightSlot ? 'pr-10' : 'pr-3.5'
          } text-[15px] text-slate-900 placeholder:text-slate-400 transition-all duration-150 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 ${
            error
              ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
              : 'border-slate-200 hover:border-slate-300 focus:border-indigo-400 focus:ring-indigo-100'
          }`}
        />
        {rightSlot && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3.5">
            {rightSlot}
          </div>
        )}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 6 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="flex items-center gap-1.5 text-sm font-medium text-red-600"
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            {error.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
 
export function Register() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [firebaseError, setFirebaseError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    user,
    isLoading,
    isLoadingGoogle,
    signUpWithEmail,
    signUpWithGoogle,
  } = useAuth();
 
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
 
  const onSubmitEmail = async (data) => {
    setFirebaseError('');
    setSuccessMessage('');
    try {
      await signUpWithEmail(data);
      setSuccessMessage('Account created successfully! Redirecting...');
      reset();
      navigate('/dashboard');
    } catch (error) {
      const errorMessage =
        error?.code?.replace('auth/', '').replace(/-/g, ' ') ||
        'An error occurred during sign up';
      setFirebaseError(errorMessage);
    }
  };
 
  const onSubmitGoogle = async () => {
    setFirebaseError('');
    setSuccessMessage('');
 
    try {
      // إنشاء المستخدم في Firebase
      await signUpWithGoogle();
      // جلب المستخدم الحالي
      setSuccessMessage('Account created successfully! Redirecting...');
      reset();
      navigate('/dashboard');
    } catch (error) {
      const errorMessage =
        error.code?.replace('auth/', '').replace(/-/g, ' ') ||
        'An error occurred during sign up';
      setFirebaseError(errorMessage);
    }
  };
 
  return (
    <div className="relative flex min-h-screen w-full overflow-hidden bg-slate-950">
      {/* Ambient gradient backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-600/30 blur-3xl" />
        <div className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>
 
      {/* Left brand / value-prop panel */}
      <div className="relative z-10 hidden w-1/2 flex-col justify-between p-12 lg:flex">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2.5"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-900/40">
            <Calendar className="h-5 w-5 text-white" />
          </div>
          <Logo />
        </motion.div>
 
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-md"
        >
          <h2 className="text-4xl font-semibold leading-tight text-white">
           Organize Your Time, Achieve More.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
           Plan events, manage tasks, and keep your schedule organized in one smart calendar experience.
          </p>
 
          <div className="mt-10 space-y-4">
            {[
              { icon: ShieldCheck, text: 'Stay on top of upcoming events and deadlines' },
              { icon: Zap, text: 'Create and manage schedules in seconds' },
              { icon: CheckCircle2, text: 'Access your calendar anytime, anywhere' },
            ].map(({ icon: Icon, text }, i) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                className="flex items-center gap-3"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Icon className="h-4 w-4 text-indigo-300" />
                </div>
                <span className="text-sm text-slate-300">{text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
 
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} Acme, Inc. All rights reserved.
        </p>
      </div>
 
      {/* Right form panel */}
      <div className="relative z-10 flex w-full items-center justify-center px-4 py-10 sm:px-6 lg:w-1/2 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="w-full max-w-md"
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-8 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-10">
            {/* Mobile-only brand mark */}
            <div className="mb-6 flex items-center gap-2.5 lg:hidden">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <Logo/>
            </div>
 
            <h1 className="text-md font-semibold tracking-tight text-white sm:text-[20px]">
              Create Your Calendar Account
            </h1>
            <p className="mt-2 text-xs text-slate-400">
              Start organizing your events, tasks, and schedule in just a few seconds
            </p>
 
            {/* Status messages */}
            <AnimatePresence mode="wait">
              {successMessage && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 flex items-start gap-2.5 overflow-hidden rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3.5"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-300">
                    {successMessage}
                  </p>
                </motion.div>
              )}
 
              {firebaseError && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 flex items-start gap-2.5 overflow-hidden rounded-xl border border-red-400/20 bg-red-400/10 p-3.5"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                  <p className="text-sm font-medium capitalize text-red-300">
                    {firebaseError}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
 
            {/* Form — wrapped in a light card so inputs stay high-contrast against the dark backdrop */}
            <div className="mt-7 rounded-xl bg-white p-5 shadow-xl shadow-black/20 sm:p-6">
              <form onSubmit={handleSubmit(onSubmitEmail)} className="space-y-4">
                <FormField
                  label="Email address"
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  icon={Mail}
                  error={errors.email}
                  registration={register('email')}
                  disabled={isLoading || isLoadingGoogle}
                />
 
                <FormField
                  label="Password"
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  icon={Lock}
                  error={errors.password}
                  registration={register('password')}
                  disabled={isLoading || isLoadingGoogle}
                  rightSlot={
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      tabIndex={-1}
                      aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                      }
                      className="text-slate-400 transition-colors hover:text-slate-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-[18px] w-[18px]" />
                      ) : (
                        <Eye className="h-[18px] w-[18px]" />
                      )}
                    </button>
                  }
                />
 
                <FormField
                  label="Confirm password"
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  icon={Lock}
                  error={errors.confirmPassword}
                  registration={register('confirmPassword')}
                  disabled={isLoading || isLoadingGoogle}
                  rightSlot={
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((v) => !v)}
                      tabIndex={-1}
                      aria-label={
                        showConfirmPassword ? 'Hide password' : 'Show password'
                      }
                      className="text-slate-400 transition-colors hover:text-slate-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-[18px] w-[18px]" />
                      ) : (
                        <Eye className="h-[18px] w-[18px]" />
                      )}
                    </button>
                  }
                />
 
                {/* Submit — email/password */}
                <motion.button
                  type="submit"
                  disabled={isLoading || isLoadingGoogle}
                  whileHover={!isLoading && !isLoadingGoogle ? { scale: 1.01 } : {}}
                  whileTap={!isLoading && !isLoadingGoogle ? { scale: 0.98 } : {}}
                  className={`group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl px-4 py-2.5 text-[15px] font-semibold text-white shadow-lg transition-all duration-200 ${
                    isLoading || isLoadingGoogle
                      ? 'cursor-not-allowed bg-slate-300 shadow-none'
                      : 'bg-gradient-to-r from-indigo-600 to-violet-600 shadow-indigo-500/30 hover:shadow-indigo-500/40'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-[18px] w-[18px] animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create account
                      <ArrowRight className="h-[18px] w-[18px] transition-transform duration-200 group-hover:translate-x-0.5" />
                    </>
                  )}
                </motion.button>
 
                {/* Divider */}
                <div className="relative flex items-center py-1">
                  <div className="h-px flex-1 bg-slate-200" />
                  <span className="px-3 text-xs font-medium uppercase tracking-wide text-slate-400">
                    Or continue with
                  </span>
                  <div className="h-px flex-1 bg-slate-200" />
                </div>
 
                {/* Submit — Google */}
                <motion.button
                  type="button"
                  onClick={onSubmitGoogle}
                  disabled={isLoading || isLoadingGoogle}
                  whileHover={!isLoading && !isLoadingGoogle ? { scale: 1.01 } : {}}
                  whileTap={!isLoading && !isLoadingGoogle ? { scale: 0.98 } : {}}
                  aria-label="Sign up with Google"
                  className={`flex w-full items-center justify-center gap-2.5 rounded-xl border px-4 py-2.5 text-[15px] font-semibold transition-all duration-200 ${
                    isLoading || isLoadingGoogle
                      ? 'cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md active:scale-[0.98]'
                  }`}
                >
                  {isLoadingGoogle ? (
                    <>
                      <Loader2 className="h-[18px] w-[18px] animate-spin text-slate-400" />
                      Signing up...
                    </>
                  ) : (
                    <>
                      <GoogleIcon className="h-5 w-5" />
                      Sign up with Google
                    </>
                  )}
                </motion.button>
              </form>
            </div>
 
            <p className="mt-6 text-center text-sm text-slate-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-indigo-300 transition-colors hover:text-indigo-200"
              >
                Sign in
              </Link>
            </p>
          </div>
 
          <p className="mt-6 text-center text-xs leading-relaxed text-slate-500">
            By creating an account, you agree to our{' '}
            <span className="cursor-pointer text-slate-400 underline-offset-2 hover:underline">
              Terms of Service
            </span>{' '}
            and{' '}
            <span className="cursor-pointer text-slate-400 underline-offset-2 hover:underline">
              Privacy Policy
            </span>
            .
          </p>
        </motion.div>
      </div>
    </div>
  );
}
 
