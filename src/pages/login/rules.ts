import { ALPHA_NUMERIC_ONLY_REGEXP, USERNAME_REGEXP } from './constants';

import type { TFunction } from 'i18next';

export const FORM_REQUIRED = [{ required: true }];

export function usernameRules(t: TFunction<'translation', undefined>) {
  return [
    {
      required: true,
      message: t('form.username.required'),
    },
    {
      pattern: USERNAME_REGEXP,
      message: t('form.username.invalid'),
    },
  ];
}

export function passwordRules(t: TFunction<'translation', undefined>) {
  return [
    {
      required: true,
      message: t('form.password.required'),
    },
    {
      pattern: /^(?=.*\d)(?=.*[a-z])[\w~!@#$%^&*+.-]{8,16}$/i,
      message: t('form.password.invalid'),
    },
  ];
}

export function alphanumericRules(t: TFunction<'translation', undefined>) {
  return [
    {
      required: true,
      message: t('form.alphanumeric.required'),
    },
    {
      pattern: ALPHA_NUMERIC_ONLY_REGEXP,
      message: t('form.alphanumeric.invalid'),
    },
  ];
}
