import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCurrentRoute } from '@/hooks/use-current-route';
import { removeTrailingSlash } from '@/router';
import { useConfigStore } from '@/stores';
import { translateMenus } from './utils';
import type { MenuProps } from 'antd';

export function useMenu() {
  const wholeMenus = useConfigStore(state => state.wholeMenus);
  const triggerSidebar = useConfigStore(state => state.triggerSidebar);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const translatedMenus = translateMenus(wholeMenus, t);
  const currentRoute = useCurrentRoute();

  function handleMenuSelect(key: string, mode: MenuProps['mode']) {
    const pathname = currentRoute?.pathname || '';

    if (key === removeTrailingSlash(pathname)) {
      return;
    }

    if (mode !== 'horizontal') {
      if (/https?:/.test(key)) {
        window.open(key);
      } else {
        navigate(key);
        triggerSidebar(false);
      }
    }
  }

  return {
    handleMenuSelect,
    translatedMenus,
  };
}
