import { login, logout, type LoginParams } from '@/services/http';
import { createPersistedStore } from '../middleware';
import { useTabsStore } from './tabs';
import { useUserStore } from './user';

interface AuthState {
  token: string;
}

const initialState: AuthState = {
  token: '',
};

interface AuthActions {
  login: (loginPayload: LoginParams) => Promise<void>;
  logout: () => Promise<void>;
  reset: () => void;
}

export const useAuthStore = createPersistedStore<AuthState & AuthActions>('auth', (set, get) => ({
  ...initialState,

  login: async loginPayload => {
    const { resultMap } = await login(loginPayload);

    set({ token: resultMap.token });
    useUserStore.getState().setUserInfo(resultMap.user);
  },

  logout: async () => {
    await logout();

    get().reset();
  },

  reset: () => {
    set({ ...initialState });
    useUserStore.getState().reset();
    useTabsStore.getState().resetTabs();
  },
}));
