import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function Exception404() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle={t('common.404SubTitle')}
      className="flex h-full flex-col items-center justify-center"
      classNames={{ icon: 'm-0!' }}
      extra={
        <Button
          icon={<ArrowLeftOutlined />}
          type="primary"
          onClick={() => {
            navigate('/home');
          }}
        >
          {t('common.backHome')}
        </Button>
      }
    />
  );
}
