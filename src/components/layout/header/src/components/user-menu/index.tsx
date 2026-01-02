import { LogoutOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, type ButtonProps, type MenuProps } from 'antd';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, useUserStore } from '@/stores';

export function UserMenu({ ...restProps }: ButtonProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const avatar = useUserStore(state => state.avatar);
  const logout = useAuthStore(state => state.logout);

  const onClick: MenuProps['onClick'] = async ({ key }) => {
    if (key === 'logout') {
      await logout();
      navigate('/login');
    }
  };

  const items: MenuProps['items'] = [
    {
      label: t('authority.logout'),
      key: 'logout',
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <Dropdown
      menu={{ items, onClick }}
      arrow={false}
      placement="bottomRight"
      trigger={['click']}
    >
      <Button
        type="text"
        {...restProps}
        className={clsx(restProps.className, 'rounded-full px-1')}
      >
        <Avatar src={avatar} />
      </Button>
    </Dropdown>
  );
}
