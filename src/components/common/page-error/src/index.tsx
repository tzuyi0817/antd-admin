import { ArrowLeftOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, Result, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import type { FallbackProps } from 'react-error-boundary';

export function PageError({ error, resetErrorBoundary }: FallbackProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  function goHome() {
    resetErrorBoundary();
    navigate('/home');
  }

  return (
    <Result
      status="500"
      title={error.message}
      className="flex h-full flex-col items-center justify-center"
      classNames={{ icon: 'm-0!' }}
      extra={
        <Space size={20}>
          <Button
            icon={<ArrowLeftOutlined />}
            type="primary"
            onClick={goHome}
          >
            {t('common.backHome')}
          </Button>
          <Button
            icon={<ReloadOutlined rotate={90} />}
            onClick={refresh}
          >
            {t('common.refresh')}
          </Button>
        </Space>
      }
    >
      <Typography.Paragraph
        type="warning"
        className="text-center"
      >
        {error.stack}
      </Typography.Paragraph>
    </Result>
  );
}

function refresh() {
  location.reload();
}
