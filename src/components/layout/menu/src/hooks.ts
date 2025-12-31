import type { MenuProps } from 'antd';
import { useCurrentRoute } from '@/hooks/use-current-route';
import { removeTrailingSlash } from '@/router';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useConfigStore } from '@/stores';
import { translateMenus } from './utils';

export function useMenu() {
  const wholeMenus = useConfigStore(state => state.wholeMenus);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const translatedMenus = translateMenus(wholeMenus, t);
  const { pathname } = useCurrentRoute();

  const handleMenuSelect = (key: string, mode: MenuProps['mode']) => {
    if (key === removeTrailingSlash(pathname)) {
      return;
    }

    if (mode !== 'horizontal') {
      if (/http(s)?:/.test(key)) {
        window.open(key);
      } else {
        navigate(key);
      }
    }
  };

  return {
    handleMenuSelect,
    translatedMenus,
  };
}
