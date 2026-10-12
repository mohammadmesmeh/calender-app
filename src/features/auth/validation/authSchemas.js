import * as yup from 'yup';

export const makeEmailSchema = (t) =>
  yup
    .string()
    .email(t('authValidation.validEmail'))
    .required(t('authValidation.emailRequired'));

export const makePasswordSchema = (t) =>
  yup
    .string()
    .min(6, t('authValidation.passwordMin'))
    .required(t('authValidation.passwordRequired'));

export const makeLoginSchema = (t) =>
  yup.object({
    email: makeEmailSchema(t),
    password: makePasswordSchema(t),
  });

export const makeRegisterSchema = (t) =>
  yup.object({
    email: makeEmailSchema(t),
    password: makePasswordSchema(t),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], t('authValidation.passwordsMatch'))
      .required(t('authValidation.confirmPasswordRequired')),
  });

export const makeForgotPasswordSchema = (t) =>
  yup.object({
    email: makeEmailSchema(t),
  });