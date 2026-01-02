import { useMemo } from 'react';
import { Breadcrumb, type BreadcrumbProps } from 'antd';
import { isString } from '@/utils/check-type';
import { useTranslation } from 'react-i18next';
import { useMatches } from 'react-router-dom';
import type { AppRouteRecordRaw } from '@/router/types';

const itemRender: BreadcrumbProps['itemRender'] = (route, _, routes) => {
  const last = routes.indexOf(route) === routes.length - 1;

  return last || !route.path ? <span>{route.title}</span> : <span>{route.title}</span>;
};

export function BreadcrumbViews() {
  const { t } = useTranslation();
  const matches = useMatches();

  const items = useMemo(() => {
    return matches
      .filter(match => match.handle && !match.pathname.endsWith('/'))
      .map(match => {
        const { title } = match.handle as AppRouteRecordRaw['handle'];

        return {
          title: isString(title) ? t(title) : title,
          path: match.pathname,
        };
      });
  }, [matches, t]);

  return (
    <Breadcrumb
      className="hidden md:block"
      separator="->"
      itemRender={itemRender}
      items={items}
    />
  );
}
