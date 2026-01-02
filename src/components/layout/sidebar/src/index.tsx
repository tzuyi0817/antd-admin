import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { theme as antdTheme, Button, Typography } from 'antd';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { SvgIcon } from '@/components/common';
import { HEADER_HEIGHT, SIDEBAR_TRIGGER_HEIGHT } from '@/constants/layout';
import { useConfigStore } from '@/stores';

export interface LayoutSidebarProps {
  children?: React.ReactNode;
  computedSidebarWidth: number;
}

const { Title } = Typography;

export function LayoutSidebar({ children, computedSidebarWidth }: LayoutSidebarProps) {
  const sidebarCollapsed = useConfigStore(state => state.sidebarCollapsed);
  const triggerSidebar = useConfigStore(state => state.triggerSidebar);
  const {
    token: { Menu },
  } = antdTheme.useToken();

  return (
    <aside
      style={{
        width: computedSidebarWidth + 1,
        backgroundColor: Menu?.itemBg,
        boxShadow: '3px 0 5px 0 rgb(29, 35, 41, 0.05)',
      }}
      className="border-r-colorBorderSecondary fixed top-0 bottom-0 left-0 overflow-x-hidden overflow-y-auto border-r transition-all"
    >
      <Link
        to="/home"
        style={{ height: HEADER_HEIGHT }}
        className={clsx('flex cursor-pointer items-center justify-center gap-2')}
      >
        <SvgIcon
          name="react"
          className="mr-2 h-8 w-8"
        />

        <Title
          level={1}
          className="m-0! text-sm!"
          ellipsis
        >
          Antd Admin
        </Title>
      </Link>

      <div
        className="overflow-hidden"
        style={{ height: `calc(100% - ${HEADER_HEIGHT}px - ${SIDEBAR_TRIGGER_HEIGHT}px)` }}
      >
        {children}
      </div>

      <Button
        type="text"
        style={{
          boxShadow: '0px -3px 5px 0 rgb(29, 35, 41, 0.05)',
          height: SIDEBAR_TRIGGER_HEIGHT,
        }}
        icon={sidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => triggerSidebar(!sidebarCollapsed)}
        className="border-t-colorBorderSecondary w-full! rounded-none border-t"
      />
    </aside>
  );
}
