import type { MenuItem } from '@/components/layout';
import type { AppRouteRecordRaw } from './types';

export function flattenRoutes(routes: AppRouteRecordRaw[]) {
  const result: Record<string, AppRouteRecordRaw> = {};

  function traverse(items: AppRouteRecordRaw[], parent?: AppRouteRecordRaw) {
    items.forEach(item => {
      if (item.index && parent?.path) {
        result[`${parent.path}/`] = item;
      }

      if (item.path) {
        result[item.path] = item;
      }

      if (item.children && item.children.length > 0) {
        traverse(item.children, item);
      }
    });
  }

  traverse(routes);

  return result;
}

export function removeTrailingSlash(pathname: string) {
  return pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

export function generateMenuItemsFromRoutes(routeList: AppRouteRecordRaw[]) {
  return routeList.reduce<MenuItem[]>((acc, item) => {
    const label = item.handle?.title;
    const iconName = item?.handle?.icon;

    const menuItem: MenuItem = {
      key: item.path,
      label,
      icon: iconName,
    };

    if (Array.isArray(item.children) && item.children.length > 0) {
      const noIndexRoute = item.children.filter(route => !route.index && !route?.handle?.hideInMenu);

      if (noIndexRoute.length > 0) {
        menuItem.children = generateMenuItemsFromRoutes(noIndexRoute);
      }
    }

    if (item?.handle?.hideInMenu) {
      return acc;
    }

    return [...acc, menuItem];
  }, []);
}
