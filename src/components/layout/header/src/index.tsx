import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, theme } from 'antd';
import clsx from 'clsx';
import { useDevice } from '@/hooks/use-device';
import { HEADER_HEIGHT } from '@/constants/layout';
import { useConfigStore } from '@/stores';

export interface LayoutHeaderProps {
  className?: string;
  children?: React.ReactNode;
}

export function LayoutHeader({ className, children }: LayoutHeaderProps) {
  const {
    token: { Menu },
  } = theme.useToken();
  const sidebarCollapsed = useConfigStore(state => state.sidebarCollapsed);
  const triggerSidebar = useConfigStore(state => state.triggerSidebar);
  const { isMobile } = useDevice();

  return (
    <header
      className={clsx('flex shrink-0 items-center justify-between gap-5 transition-all md:px-4', className)}
      style={{
        background: Menu?.itemBg,
        height: HEADER_HEIGHT,
      }}
    >
      {isMobile ? (
        <Button
          type="text"
          icon={sidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => triggerSidebar(!sidebarCollapsed)}
          className="h-full"
        />
      ) : null}

      <div className="flex h-full grow items-center overflow-hidden">{children}</div>
    </header>
  );
}
