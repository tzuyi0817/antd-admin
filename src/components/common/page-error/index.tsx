import type { FallbackProps } from 'react-error-boundary';
import { ArrowLeftOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, Result, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export function PageError({ error, resetErrorBoundary }: FallbackProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  function goHome() {
    resetErrorBoundary();
    navigate('/home');
  }

  function refresh() {
    location.reload();
  }

  return (
    <Result
      status="500"
      title={error.message}
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
