import { mockHome } from './modules/home';
import { mockUser } from './modules/user';

export const handlers = [
  mockHome.fetchHomeList,
  mockHome.createHomeItem,
  mockHome.editHomeItem,
  mockHome.deleteHomeItem,

  mockUser.fetchUserInfo,
  mockUser.login,
  mockUser.logout,
];
