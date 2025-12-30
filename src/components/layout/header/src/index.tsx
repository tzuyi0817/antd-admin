import type { ButtonProps } from 'antd';
// import { useDeviceType } from "#src/hooks/use-device-type";
// import { useLayout } from "#src/layout/hooks/use-layout";
// import { GlobalSearch } from "#src/layout/widgets/global-search";
// import { NotificationContainer } from "#src/layout/widgets/notification/notification-container";
// import { useTabsStore } from "#src/store/tabs";

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, theme } from 'antd';
import clsx from 'clsx';

// import { headerHeight } from "../constants";
// import { FullscreenButton } from "./components/fullscreen-button";
// import { LanguageButton } from "./components/language-button";
// import { ThemeButton } from "./components/theme-button";
// import { UserMenu } from "./components/user-menu";

export interface LayoutHeaderProps {
  className?: string;
  children?: React.ReactNode;
}

const buttonProps: ButtonProps = {
  size: 'large',
  className: 'px-[11px]',
};

export function LayoutHeader({ className, children }: LayoutHeaderProps) {
  const {
    token: { Menu },
  } = theme.useToken();
  // const { isMobile } = useDeviceType();
  // const isMaximize = useTabsStore(state => state.isMaximize);
  // const { isTopNav, isMixedNav } = useLayout();
  // const isFixedDarkTheme = isDark || (sidebarTheme === "dark" && (isMixedNav || isTopNav));

  return (
    <header
      className={clsx(
        'flex flex-shrink-0 items-center justify-between gap-5 transition-all md:px-4',
        // { "overflow-hidden": isMaximize },
        className,
      )}
      // style={{
      // 	background: isFixedDarkTheme ? Menu?.darkItemBg : Menu?.itemBg,
      // 	height: isMaximize ? 0 : headerHeight,
      // }}
    >
      {/* {
					isMobile
						? (
							<Button
								type="text"
								icon={sidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
								onClick={() => setPreferences("sidebarCollapsed", !sidebarCollapsed)}
								className="h-full"
							/>
						)
						: null
				} */}

      <div className="flex h-full grow items-center overflow-hidden">{children}</div>

      <div className="flex items-center">
        {/* <GlobalSearch />
					<Preferences {...buttonProps} />
					<ThemeButton {...buttonProps} />
					<LanguageButton {...buttonProps} />
					<FullscreenButton {...buttonProps} target={document.documentElement} />
					<NotificationContainer {...buttonProps} />
					<UserMenu {...buttonProps} /> */}
      </div>
    </header>
  );
}
