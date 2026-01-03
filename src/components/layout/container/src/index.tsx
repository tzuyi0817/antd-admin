import { RocketOutlined } from '@ant-design/icons';
import { FloatButton, Grid } from 'antd';
import { useEffect, useMemo } from 'react';
import { LayoutHeader, LayoutMenu, LayoutSidebar, useMenu } from '@/components/layout';
import { ELEMENT_ID_MAIN_CONTENT, SIDE_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from '@/constants/layout';
import { useDevice } from '@/hooks/use-device';
import { useConfigStore } from '@/stores';
import { BreadcrumbViews } from './components/breadcrumb';
import { LayoutContent } from './components/content';
import { LayoutMobileMenu } from './components/mobile-menu';
import { LayoutTabbar } from './components/tabbar';

const { useBreakpoint } = Grid;

export function LayoutContainer() {
  const screens = useBreakpoint();
  const sidebarCollapsed = useConfigStore(state => state.sidebarCollapsed);
  const triggerSidebar = useConfigStore(state => state.triggerSidebar);
  const { isMobile } = useDevice();
  const { translatedMenus, handleMenuSelect } = useMenu();

  useEffect(() => {
    if (screens.lg && !screens.xl) {
      /* iPad */
      triggerSidebar(true);
    } else if (screens.xl) {
      /* PC */
      triggerSidebar(false);
    } else if (screens.xs || (screens.sm && !screens.md)) {
      /* Mobile */
      triggerSidebar(false);
    }
  }, [screens]);

  const computedSidebarWidth = useMemo(() => {
    if (isMobile) return 0;

    const currentSidebarWidth = sidebarCollapsed ? SIDE_COLLAPSED_WIDTH : SIDEBAR_WIDTH;

    return currentSidebarWidth;
  }, [isMobile, sidebarCollapsed]);

  return (
    <section
      style={{
        paddingLeft: computedSidebarWidth,
      }}
      className="flex h-screen flex-col transition-all"
    >
      <LayoutHeader>
        <BreadcrumbViews />
      </LayoutHeader>

      <LayoutTabbar />

      {/* Mobile Menu */}
      <LayoutMobileMenu />

      <LayoutSidebar computedSidebarWidth={computedSidebarWidth}>
        <LayoutMenu
          autoExpandCurrentMenu
          menus={translatedMenus}
          handleMenuSelect={handleMenuSelect}
        />
      </LayoutSidebar>

      <LayoutContent />

      <FloatButton.BackTop
        icon={<RocketOutlined />}
        target={() => (document.querySelector(`#${ELEMENT_ID_MAIN_CONTENT}`) as HTMLElement) || document}
      />
    </section>
  );
}
