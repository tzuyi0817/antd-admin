import { createPersistedStore } from '../middleware';
import { routes, flattenRoutes, generateMenuItemsFromRoutes, type AppRouteRecordRaw } from '@/router';
import type { MenuItem } from '@/components/layout';

interface ConfigState {
  appMeta: {
    version: string;
    builtAt: Date;
  };
  flatRouteList: Record<string, AppRouteRecordRaw>;
  wholeMenus: MenuItem[];
  spinner: boolean;
  sidebarCollapsed: boolean;
}

interface ConfigActions {
  openSpinner: () => void;
  closeSpinner: () => void;
  triggerSidebar: (state: boolean) => void;
}

const versionString = `${import.meta.env.VITE_APP_VERSION}-${import.meta.env.VITE_APP_LAST_COMMIT_HASH}`;

const defaultState: ConfigState = {
  appMeta: {
    version: import.meta.env.MODE === 'development' ? `${versionString}-dev` : versionString,
    builtAt: new Date(Number(import.meta.env.VITE_APP_BUILD_EPOCH)),
  },
  flatRouteList: flattenRoutes(routes),
  wholeMenus: generateMenuItemsFromRoutes(routes),
  spinner: false,
  sidebarCollapsed: false,
};

export const useConfigStore = createPersistedStore<ConfigState & ConfigActions>(
  'config',
  set => ({
    ...defaultState,

    openSpinner: () => {
      return set({
        spinner: true,
      });
    },
    closeSpinner: () => {
      return set({
        spinner: false,
      });
    },
    triggerSidebar: (state: boolean) => {
      return set({
        sidebarCollapsed: state,
      });
    },
  }),
  {
    partialize: () => ({}),
  },
);
