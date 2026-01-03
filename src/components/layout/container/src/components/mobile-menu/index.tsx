import { theme as antdTheme, Drawer } from 'antd';
import clsx from 'clsx';
import { LayoutMenu, useMenu } from '@/components/layout';
import { useDevice } from '@/hooks/use-device';
import { useConfigStore } from '@/stores';
import { useStyles } from './style';

export function LayoutMobileMenu() {
  const classes = useStyles();
  const {
    token: { Menu },
  } = antdTheme.useToken();
  const sidebarCollapsed = useConfigStore(state => state.sidebarCollapsed);
  const triggerSidebar = useConfigStore(state => state.triggerSidebar);
  const { isMobile } = useDevice();
  const { translatedMenus, handleMenuSelect } = useMenu();

  return isMobile ? (
    <Drawer
      styles={{
        body: {
          backgroundColor: Menu?.itemBg,
        },
      }}
      open={sidebarCollapsed}
      placement="left"
      size={210}
      destroyOnHidden={false}
      className={clsx(classes.drawerStyles)}
      onClose={() => triggerSidebar(false)}
    >
      <LayoutMenu
        autoExpandCurrentMenu
        menus={translatedMenus}
        handleMenuSelect={handleMenuSelect}
      />
    </Drawer>
  ) : null;
}
