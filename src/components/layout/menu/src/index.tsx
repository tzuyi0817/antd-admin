import type { MenuProps } from 'antd';
import type { MenuItem } from './types';
import { useDevice } from '@/hooks/use-device';
import { removeTrailingSlash, type AppRouteRecordRaw } from '@/router';
import { Menu } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useMatches } from 'react-router-dom';
import clsx from 'clsx';
import { useConfigStore } from '@/stores';
import { useStyles } from './style';
import { getParentKeys } from './utils';

interface LayoutMenuProps {
  mode?: MenuProps['mode'];
  autoExpandCurrentMenu?: boolean;
  menus?: MenuItem[];
  handleMenuSelect?: (key: string, mode: MenuProps['mode']) => void;
}

const emptyArray: MenuItem[] = [];

export function LayoutMenu({
  mode = 'inline',
  autoExpandCurrentMenu,
  handleMenuSelect,
  menus = emptyArray,
}: LayoutMenuProps) {
  const classes = useStyles();
  const matches = useMatches();
  const sidebarCollapsed = useConfigStore(state => state.sidebarCollapsed);
  const wholeMenus = useConfigStore(state => state.wholeMenus);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const { isMobile } = useDevice();

  const menuParentKeys = useMemo(() => {
    return getParentKeys(wholeMenus);
  }, [wholeMenus]);

  const getSelectedKeys = useMemo(() => {
    const latestVisibleMatch = matches.findLast(routeItem => {
      const { handle } = routeItem as AppRouteRecordRaw;

      return handle?.hideInMenu !== true;
    });

    if (latestVisibleMatch?.id) {
      const routePath = removeTrailingSlash(latestVisibleMatch.id);
      const parentKeys = menuParentKeys[routePath] || [];

      return [...parentKeys, routePath];
    }

    return [];
  }, [matches, menuParentKeys]);

  const menuInlineCollapsedProp = useMemo(() => {
    if (mode === 'inline') {
      return { inlineCollapsed: isMobile ? false : sidebarCollapsed };
    }

    return {};
  }, [mode, isMobile, sidebarCollapsed]);

  const handleOpenChange: MenuProps['onOpenChange'] = keys => {
    if (sidebarCollapsed) {
      const currentOpenKey = keys.find(key => openKeys.indexOf(key) === -1);

      if (currentOpenKey !== undefined) {
        const parentKeys = menuParentKeys[currentOpenKey] || [];

        setOpenKeys([...parentKeys, currentOpenKey]);
      } else {
        const currentCloseKey = openKeys.find(key => keys.indexOf(key) === -1);

        if (currentCloseKey) {
          setOpenKeys(menuParentKeys[currentCloseKey]);
        }
      }
    } else {
      setOpenKeys(keys);
    }
  };

  const menuOpenProps = useMemo(() => {
    if (autoExpandCurrentMenu) {
      return {
        openKeys,
        onOpenChange: handleOpenChange,
      };
    }
    return {};
  }, [autoExpandCurrentMenu, openKeys, handleOpenChange]);

  useEffect(() => {
    if (sidebarCollapsed) {
      setOpenKeys([]);
    } else {
      setOpenKeys(getSelectedKeys);
    }
  }, [matches, sidebarCollapsed, getSelectedKeys]);
  console.log({ getSelectedKeys });
  return (
    <Menu
      className={clsx('min-w-0 flex-auto border-none!', {
        [classes.menuBackgroundColor]: sidebarCollapsed,
      })}
      inlineIndent={16}
      {...menuInlineCollapsedProp}
      style={{ height: isMobile ? '100%' : 'initial' }}
      mode={mode}
      theme="light"
      items={menus as MenuProps['items']}
      {...menuOpenProps}
      selectedKeys={getSelectedKeys}
      onClick={({ key }) => handleMenuSelect?.(key, mode)}
    />
  );
}
