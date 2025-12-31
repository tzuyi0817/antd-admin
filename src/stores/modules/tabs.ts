import type { TabPaneProps } from 'antd';
import { createPersistedStore } from '../middleware';

export interface TabItemProps extends Omit<TabPaneProps, 'tab'> {
  key: string;
  label: React.ReactNode;
  draggable?: boolean;
  historyState?: Record<string, any>;
}

export interface TabState extends Omit<TabItemProps, 'label'> {
  label: string;
  newTabTitle?: React.ReactNode;
}

interface TabsState {
  openTabs: Map<string, TabState>;
  activeKey: string;
  isMaximize: boolean;
}

interface TabsActions {
  addTab: (routePath: string, tabProps: TabState) => void;
  insertBeforeTab: (routePath: string, tabProps: TabState) => void;
  removeTab: (routePath: string) => void;
  closeRightTabs: (routePath: string) => void;
  closeLeftTabs: (routePath: string) => void;
  closeOtherTabs: (routePath: string) => void;
  closeAllTabs: () => void;
  setActiveKey: (routePath: string) => void;
  resetTabs: () => void;
  changeTabOrder: (from: number, to: number) => void;
  toggleMaximize: (state: boolean) => void;
  setTableTitle: (routePath: string, title: string) => void;
  resetTableTitle: (routePath: string) => void;
}

const defaultState: TabsState = {
  openTabs: new Map<string, TabState>([]),
  activeKey: '',
  isMaximize: false,
};

export const useTabsStore = createPersistedStore<TabsState & TabsActions>(
  'tabs',
  set => ({
    ...defaultState,

    setActiveKey: (routePath: string) => {
      set({ activeKey: routePath });
    },

    insertBeforeTab: (routePath: string, tabProps: TabState) => {
      set(state => {
        if (routePath.length) {
          const newMap = new Map([[routePath, tabProps]]);
          for (const [key, value] of state.openTabs) {
            newMap.set(key, value);
          }
          return { openTabs: newMap };
        }
        return state;
      });
    },

    addTab: (routePath: string, tabProps: TabState) => {
      set(state => {
        if (routePath.length) {
          const newTabs = new Map(state.openTabs);

          newTabs.set(routePath, { ...newTabs.get(routePath), ...tabProps });

          return { openTabs: newTabs };
        }
        return state;
      });
    },

    removeTab: (routePath: string) => {
      set(state => {
        const homePath = '/home';

        if (routePath === homePath) {
          return state;
        }

        const newTabs = new Map(state.openTabs);

        newTabs.delete(routePath);

        let newActiveKey = state.activeKey;

        if (routePath === state.activeKey) {
          const tabsArray = Array.from(newTabs.keys());

          newActiveKey = tabsArray.at(-1) || homePath;
        }

        if (newTabs.size === 0) {
          newTabs.set(homePath, state.openTabs.get(homePath)!);
          newActiveKey = homePath;
        }

        return { openTabs: newTabs, activeKey: newActiveKey };
      });
    },

    closeRightTabs: (routePath: string) => {
      set(state => {
        const newTabs = new Map();
        let found = false;
        let activeKeyFound = false;
        let newActiveKey = state.activeKey;

        for (const [key, value] of state.openTabs) {
          if (found) {
            break;
          }

          newTabs.set(key, value);

          if (key === routePath) {
            found = true;
          }

          if (key === state.activeKey) {
            activeKeyFound = true;
          }
        }

        if (!activeKeyFound) {
          newActiveKey = routePath;
        }

        return { openTabs: newTabs, activeKey: newActiveKey };
      });
    },

    closeLeftTabs: (routePath: string) => {
      set(state => {
        const newTabs = new Map();
        const homePath = import.meta.env.VITE_BASE_HOME_PATH;
        let found = false;
        let newActiveKey = state.activeKey;
        let activeKeyOnRight = false;

        newTabs.set(homePath, state.openTabs.get(homePath)!);

        for (const [key, value] of state.openTabs) {
          if (key === homePath) continue;

          if (found || key === routePath) {
            newTabs.set(key, value);
            found = true;
          }

          if (key === state.activeKey && found) {
            activeKeyOnRight = true;
          }
        }

        if (!activeKeyOnRight) {
          newActiveKey = routePath;
        }

        return { openTabs: newTabs, activeKey: newActiveKey };
      });
    },

    closeOtherTabs: (routePath: string) => {
      set(state => {
        const newTabs = new Map();
        const homePath = import.meta.env.VITE_BASE_HOME_PATH;

        newTabs.set(homePath, state.openTabs.get(homePath)!);

        if (routePath !== homePath && state.openTabs.has(routePath)) {
          newTabs.set(routePath, state.openTabs.get(routePath)!);
        }

        let newActiveKey = state.activeKey;

        if (!newTabs.has(state.activeKey)) {
          newActiveKey = routePath;
        }

        return { openTabs: newTabs, activeKey: newActiveKey };
      });
    },

    closeAllTabs: () => {
      set(state => {
        const newTabs = new Map();
        const homePath = '/home';

        newTabs.set(homePath, state.openTabs.get(homePath));

        return { openTabs: newTabs, activeKey: homePath };
      });
    },

    changeTabOrder: (from: number, to: number) => {
      set(state => {
        const newTabs = Array.from(state.openTabs.entries());
        const [movedTab] = newTabs.splice(from, 1);

        newTabs.splice(to, 0, movedTab);

        const newOpenTabs = new Map(newTabs);

        return { openTabs: newOpenTabs };
      });
    },

    toggleMaximize: (state: boolean) => {
      set({ isMaximize: state });
    },

    setTableTitle: (routePath: string, title: React.ReactNode) => {
      set(state => {
        const newTabs = new Map(state.openTabs);
        const targetTab = newTabs.get(routePath);
        if (targetTab) {
          targetTab.newTabTitle = title;
          newTabs.set(routePath, targetTab);
          return { openTabs: newTabs };
        }
        return state;
      });
    },

    resetTableTitle: (routePath: string) => {
      set(state => {
        const newTabs = new Map(state.openTabs);
        const targetTab = newTabs.get(routePath);

        if (targetTab) {
          delete targetTab.newTabTitle;
          newTabs.set(routePath, targetTab);

          return { openTabs: newTabs };
        }
        return state;
      });
    },

    resetTabs: () => {
      set(() => {
        return { ...defaultState };
      });
    },
  }),
  {
    partialize: state => {
      return Object.fromEntries(Object.entries(state).filter(([key]) => !['activeKey'].includes(key)));
    },
    storage: {
      getItem: name => {
        const str = sessionStorage.getItem(name);

        if (!str) return null;

        const existingValue = JSON.parse(str);

        return {
          ...existingValue,
          state: {
            ...existingValue.state,
            openTabs: new Map(existingValue.state.openTabs),
          },
        };
      },
      setItem: (name, newValue) => {
        const str = JSON.stringify({
          ...newValue,
          state: {
            ...newValue.state,
            openTabs: newValue.state.openTabs ? Array.from(newValue.state.openTabs.entries()) : [],
          },
        });

        sessionStorage.setItem(name, str);
      },
      removeItem: name => sessionStorage.removeItem(name),
    },
  },
);
