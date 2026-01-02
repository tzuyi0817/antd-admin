import { fetchUserInfo, type UserInfo } from '@/services/http';
import { createPersistedStore } from '../middleware';

interface UserActions {
  setUserInfo: (info: UserInfo) => void;
  reset: () => void;
}

const defaultState: UserInfo = {
  avatar: '',
  account: '',
};

export const useUserStore = createPersistedStore<UserInfo & UserActions>('user', (set, get) => ({
  ...defaultState,

  setUserInfo: info => {
    return set({ ...info });
  },

  getUserInfo: async () => {
    const response = await fetchUserInfo();

    get().setUserInfo({ ...response.resultMap });

    return response.resultMap;
  },

  reset: () => {
    return set({ ...defaultState });
  },
}));
