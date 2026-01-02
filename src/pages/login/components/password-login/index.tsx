import { Button, Form, Input, message, Space } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '@/stores';
import type { LoginParams } from '@/services/http';
import { useFormMode } from '../../providers/form-mode';
import { passwordRules, usernameRules } from '../../rules';

const FORM_INITIAL_VALUES: LoginParams = {
  account: 'admin',
  password: import.meta.env.VITE_APP_PASSWORD || '12345678',
};

export function PasswordLogin() {
  const [loading, setLoading] = useState(false);
  const [passwordLoginForm] = Form.useForm();
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setFormMode } = useFormMode();
  const login = useAuthStore(state => state.login);

  function handleFinish(values: LoginParams) {
    setLoading(true);
    messageApi.loading(t('authority.loginInProgress'), 0);

    login(values)
      .then(() => {
        messageApi.success(t('authority.loginSuccess'));

        const redirect = searchParams.get('redirect');

        if (redirect) {
          navigate(`/${redirect.slice(1)}`);
        } else {
          navigate('/home');
        }
      })
      .finally(() => {
        messageApi?.destroy();

        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  }

  return (
    <>
      {contextHolder}

      <Space orientation="vertical">
        <h2 className="text-colorText mb-3 text-3xl leading-9 font-bold tracking-tight lg:text-4xl">
          {t('authority.welcomeBack')}
        </h2>
        <p className="text-colorTextSecondary text-sm lg:text-base">{t('authority.loginDescription')}</p>
      </Space>

      <Form
        name="passwordLoginForm"
        form={passwordLoginForm}
        layout="vertical"
        initialValues={FORM_INITIAL_VALUES}
        onFinish={handleFinish}
      >
        <Form.Item
          label={t('authority.username')}
          name="account"
          rules={usernameRules(t)}
        >
          <Input placeholder={t('form.username.required')} />
        </Form.Item>

        <Form.Item
          label={t('authority.password')}
          name="password"
          rules={passwordRules(t)}
        >
          <Input.Password placeholder={t('form.password.required')} />
        </Form.Item>

        <Form.Item>
          <div className="-mt-1 mb-5 flex justify-between text-sm">
            <Button
              type="link"
              className="p-0!"
              onPointerDown={() => {
                setFormMode('forgotPassword');
              }}
            >
              {t('authority.forgotPassword')}
            </Button>
          </div>
          <Button
            block
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            {t('authority.login')}
          </Button>
        </Form.Item>

        <div className="text-center text-sm">
          {t('authority.noAccountYet')}
          <Button
            type="link"
            className="px-1!"
            onPointerDown={() => {
              setFormMode('register');
            }}
          >
            {t('authority.goToRegister')}
          </Button>
        </div>
      </Form>
    </>
  );
}
