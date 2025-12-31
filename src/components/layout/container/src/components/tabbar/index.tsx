import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import { clsx } from 'clsx';
import { isValidElement, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { removeTrailingSlash, type AppRouteRecordRaw } from '@/router';
import { useConfigStore, useTabsStore, type TabItemProps } from '@/stores';
import { useCurrentRoute } from '@/hooks/use-current-route';
import { isString } from '@/utils/check-type';
import { useStyles } from './style';

export function LayoutTabbar() {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const currentRoute = useCurrentRoute();
  const flatRouteList = useConfigStore(state => state.flatRouteList);
  const activeKey = useTabsStore(state => state.activeKey);
  const openTabs = useTabsStore(state => state.openTabs);
  const { setActiveKey, addTab, removeTab, insertBeforeTab } = useTabsStore();

  const tabItems: TabItemProps[] = useMemo(() => {
    return Array.from(openTabs.values()).map(item => {
      const tabLabel = item.newTabTitle ?? item.label;

      return {
        ...item,
        label: <div className="relative flex items-center gap-1">{isString(tabLabel) ? t(tabLabel) : tabLabel}</div>,
      };
    });
  }, [openTabs, t]);

  const handleChangeTabs = useCallback(
    (key: string) => {
      const historyState = openTabs.get(key)?.historyState || { search: '', hash: '' };
      navigate(key + historyState.search + historyState.hash);
    },
    [openTabs],
  );

  const handleEditTabs = useCallback<Required<TabsProps>['onEdit']>(
    (key, action) => {
      if (action === 'remove') {
        removeTab(key as string);
      }
    },
    [removeTab],
  );

  useEffect(() => {
    const historyState = openTabs.get(activeKey)?.historyState || { search: '', hash: '' };
    const activeFullPath = activeKey + historyState.search + historyState.hash;
    const currentFullPath = location.pathname + location.search + location.hash;

    if (activeKey.length > 0 && activeFullPath !== currentFullPath) {
      navigate(activeFullPath);
    }
  }, [activeKey]);

  useEffect(() => {
    const isDefaultTabMissing = !Array.from(openTabs.keys()).includes('/home');

    if (isDefaultTabMissing) {
      const routeTitle = flatRouteList['/home']?.handle?.title;

      insertBeforeTab('/home', {
        key: '/home',
        label: isValidElement(routeTitle) ? routeTitle?.props?.children : routeTitle,
        closable: false,
        draggable: false,
      });
    }
  }, [openTabs, insertBeforeTab, flatRouteList]);

  useEffect(() => {
    const activePath = location.pathname;
    const normalizedPath = removeTrailingSlash(activePath);

    if (normalizedPath !== activeKey) {
      setActiveKey(normalizedPath);

      const { title: routeTitle } = currentRoute.handle as AppRouteRecordRaw['handle'];

      addTab(normalizedPath, {
        key: normalizedPath,
        label: isValidElement(routeTitle) ? routeTitle?.props?.children : routeTitle,
        historyState: { search: location.search, hash: location.hash },
        closable: normalizedPath !== '/home',
        draggable: normalizedPath !== '/home',
      });
    }
  }, [location, currentRoute, setActiveKey, addTab]);

  return (
    <div className={classes.tabsContainer}>
      <Tabs
        className={clsx(classes.resetTabs, classes.chrome)}
        size="small"
        hideAdd
        animated
        onChange={handleChangeTabs}
        activeKey={removeTrailingSlash(activeKey)}
        type="editable-card"
        onEdit={handleEditTabs}
        items={tabItems}
      />
    </div>
  );
}
