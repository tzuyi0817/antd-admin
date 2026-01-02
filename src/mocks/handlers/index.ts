import { mockHome } from './modules/home';
import { mockUser } from './modules/user';

export const handlers = [mockHome.fetchHomeList, mockUser.fetchUserInfo, mockUser.login, mockUser.logout];
