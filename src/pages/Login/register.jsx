import { useState } from 'react';
import { useNavigate , Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';// Firebase Auth: لإنشاء مستخدم جديد
import { auth, googleProvider } from '../../firebase';//auth: إعدادات Firebase الخاصة بك
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

export function Register() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [firebaseError, setFirebaseError] = useState('');
  const {user,
        isLoading,
        isLoadingGoogle,
        signUpWithEmail,
        signUpWithGoogle} = useAuth()

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
     await signUpWithEmail(data)
      setSuccessMessage('Account created successfully! Redirecting...');
      reset();
      navigate('/dashboard');
    } catch (error) {
      const errorMessage = error?.code?.replace('auth/', '').replace(/-/g, ' ') || 'An error occurred during sign up';
      setFirebaseError(errorMessage);
    } 
    
  };
  const onSubmitGoogle = async () => {
    setFirebaseError('');
    setSuccessMessage('');

    try {
      // إنشاء المستخدم في Firebase
     await signUpWithGoogle()
      // جلب المستخدم الحالي 
      setSuccessMessage('Account created successfully! Redirecting...');
      reset();
      navigate('/dashboard');
    } catch (error) {
      const errorMessage = error.code?.replace('auth/', '').replace(/-/g, ' ') || 'An error occurred during sign up';
      setFirebaseError(errorMessage);
    } 
   
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600 mb-8">Join us today to get started</p>

          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 text-sm font-medium">{successMessage}</p>
            </div>
          )}

          {firebaseError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm font-medium capitalize">{firebaseError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmitEmail)} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                {...register('email')}
                type="email"
                id="email"
                placeholder="you@example.com"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${errors.email
                  ? 'border-red-300 focus:ring-red-200 bg-red-50'
                  : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                  }`}
                disabled={isLoading || isLoadingGoogle}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 font-medium">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                {...register('password')}
                type="password"
                id="password"
                placeholder="••••••••"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${errors.password
                  ? 'border-red-300 focus:ring-red-200 bg-red-50'
                  : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                  }`}
                disabled={isLoading ||isLoadingGoogle}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 font-medium">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                {...register('confirmPassword')}
                type="password"
                id="confirmPassword"
                placeholder="••••••••"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${errors.confirmPassword
                  ? 'border-red-300 focus:ring-red-200 bg-red-50'
                  : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                  }`}
                disabled={isLoading || isLoadingGoogle}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600 font-medium">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading||isLoadingGoogle}
              className={`w-full py-2 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
                }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating Account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
            <button
              type="button"
              onClick={onSubmitGoogle}
              disabled={isLoading || isLoadingGoogle }
              className={`w-full py-2 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
                }`}
            >
              {isLoadingGoogle ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Register With Google...
                </span>
              ) : (
                'Register With Google'
              )}
            </button>

          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-gray-600 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign In
            </Link>
            

          </p>
        </div>
      </div>
    </div>
  );
}
