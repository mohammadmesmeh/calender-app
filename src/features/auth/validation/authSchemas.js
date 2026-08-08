import * as yup from 'yup';

export const emailSchema = yup
  .string()
  .email('Please enter a valid email address')
  .required('Email is required');

export const passwordSchema = yup
  .string()
  .min(6, 'Password must be at least 6 characters')
  .required('Password is required');

export const loginSchema = yup.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = yup.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

export const forgotPasswordSchema = yup.object({
  email: emailSchema,
});
