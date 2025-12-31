import { isString } from '@/utils/check-type';
import type { MenuItem } from './types';

export function getParentKeys(menuItems: MenuItem[]): Record<string, string[]> {
  const parentKeyMap: Record<string, string[]> = {};

  function traverse(items: MenuItem[], parentKeys: string[] = []) {
    for (const item of items) {
      parentKeyMap[item.key] = [...parentKeys];

      if (Array.isArray(item.children) && item.children.length) {
        traverse(item.children, [...parentKeys, item.key]);
      }
    }
  }

  traverse(menuItems);

  return parentKeyMap;
}

export function translateMenus(menus: MenuItem[], t: (key: string) => string) {
  return menus.map(menu => {
    let translatedLabel: React.ReactNode = menu.label;

    if (isString(menu.label)) {
      translatedLabel = t(menu.label);
    }
    const translatedMenu = {
      ...menu,
      label: translatedLabel,
    };

    if (menu.children && menu.children.length > 0) {
      translatedMenu.children = translateMenus(menu.children, t);
    }

    return translatedMenu;
  });
}
