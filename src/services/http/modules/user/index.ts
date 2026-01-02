import { get, post } from '../../request';
import type { LoginParams, LoginResponse, UserInfo } from './types';

export type * from './types';

export function login(params: LoginParams) {
  return post<LoginResponse>('/login', params);
}

export function fetchUserInfo() {
  return get<UserInfo>('/user-info');
}

export function logout() {
  return post('/logout');
}
