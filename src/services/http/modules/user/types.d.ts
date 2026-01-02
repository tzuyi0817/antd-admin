export interface UserInfo {
  account: string;
  avatar: string;
}

export interface LoginParams {
  account: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: UserInfo;
}
