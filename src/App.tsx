import { ConfigProvider } from 'antd';
import { useTranslation } from 'react-i18next';
import { RouterProvider } from 'react-router-dom';
import { AntdApp } from '@/components/common';
import { ANT_DESIGN_LOCALE } from './plugins/i18n';
import { router } from './router';

export function App() {
  const { i18n } = useTranslation();

  function getAntdLocale() {
    const language = i18n.language;

    return ANT_DESIGN_LOCALE[language];
  }

  return (
    <ConfigProvider locale={getAntdLocale()}>
      <AntdApp>
        <RouterProvider router={router} />
      </AntdApp>
    </ConfigProvider>
  );
}
