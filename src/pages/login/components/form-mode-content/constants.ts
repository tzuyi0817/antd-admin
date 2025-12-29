import { createElement } from 'react';
import { ForgotPassword } from '../forgot-password';
import { PasswordLogin } from '../password-login';
import { RegisterPassword } from '../register-password';

export const FORM_COMPONENT_MAP = {
  login: createElement(PasswordLogin),
  register: createElement(RegisterPassword),
  forgotPassword: createElement(ForgotPassword),
};
