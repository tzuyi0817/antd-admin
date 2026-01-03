import { Button, Checkbox, Form, Input, App, Space, Typography } from 'antd';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useFormMode } from '../../providers/form-mode';
import { passwordRules, usernameRules } from '../../rules';

const { Title } = Typography;

const FORM_INITIAL_VALUES = {
  username: '',
  password: '',
  confirmPassword: '',
};
export type RegisterPasswordFormType = typeof FORM_INITIAL_VALUES;

export function RegisterPassword() {
  const [loading] = useState(false);
  const [registerForm] = Form.useForm();
  const { t } = useTranslation();
  const { setFormMode } = useFormMode();
  const { message } = App.useApp();

  function handleFinish() {
    message.success('註冊成功');
    setFormMode('login');
  }

  return (
    <>
      <Space orientation="vertical">
        <Title level={3}>{t('authority.register')}</Title>
      </Space>

      <Form
        name="registerForm"
        form={registerForm}
        layout="vertical"
        initialValues={FORM_INITIAL_VALUES}
        onFinish={handleFinish}
      >
        <Form.Item
          label={t('authority.username')}
          name="username"
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

        <Form.Item
          name="confirm"
          label={t('authority.confirmPassword')}
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: t('form.confirmPassword.required'),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(t('form.confirmPassword.invalid')));
              },
            }),
          ]}
        >
          <Input.Password placeholder={t('form.confirmPassword.required')} />
        </Form.Item>

        <Form.Item
          rules={[
            () => ({
              validator(_, value) {
                return value === true ? Promise.resolve() : Promise.reject(new Error(t('form.agree.required')));
              },
            }),
          ]}
          name="termsAgreement"
          valuePropName="checked"
        >
          <Checkbox>
            <div className="flex flex-wrap text-xs">
              <Trans
                i18nKey="authority.agree"
                components={[
                  <Link
                    key={0}
                    to="/terms-of-service"
                    target="_blank"
                  />,
                  <Link
                    key={1}
                    to="/privacy-policy"
                    target="_blank"
                  />,
                ]}
              />
            </div>
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            {t('authority.register')}
          </Button>
        </Form.Item>

        <div className="text-center text-sm">
          {t('authority.alreadyHaveAnAccount')}
          <Button
            type="link"
            className="px-1!"
            onPointerDown={() => {
              setFormMode('login');
            }}
          >
            {t('authority.goToLogin')}
          </Button>
        </div>
      </Form>
    </>
  );
}
